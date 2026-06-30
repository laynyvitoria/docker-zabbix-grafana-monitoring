# 🚨 Catálogo de Alertas

Este documento define os eventos de alerta do ambiente de monitoramento.

Cada alerta segue uma estrutura padrão:

- Serviço afetado
- Condição de disparo
- Severidade (P1, P2, P3)
- Impacto operacional
- Ação esperada

---

# 🌐 Nginx (Camada de Entrada)

## 🔴 ALERTA NGINX-01 — Serviço indisponível
- **Serviço:** Nginx (Reverse Proxy)
- **Condição:** Não responde na porta 443
- **Severidade:** P1
- **Impacto:** Sistema totalmente inacessível externamente
- **Ação:** Verificar container, rede public-net e logs do proxy

---

# ⚙️ App Web (Camada de Aplicação)

## 🔴 ALERTA APP-01 — Aplicação fora do ar
- **Serviço:** App Web
- **Condição:** HTTP 5xx ou timeout
- **Severidade:** P1
- **Impacto:** Usuário não consegue acessar ou utilizar o sistema
- **Ação:** Analisar logs, status do container e dependências

## 🟡 ALERTA APP-02 — Lentidão na aplicação
- **Serviço:** App Web
- **Condição:** Tempo de resposta > 3 segundos
- **Severidade:** P2
- **Impacto:** Degradação da experiência do usuário
- **Ação:** Verificar carga do container e recursos do host

---

# 🗄️ PostgreSQL (Camada de Dados)

## 🔴 ALERTA DB-01 — Banco de dados indisponível
- **Serviço:** PostgreSQL
- **Condição:** Falha de conexão na porta 5432
- **Severidade:** P1
- **Impacto:** Perda de persistência e falha no sistema de dados
- **Ação:** Verificar container e volume persistente (pg_data)

## 🟡 ALERTA DB-02 — Uso elevado de armazenamento
- **Serviço:** PostgreSQL
- **Condição:** Uso de disco > 85%
- **Severidade:** P2
- **Impacto:** Risco de falha futura no armazenamento
- **Ação:** Limpeza de dados ou expansão de volume

---

# 📡 Observabilidade (Zabbix / Grafana)

## 🟡 ALERTA MON-01 — Sistema de monitoramento indisponível
- **Serviço:** Zabbix / Grafana
- **Condição:** Serviço fora do ar
- **Severidade:** P3
- **Impacto:** Perda de visibilidade do ambiente
- **Ação:** Reiniciar serviços de monitoramento