📄 Relatório de Execução (rascunho) — COMPLEMENTADO



criação das redes Docker (public-net, app-net, backend-net)



definição da arquitetura do ambiente multi-serviços



criação inicial do docker-compose.yml



subida dos containers (Nginx, App Web, Zabbix, PostgreSQL, Grafana)



erro de variáveis de ambiente (containers não subiram corretamente)



análise de logs dos containers para identificar falhas



correção do arquivo YAML (docker-compose.yml)



ajuste de variáveis de ambiente



recriação completa do ambiente Docker



validação da comunicação entre containers



teste de acesso ao Nginx (ponto de entrada do sistema)



verificação do funcionamento básico da App Web



validação da conexão entre Zabbix e serviços monitorados



verificação do PostgreSQL como base de persistência



acesso inicial ao Grafana



organização inicial da estrutura para documentação (GitHub)



definição de SLAs do ambiente (Website 99%, Banco de Dados 99%, Monitoramento 95%)



criação do catálogo de alertas com identificação de serviços e severidades (P1, P2, P3)



estruturação inicial da implementação de monitoramento (Zabbix conceitual com itens, triggers e testes)



diagnóstico e resolução do status unhealthy do container zabbix-web por tempo de espera de sincronismo com o banco de dados



execução de testes de infraestrutura via terminal (PowerShell) validando o status de execução of todos os 6 containers (docker ps)



validação real de chamadas HTTP externas via curl.exe nas portas locais da aplicação (Borda Nginx na porta 80, Zabbix na 8080 e Grafana na 3000 com retorno 302 Found)



teste definitivo de redes internas do Docker rodando comandos de diagnóstico dentro dos containers (pg\_isready no PostgreSQL e requisição HTTP direta de dentro do container nginx para o app-web:80 retornando 200 OK)



início da implementação prática no painel web do Zabbix com a abertura da tela de criação de hosts (Create host) para a aplicação App Web



resolução de inconsistências de campos obrigatórios de rede (como o erro de DNS name vazio) e limpeza de templates de nuvens públicas não utilizados no escopo local

criação do primeiro item de monitoramento HTTP no Zabbix para a App Web (HTTP agent apontando para http://app-web:80)



ajuste do tipo de informação do item para compatibilidade com retorno HTML (evitando erro de tipo numérico)



tentativa inicial incorreta de trigger usando last() para validar disponibilidade



correção da lógica de monitoramento com uso de trigger baseada em ausência de dados (nodata)



criação da trigger:



APP-01 - Aplicação fora do ar

expressão: nodata(/App Web/app.web.check,1m)=1



validação funcional da trigger em cenário real de falha (docker stop app-web)



disparo do evento no Zabbix em Monitoring → Problems



validação de recuperação automática da trigger ao reiniciar o container (docker start app-web)



teste de comunicação entre Nginx e App Web após restart confirmando HTTP 200 OK



validação do comportamento do item em Monitoring → Latest data com retorno HTML correto da aplicação

### &#x09;**-oq falta:**



bld FASE 3 — Configurar ZABBIX



(concluir a criação do host App Web, criar os hosts Nginx e PostgreSQL, criar os itens manuais de checagem e configurar as triggers APP-01, APP-02, DB-01, NGINX-01 para validação de alertas)



bld FASE 4 — SIMULAÇÃO DE FALHAS



(executar os comandos docker stop nos containers e monitorar a reação das triggers na aba Problems)



bld FASE 5 — GRAFANA



(instalação e conexão do datasource via API do Zabbix e montagem do dashboard com uptime, status e response time)



bld FASE 6 — VALIDAR SLA



(criação dos serviços de TI no Zabbix/Grafana para cálculo de indisponibilidade e análise de impacto no negócio)



bld FASE 7 — TESTE COMPLETO



(execução do ciclo completo de NOC do início ao fim com registro de incidente)

