import heroImage from './assets/images/hero-01.png'
import deiseImage from './assets/images/foto.jpeg'
import groupImage from '../context/referencias/imagem_grupo_chamas_gemeas.jpg'
import groupQrCode from '../context/referencias/adobe-express-qr-code.png'
import { useEffect, useState } from 'react'

const whatsAppUrl = 'https://chat.whatsapp.com/I9xVLgi9G7Z3IFhxq4HdAz?s=cl&p=i&mlu=0'

const formVinculo = 'https://docs.google.com/forms/d/e/1FAIpQLSdMBmVtuOD6UIkjvvsDkWGQHI_Fu9NIWQAPWS2q1rBYCBy5fw/viewform'

const urlFormPersonalData = 'https://docs.google.com/forms/d/e/1FAIpQLSfy2rSOtxtOAiw8zBn6US3rUTCyo_5fTeeSbkqk-Y9h7DYlwA/viewform?embedded=true';

const urlFormSurvey =
  'https://docs.google.com/forms/d/e/1FAIpQLSfxQ3_qQVir_Pu7HGeoSJLfvGtIVDi73xd5AWw65_pgMIRE5Q/viewform?embedded=true'


function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
}


function JoinButton({ className = '', onClick }) {
  return (
    <button
      type="button"
      className={`join-button ${className}`}
      onClick={onClick}
    >
      Garantir minha vaga gratuita <ArrowIcon />
    </button>
  )
}
function StepTwoButton({ className = '', onClick }) {
  return (
    <button
      type="button"
      className={`join-button ${className}`}
      onClick={onClick}
    >
      Passo 2- Garantir minha vaga gratuita <ArrowIcon />
    </button>
  )
}
function ToAnswerSurvey({ className = '', onClick }) {
  return (
    <button
      type="button"
      className={`join-button ${className}`}
      onClick={onClick}
    >
      RESPONDER A PESQUISA <ArrowIcon />
    </button>
  )
}

function JoinWhatsappGroupButton({ className = '', onClick }) {
  if (onClick) {
    return (
      <button type="button" className={`join-button ${className}`} onClick={onClick}>
        ENTRAR NO GRUPO OFICIAL DO WHATSAPP <ArrowIcon />
      </button>
    )
  }

  return (
    <a
      className={`join-button ${className}`}
      href={whatsAppUrl}
      target="_blank"
      rel="noreferrer"
    >
      ENTRAR NO GRUPO OFICIAL DO WHATSAPP <ArrowIcon />
    </a>
  )
}

function FormButton({ className = '' }) {
  return (
    <a className={`join-button ${className}`} href={formVinculo} target="_blank" rel="noreferrer">
      Fazer confirmação de vínculo
      <ArrowIcon />
    </a>
  )
}

function RegistrationModal({ onClose, onStepTwoClick, formUrl, showStepTwo = false }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Formulário de inscrição"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Fechar formulário"
        >
          ×
        </button>
        <iframe
          src={formUrl}
          title="Formulário de inscrição"
          className="modal__iframe"
        >
          Carregando…
        </iframe>
      </div>
      {showStepTwo && <StepTwoButton onClick={onStepTwoClick} />}
    </div>
  )
}
function RegistrationComplete({ onOpenForm, onOpenGroupPage }) {
  return (
    <main className="registration-complete">
      <div className="registration-complete__container">

        <h1>
          Seu cadastro está <em>quase concluído.</em>
        </h1>

        <section className="registration-step">
          <h3>
            Passo 3: Responda a pesquisa abaixo:
          </h3>

          <ToAnswerSurvey onClick={onOpenForm} />
        </section>

        <section className="registration-step">
          <h3>
            Passo 4: Entre no Grupo para receber acesso às aulas e aos
            materiais exclusivos:
          </h3>

          <JoinWhatsappGroupButton onClick={onOpenGroupPage} />
        </section>

      </div>
    </main>
  )
}

function GroupAccessPage() {
  const [copyMessage, setCopyMessage] = useState('Copiar o link do grupo')

  const copyGroupLink = async () => {
    try {
      await navigator.clipboard.writeText(whatsAppUrl)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = whatsAppUrl
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }

    setCopyMessage('Link copiado!')
  }

  return (
    <main className="group-access">
      <section className="group-access__container" aria-labelledby="group-access-title">
        <img
          className="group-access__image"
          src={groupImage}
          alt="Grupo Despertar da Missão Chamas Gêmeas"
        />
        <h1 id="group-access-title">🌞Despertar da Missão Chamas Gêmeas- Leia a descrição</h1>
        <a className="group-access__button group-access__button--primary" href={whatsAppUrl} target="_blank" rel="noreferrer">
          Entrar
        </a>
        <button type="button" className="group-access__button" onClick={copyGroupLink}>
          {copyMessage}
        </button>
        <p className="group-access__help">
          Caso tenha problemas para entrar no grupo, abra o WhatsApp e cole o link em uma conversa.
          <br />Em seguida, toque no link para abrir o convite diretamente no WhatsApp.
        </p>
        <img className="group-access__qr" src={groupQrCode} alt="QR Code para entrar no grupo do WhatsApp" />
      </section>
    </main>
  )
}


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [showGroupPage, setShowGroupPage] = useState(false)
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false)

  useEffect(() => {
    const handlePopState = (event) => {
      const page = event.state?.portalPage

      setShowThankYou(page === 'thank-you')
      setShowGroupPage(page === 'group-access')
      setIsModalOpen(false)
      setIsThankYouModalOpen(false)
    }

    window.history.replaceState(
      { ...window.history.state, portalPage: 'landing' },
      '',
      window.location.href,
    )
    window.addEventListener('popstate', handlePopState)

    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const goToThankYouPage = () => {
    setIsModalOpen(false)
    setShowThankYou(true)
    window.history.pushState(
      { ...window.history.state, portalPage: 'thank-you' },
      '',
      window.location.href,
    )
  }

  const goToGroupPage = () => {
    setIsThankYouModalOpen(false)
    setShowThankYou(false)
    setShowGroupPage(true)
    window.history.pushState(
      { ...window.history.state, portalPage: 'group-access' },
      '',
      window.location.href,
    )
  }

  if (showGroupPage) {
    return <GroupAccessPage />
  }

  // if (isRegistrationComplete) {
  //   return <RegistrationComplete />
  // }
  if (showThankYou) {
    return (
      <>
        <RegistrationComplete
          onOpenForm={() => setIsThankYouModalOpen(true)}
          onOpenGroupPage={goToGroupPage}
        />

        {isThankYouModalOpen && (
          // <div>
          //   TESTE — MODAL DA PÁGINA DE OBRIGADO
          // </div>
          <RegistrationModal
            onClose={() => setIsThankYouModalOpen(false)}
            formUrl={urlFormSurvey}
          />
        )}
      </>

    )
  }
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
            <div className="buttons">
              {/* <JoinButton /> */}
              <JoinButton onClick={() => setIsModalOpen(true)} />
              <FormButton />
            </div>

            <strong className="hero__note">O acesso é liberado através do grupo fechado.</strong>
          </div>
          <div className="hero__image-wrap">
            <img className="hero__image" src={heroImage} alt="Portal das Chamas Gêmeas 08/08" />
          </div>
        </div>
      </section>
      <section className="section section--soft" aria-labelledby="for-whom-title">
        <div className="container narrow center">
          <p className="section-kicker">O chamado</p>
          <h2 id="for-whom-title">Para quem é este Portal</h2>
          <p className="lead">Esse portal é para quem já entendeu que:</p>
          <div className="statement-list" role="list">
            <p role="listitem">Não dá mais pra viver esperando</p>
            <p role="listitem">Não dá mais pra repetir o mesmo padrão</p>
            <p role="listitem">Não dá mais pra adiar a própria vida</p>
          </div>
          <p className="emphasis">É hora de se tornar quem vive a realidade que deseja.</p>
        </div>
        <div className="section_buttons">
          {/* <JoinButton /> */}
          <JoinButton onClick={() => setIsModalOpen(true)} />
          <FormButton />
        </div>
      </section>

      <section className="section" aria-labelledby="work-title">
        <div className="container">
          <div className="section-heading">
            <p className="section-kicker">A ativação</p>
            <h2 id="work-title">O que será trabalhado no Portal</h2>
            <p>Durante essa ativação, você será conduzida a acessar:</p>
          </div>
          <div className="cards cards--three">
            {['A frequência da união interna', 'O fim do padrão de espera', 'A mudança da sua identidade'].map((item, index) => (
              <article className="card" key={item}>
                <span className="card__number">0{index + 1}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
          <p className="center emphasis section-close">Você não vive a união sendo a mesma pessoa.</p>
          <div className="center">
            <div className="section_buttons">
              <JoinButton />
              <FormButton />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--lavender" aria-labelledby="foundation-title">
        <div className="container split-copy">
          <div><p className="section-kicker">Clareza</p><h2 id="foundation-title">A Base da Materialização</h2></div>
          <div className="split-copy__text">
            <p>Não podemos atrair nada do qual nos sentimos separados.</p>
            <p>Se você ainda sente que falta amor, resposta ou validação, você ainda está criando a partir da ausência.</p>
            <p className="emphasis">E a realidade sempre responde a isso.</p>
            <div className="buttons">
              <JoinButton />
              <FormButton />
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="energy-title">
        <div className="container split-copy">
          <div><p className="section-kicker">08 · 08</p><h2 id="energy-title">A Energia do Portal 08/08</h2></div>
          <div className="split-copy__text">
            <p>O número 8 carrega a frequência da:</p>
            <ul className="clean-list"><li>Realização</li><li>Concretização</li><li>Liderança</li><li>Autorreponsabilidade</li></ul>
            <p className="emphasis">Você só materializa aquilo que consegue sustentar.</p>
          </div>
        </div>
      </section>

      <section className="section section--soft" aria-labelledby="about-title">
        <div className="container about">
          <div className="about__photo"><img src={deiseImage} alt="Deise Martins" /></div>
          <div className="about__content">
            <p className="section-kicker">Sobre Deise Martins</p>
            <h2 id="about-title">Um chamado para alinhar-se à sua missão de vida</h2>
            <p>Eu sou Deise Martins, sacerdotisa, mestra espiritual formada em Letras pela PUC, terapeuta multidimensional, taróloga, terapeuta akáshica e reprogramadora emocional, especializada no caminho das Chamas Gêmeas.</p>

            <p>Atuo com leitura de campo, condução energética e a força da Deusa Hécate para revelar o que está oculto, romper bloqueios profundos e reposicionar você na frequência de realização, poder e materialização.</p>

            <p>Sou reconhecida por tirar mulheres da estagnação — principalmente dentro da dinâmica de Chamas Gêmeas, onde muitas se perdem esperando o outro… enquanto se abandonam.</p>

            <p>O meu trabalho não é sobre conforto. É sobre verdade, ruptura e reposicionamento.</p>

            <p>Aqui, você não vai mais fugir de si mesma. Você vai encarar o que precisa ser visto, assumir sua energia e sustentar uma nova identidade.</p>

            <p>Porque no final, não é sobre ele. Não é sobre a história.</p>

            <p>👉 É sobre quem você se torna — e o que você finalmente passa a viver a partir disso.</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="testimonials-title">
        <div className="container">
          <div className="section-heading center"><p className="section-kicker">Experiências compartilhadas</p><h2 id="testimonials-title">Depoimentos</h2></div>
          <div className="testimonials">
            <figure><blockquote>“Olá! Eu sou Camila Souza e vim dar meu depoimento sobre a Deise! Conheci a Deise pelo canal do YouTube (sempre as previsões dela sempre batiam com meu momento) foi aí então que resolvi marcar uma tiragem de cartas! Surreal! Bateu cada palavra e cada momento! A partir daí não consegui mais ficar sem, era praticamente quase todo mês né Deise? Rs! Foram durante quase dois anos!”</blockquote><figcaption>Camila Souza</figcaption></figure>
            <figure><blockquote>“Como uma Chama Gêmea que sou, entrei em contato com a Desiane para entender e trabalhar questões relacionadas à minha mãe. Através da terapia, foi me mostrado o motivo de não me sentir à vontade perto dela e trabalhada essa questão com meditações, corte energético, quebra de contrato. Trabalhei a culpa dentro de mim e hoje me sinto mais livre e segura para viver a vida sem ficar presa àquela sensação.”</blockquote><figcaption>Rita</figcaption></figure>
            <figure><blockquote>“Durante meu processo de separação da chama, me senti muito perdida e busquei maneiras de entender o que estava acontecendo comigo. Quando conheci a Deise, imediatamente senti uma conexão. A cada sessão, ela me ajudou a descobrir aspectos ocultos do meu caminho de reencontro e a superar bloqueios.

              Seus processos e palavras são sutis, mas têm um grande impacto na minha jornada de autodescoberta. Sempre que me sinto sem direção, agendo uma sessão, e com mágica, ela consegue desbloquear minha mente.

              Sou profundamente grata à Deise, não apenas como terapeuta, mas também pela conexão que construímos, mesmo que de forma virtual”</blockquote><figcaption>Maria Carolina</figcaption></figure>

          </div>
        </div>
      </section>

      <section className="section section--ritual" aria-labelledby="ritual-title">
        <div className="container ritual center">
          <p className="section-kicker">Informações do Ritual</p>
          <h2 id="ritual-title">Portal das Chamas Gêmeas 08/08</h2>
          <div className="ritual__details"><p><strong>Data</strong>08/08</p><p><strong>Horário</strong>08:08</p><p><strong>Formato</strong>Online</p><p><strong>Evento</strong>Gratuito</p></div>
          <p>O acesso é liberado através do grupo fechado.</p>
          <div className="section_buttons" >
            <JoinButton />
            <FormButton />
          </div>
        </div>
      </section>

      <section className="final-cta" aria-labelledby="final-title">
        <div className="container narrow center">
          <p className="section-kicker">O chamado final</p>
          <h2 id="final-title">A união começa quando a separação termina dentro de você.</h2>
          <p>Se você sente que esse chamado é pra você, entre no grupo e participe da ativação do Portal 08/08.</p>
          <div className="section_buttons">
            <JoinButton />
            <FormButton />
          </div>
        </div>
      </section>
      <footer className="footer"><div className="container"><span>© 2026 Deise Martins. Todos os direitos reservados.</span><div><a href="https://www.instagram.com/deisemartins.portal/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.youtube.com/@deisemartins.portal" target="_blank" rel="noreferrer">YouTube</a><a href="https://docs.google.com/forms/d/e/1FAIpQLSdMBmVtuOD6UIkjvvsDkWGQHI_Fu9NIWQAPWS2q1rBYCBy5fw/viewform" target="_blank" rel="noreferrer">Confirmação de vínculo</a></div></div></footer>
      {isModalOpen && (
        <RegistrationModal
          onClose={() => setIsModalOpen(false)}
          onStepTwoClick={goToThankYouPage}
          formUrl={urlFormPersonalData}
          showStepTwo
        />

      )}
    </main>
  )
}

export default App
