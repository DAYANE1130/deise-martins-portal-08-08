import ReactGA from 'react-ga4'

const MEASUREMENT_ID = 'G-ERECX3279E'

export function initializeAnalytics() {
  ReactGA.initialize(MEASUREMENT_ID)
}


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

  const urlParams = new URLSearchParams(window.location.search)

  ReactGA.event({
    action: config.action,
    category: config.category,
    utm_source: urlParams.get('utm_source') || 'direto',
    utm_medium: urlParams.get('utm_medium') || 'nenhum',
    utm_campaign: urlParams.get('utm_campaign') || 'nenhuma',
    ...params,
  })
}