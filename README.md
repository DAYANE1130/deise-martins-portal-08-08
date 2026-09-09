# Portal das Chamas Gêmeas 08/08

## Visão geral

Landing page do evento online e gratuito **Portal das Chamas Gêmeas 08/08**, apresentado por Deise Martins. O projeto divulga o evento, apresenta seu conteúdo e direciona o público para um fluxo de cadastro, pesquisa e acesso ao grupo oficial do WhatsApp.

No estado atual, a página também registra a origem informada por parâmetros UTM, envia dados dos interessados para endpoints do Google Apps Script e acompanha interações selecionadas no Google Analytics 4 (GA4).

## Contexto e problema

O negócio é conduzido de forma independente por uma profissional de terapias. Inicialmente, o processo de divulgação e encaminhamento do público era manual.

A primeira necessidade identificada foi criar um ponto único de divulgação do evento e simplificar o acesso do público ao grupo fechado do WhatsApp, onde o acesso à ativação é liberado. Assim, a primeira versão foi concebida como uma landing page informativa com chamada direta para o grupo.

## Evolução da solução

```text
Processo manual
        ↓
Primeira landing page
Divulgação do Portal 08/08 e acesso direto ao grupo do WhatsApp
        ↓
Novas necessidades observadas
Identificar interessados, entender a origem dos acessos,
coletar respostas e acompanhar etapas do fluxo
        ↓
Solução atual
Landing page + cadastro + pesquisa + origem UTM + registro de ações + GA4
```

O histórico do repositório confirma essa evolução. A versão inicial possuía um botão que levava diretamente ao grupo do WhatsApp. Em mudanças posteriores foram incluídos formulários próprios integrados a endpoints do Google Apps Script, a pesquisa, a identificação de origem, o acompanhamento da ação no WhatsApp e eventos analíticos.

## Análise de requisitos

A evolução foi orientada por necessidades concretas do fluxo do negócio:

| Necessidade identificada | Requisito traduzido na solução | Implementação confirmada |
| --- | --- | --- |
| Centralizar a divulgação do evento | Disponibilizar uma página com informações e chamadas para ação | Seções sobre o evento, a profissional, depoimentos e chamadas de participação |
| Encaminhar participantes ao canal de acesso | Direcionar o público ao grupo oficial | Página de acesso com link, cópia do link e QR Code do grupo do WhatsApp |
| Identificar interessados | Solicitar dados de contato antes das próximas etapas | Modal de cadastro com nome, e-mail e telefone, com validação no navegador |
| Saber de onde veio o acesso | Registrar a origem da visita | Leitura de `utm_source`, com tratamento para Instagram, YouTube e acesso direto |
| Conhecer melhor o público | Coletar respostas estruturadas | Pesquisa com perguntas obrigatórias e opções de resposta |
| Acompanhar o avanço de cada interessado | Associar ações posteriores ao cadastro | ID do lead guardado em `sessionStorage` e atualização dos eventos `whatsapp` e `pesquisa` |
| Observar interações do fluxo | Registrar eventos de conversão | Eventos de cadastro, envio de pesquisa e clique no grupo enviados ao GA4 |

Essa sequência evita tratar recursos atuais como parte da primeira versão: cada adição responde a uma necessidade percebida após a página inicial estar em uso.

## Problema → solução → contribuição para o negócio

| Problema identificado | Solução implementada | Contribuição prática |
| --- | --- | --- |
| Divulgação e direcionamento feitos manualmente | Landing page com informações do Portal e chamadas para participação | Concentra a apresentação do evento e o caminho de acesso em uma única página |
| Dificuldade para registrar contatos interessados | Formulário de nome, e-mail e telefone enviado por `POST` | Cria um registro estruturado antes do acesso às etapas seguintes |
| Falta de contexto sobre a origem dos acessos | Captura de `utm_source` no cadastro | Permite registrar se o acesso foi direto ou informado por uma origem de campanha |
| Necessidade de entender o perfil e as expectativas do público | Pesquisa obrigatória após o cadastro | Reúne respostas sobre perfil, busca, experiência e como a pessoa conheceu o trabalho |
| Dificuldade de saber se o interessado avançou no fluxo | Registro das ações de responder à pesquisa e entrar no grupo | Permite marcar essas etapas para o lead identificado na sessão |
| Falta de acompanhamento de interações-chave da página | Eventos customizados no GA4 | Possibilita acompanhar cadastro, envio da pesquisa e clique no grupo no serviço de analytics configurado |

## Como funciona atualmente

1. A pessoa acessa a landing page, que apresenta o Portal 08/08 e os canais externos relacionados.
2. Ao escolher garantir a vaga, abre um modal de cadastro.
3. O formulário valida nome, e-mail e telefone no navegador e envia os dados, junto da origem identificada, ao endpoint de dados pessoais.
4. Após o envio bem-sucedido, a pessoa segue para uma tela de confirmação.
5. Nessa tela, pode responder à pesquisa rápida e abrir uma página de acesso ao grupo.
6. A página de acesso oferece entrada direta no WhatsApp, cópia do convite e QR Code. A ação de acesso ao grupo e o envio da pesquisa são associados ao ID do cadastro quando ele está disponível na sessão.

Há também um link externo de confirmação de vínculo por meio de um formulário do Google.

## Tecnologias e arquitetura

- **React e React DOM:** estruturam e renderizam a interface de página única.
- **Vite e `@vitejs/plugin-react`:** fornecem o ambiente de desenvolvimento e a geração da versão de produção.
- **CSS próprio:** define layout responsivo, componentes visuais, modais e estados de interação.
- **Google Apps Script:** recebe as requisições `POST` de cadastro, pesquisa e atualização de ações. O script de referência do projeto registra dados na planilha ativa e atualiza os campos referentes a WhatsApp e pesquisa.
- **Google Analytics 4, via `react-ga4`:** recebe os eventos configurados no código.
- **APIs do navegador:** `sessionStorage` preserva o identificador do lead durante a sessão; Clipboard API oferece a cópia do link do grupo, com alternativa para navegadores sem suporte.
- **GitHub Actions e GitHub Pages:** o workflow versionado instala dependências, executa o build e publica o diretório `dist` na branch configurada para deploy.

Em termos de arquitetura, a aplicação é um front-end estático: a interface React faz requisições diretamente aos endpoints externos e não mantém um servidor próprio no repositório.

## Decisões técnicas

- **Simplicidade operacional:** a solução mantém o fluxo principal no front-end estático e usa serviços externos já adequados a formulários, planilhas, analytics e hospedagem estática.
- **Adequação a uma operação individual:** o cadastro é curto, a pesquisa é apresentada como uma etapa posterior e as ações relevantes são registradas sem exigir um painel administrativo construído neste projeto.
- **Redução de infraestrutura própria:** Google Apps Script é usado como ponte para o registro dos dados, enquanto GitHub Pages é configurado para a publicação da página. Isso evita a criação de uma API e de infraestrutura de servidor próprias.
- **Resiliência no fluxo:** o código valida os campos antes do envio, exibe feedback de carregamento e erro, e oferece alternativas para entrar ou copiar o link do grupo.

O repositório não documenta custos, contratos ou limites de uso dos serviços externos; por isso, não há alegação de custo operacional efetivo no projeto.

## Desafios e aprendizados

Os desafios que podem ser observados na implementação são:

- **Transformar um acesso direto em um fluxo com etapas**, mantendo a landing page como ponto inicial e adicionando cadastro, pesquisa e acesso ao grupo sem servidor próprio.
- **Vincular eventos ao mesmo interessado:** a aplicação recebe um ID no cadastro, guarda-o na sessão do navegador e o reutiliza para registrar a resposta da pesquisa e a ação relacionada ao WhatsApp.
- **Validar dados no cliente e tratar falhas de integração:** nome, e-mail e telefone passam por validação antes da requisição; os formulários mostram estados de envio, sucesso e erro.
- **Conciliar experiência e acompanhamento:** o histórico de navegação é manipulado para alternar entre landing page, confirmação e acesso ao grupo, enquanto os eventos de interação são enviados ao GA4.

## Contribuição para o negócio

Em comparação com o processo inicialmente manual, a solução atual permite centralizar a divulgação do evento, receber dados de interessados, registrar a origem informada no acesso, coletar respostas de pesquisa e marcar ações realizadas no fluxo digital.

Também torna o caminho até o grupo do WhatsApp explícito e oferece mais de uma forma de acesso: link direto, cópia do convite e QR Code. O projeto não contém métricas de conversão, resultados financeiros ou evidências quantitativas de impacto; portanto, esses resultados não são afirmados aqui.

## Próximas evoluções

Não há funcionalidades futuras, backlog ou roadmap documentados no código atual. Portanto, esta seção não apresenta recursos como planejados ou existentes.

Qualquer evolução deve partir de novas necessidades observadas no uso do fluxo e ser documentada separadamente das funcionalidades já implementadas.

## Execução local

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```
