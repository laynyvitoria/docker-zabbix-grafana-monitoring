# 🚨 INC-001 — Indisponibilidade do App Web
## Relatório de Simulação de Incidente

**Ambiente:** Docker | Zabbix | Grafana

---

## 📋 Identificação do Incidente

| Campo               | Informação                   |
| ------------------- | ---------------------------- |
| **ID**              | INC-001                      |
| **Incidente**       | Indisponibilidade do App Web |
| **Serviço afetado** | `app-web`                    |
| **Ambiente**        | Docker                       |
| **Monitoramento**   | Zabbix                       |
| **Observabilidade** | Grafana                      |
| **Status**          | ✅ Resolvido                  |

---

## 🎯 Objetivo da Simulação

Validar o comportamento do ecossistema de monitoramento diante da interrupção do serviço `app-web`.

**Métricas avaliadas:**
* Detecção de indisponibilidade pelo Zabbix.
* Geração do alerta (*Problem*).
* Visualização do incidente no Grafana.
* Comportamento do container e posterior recuperação.

---

## 🟢 1. Estado Inicial do Ambiente

Antes da simulação, a infraestrutura operava com estabilidade absoluta.

### Evidências de Normalidade:

![Containers Docker em estado normal](evidencias/containers-docker-ok.png)

---

### Monitoramento Inicial (Zabbix)

![Zabbix em estado normal](evidencias/zabbix-ok.png)

---

### Observabilidade Inicial (Grafana)

![Grafana em estado normal](evidencias/grafana-ok.png)

---

## 💥 2. Falha Simulada

A indisponibilidade foi provocada de forma controlada interrompendo o container da aplicação:

```bash
docker stop app-web
```

O comando foi executado registrando o horário exato da janela de simulação.

### Registro da Ação:
![Comando utilizado para interromper o app-web](evidencias/falha-stop-appweb.png)

---

## 🔴 3. Detecção do Incidente

O container `app-web` passou imediatamente para o estado interrompido.

![App Web indisponível](evidencias/docker-appweb-indisponivel.png)

---

### Alerta Gerado no Zabbix

O Zabbix identificou a queda em poucos segundos e abriu uma trigger de **Problem**.

![Problem de indisponibilidade da aplicação](evidencias/problem-zabbix-aplicação-indisponivel.png)

---

### Painel de Incidentes do Grafana

O painel centralizou e refletiu o estado crítico da aplicação.

![App Web indisponível no Grafana](evidencias/grafana-appweb-indisponivel.png)

---

## 🔎 4. Fluxo de Investigação

A análise de correlação validou a integridade das ferramentas de observabilidade:

```text
Interrupção do container (Docker)
       ↓
Indisponibilidade do serviço 
       ↓
Detecção e Alerta (Zabbix Problem)
       ↓
Visualização unificada (Grafana)
```

---

## 🛠️ 5. Tratamento do Incidente

A mitigação consistiu na execução dos procedimentos de recuperação do container:

```bash
docker start app-web
```

### Inicialização do Serviço:
![App Web restaurado no Docker](evidencias/dockerUp-appweb.png)

---

## ✅ 6. Recuperação e Normalização

Após o *start*, o Zabbix automaticamente reconheceu o retorno da aplicação e encerrou o evento de **Problem**.

![Problem resolvido no Zabbix](evidencias/resolved-problem-zabbix.png)

---

### Painel Grafana Normalizado

O ecossistema retornou à cor verde (operacional).

![App Web restaurado no Grafana](evidencias/grafana-appwebRestaurado.png)

---

## 📊 7. Validação Final

Tanto o Zabbix quanto o Grafana retornaram com sucesso ao estado basal esperado.

![Zabbix em estado normal](evidencias/zabbix-ok.png)

---

## 🧾 8. Conclusão

* O fluxo completo de monitoramento e alertas funcionou exatamente como projetado.
* Tempo de detecção e resposta dos alarmes foi validado com sucesso dentro do ambiente de laboratório.

---

