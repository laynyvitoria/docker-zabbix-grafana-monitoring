# 🚨 Catálogo de Alertas

Este documento define os eventos de alerta do ambiente de monitoramento.

---

# 🧠 Entendendo a estrutura dos códigos de alerta

Cada alerta possui um código padronizado para facilitar identificação rápida durante a operação do sistema.

Exemplo: `ALERTA APP-01`

Esse código é dividido em duas partes:

---

## 1. Prefixo (tipo de serviço)

Indica qual camada do sistema está sendo monitorada:

- **NGINX** → Camada de entrada (borda do sistema)
- **APP** → Camada de aplicação (site / serviço principal)
- **DB** → Camada de dados (PostgreSQL)
- **MON** → Camada de monitoramento (Zabbix / Grafana)

---

## 2. Número do alerta

Indica o tipo de problema dentro daquele serviço:

- **01** → falha crítica (serviço fora do ar)
- **02** → degradação ou risco (lentidão, uso alto, etc.)

---

## ⚖️ Exemplo prático

- `APP-01` → aplicação caiu completamente (crítico)
- `APP-02` → aplicação está lenta (degradação)

- `DB-01` → banco fora do ar (crítico)
- `DB-02` → disco quase cheio (risco futuro)

---

## 🎯 Objetivo dessa padronização

Essa estrutura existe para:

- facilitar leitura rápida em ambiente de NOC
- padronizar incidentes
- reduzir tempo de resposta
- organizar prioridades automaticamente (P1, P2, P3)

---

# 🚨 Regras de Alertas

Cada alerta segue a estrutura:

- Serviço afetado  
- Condição de disparo  
- Trigger (regra técnica)  
- Severidade (P1, P2, P3)  
- Impacto operacional  
- Ação esperada  

---

# 🌐 Nginx (Camada de Entrada)

## 🔴 NGINX-01 — Serviço indisponível (P1)

- Condição: não responde na porta 443
- Trigger: HTTP 443 indisponível
- Impacto: sistema totalmente inacessível
- Ação: verificar container e rede

---

# ⚙️ App Web (Aplicação)

## 🔴 APP-01 — Aplicação fora do ar (P1)

- Condição: HTTP 5xx ou timeout
- Trigger: HTTP status = 0 ou >= 500
- Impacto: usuário não consegue acessar o sistema
- Ação: verificar logs e container

## 🟡 APP-02 — Lentidão (P2)

- Condição: tempo de resposta > 3s
- Trigger: tempo médio > 3 segundos
- Impacto: degradação da experiência
- Ação: verificar carga

---

# 🗄️ PostgreSQL (Dados)

## 🔴 DB-01 — Banco indisponível (P1)

- Condição: falha na porta 5432
- Trigger: porta 5432 não responde
- Impacto: perda de persistência
- Ação: verificar container e volume

## 🟡 DB-02 — Disco alto (P2)

- Condição: uso > 85%
- Trigger: uso de disco > 85%
- Impacto: risco de falha
- Ação: limpeza ou expansão

---

# 📡 Monitoramento (Zabbix / Grafana)

## 🟡 MON-01 — Monitoramento indisponível (P3)

- Condição: serviço fora do ar
- Trigger: HTTP indisponível
- Impacto: perda de visibilidade
- Ação: reiniciar serviços