📄 Relatório de Execução (rascunho)



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



próximas etapas previstas:

definição final e revisão dos triggers no Zabbix real

simulação de incidentes no ambiente

implementação prática do Zabbix (configuração real da ferramenta)

consolidação do relatório final do projeto

