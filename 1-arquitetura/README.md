<h1 align="center">🌐 Arquitetura de Monitoramento de Multisserviços</h1>


<p align="justify">
Este documento apresenta a especificação técnica, a topologia de redes virtuais e o fluxo de dados do ambiente projetado. O objetivo do design é estruturar e integrar múltiplos serviços (Nginx, App Web, Zabbix, PostgreSQL e Grafana) dentro de um servidor principal (<strong>Docker Host</strong>), centralizando as operações na camada de monitoramento e gerência.
</p>

---

<p align="center">
  <img src="Multi-Service Environment Monitoring-v7vf.png" alt="Arquitetura do ambiente" width="980" height= "800">
</p>

<p align="center">
  <em>Figura 1 — Topologia lógica da arquitetura.</em>
</p>

## 🏛️ Divisão das redes e isolamento dos serviços

Para garantir a segurança do ambiente e impedir o acesso não autorizado aos dados, o servidor foi dividido em três redes internas totalmente separadas:

### 1. Rede pública (`public-net`)

* **Componente:** `Nginx (Reverse Proxy)`
* **Funcionamento:** É o único perímetro com conexão direta com a internet externa. O **Nginx** opera de forma isolada nesta camada para receber as requisições dos usuários via protocolo **HTTPS (Porta :443)**. Ele atua como um escudo de entrada, impedindo o acesso direto da internet às camadas internas.

### 2. Rede de aplicação (`app-net`)

* **Componentes:** `App Web (Meu Site)` e `Zabbix Server`
* **Funcionamento:** Camada interna sem exposição para a internet. A **App Web** reside neste perímetro protegido e recebe o tráfego repassado pelo Nginx através da porta interna `:80`. O **Zabbix Server** está localizado nesta mesma rede para realizar as coletas e os testes internos de integridade na aplicação.

### 3. Rede de dados (`backend-net`)

* **Componentes:** `PostgreSQL (Banco de Dados)` e `Grafana`
* **Funcionamento:** Zona isolada dedicada ao armazenamento e à gerência visual. O banco de dados **PostgreSQL** e o painel do **Grafana** operam confinados nesta camada, sem qualquer comunicação com a rede pública ou com o Nginx, bloqueando tentativas de acessos externos à base de dados.

> 🔀 **Comunicação multihomed do Zabbix Server:** Para viabilizar a coleta de métricas sem quebrar o isolamento das redes, o **Zabbix Server** está conectado simultaneamente à `app-net` e à `backend-net`. Ele utiliza a interface da rede de aplicação para testar o site e a interface da rede de dados para gravar o histórico no banco de dados e enviá-lo ao Grafana.

---

## 📡 Fluxo de comunicação e portas lógicas

No diagrama técnico, a direção das setas determina qual componente inicia a requisição de comunicação (relação Cliente-Servidor):

1. **Usuário ➔ Nginx:** O cliente externo inicia o acesso web na porta padrão `443` (HTTPS).
2. **Nginx ➔ App Web:** O Nginx repassa a requisição para o container do site na rede interna através da porta `80` (Proxy HTTP).
3. **Zabbix Server ➔ App Web:** O Zabbix realiza checagens periódicas (`HTTP Check`) na porta local do site para medir o tempo de resposta e validar a disponibilidade.
4. **Grafana ➔ Zabbix Server:** O Grafana requisita as métricas de visualização consultando diretamente a **Zabbix API (Porta :8080)**. O Grafana não faz consultas diretas na base de dados, prevenindo gargalos e lentidão no banco.
5. **Zabbix Server ➔ PostgreSQL:** O Zabbix grava nativamente o histórico de métricas e os registros de logs no banco de dados através da porta padrão `5432`.

---

## 💾 Persistência física de dados (Docker Volume)

Contêineres Docker perdem todos os dados internos caso o processo seja reiniciado ou atualizado. Para garantir o armazenamento permanente das informações coletadas, a arquitetura implementa o desacoplamento de estado do banco de dados.

Um **Docker Volume independente (`Volume: pg_data`)** foi acoplado diretamente ao PostgreSQL. Toda informação escrita no banco é gravada direto no disco rígido físico do servidor principal. Desse modo, mesmo que o container do PostgreSQL seja destruído ou atualizado, o histórico de métricas e as configurações de alertas permanecem salvos de forma íntegra.

---

## 📊 Regras de alertas e metas de acordo de nível de serviço (SLA)

A infraestrutura foi modelada para alimentar e medir três indicadores técnicos de desempenho:

* **Disponibilidade da Borda (SLA de 99.9%):** Medição da taxa de erros HTTP do tipo 5xx no Nginx. Dispara um alerta automático caso o índice de erros internos passe de 5% dentro do intervalo de 1 minuto.
* **Performance da Aplicação (SLA de 99.5%):** Medição do tempo de carregamento da URL da App Web. Dispara um alerta crítico se o site ficar fora do ar ou demorar mais de 3 segundos para responder por 3 checagens consecutivas do Zabbix.
* **Capacidade de Armazenamento:** Monitoramento do espaço físico em disco ocupado pelo PostgreSQL. Gera um alerta de severidade alta caso o volume de dados históricos atinja 85% do espaço total alocado.
