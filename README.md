# LeadTrack — Lead Capture & Analytics

**Solução web desenvolvida para divulgação, captura e gestão de interessados, identificação de origem e análise de dados, com foco em apoiar a operação e a tomada de decisão do negócio.**

### Versões

* `solution1`: versão inicial publicada, voltada à divulgação do evento e direcionamento para o grupo oficial do WhatsApp.
* `solution2`: evolução da solução, incorporando captura de leads, identificação de origem, pesquisa, acompanhamento de ações e análise de dados.

## Visão geral

O LeadFlow foi desenvolvido para apoiar a divulgação do evento online e gratuito.

O projeto começou como uma landing page simples para centralizar as informações do evento e facilitar o acesso ao grupo oficial do WhatsApp.

A partir das necessidades observadas no uso da primeira versão, a solução evoluiu para um fluxo de captura e acompanhamento de interessados, passando a registrar dados de contato, origem dos acessos, respostas de pesquisa e interações realizadas durante a jornada.

## Contexto e evolução

Inicialmente, a divulgação e o encaminhamento do público aconteciam de forma predominantemente manual.

A primeira versão foi criada para resolver a necessidade mais imediata: apresentar o evento e facilitar o acesso ao grupo do WhatsApp.

Com o uso da página, novas necessidades foram identificadas:

* registrar pessoas interessadas;
* identificar a origem dos acessos;
* conhecer melhor o público;
* organizar os dados coletados;
* acompanhar algumas etapas da jornada;
* obter informações para apoiar decisões futuras.

A solução evoluiu a partir dessas necessidades, sem antecipar funcionalidades que ainda não eram necessárias.

```text
Processo predominantemente manual
        ↓
solution1
Landing page + acesso ao WhatsApp
        ↓
Novas necessidades observadas
        ↓
solution2
Landing page + cadastro + pesquisa +
origem UTM + acompanhamento + GA4
        ↓
Dados para análise e tomada de decisão
```


## Requisitos e solução

| Necessidade                 | Solução                                                             |
| --------------------------- | ------------------------------------------------------------------- |
| Centralizar a divulgação    | Landing page com informações do evento e chamadas para participação |
| Facilitar o acesso ao grupo | Link direto, cópia do convite e QR Code                             |
| Registrar interessados      | Formulário com nome, e-mail e telefone                              |
| Identificar origem          | Captura e tratamento de `utm_source`                                |
| Conhecer o público          | Pesquisa estruturada após o cadastro                                |
| Acompanhar ações            | ID do lead mantido durante a sessão e utilizado nas atualizações    |
| Observar interações         | Eventos de cadastro, pesquisa e WhatsApp enviados ao GA4            |

## Como funciona

1. A pessoa acessa a landing page e conhece o evento.
2. Ao escolher garantir a vaga, abre o modal de cadastro.
3. Nome, e-mail e telefone são validados no navegador.
4. Os dados e a origem identificada são enviados por `POST` ao Google Apps Script.
5. O interessado é registrado no Google Sheets e recebe um identificador numérico.
6. O identificador é mantido durante a sessão para relacionar as ações seguintes ao mesmo lead.
7. Após o cadastro, a pessoa pode responder à pesquisa e acessar o grupo oficial do WhatsApp.
8. As ações de pesquisa e WhatsApp podem ser registradas para o lead.
9. Eventos selecionados do fluxo são enviados ao GA4.

A origem é identificada por `utm_source`, com tratamento específico para Instagram e YouTube e indicação de acesso direto quando o parâmetro não está presente.

## Arquitetura

```text
                    ┌─────────────────────┐
                    │     Landing Page    │
                    │ React + Vite + CSS  │
                    └──────────┬──────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
                ▼              ▼              ▼
        Google Apps Script    GA4       WhatsApp
                │
                ▼
         Google Sheets
                │
                ▼
       Gestão e análise
```

A aplicação é um **front-end estático** e não mantém API ou servidor próprio.

O React realiza requisições diretamente aos serviços externos utilizados no fluxo. O Google Apps Script recebe e processa os dados, enquanto o Google Sheets funciona como base operacional dos leads.

### Tecnologias

* **React e React DOM:** interface.
* **Vite:** desenvolvimento e build.
* **JavaScript:** lógica do front-end.
* **CSS:** layout e responsividade.
* **Google Apps Script:** processamento das requisições.
* **Google Sheets:** armazenamento e organização dos leads.
* **Google Analytics 4, via `react-ga4`:** acompanhamento de eventos.
* **Session Storage:** manutenção do identificador do lead durante a sessão.
* **Clipboard API:** cópia do convite do WhatsApp.
* **Git e GitHub:** versionamento.
* **GitHub Actions:** automação do build e publicação.
* **GitHub Pages:** hospedagem.
* **Looker Studio:** dashboard para acompanhamento dos dados,com envio automático diário por e-mail.

## Decisões técnicas

### Simplicidade adequada ao momento

O negócio é conduzido individualmente e estava em um momento de validação e crescimento. A solução foi mantida simples para atender às necessidades identificadas sem criar uma estrutura maior do que a necessária.

### Sem adicionar custos ao negócio

Foram priorizados recursos e serviços que permitissem atender às necessidades identificadas **sem adicionar custos ao negócio no contexto do projeto**.

### Aproveitamento de ferramentas existentes

O Google Sheets foi utilizado para gestão dos leads por já fazer parte da rotina da operação.

Em vez de criar um novo painel administrativo, os dados foram organizados em uma ferramenta que já era familiar para a pessoa responsável pelo negócio.

O dashboard do Looker Studio também pode ser disponibilizado por e-mail, simplificando o acompanhamento dos indicadores.

### Redução de infraestrutura própria

Google Apps Script foi utilizado como ponte para o registro dos dados e GitHub Pages para publicação da aplicação, evitando a necessidade de uma API ou servidor próprio.

## Contribuição para o negócio

A solução transformou um fluxo inicialmente predominantemente manual em uma estrutura capaz de:

* centralizar a divulgação;
* registrar interessados;
* identificar a origem dos acessos;
* coletar informações sobre o público;
* acompanhar algumas ações da jornada;
* disponibilizar dados para análise.

Com isso, o negócio passa a ter informações que podem apoiar decisões sobre divulgação, público, comunicação e próximos testes, reduzindo a dependência de decisões baseadas apenas em percepção.

O projeto não possui métricas de conversão, resultados financeiros ou evidências quantitativas de impacto. Portanto, esses resultados não são afirmados aqui.

## Possíveis evoluções

A estrutura atual permite considerar, em futuras evoluções, novas etapas da jornada do lead, como:

```text
Cadastro
   ↓
Interação
   ↓
Contato
   ↓
Agendamento
   ↓
Compra
   ↓
Cliente
```

Essas possibilidades dependem das necessidades observadas no uso da solução e não fazem parte da implementação atual.

## Execução local

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```
