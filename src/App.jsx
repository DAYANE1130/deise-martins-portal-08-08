import heroImage from '../context/referencias/hero-01.png'

const whatsAppUrl = 'https://chat.whatsapp.com/FR3kHLSGMfaILcm4Jy7z9m?mode=gi_t&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGnWUydri8jsjbROGO2ueWdcVrJmVZt6XUiVLoiPwYpI-pniZWK3k1PNixJKMo_aem_ePVMDXognQksoqLzMaiPhw'

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
}

function JoinButton({ className = '' }) {
  return (
    <a className={`join-button ${className}`} href={whatsAppUrl} target="_blank" rel="noreferrer">
      Entrar no Grupo <ArrowIcon />
    </a>
  )
}

function App() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__orb hero__orb--one" />
        <div className="hero__orb hero__orb--two" />
        <div className="container hero__grid">
          <div className="hero__content">
            <p className="eyebrow">Ativação online e gratuita</p>
            <h1 id="hero-title">Portal das <em>Chamas Gêmeas</em> 08/08</h1>
            <p className="hero__subtitle">Frequência da Materialização</p>
            <p className="hero__description">A ativação da união começa em você.</p>
            <dl className="event-details" aria-label="Informações do evento">
              <div><dt>Data</dt><dd>08/08</dd></div>
              <div><dt>Horário</dt><dd>08:08</dd></div>
              <div><dt>Formato</dt><dd>Online · Gratuito</dd></div>
            </dl>
            <JoinButton />
            <p className="hero__note">O acesso é liberado através do grupo fechado.</p>
          </div>
          <div className="hero__image-wrap">
            <img className="hero__image" src={heroImage} alt="Portal das Chamas Gêmeas 08/08" />
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
