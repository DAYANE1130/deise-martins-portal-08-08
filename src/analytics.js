import ReactGA from 'react-ga4'

const MEASUREMENT_ID = 'G-ERECX3279E'

export function initializeAnalytics() {
  ReactGA.initialize(MEASUREMENT_ID)
}
/**
 * Dispara eventos customizados para o GA4 para o formulário de pesquisa.
 * @param {string} eventName - Nome do evento ('survey_form_submit')
 * @param {Object} params - Objeto com os parâmetros adicionais (respostas do formulário)
 */

const EVENT_CONFIG = {
  personal_data_form_submit: {
    action: 'cadastro_dados_pessoais',
    category: 'Formulário Dados Pessoais'
  },
  survey_form_submit: {
    action: 'envio_pesquisa',
    category: 'Formulário de Pesquisa'
  },
  whatsapp_group_click: {
    action: 'clique_whatsapp',
    category: 'Grupo do WhatsApp'
  }
}

 export function trackEvent(eventName, params = {}) {

   const config = EVENT_CONFIG[eventName] || {
     action: eventName,
     category: 'Geral'
   }
   // Sanitização dos parâmetros para o padrão aceito pelo GA4
   const sanitizedParams = Object.entries(params).reduce((acc, [key, value]) => {
     // 1. Converte a chave para snake_case limpo
     const cleanKey = key
       .replace(/([a-z])([A-Z])/g, '$1_$2')
       .toLowerCase()
       .replace(/[^a-z0-9_]/g, '')

     // 2. Trata e limita o valor a 40 caracteres (regra estrita do GA4)
     const cleanValue = typeof value === 'string' 
       ? value.trim().substring(0, 40) 
       : value

     acc[cleanKey] = cleanValue
     return acc
   }, {})
  console.log('ENTREI NO GA4', eventName, params)
   const urlParams = new URLSearchParams(window.location.search)

   ReactGA.event({
     action: config.action,
     category: config.category,
     utm_source: urlParams.get('utm_source') || 'direto',
     utm_medium: urlParams.get('utm_medium') || 'nenhum',
     utm_campaign: urlParams.get('utm_campaign') || 'nenhuma',
     debug_mode: true,
     ...sanitizedParams,
   })
 }

 const safeParams = { genero: "Feminino", faixaEtaria: "18 a 24 anos", profissao: "Saúde e Bem-estar", motivoBusca: "Sinto que é o momento de iniciar uma nova fase", areaVida: "Relacionamentos e amor-próprio", experienciaTerapias: "Sim, já faço ou já fiz acompanhamentos", expectativa: "Mais clareza e autoconhecimento", comoConheceu: "YouTube, evento ou pesquisa na internet" }

  // Mantém as chaves originais em camelCase (para bater com o GA4)
  // e limita APENAS os valores das respostas em 40 caracteres
  const sanitizedParams = Object.entries(safeParams).reduce((acc, [key, value]) => {
    const cleanValue = typeof value === 'string' 
      ? value.trim().substring(0, 40) 
      : value

    acc[key] = cleanValue
    return acc
  }, {})

  console.log(sanitizedParams)