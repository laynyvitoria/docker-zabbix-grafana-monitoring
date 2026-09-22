# Docker Zabbix Grafana Monitoring

> Laboratório prático de infraestrutura, monitoramento e operação de ambientes conteinerizados, desenvolvido para explorar na prática a relação entre aplicação, infraestrutura, redes, observabilidade e resposta a incidentes.

![Docker](https://img.shields.io/badge/Docker-Containerization-blue)
![Zabbix](https://img.shields.io/badge/Zabbix-Monitoring-red)
![Grafana](https://img.shields.io/badge/Grafana-Observability-orange)
![Nginx](https://img.shields.io/badge/Nginx-Reverse%20Proxy-green)
![Node.js](https://img.shields.io/badge/Node.js-Backend-brightgreen)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)

📌 Visão geral
Este projeto implementa um ambiente de multisserviços executado em Docker, integrado a uma estrutura de monitoramento e observabilidade utilizando Zabbix e Grafana.
O ambiente foi desenvolvido como um laboratório prático para estudar a relação entre infraestrutura, aplicação, redes, monitoramento e operação de serviços.
A arquitetura utiliza redes Docker isoladas para separar as diferentes camadas do ambiente, enquanto o Zabbix realiza a coleta e avaliação das condições dos serviços monitorados e o Grafana fornece a visualização das métricas.
Além da implementação da infraestrutura e do monitoramento, o projeto contempla a simulação controlada de falhas e a documentação dos incidentes gerados durante os testes.

🎯 Objetivos
Praticar a construção de ambientes conteinerizados com Docker.
Implementar segmentação de redes entre diferentes camadas da aplicação.
Utilizar Nginx como Reverse Proxy.
Monitorar serviços utilizando Zabbix.
Visualizar métricas e indicadores utilizando Grafana.
Definir critérios de SLA e criticidade para os serviços.
Criar itens e triggers para detecção de falhas.
Simular falhas controladas no ambiente.
Observar a detecção e recuperação dos serviços.
Documentar incidentes e suas respectivas tratativas.

🏗️ Arquitetura
O ambiente é executado em um Docker Host e organizado em três redes virtuais:
`public-net` — camada de entrada;
`app-net` — camada de aplicação;
`backend-net` — camada de dados e serviços internos.
O Nginx atua como Reverse Proxy e recebe as requisições destinadas à aplicação, encaminhando-as para os serviços internos.
O Zabbix realiza o monitoramento dos componentes do ambiente, enquanto o Grafana é utilizado para visualização das métricas coletadas.
Arquitetura do ambiente
<p align="center">
  <img src="1-arquitetura/Multi-Service%20Environment%20Monitoring.png"
       alt="Arquitetura do ambiente de monitoramento"
       width="600"
       height="708">
</p>
<p align="center">
  <em>Figura 1 — Topologia lógica da arquitetura.</em>
</p>
A especificação da arquitetura, incluindo a divisão das redes, componentes e fluxos de comunicação, está documentada em:
📂 `1-arquitetura`

📊## 📊 Monitoramento e observabilidade

O monitoramento do ambiente é realizado pelo Zabbix, responsável pela coleta de dados e avaliação das condições dos serviços.

O Grafana é utilizado como camada de visualização, permitindo acompanhar indicadores de disponibilidade e desempenho do ambiente.

Entre os serviços monitorados estão:

- Nginx
- App Web
- PostgreSQL
- Zabbix Server

A documentação do monitoramento está organizada em três partes:

| Documento | Descrição |
|---|---|
| `1-slas` | Regras de SLA e critérios de criticidade |
| `2-catalogo-alertas` | Catálogo e padronização dos alertas |
| `3-implementacao-zabbix` | Implementação dos itens, triggers e validações no Zabbix |

---

## 🚨 Simulação de incidentes

Com a infraestrutura e o monitoramento configurados, o projeto utiliza falhas controladas para validar o comportamento do ambiente diante de diferentes situações de indisponibilidade ou degradação.

O fluxo operacional utilizado nas simulações é:

    Falha controlada
          ↓
    Detecção pelo Zabbix
          ↓
    Trigger
          ↓
    Problem
          ↓
    Análise do impacto
          ↓
    Tratamento
          ↓
    Recuperação
          ↓
    Validação

Cada incidente é documentado individualmente, registrando o cenário, a falha simulada, a detecção, o impacto observado, as ações realizadas e o resultado da recuperação.

Os incidentes estão organizados em:

📂 `3-incidentes`

---

## 🔄 Ciclo operacional

O projeto busca representar, em ambiente controlado, um ciclo simplificado de operação de infraestrutura:

    Infraestrutura
          ↓
    Monitoramento
          ↓
    Detecção
          ↓
    Alerta
          ↓
    Incidente
          ↓
    Tratamento
          ↓
    Recuperação
          ↓
    Validação

Dessa forma, o laboratório conecta a implementação técnica dos serviços à observação de seu comportamento e à resposta diante de falhas.

---

## 📁 Estrutura do projeto

    docker-zabbix-grafana-monitoring/
    │
    ├── 1-arquitetura/
    │   └── Documentação da arquitetura
    │
    ├── 2-monitoramento/
    │   ├── 1-slas/
    │   ├── 2-catalogo-alertas/
    │   └── 3-implementacao-zabbix/
    │
    ├── 3-incidentes/
    │   ├── INCIDENTE-1/
    │   │   └── INC-001.md
    │   ├── INCIDENTE-2/
    │   │   └── INC-002.md
    │   ├── INCIDENTE-3/
    │   │   └── INC-003.md
    │   ├── INCIDENTE-4/
    │   │   └── INC-004.md
    │   ├── INCIDENTE-5/
    │   │   └── INC-005.md
    │   └── README.md
    │
    ├── app/
    │   └── Aplicação Web
    │
    ├── app-backend/
    │   └── Backend da aplicação
    │
    ├── nginx/
    │   └── Configuração do Reverse Proxy
    │
    ├── docker-compose.yml
    ├── .env.example
    ├── .gitignore
    └── LICENSE

---

## 🛠️ Tecnologias utilizadas

### Infraestrutura

- Docker
- Docker Compose
- Nginx
- PostgreSQL

### Monitoramento e observabilidade

- Zabbix
- Grafana

### Aplicação

- Node.js
- Nginx
- HTML

### Ambiente

- Windows
- Docker Desktop

---

## ▶️ Execução

### Pré-requisitos

- Docker Desktop instalado;
- Docker Compose disponível;
- arquivo `.env` configurado a partir do `.env.example`.

### Inicialização

Clone o repositório:

    git clone https://github.com/laynyvitoria/docker-zabbix-grafana-monitoring.git

Acesse o diretório:

    cd docker-zabbix-grafana-monitoring

Configure as variáveis de ambiente:

    cp .env.example .env

Inicie os serviços:

    docker compose up -d

Verifique os containers:

    docker ps

Após a inicialização, os serviços podem ser acessados e validados conforme a documentação específica do projeto.

---

## 📚 Documentação

- 🏗️ [Arquitetura](1-arquitetura/)
- 📊 [Monitoramento](2-monitoramento/)
- 🚨 [Incidentes](3-incidentes/)

---

## 📄 Licença

Este projeto está disponível sob a licença MIT.