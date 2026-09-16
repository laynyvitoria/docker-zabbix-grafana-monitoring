

# Docker Zabbix Grafana Monitoring



> Laboratório prático de infraestrutura, monitoramento e operação de ambientes conteinerizados, desenvolvido para explorar na prática a relação entre aplicação, infraestrutura, redes, observabilidade e resposta a incidentes.



![Docker](https://img.shields.io/badge/Docker-Containerization-blue)
![Zabbix](https://img.shields.io/badge/Zabbix-Monitoring-red)
![Grafana](https://img.shields.io/badge/Grafana-Observability-orange)
![Nginx](https://img.shields.io/badge/Nginx-Reverse%20Proxy-green)
![Node.js](https://img.shields.io/badge/Node.js-Backend-brightgreen)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)



---



## 📋 Resumo executivo



Este projeto foi desenvolvido como um laboratório prático para estudar e aplicar conceitos de \*\*infraestrutura, redes, monitoramento, observabilidade e operação\*\* em um ambiente conteinerizado.



O ambiente foi construído utilizando \*\*Docker Compose\*\* e organizado em diferentes camadas de rede, separando responsabilidades entre acesso externo, aplicação e componentes de infraestrutura.



A aplicação é composta por um serviço web, um backend auxiliar em \*\*Node.js\*\* e uma camada de infraestrutura formada por \*\*PostgreSQL, Zabbix e Grafana\*\*. O \*\*Nginx\*\* atua como ponto de entrada e reverse proxy, direcionando as requisições para os serviços internos da aplicação.



O backend auxiliar foi desenvolvido deliberadamente para criar condições controladas de teste. Através de endpoints específicos, é possível gerar respostas normais, verificar a saúde da aplicação, simular aumento de latência e produzir erros HTTP 500.



Essa abordagem permite utilizar a própria aplicação como parte do laboratório de monitoramento, criando cenários previsíveis para validar coleta, alertas e comportamento operacional.



Durante a implementação, ocorreu também uma perda de persistência que exigiu a reconstrução do ambiente. Essa experiência trouxe uma necessidade que inicialmente não havia sido considerada: pensar em \*\*backup, recuperação e continuidade dos dados\*\*.



A partir disso, o projeto evoluiu para registrar não apenas a construção da infraestrutura, mas também os incidentes encontrados, as ações realizadas e as evidências obtidas durante a operação.



O resultado é um ambiente que pode ser utilizado para praticar um fluxo operacional semelhante ao encontrado em uma rotina de NOC:



\*\*incidente → alerta → diagnóstico → ação → recuperação\*\*



---



## 🎯 Visão geral



O projeto representa um ambiente distribuído e conteinerizado no qual diferentes componentes possuem responsabilidades específicas e se comunicam através de redes Docker previamente definidas.



A construção foi realizada de forma incremental. A arquitetura foi sendo refinada conforme os serviços eram implementados, os fluxos de comunicação eram testados e novas necessidades eram identificadas.



O objetivo não foi apenas fazer os containers funcionarem, mas compreender a relação entre os componentes e utilizar o ambiente para praticar situações próximas de uma rotina operacional.



### Objetivos do laboratório



- Praticar Docker e Docker Compose

- Trabalhar com redes Docker e segmentação de serviços

- Compreender comunicação entre containers

- Utilizar Nginx como reverse proxy

- Integrar uma aplicação web a uma infraestrutura de monitoramento

- Desenvolver um backend auxiliar para geração de cenários controlados

- Trabalhar com persistência utilizando volumes Docker

- Implementar monitoramento utilizando Zabbix

- Utilizar Grafana para visualização

- Definir indicadores de SLA

- Criar um catálogo de alertas

- Simular incidentes controlados

- Praticar diagnóstico e recuperação

- Registrar evidências dos testes

- Documentar decisões técnicas

- Registrar aprendizados e pontos de evolução



---



## 🔎 O que este projeto demonstra



Mais do que reunir diferentes tecnologias em um único `docker-compose.yml`, este laboratório busca demonstrar a relação entre \*\*desenvolvimento, infraestrutura, monitoramento e operação\*\*.



### 🖥️ Infraestrutura



- Docker

- Docker Compose

- Containers

- Redes Docker

- Segmentação de serviços

- Persistência de dados

- Volumes

- Reverse proxy



### 💻 Aplicação



- Nginx

- Node.js

- Express

- API HTTP

- Health check

- Controle de latência

- Simulação de erros HTTP



### 📊 Monitoramento



- Zabbix Server

- Zabbix Web

- Zabbix Agent

- Coleta de métricas

- Triggers e alertas

- Indicadores de SLA

- Catálogo de alertas

- Grafana



### 🚨 Operação



- Identificação de incidentes

- Recebimento de alertas

- Investigação

- Diagnóstico

- Intervenção

- Recuperação

- Registro de evidências

- Documentação pós-incidente



---



# 🏗️ Arquitetura



A arquitetura final do laboratório foi organizada em três redes Docker:



| Rede | Responsabilidade |

|---|---|

| `public-net` | Camada de exposição externa |

| `app-net` | Comunicação relacionada à aplicação |

| `backend-net` | Componentes de infraestrutura e persistência |




### Comunicação por camada



```text

┌──────────────────────────────────────────────────────────────┐

│                         public-net                                                  │

│                                                                                     │

│                           Nginx                                                     │

│                     Ponto de entrada                                                │
 
└─────────────────────────────┬────────────────────────────────┘

                                         │

                                         │

┌─────────────────────────────▼────────────────────────────────┐

│                           app-net                            │

│                                                              │

│   Nginx ─────────► App Web                                  │

│     │                                                        │

│     ├────────────► App Backend                              │

│     │                                                        │

│     ├────────────► Zabbix Server                            │

│     │                                                        │

│     └────────────► Zabbix Web                               │

│                                                              │

└─────────────────────────────┬────────────────────────────────┘

                                         │

                                         │

┌─────────────────────────────▼────────────────────────────────┐

│                         backend-net                          │

│                                                              │

│   PostgreSQL ◄──────── Zabbix Server                        │

│                              │                               │

│                              ├──── Zabbix Web                │

│                              │                               │

│                              └──── Zabbix Agent              │

│                                                              │

│                           Grafana                            │

│                                                              │

└──────────────────────────────────────────────────────────────┘

```



A configuração detalhada da arquitetura, das redes e dos fluxos de comunicação está disponível em:



*\*→ \[Documentação de arquitetura e topologia](./1-arquitetura/)\*\*



---



# 🔄 Evolução da arquitetura



A arquitetura atual não foi definida integralmente antes da implementação.



O projeto começou com uma representação mais simples dos componentes e foi sendo refinado conforme o ambiente era construído, testado e analisado.



Esse processo permitiu compreender na prática:



- quais componentes eram necessários;

- quais responsabilidades pertenciam a cada serviço;

- quais serviços precisavam se comunicar;

- como organizar os componentes em diferentes redes;

- como representar os fluxos de comunicação;

- quais decisões precisavam ser revistas durante a implementação.



As versões anteriores dos diagramas fazem parte da documentação do processo e ajudam a visualizar a evolução até a arquitetura final.



*\*→ \[Ver evolução da arquitetura](./1-arquitetura/)\*\*



---



# 🧩 Componentes



| Componente | Função |

|---|---|

| \*\*Nginx\*\* | Reverse proxy e ponto de entrada da aplicação |

| \*\*App Web\*\* | Serviço responsável por disponibilizar a aplicação web |

| \*\*App Backend\*\* | API auxiliar e geração de cenários controlados |

| \*\*PostgreSQL\*\* | Banco de dados utilizado pelo Zabbix |

| \*\*Zabbix Server\*\* | Coleta, processamento e geração de alertas |

| \*\*Zabbix Web\*\* | Interface web de gerenciamento e acompanhamento |

| \*\*Zabbix Agent\*\* | Agente utilizado para coleta de informações do ambiente |

| \*\*Grafana\*\* | Visualização dos dados de monitoramento |



---



# ⚙️ Decisões técnicas



Durante a construção do laboratório, algumas decisões foram tomadas para organizar o ambiente, separar responsabilidades e permitir a realização dos testes.



## Segmentação por redes



Os serviços foram distribuídos entre diferentes redes Docker para separar os principais fluxos de comunicação e representar de forma mais clara as diferentes camadas do ambiente.



```text

public-net

   │

   └── Nginx





app-net

   │

   ├── Nginx

   ├── App Web

   ├── App Backend

   ├── Zabbix Server

   └── Zabbix Web





backend-net

   │

   ├── PostgreSQL

   ├── Zabbix Server

   ├── Zabbix Web

   ├── Zabbix Agent

   └── Grafana

```



A separação por redes permite organizar os componentes de acordo com suas responsabilidades e tornar os fluxos de comunicação mais explícitos.



A configuração detalhada está disponível na documentação da arquitetura.



---



## Nginx como reverse proxy



O Nginx foi utilizado como ponto de entrada da aplicação e como responsável pelo direcionamento das requisições para os serviços internos.



O roteamento definido é:



```text

/       → App Web

/api/   → App Backend

```



Dessa forma, o acesso externo à aplicação passa pelo Nginx, enquanto o frontend e o backend permanecem organizados dentro da camada de aplicação.



---



## Backend auxiliar



O ambiente precisava de uma forma controlada de gerar requisições e condições de teste para validar a aplicação e os mecanismos de monitoramento.



Em vez de depender exclusivamente de ferramentas externas para produzir tráfego, foi desenvolvido um backend auxiliar em \*\*Node.js\*\*, aproveitando conhecimentos prévios em desenvolvimento backend.



O backend possui endpoints específicos para:



- verificar a saúde da aplicação;

- gerar respostas normais;

- introduzir atraso controlado;

- produzir erros HTTP 500.



Essa decisão permitiu integrar desenvolvimento e infraestrutura dentro do mesmo laboratório.



O backend deixou de ser apenas uma aplicação de apoio e passou a funcionar como uma ferramenta para geração controlada de cenários operacionais.



---



## Persistência



O PostgreSQL utiliza um volume Docker para persistência:



```yaml

volumes:

 pg\_data:

```



Durante a implementação, ocorreu uma perda de persistência que exigiu a reconstrução do ambiente.



Essa experiência foi incorporada ao processo de aprendizado e evidenciou uma questão importante: a existência de persistência local não significa, por si só, a existência de uma estratégia de backup e recuperação.



A partir dessa experiência, a documentação passou a registrar o comportamento observado, a reconstrução realizada e os pontos que deverão ser considerados em uma evolução futura.



---



# 📊 Monitoramento



O monitoramento foi estruturado utilizando \*\*Zabbix\*\* para coleta e geração de alertas e \*\*Grafana\*\* para visualização dos dados.



A documentação foi organizada em três partes principais:



```text

2-monitoramento/

│

├── 1-slas/

│

├── 2-catalogo-alertas/

│

└── 3-zabbix/

```



---



## 📏 SLAs



Foram definidos indicadores de SLA para estabelecer objetivos de disponibilidade dos serviços monitorados.



A definição dos indicadores serve como referência para interpretar o comportamento do ambiente e relacionar os eventos observados aos objetivos de disponibilidade estabelecidos para o laboratório.



*\*→ \[Documentação dos SLAs](./2-monitoramento/1-slas/)\*\*



---



## 🔔 Catálogo de alertas



Os alertas foram organizados em um catálogo para documentar os cenários monitorados.



O catálogo registra, conforme aplicável:



- condição monitorada;

- serviço relacionado;

- gatilho;

- severidade;

- comportamento esperado;

- resposta associada ao cenário.



*\*→ \[Catálogo de alertas](./2-monitoramento/2-catalogo-alertas/)\*\*



---



## 🖥️ Implementação do Zabbix



A implementação do monitoramento utilizando Zabbix está documentada separadamente.



Essa documentação apresenta as configurações utilizadas para coleta, monitoramento e geração dos alertas utilizados no laboratório.



*\*→ \[Implementação do Zabbix](./2-monitoramento/3-zabbix/)\*\*



---



# 🚨 Simulação de incidentes



Uma das principais etapas do laboratório é utilizar o ambiente para reproduzir situações controladas e acompanhar o comportamento dos serviços através do monitoramento.



O fluxo praticado é:



```text

┌──────────────┐

│   Incidente  │

└──────┬───────┘

          │

          ▼

┌──────────────┐

│    Alerta    │

└──────┬───────┘

          │

          ▼

┌──────────────┐

│  Diagnóstico │

└──────┬───────┘

          │

          ▼

┌──────────────┐

│     Ação     │

└──────┬───────┘

         │

         ▼

┌──────────────┐

│  Recuperação │

└──────────────┘

```



A intenção é praticar o ciclo operacional completo, desde a geração ou ocorrência de uma condição anormal até a validação da recuperação.



Cada incidente pode ser documentado considerando:



- cenário;

- condição inicial;

- comportamento esperado;

- comportamento observado;

- alerta gerado;

- investigação;

- diagnóstico;

- ação realizada;

- resultado;

- evidências.



*\*→ \[Ver simulações de incidentes](./3-simulação-de-incidentes/)\*\*



---



# 🧪 Cenários de teste



O backend auxiliar disponibiliza endpoints específicos para gerar condições controladas.



\## Health check



```http

GET /api/health

```



Retorna o estado atual da aplicação.



Exemplo:



```json

{

&#x20; "status": "UP",

&#x20; "service": "app-backend"

}

```



\---



\## Simulação de lentidão



```http

GET /api/slow?delay=5000

```



Permite controlar o tempo de resposta da aplicação.



Por exemplo:



```http

GET /api/slow?delay=10000

```



produz uma resposta após aproximadamente 10 segundos.



Esse endpoint permite criar condições controladas para observar o comportamento do monitoramento diante do aumento de latência.



---



## Simulação de erro HTTP 500



```http

GET /api/error

```



Retorna HTTP 500 com uma mensagem de erro simulada.



Exemplo:



```json

{

 "status": "ERROR",

 "message": "Erro interno simulado para teste de monitoramento"

}

```



Esses endpoints foram desenvolvidos especificamente para o laboratório e permitem reproduzir cenários previsíveis sem depender de falhas aleatórias.



\---



\# 💾 Persistência e recuperação



A persistência foi um dos pontos que mais contribuíram para a evolução do laboratório.



Inicialmente, o foco estava na construção e funcionamento do ambiente.



Durante a implementação, ocorreu uma perda de persistência que exigiu a reconstrução dos componentes.



A experiência permitiu observar, na prática, a diferença entre:



- executar novamente os serviços;

- recuperar a infraestrutura;

- recuperar os dados;

- possuir uma estratégia de backup;

- possuir uma estratégia de recuperação.





---



# 📁 Estrutura do projeto



```text

docker-zabbix-grafana-monitoring/

│

├── 1-arquitetura/

│   ├── Multi-Service Environment Monitoring-v7vf.png/

│   └── README.md/

│

├── 2-monitoramento/

│   ├── 1-slas/README.md

│   ├── 2-catalogo-alertas/README.md

│   ├── 3-zabbix/README.md

│   

│

├── 3-simulação-de-incidentes/

│   ├── incidente-01/

│   ├── incidente-02/

│   └── ...

│

├── 4-relatorio-de-execução/

│   └── 

│

├── app/

│

├── app-backend/

│

├── nginx/

│   └── default.conf

│

├── docker-compose.yml

│

├── .env.example

│

└── README.md

```



> A estrutura acima representa a organização do projeto. Cada diretório possui documentação específica quando necessário, enquanto este README funciona como porta de entrada para o laboratório.



\---



# 🔧 Como executar



## Pré-requisitos



Antes de iniciar o ambiente, é necessário possuir:



- Docker

- Git



---



## 1. Clone o repositório



```bash

git clone <https://github.com/laynyvitoria/docker-zabbix-grafana-monitoring.git>

cd docker-zabbix-grafana-monitoring

```



---



## 2. Configure as variáveis de ambiente



Crie o arquivo `.env` utilizando o arquivo de exemplo:



```bash

cp .env.example .env

```



Preencha as variáveis necessárias antes de iniciar o ambiente.



> O arquivo `.env` não deve ser versionado quando contiver credenciais ou outras informações sensíveis.



---



## 3. Inicie os serviços



```bash

docker compose up -d

```



---



## 4. Verifique o estado dos containers



```bash

docker compose ps

```



\---



## 5. Consulte os logs



Para acompanhar os logs do ambiente:



```bash

docker compose logs -f

```



Para consultar um serviço específico:



```bash

docker compose logs -f <nome-do-servico>

```



---



## 6. Encerre o ambiente



```bash

docker compose down

```



> A remoção dos containers não implica automaticamente na remoção dos volumes Docker utilizados para persistência.



---



# 🌐 Acesso aos serviços



Após a inicialização do ambiente, os principais serviços podem ser acessados pelas portas configuradas no Docker Compose.



| Serviço | Endereço |

|---|---|

| Aplicação | `http://localhost` |

| Zabbix Web | `http://localhost:8080` |

| Grafana | `http://localhost:3000` |



---




# 🧠 Aprendizados



Este laboratório foi construído como um processo de aprendizado prático.



Ao longo da implementação, conceitos inicialmente estudados de forma separada passaram a fazer parte de um único ambiente:



```text

Docker

  ↓

Redes

  ↓

Aplicação

  ↓

Monitoramento

  ↓

Alertas

  ↓

Incidentes

  ↓

Diagnóstico
  ↓

Recuperação

  ↓

Documentação

```



Um dos principais aprendizados foi perceber que infraestrutura não envolve apenas colocar serviços para funcionar.



Também é necessário compreender:



- como os componentes se comunicam;

- quais responsabilidades pertencem a cada camada;

- como organizar os serviços;

- como detectar comportamentos anormais;

- como interpretar alertas;

- como investigar uma falha;

- como executar uma intervenção;

- como validar uma recuperação;

- como preservar os dados;

- como registrar o que aconteceu;

- quais mecanismos precisam existir para reduzir o impacto de novas falhas.



A perda de persistência ocorrida durante o desenvolvimento foi especialmente importante nesse processo.



O problema deixou de ser apenas uma dificuldade de implementação e passou a representar uma necessidade real de infraestrutura: pensar em \*\*backup, recuperação e continuidade dos dados\*\*.



---



# 🔗 Integração entre desenvolvimento, infraestrutura e operação



Uma característica importante deste projeto foi a integração entre conhecimentos de desenvolvimento e infraestrutura.



O backend auxiliar não foi criado como uma aplicação independente do laboratório.



Ele existe para atender uma necessidade da própria infraestrutura:



\*\*gerar condições controladas para que o monitoramento possa ser validado.\*\*



Dessa forma, o projeto conecta diferentes áreas:



```text

┌─────────────────────────┐

│     DESENVOLVIMENTO              │

│                                  │

│ Node.js                          │

│ API                              │

│ HTTP                             │

└────────────┬────────────┘

&#x20;            │

&#x20;            ▼

┌─────────────────────────┐

│     INFRAESTRUTURA               │

│                                  │

│ Docker                           │

│ Redes                            │

│ Nginx                            │

│ PostgreSQL                       │

└────────────┬────────────┘

                  │

                  ▼

┌─────────────────────────┐

│       OPERAÇÃO                   │

│                                  │

│ Zabbix                           │

│ Grafana                          │

│ Alertas                          │

│ Incidentes                       │

│ Recuperação                      │

└─────────────────────────┘

```



Essa integração permite enxergar o ambiente como um sistema, em vez de tratar cada tecnologia de forma isolada.



---



\# 🧭 Fluxo operacional praticado



O laboratório foi estruturado para permitir a prática de um fluxo operacional completo:



```text

1. GERAR OU REPRODUZIR CONDIÇÃO

               │

               ▼

2. OBSERVAR O COMPORTAMENTO

               │

               ▼

3. IDENTIFICAR O ALERTA

               │
               ▼

4. INVESTIGAR

               │

               ▼

5. DIAGNOSTICAR

               │

               ▼

6. EXECUTAR AÇÃO

               │

               ▼

7. VALIDAR A RECUPERAÇÃO

               │

               ▼

8. REGISTRAR EVIDÊNCIAS

```



Esse fluxo aproxima o laboratório de uma rotina de operação e monitoramento, permitindo praticar não apenas a configuração das ferramentas, mas também o processo de resposta a eventos.



---



# 🗺️ Mapa do projeto



```text

Docker Zabbix Grafana Monitoring

│

├── Arquitetura

│   ├── Topologia

│   ├── Redes

│   ├── Componentes

│   └── Evolução

│

├── Monitoramento

│   ├── SLAs

│   ├── Catálogo de alertas

│   └── Implementação Zabbix

│

├── Incidentes

│   ├── Cenários

│   ├── Alertas

│   ├── Diagnóstico

│   ├── Ações

│   └── Recuperação

│

├── Persistência

│   ├── Volume

│   ├── Perda

│   ├── Reconstrução

│   └── Recuperação

│

└── Execução

   ├── Docker Compose

   ├── Aplicação

   ├── Zabbix

   └── Grafana

```



\---



# 🎓 O que este laboratório representa



Este projeto foi desenvolvido como uma experiência de aprendizado baseada em construção, experimentação e resolução de problemas.



A proposta foi sair da teoria e construir um ambiente no qual fosse possível:



*\*construir → testar → observar → quebrar → investigar → recuperar → documentar → evoluir\*\*



Durante esse processo, problemas reais de implementação também se tornaram parte do aprendizado.



A perda de persistência, por exemplo, não foi apenas um obstáculo para fazer o ambiente voltar a funcionar. Ela trouxe uma nova questão para o projeto e ajudou a ampliar a visão sobre infraestrutura, levando à discussão de backup, recuperação e continuidade.



Por isso, o resultado deste laboratório não é apenas um conjunto de containers funcionando.



É também o registro de um processo de evolução.


---



# 🧠 Principais aprendizados



Ao finalizar este laboratório, os principais conceitos trabalhados foram:



### Infraestrutura



- Containerização

- Docker Compose

- Redes Docker

- Comunicação entre containers

- Persistência

- Reverse proxy

- Organização de serviços



### Monitoramento



- Zabbix

- Agentes

- Coleta

- Triggers

- Alertas

- SLAs

- Visualização com Grafana



### Operação



- Observação do ambiente

- Identificação de incidentes

- Diagnóstico

- Intervenção

- Recuperação

- Registro de evidências



### Engenharia de ambiente



- Separação de responsabilidades

- Evolução arquitetural

- Testes controlados

- Documentação técnica

- Pensamento orientado a falhas

- Identificação de necessidades de recuperação



---



# 🚀 Continuação



Este projeto representa o primeiro passo de uma sequência de laboratórios voltados à evolução em \*\*Cloud, Infraestrutura, Monitoramento e Operações\*\*.




A construção deste primeiro ambiente fornece a base conceitual para a próxima etapa: entender como os componentes que hoje são configurados e executados localmente podem ser transformados em uma infraestrutura automatizada, reproduzível e provisionada através de código.

---

# 👩‍💻 Sobre o projeto



Este laboratório faz parte da minha jornada de aprendizado em \*\*Cloud, Infraestrutura, Monitoramento e Operações\*\*.



A proposta foi aprender construindo, testando, investigando, reconstruindo e documentando.



O projeto reúne desenvolvimento backend, infraestrutura conteinerizada e monitoramento em um único ambiente, permitindo estudar não apenas cada tecnologia individualmente, mas também a relação entre elas.



O objetivo é continuar evoluindo essa base até chegar a ambientes cada vez mais automatizados e próximos das práticas utilizadas em infraestrutura e cloud.



---



# 📌 Em uma frase



> \*\*Um laboratório construído para transformar conceitos de infraestrutura e monitoramento em experiência prática de operação.\*\*



---



## 💎 Projeto 1



*\*Docker Zabbix Grafana Monitoring\*\*



Construir.  

Entender.  

Monitorar.  

Operar.



### ↓



## ☁️ Projeto 2



*\*Infraestrutura automatizada em AWS\*\*



Provisionar.  

Automatizar.  

Evoluir.

````



