# 🚨 Catálogo de Alertas

Este documento define os alertas utilizados para identificar condições de indisponibilidade, degradação e risco operacional no ambiente monitorado.

Os alertas são derivados dos requisitos de nível de serviço definidos anteriormente. Cada um representa uma condição observável que, quando identificada, indica um desvio em relação ao comportamento esperado de determinado serviço.

A definição segue a relação:

```text
Serviço → Indicador → Condição → Impacto → Severidade → Ação
```

A implementação técnica dessas condições é documentada posteriormente no Zabbix.

---

## 🧠 Estrutura dos códigos de alerta

Cada alerta possui um código padronizado para facilitar sua identificação e associação ao serviço afetado.

Exemplo: `APP-01`

O código é composto por:

### Prefixo
Identifica a camada do ambiente relacionada ao alerta:
* **NGINX** — camada de entrada
* **APP** — camada de aplicação
* **DB** — camada de dados

### Número
Identifica o tipo de condição monitorada:
* **01** — indisponibilidade
* **02** — degradação ou risco operacional

A numeração organiza os alertas dentro de cada camada. A severidade é definida separadamente, considerando o impacto operacional da condição.

---

## 🎯 Como os alertas são definidos

Um alerta deve representar uma condição operacional relevante para o ambiente. Sua definição considera:

* O serviço que deve ser observado;
* O comportamento esperado;
* O indicador utilizado para observar esse comportamento;
* A condição que caracteriza um desvio;
* O impacto causado pelo desvio;
* A severidade atribuída à condição;
* A ação inicial esperada.

Essa estrutura permite diferenciar uma indisponibilidade de uma degradação de desempenho ou de uma condição que representa risco futuro.

---

# 🌐 Nginx — Camada de Entrada

O Nginx atua como ponto de entrada da aplicação e como reverse proxy para os serviços internos. Sua disponibilidade é relevante porque uma falha nessa camada compromete o acesso ao fluxo de entrada da aplicação.

## 🔴 NGINX-01 — Nginx indisponível

O alerta identifica a indisponibilidade do Nginx.

* **Indicador:** disponibilidade do serviço
* **Condição:** Nginx deixa de responder
* **Severidade:** P1
* **Impacto:** indisponibilidade do ponto de entrada da aplicação
* **Ação inicial:** verificar o serviço Nginx e sua comunicação com as redes utilizadas pelo ambiente.

A condição representa uma falha de disponibilidade da camada de entrada e, por isso, possui prioridade operacional elevada.

---

# ⚙️ App Web — Camada de Aplicação

O App Web é responsável pela disponibilização da aplicação ao usuário. Sua disponibilidade é observada separadamente do Nginx para permitir distinguir uma falha no ponto de entrada de uma falha no próprio serviço de aplicação.

## 🔴 APP-01 — Aplicação indisponível

O alerta identifica a indisponibilidade do App Web.

* **Indicador:** disponibilidade da aplicação
* **Condição:** App Web deixa de responder
* **Severidade:** P1
* **Impacto:** indisponibilidade da aplicação para acesso
* **Ação inicial:** verificar o serviço App Web e suas condições de comunicação.

A indisponibilidade do App Web representa perda direta do serviço de aplicação, justificando sua classificação como condição crítica.

---

## 🟡 APP-02 — Lentidão da aplicação

A disponibilidade da aplicação não é suficiente para representar seu comportamento operacional. Um serviço pode permanecer acessível e, ainda assim, apresentar aumento no tempo necessário para responder às requisições. Por isso, o ambiente também acompanha o comportamento de resposta da camada de aplicação.

O alerta `APP-02` representa uma condição de degradação associada ao tempo de resposta da aplicação.

* **Indicador:** tempo de resposta
* **Condição:** tempo de resposta superior a 3 segundos
* **Severidade:** P2
* **Impacto:** degradação do desempenho da aplicação
* **Ação inicial:** investigar o comportamento da aplicação e as possíveis causas do aumento do tempo de resposta.

No ambiente, o acompanhamento de resposta contempla tanto o **App Backend**, por meio do indicador `Backend Response Time`, quanto o teste de resposta HTTP do **App Web**. Ambos representam a mesma condição operacional: identificar lentidão da aplicação.

O alerta não representa uma aplicação indisponível. Ele representa uma aplicação que continua respondendo, mas apresenta desempenho acima do limite operacional definido.

---

# 🗄️ PostgreSQL — Camada de Dados

O PostgreSQL representa a camada de persistência utilizada pelo ambiente de monitoramento. A observação dessa camada considera tanto sua disponibilidade quanto a utilização do armazenamento. Dessa forma, o monitoramento contempla uma falha efetiva do serviço e uma condição que pode representar risco de indisponibilidade.

## 🔴 DB-01 — PostgreSQL indisponível

O alerta identifica a indisponibilidade do PostgreSQL.

* **Indicador:** disponibilidade do banco de dados
* **Condição:** PostgreSQL deixa de responder
* **Severidade:** P1
* **Impacto:** indisponibilidade da camada de dados e comprometimento dos serviços que dependem dela
* **Ação inicial:** verificar o serviço PostgreSQL, sua conectividade e a camada de persistência.

A condição é tratada como indisponibilidade porque representa a perda de uma dependência fundamental do ambiente.

---

## 🟡 DB-02 — Uso elevado de disco

A disponibilidade do PostgreSQL também depende da capacidade disponível para armazenamento. O acompanhamento da utilização do disco permite identificar uma condição de risco antes que o espaço disponível seja completamente consumido.

* **Indicador:** utilização do armazenamento
* **Condição:** utilização atinge 85%
* **Severidade:** P2
* **Impacto:** redução da capacidade disponível e risco de comprometimento futuro do serviço
* **Ação inicial:** analisar o consumo de armazenamento e avaliar a necessidade de intervenção.

Diferentemente de `DB-01`, este alerta não representa uma indisponibilidade já estabelecida. Ele identifica uma condição de risco que pode exigir intervenção antes da ocorrência de uma falha.

---

# 📋 Visão consolidada

| Código | Serviço | Indicador | Condição | Severidade | Impacto |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `NGINX-01` | Nginx | Disponibilidade | Serviço indisponível | P1 | Ponto de entrada indisponível |
| `APP-01` | App Web | Disponibilidade | Aplicação indisponível | P1 | Aplicação inacessível |
| `APP-02` | App Web / App Backend | Tempo de resposta | > 3 segundos | P2 | Degradação do desempenho |
| `DB-01` | PostgreSQL | Disponibilidade | Banco indisponível | P1 | Camada de dados indisponível |
| `DB-02` | PostgreSQL | Uso de armazenamento | 85% de utilização | P2 | Risco de comprometimento do serviço |

---

# 🔄 Relação entre alerta e operação

O alerta representa a identificação de uma condição anormal. A partir dele, a operação deve avaliar o impacto, investigar a causa e determinar a ação necessária.

O fluxo esperado é:

```text
Condição anormal → Alerta → Análise → Diagnóstico → Tratamento → Recuperação → Validação
```

Essa distinção é importante porque o alerta não representa, por si só, todo o incidente. Ele constitui o mecanismo de identificação de uma condição que pode exigir intervenção operacional.

---

## Próxima etapa

Com as condições de alerta definidas, a próxima etapa documenta como elas são implementadas no Zabbix.

Nessa etapa são apresentados os mechanisms utilizados para cada alerta, incluindo hosts, itens, coleta, processamento dos dados e triggers.

➡️ **[3 — Implementação Zabbix](../3-implementacao-zabbix/README.md)**