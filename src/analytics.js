import ReactGA from 'react-ga4'

const measurementId = 'G-ERECX3279E'

export function initializeAnalytics() {
  ReactGA.initialize(measurementId)
}

// export function trackEvent(eventName) {
//   ReactGA.event(eventName)
// }


export function trackEvent(eventName, params = {}) {
  let nameCategory = ''

  if (eventName === "personal_data_form_submit") {
    nameCategory = 'Formulário dados pessoais'
  } else if (eventName === "survey_form_submit") {
    nameCategory = 'Formulário de pesquisa'
  } else if (eventName === "whatsapp_group_click") {
    nameCategory = 'Clique para entrar no grupo whatsapp '
  }
  // Captura as UTMs diretamente da URL do navegador no momento do evento
  const urlParams = new URLSearchParams(window.location.search)
  const utmSource = urlParams.get('utm_source') || 'direto'
  const utmMedium = urlParams.get('utm_medium') || 'nenhum'
  const utmCampaign = urlParams.get('utm_campaign') || 'nenhuma'

  ReactGA.event({
    action: eventName,       // Nome do evento (ex: 'personal_data_form_submit')
    category: nameCategory,  // Categoria para organização
    page_location: window.location.href,
    source: utmSource,
    medium: utmMedium,
    campaign: utmCampaign,
    ...params
  })
}