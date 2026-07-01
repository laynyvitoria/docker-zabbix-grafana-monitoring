# ⚙️ Implementação Zabbix (Modelo de Monitoramento)

Este documento descreve a implementação do Zabbix dentro da arquitetura de monitoramento de multisserviços.

O ambiente utiliza o Zabbix como motor de coleta e avaliação de métricas, aplicando regras de itens, triggers e testes manuais para validação dos serviços monitorados.

A estrutura implementada segue diretamente o catálogo de alertas e a arquitetura definida, garantindo padronização entre detecção, classificação e resposta de incidentes.

---

## 🧠 Relação com o projeto

No projeto existem três camadas principais:

- SLA define o limite aceitável do serviço  
- Catálogo de alertas define o problema (ex: APP-01)  
- Implementação Zabbix executa a detecção desses eventos na prática  

---

## 🔁 Como o monitoramento funciona

Todo serviço segue a mesma lógica:

- Item → coleta o dado (ex: HTTP, porta, disco)  
- Trigger → regra que detecta falha  
- Teste → forma manual de validar o comportamento  

Essa estrutura garante consistência entre a detecção automática e a validação operacional dos serviços.

---

## 🌐 APP-01 — Aplicação fora do ar (P1)

<img src="app-01.png" alt="Aplicação fora do ar" width="980">

O que significa: a aplicação não responde ou retorna erro.

Trigger:
`nodata(/App Web/app.web.check,1m)=1`

Teste manual:
`curl -I http://localhost`

Interpretação:
- 200 → sistema funcionando  
- 500 ou sem resposta → falha detectada  

---

## 🟡 APP-02 — Lentidão da aplicação (P2)

O que significa: a aplicação apresenta degradação de desempenho com aumento no tempo de resposta.

Trigger:
`last(/App Web/web.page.perf[http://app-web:80])>3`

Teste manual:
`curl -w "%{time_total}\n" http://localhost`

Interpretação:
- até 3s → operação normal  
- acima de 3s → degradação de performance  

---

## 🗄️ DB-01 — Banco de dados fora do ar (P1)

O que significa: o banco de dados não está acessível.

Trigger:
`last(/PostgreSQL/net.tcp.service[tcp,postgres,5432])=0`

Teste manual:
`nc -zv localhost 5432`

Interpretação:
- succeeded → banco ativo  
- failed → banco indisponível  

---

## 🟡 DB-02 — Uso alto de disco (P2)

O que significa: consumo de armazenamento acima do nível seguro.

Trigger:
`last(/PostgreSQL/vfs.fs.size[/,pused])>85`

Teste manual:
`df -h`

Interpretação:
- abaixo de 85% → operação normal  
- acima de 85% → condição de alerta  

---

## 🌐 NGINX-01 — Entrada do sistema fora do ar (P1)

O que significa: o ponto de entrada do sistema não responde.

Trigger:
`nodata(/Nginx/nginx.http.check,1m)=1`

Teste manual:
`curl -I https://localhost`

Interpretação:
- responde → sistema operacional  
- sem resposta → falha crítica  

---

## 📡 MON-01 — Monitoramento fora do ar (P3)

O que significa: perda de visibilidade da camada de monitoramento.

Trigger:
`nodata(/Zabbix server/agent.ping,3m)=1`

Teste manual:
`docker ps | grep zabbix-server`

Interpretação:
- ativo → monitoramento operacional  
- parado → indisponibilidade da camada de observabilidade  

---

## 🎯 Conclusão

Este documento descreve a implementação do Zabbix aplicada ao ambiente de monitoramento de multisserviços.

A estrutura permite a detecção padronizada de falhas nos principais componentes da arquitetura, garantindo consistência entre métricas, regras de alerta e validação operacional.