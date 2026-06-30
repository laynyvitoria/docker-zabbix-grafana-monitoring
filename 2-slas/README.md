\## 📊 Regras de SLA e criticidade dos serviços



A definição dos SLAs deste ambiente foi baseada na arquitetura de monitoramento multi-serviços, considerando a função de cada componente dentro do fluxo operacional e seu impacto em caso de indisponibilidade.



Os níveis de serviço foram definidos com base em três critérios principais:



\- Posição do serviço na arquitetura (borda, aplicação, dados, observabilidade)

\- Impacto direto no usuário final

\- Dependência entre componentes do sistema



Além do SLA, cada serviço também é classificado por criticidade operacional, representando o impacto real de falhas no ambiente.



\---



\## 🌐 Website (Nginx + App Web) — SLA: 99% | Criticidade: Alta (P1)



\*\*Justificativa:\*\*



O Nginx representa o único ponto de entrada do sistema, sendo responsável por receber todo o tráfego externo e encaminhá-lo para a aplicação.



A indisponibilidade desta camada implica em perda total de acesso ao sistema, mesmo que todos os serviços internos estejam operacionais.



A aplicação Web depende diretamente desta camada para ser acessível ao usuário final, o que reforça sua criticidade.



\*\*Impacto operacional:\*\*



\- Usuário não consegue acessar o sistema

\- Serviço percebido como “fora do ar”

\- Incidente imediato de prioridade máxima (P1)



\---



\## 🗄️ Banco de Dados (PostgreSQL) — SLA: 99% | Criticidade: Alta (P1 interno)



\*\*Justificativa:\*\*



O PostgreSQL é responsável pela persistência dos dados coletados pelo sistema de monitoramento.



Sua indisponibilidade não impede necessariamente o acesso imediato à interface da aplicação, mas compromete a integridade dos dados, histórico de métricas e confiabilidade da observabilidade.



Por ser um componente estrutural, sua falha afeta todo o funcionamento analítico do sistema.



\*\*Impacto operacional:\*\*



\- Perda de gravação de métricas

\- Inconsistência de histórico

\- Impacto direto em diagnósticos e auditoria

\- Incidente crítico interno (P1)



\---



\## 📡 Sistema de Monitoramento (Zabbix + Grafana) — SLA: 95% | Criticidade: Média (P3)



\*\*Justificativa:\*\*



O Zabbix e o Grafana compõem a camada de observabilidade do ambiente.



Sua indisponibilidade não afeta o funcionamento dos serviços principais, mas reduz a visibilidade do sistema, dificultando detecção de falhas e análise de performance.



Essa camada é considerada de suporte operacional.



\*\*Impacto operacional:\*\*



\- Perda temporária de visibilidade do ambiente

\- Dificuldade de detecção de incidentes

\- Operação continua, porém sem monitoramento ativo

\- Incidente de baixa prioridade (P3)



\---



\## ⚖️ Visão de criticidade do ambiente



A arquitetura segue uma hierarquia clara de impacto operacional:



\- \*\*Camada de borda (Nginx):\*\* impacto imediato no usuário final (P1)

\- \*\*Camada de aplicação (App Web):\*\* serviço principal consumido (P1)

\- \*\*Camada de dados (PostgreSQL):\*\* impacto estrutural e de integridade (P1 interno)

\- \*\*Camada de observabilidade (Zabbix + Grafana):\*\* impacto na visibilidade do sistema (P3)



\---



\## 🧠 Conclusão operacional



Este modelo permite diferenciar não apenas níveis de disponibilidade (SLA), mas também o impacto real de falhas no ambiente (criticidade operacional).



Isso simula um cenário real de NOC, onde:



\- Nem todas as falhas possuem o mesmo impacto

\- A priorização de incidentes depende do serviço afetado

\- A visibilidade do sistema é separada do funcionamento do sistema



Essa estrutura será base para a definição de alertas e severidades no catálogo de monitoramento.

