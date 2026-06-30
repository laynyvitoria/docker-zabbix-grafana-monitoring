# 📄 Relatório de Execução (rascunho)


- criação das redes Docker (public-net, app-net, backend-net)
- definição da arquitetura do ambiente multi-serviços
- criação inicial do docker-compose.yml
- subida dos containers (Nginx, App Web, Zabbix, PostgreSQL, Grafana)
- erro de variáveis de ambiente (containers não subiram corretamente)
- análise de logs dos containers para identificar falhas
- correção do arquivo YAML (docker-compose.yml)
- ajuste de variáveis de ambiente
- recriação completa do ambiente Docker
- validação da comunicação entre containers
- teste de acesso ao Nginx (ponto de entrada do sistema)
- verificação do funcionamento básico da App Web
- validação da conexão entre Zabbix e serviços monitorados
- verificação do PostgreSQL como base de persistência
- acesso inicial ao Grafana
- organização inicial da estrutura para documentação (GitHub)

SLAs definidos (fase atual do projeto):
- Website: 99%
- Banco de dados: 99%
- Monitoramento: 95%

próximas etapas previstas:
- definição de catálogo de alertas
- simulação de incidentes
- consolidação do relatório final do projeto