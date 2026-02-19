import { useState, useEffect } from 'react'
import './App.css'

// ─────────────────────────── Translations ────────────────────────────────────
const T = {
  es: {
    nav: { brand: ['Aula', 'QR'], links: ['¿Qué es?', 'Beneficios', '¿Cómo funciona?', 'Estadísticas', 'Contacto'] },
    badge: 'Tecnología educativa de nueva generación',
    heroTitle: ['Bienvenido a ', 'AulaQR'],
    heroDesc: 'La plataforma que transforma la experiencia académica: con solo escanear el QR de cualquier aula obtienes al instante toda la información que necesitas, sin registros ni complicaciones.',
    pills: ['📍 Capacidad', '📅 Horarios', '👨‍🏫 Docentes', '🟢 Disponibilidad'],
    stats: [
      { value: '+500', label: 'Aulas registradas' },
      { value: '<5 seg', label: 'Tiempo de respuesta' },
      { value: '+3 000', label: 'Consultas esta semana' },
      { value: '24/7', label: 'Disponibilidad' },
    ],
    featuresLabel: '¿Qué ofrece?',
    featuresTitle: 'Todo lo que tu alumno necesita,\ncon un solo escaneo',
    featuresSub: 'AulaQR elimina la incertidumbre. Cada código QR pegado en el aula es una ventana directa a información académica actualizada.',
    features: [
      { title: 'Capacidad del aula', desc: 'Sabe al instante cuántos alumnos puede albergar el espacio, evitando saturación y mejorando la organización.' },
      { title: 'Horario completo', desc: 'Consulta el cronograma semanal del aula: qué materias se dictan, en qué turno y en qué franja horaria.' },
      { title: 'Docente asignado', desc: 'Conoce quién es el profesor a cargo de cada materia y en qué horario específico estará presente en el aula.' },
      { title: 'Disponibilidad en tiempo real', desc: 'Visualiza si el aula está libre u ocupada en este momento, ideal para encontrar espacios disponibles rápidamente.' },
      { title: 'Acceso instantáneo', desc: 'Sin apps adicionales, sin contraseñas. Solo apunta la cámara y la información aparece en menos de 2 segundos.' },
      { title: 'QR único por aula', desc: 'Cada aula tiene su propio código vinculado directamente a su información académica actualizada en tiempo real.' },
    ],
    benefitsLabel: 'Mejor experiencia',
    benefitsTitle: 'Una experiencia superior\npara el alumno moderno',
    benefitsDesc: 'AulaQR reemplaza los pizarrones, las llamadas y la incertidumbre. Con un gesto, el alumno tiene toda la información académica que necesita en la palma de su mano.',
    benefitsList: ['Capacidad del aula disponible', 'Horarios actualizados en tiempo real', 'Docente asignado a cada materia', 'Estado de disponibilidad del aula', 'Materias por turno y por día', 'Sin registros ni contraseñas'],
    phoneScanning: 'Escaneando...',
    phoneRows: ['Aula', 'Capacidad', 'Materia', 'Docente', 'Estado'],
    phoneVals: ['B-204', '35 alumnos', 'Matemáticas', 'Lic. García', '🟢 Disponible'],
    stepsLabel: '¿Cómo funciona?',
    stepsTitle: 'En 3 simples pasos',
    stepsSub: 'Sin registros ni contraseñas. Solo escanea y descubre.',
    steps: [
      { n: '1', title: 'Ubica el QR', desc: 'Encuentra el código QR pegado en el aula. Está impreso y visible en la puerta o pared del espacio.' },
      { n: '2', title: 'Escanea', desc: 'Abre la cámara de tu móvil o la app AulaQR, apunta al código y listo: el escaneo es automático.' },
      { n: '3', title: '¡Infórmate!', desc: 'Al instante verás capacidad, horario, docente, materia y estado de disponibilidad del aula.' },
    ],
    chartLabel: 'Estadísticas de uso',
    chartTitle: 'Adopción diaria por alumnos',
    chartSub: 'Cada día cientos de estudiantes confían en AulaQR para organizar su experiencia académica. Esta semana, los números hablan solos.',
    chartCardTitle: 'Escaneos por día',
    chartCardSub: 'Semana actual · Tiempo real',
    chartLegend: ['Escaneos', 'Tendencia'],
    chartFooter: ['📈 Pico semanal: ', 'Viernes 601 escaneos', '📊 Promedio diario: ', '398 escaneos'],
    days: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    contactBanner: '¿Tienes dudas? Contáctanos',
    contactCols: [
      { heading: 'Soporte', links: ['Centro de ayuda', 'Contáctanos', 'Reportar un problema', 'Estado del servicio'] },
      { heading: 'Plataforma', links: ['Acerca de AulaQR', 'Cómo funciona', 'Para instituciones', 'Privacidad y datos'] },
      { heading: 'Recursos', links: ['Documentación', 'Guía de uso', 'Preguntas frecuentes', 'Novedades'] },
    ],
    contactEmail: 'contacto@aulaqr.edu',
    contactPhone: '+1 (800) 000-0000',
    footerCopy: '© 2026 AulaQR · Todos los derechos reservados',
  },
  en: {
    nav: { brand: ['Aula', 'QR'], links: ["What is it?", 'Benefits', 'How it works', 'Statistics', 'Contact'] },
    badge: 'Next-generation educational technology',
    heroTitle: ['Welcome to ', 'AulaQR'],
    heroDesc: 'The platform that transforms the academic experience: by simply scanning the QR code of any classroom you instantly get all the information you need — no sign-ups, no fuss.',
    pills: ['📍 Capacity', '📅 Schedules', '👨‍🏫 Teachers', '🟢 Availability'],
    stats: [
      { value: '+500', label: 'Registered classrooms' },
      { value: '<2 sec', label: 'Response time' },
      { value: '+3 000', label: 'Queries this week' },
      { value: '24/7', label: 'Availability' },
    ],
    featuresLabel: 'What it offers',
    featuresTitle: 'Everything your student needs,\nwith a single scan',
    featuresSub: 'AulaQR eliminates uncertainty. Every QR code on the classroom wall is a direct window to up-to-date academic information.',
    features: [
      { title: 'Classroom capacity', desc: 'Know instantly how many students the space can hold, preventing overcrowding and improving organization.' },
      { title: 'Full schedule', desc: 'Check the weekly classroom timetable: which subjects are taught, which shift, and at what time.' },
      { title: 'Assigned teacher', desc: 'See who the professor is for each subject and the exact time they will be in the classroom.' },
      { title: 'Real-time availability', desc: 'See whether the classroom is free or occupied right now — perfect for quickly finding available spaces.' },
      { title: 'Instant access', desc: 'No extra apps, no passwords. Just point the camera and the info appears in under 2 seconds.' },
      { title: 'Unique QR per classroom', desc: 'Each classroom has its own code linked directly to its real-time academic information.' },
    ],
    benefitsLabel: 'Better experience',
    benefitsTitle: 'A superior experience\nfor the modern student',
    benefitsDesc: 'AulaQR replaces whiteboards, phone calls, and uncertainty. With one gesture, students have all the academic information they need in the palm of their hand.',
    benefitsList: ['Classroom capacity available', 'Schedules updated in real time', 'Teacher assigned to each subject', 'Classroom availability status', 'Subjects by shift and day', 'No sign-ups or passwords'],
    phoneScanning: 'Scanning...',
    phoneRows: ['Room', 'Capacity', 'Subject', 'Teacher', 'Status'],
    phoneVals: ['B-204', '35 students', 'Mathematics', 'Prof. García', '🟢 Available'],
    stepsLabel: 'How does it work?',
    stepsTitle: 'In 3 simple steps',
    stepsSub: 'No sign-ups or passwords. Just scan and discover.',
    steps: [
      { n: '1', title: 'Find the QR', desc: 'Locate the QR code posted in the classroom — printed and visible on the door or wall.' },
      { n: '2', title: 'Scan it', desc: 'Open your phone camera or the AulaQR app, point at the code, and the scan is automatic.' },
      { n: '3', title: 'Get informed!', desc: 'Instantly see capacity, schedule, teacher, subject, and availability status of the classroom.' },
    ],
    chartLabel: 'Usage statistics',
    chartTitle: 'Daily adoption by students',
    chartSub: 'Every day hundreds of students rely on AulaQR to organise their academic experience. This week, the numbers speak for themselves.',
    chartCardTitle: 'Scans per day',
    chartCardSub: 'Current week · Real time',
    chartLegend: ['Scans', 'Trend'],
    chartFooter: ['📈 Weekly peak: ', 'Friday 601 scans', '📊 Daily average: ', '398 scans'],
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    contactBanner: 'Have questions? Contact us',
    contactCols: [
      { heading: 'Support', links: ['Help centre', 'Contact us', 'Report a problem', 'Service status'] },
      { heading: 'Platform', links: ['About AulaQR', 'How it works', 'For institutions', 'Privacy & data'] },
      { heading: 'Resources', links: ['Documentation', 'User guide', 'FAQ', "What's new"] },
    ],
    contactEmail: 'contact@aulaqr.edu',
    contactPhone: '+1 (800) 000-0000',
    footerCopy: '© 2026 AulaQR · All rights reserved',
  },
}

// ─────────────────────────── SVG Icons ───────────────────────────────────────
const QrIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <path d="M14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z" fill="currentColor" stroke="none" />
  </svg>
)
const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)
const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)
const DoorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18M9 3h6a2 2 0 0 1 2 2v16H7V5a2 2 0 0 1 2-2z" />
    <circle cx="14" cy="12" r="1" fill="currentColor" stroke="none" />
  </svg>
)
const LayersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
  </svg>
)
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

// ─────────────────────────── Chart data per filter ───────────────────────────
import { fetchChartData } from './services/api'
import ClassroomChart from './components/ClassroomChart'
import DeviceChart from './components/DeviceChart'


function UsageChart({ chartData }) {
  const { labels, values } = chartData
  const W = 680, H = 250
  const PAD = { top: 20, right: 24, bottom: 38, left: 58 }
  const chartW = W - PAD.left - PAD.right
  const chartH = H - PAD.top - PAD.bottom

  const maxVal = Math.max(1, Math.ceil(Math.max(...values) * 1.2))
  const step = Math.ceil(maxVal / 4)
  const yTicks = [0, step, step * 2, step * 3, step * 4]

  const barW = (chartW / values.length) * 0.52
  const barGap = chartW / values.length

  const points = values.map((v, i) => {
    const x = PAD.left + i * barGap + barGap / 2
    const y = PAD.top + chartH - (v / maxVal) * chartH
    return `${x},${y}`
  }).join(' ')

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg" aria-label="Usage chart">
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4facfe" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00f2fe" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4facfe" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {yTicks.map(tick => {
        const y = PAD.top + chartH - (tick / maxVal) * chartH
        return (
          <g key={tick}>
            <line x1={PAD.left} y1={y} x2={PAD.left + chartW} y2={y}
              stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
            <text x={PAD.left - 8} y={y + 4} textAnchor="end"
              fill="rgba(255,255,255,0.32)" fontSize="10">{tick >= 1000 ? `${(tick / 1000).toFixed(1)}k` : tick}</text>
          </g>
        )
      })}

      {values.map((v, i) => {
        const x = PAD.left + i * barGap + (barGap - barW) / 2
        const bH = (v / maxVal) * chartH
        const y = PAD.top + chartH - bH
        return <rect key={i} x={x} y={y} width={barW} height={bH} fill="url(#barGrad)" rx="4" ry="4" opacity="0.82" />
      })}

      <polyline points={points} fill="none" stroke="url(#lineGrad)"
        strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" filter="url(#glow)" />

      {values.map((v, i) => {
        const cx = PAD.left + i * barGap + barGap / 2
        const cy = PAD.top + chartH - (v / maxVal) * chartH
        const lbl = v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r="5" fill="#4facfe" filter="url(#glow)" />
            <circle cx={cx} cy={cy} r="2.5" fill="#fff" />
            <text x={cx} y={cy - 11} textAnchor="middle"
              fill="rgba(255,255,255,0.7)" fontSize="9.5" fontWeight="600">{lbl}</text>
          </g>
        )
      })}

      {labels.map((d, i) => {
        const x = PAD.left + i * barGap + barGap / 2
        return (
          <text key={d} x={x} y={H - 8} textAnchor="middle"
            fill="rgba(255,255,255,0.42)" fontSize="10.5" fontWeight="500">{d}</text>
        )
      })}
    </svg>
  )
}

// ─────────────────────────── Feature icon map ─────────────────────────────────
const ICONS = [<LayersIcon />, <CalendarIcon />, <UsersIcon />, <DoorIcon />, <BoltIcon />, <QrIcon />]

// ─────────────────────────── Main Component ──────────────────────────────────
function App() {
  const [lang, setLang] = useState('es')
  const [chartFilter, setChartFilter] = useState('semana')
  const [chartVisible, setChartVisible] = useState(true)
  const [chartData, setChartData] = useState({
    labels: [],
    values: [],
    classrooms: [],
    devices: []
  })

  const [loading, setLoading] = useState(true)
  const t = T[lang]

  // Dynamic month name from real date
  const now = new Date()
  const monthName = now.toLocaleString(lang === 'es' ? 'es-ES' : 'en-US', { month: 'long' })
  const year = now.getFullYear()
  const monthLabel = lang === 'es'
    ? `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`
    : `${monthName} ${year}`

  // Filter labels
  const FILTERS = {
    es: [{ key: 'dia', label: 'Hoy' }, { key: 'semana', label: 'Esta semana' }, { key: 'mes', label: 'Este mes' }],
    en: [{ key: 'dia', label: 'Today' }, { key: 'semana', label: 'This week' }, { key: 'mes', label: 'This month' }],
  }

  // Fetch data from simulated backend
  useEffect(() => {
    let isMounted = true
    setLoading(true)
    setChartVisible(false) // Fade out immediately

    fetchChartData(chartFilter, lang)
      .then(data => {
        if (!isMounted) return
        setChartData(data)
        setLoading(false)
        setTimeout(() => setChartVisible(true), 50) // Fade in after render
      })
      .catch(err => console.error('Failed to fetch chart data:', err))

    return () => { isMounted = false }
  }, [chartFilter, lang])

  const activeData = chartData
  const totalScans = activeData.values.reduce((a, b) => a + b, 0)
  const peakIdx = activeData.values.indexOf(Math.max(...activeData.values)) || 0
  const peakLabel = activeData.labels[peakIdx] || '-'
  const peakVal = activeData.values[peakIdx] || 0
  const avgVal = activeData.values.length ? Math.round(totalScans / activeData.values.length) : 0

  const toggleLang = () => setLang(l => l === 'es' ? 'en' : 'es')

  const changeFilter = (key) => {
    if (key === chartFilter) return
    setChartFilter(key) // Trigger useEffect
  }

  // Bidirectional scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in-view')
        else e.target.classList.remove('in-view')
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (e, id) => {
    e.preventDefault()
    const el = document.querySelector(id)
    if (!el) return

    const NAVBAR_H = 76
    const startY = window.scrollY
    const endY = el.getBoundingClientRect().top + startY - NAVBAR_H
    const distance = endY - startY
    const duration = Math.min(Math.abs(distance) * 0.5, 900) // ms, proportional but capped

    // easeInOutCubic — slow start, fast middle, slow end
    const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

    let startTime = null
    const step = timestamp => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      window.scrollTo(0, startY + distance * ease(progress))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  return (
    <div className="landing">

      {/* Orbs decorativos */}
      <div className="bg-orbs" aria-hidden="true">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
      </div>

      {/* ── NAVBAR ───────────────────────────────────────── */}
      <nav className="navbar">
        <a href="#" className="navbar-brand">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4facfe" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          {t.nav.brand[0]}<span>{t.nav.brand[1]}</span>
        </a>

        <div className="navbar-links">
          {['#que-es', '#beneficios', '#como-funciona', '#estadisticas', '#contacto'].map((href, i) => (
            <a key={href} href={href} onClick={e => scrollTo(e, href)}>{t.nav.links[i]}</a>
          ))}
        </div>

        <button className="lang-toggle" onClick={toggleLang} title="Cambiar idioma / Switch language">
          <GlobeIcon />
          <span>{lang === 'es' ? 'EN' : 'ES'}</span>
        </button>
      </nav>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero" id="que-es">
        <div className="hero-badge"><span className="badge-dot" />{t.badge}</div>
        <div className="glass-card">
          <div className="qr-icon-wrapper">
            <div className="qr-icon-circle"><QrIcon /></div>
          </div>
          <h1 className="hero-title">{t.heroTitle[0]}<span>{t.heroTitle[1]}</span></h1>
          <p className="hero-desc">{t.heroDesc}</p>
          <div className="hero-pills">{t.pills.map(p => <span key={p} className="pill">{p}</span>)}</div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <div className="stats-strip">
        <div className="stats-inner">
          {t.stats.map((s, i) => (
            <div key={s.label} className="stat-item">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ─────────────────────────────────────── */}
      <section className="features reveal" id="beneficios">
        <p className="section-label">{t.featuresLabel}</p>
        <h2 className="section-title">{t.featuresTitle.split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}</h2>
        <p className="section-subtitle">{t.featuresSub}</p>
        <div className="features-grid">
          {t.features.map((f, i) => (
            <div key={i} className="feature-card reveal" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="feature-icon">{ICONS[i]}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────── */}
      <section className="benefits-section">
        <div className="benefits-inner">
          <div className="benefits-text reveal">
            <p className="section-label" style={{ textAlign: 'left' }}>{t.benefitsLabel}</p>
            <h2 className="benefits-title">{t.benefitsTitle.split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}</h2>
            <p className="benefits-desc">{t.benefitsDesc}</p>
            <ul className="benefits-list">
              {t.benefitsList.map(b => (
                <li key={b}>
                  <span className="check-icon"><CheckIcon /></span>{b}
                </li>
              ))}
            </ul>
          </div>
          <div className="benefits-visual reveal" style={{ transitionDelay: '120ms' }}>
            <div className="phone-mock">
              <div className="phone-screen">
                <div className="phone-top-bar">
                  <span className="phone-dot" /><span className="phone-dot" /><span className="phone-dot" />
                </div>
                <div className="phone-qr-area">
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#4facfe" strokeWidth="1.5">
                    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                  <p className="phone-scanning">{t.phoneScanning}</p>
                </div>
                <div className="phone-info-rows">
                  {t.phoneRows.map((label, i) => (
                    <div key={label} className="info-row">
                      <span className="info-label">{label}</span>
                      <span className={`info-val${i === 4 ? ' available' : ''}`}>{t.phoneVals[i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className="how-it-works reveal" id="como-funciona">
        <p className="section-label">{t.stepsLabel}</p>
        <h2 className="section-title">{t.stepsTitle}</h2>
        <p className="section-subtitle">{t.stepsSub}</p>
        <div className="steps-grid">
          {t.steps.map((s, i) => (
            <div key={s.n} className="step-card reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="step-number">{s.n}</div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CHART ────────────────────────────────────────── */}
      <section className="chart-section reveal" id="estadisticas">
        <p className="section-label">{t.chartLabel}</p>
        <h2 className="section-title">{t.chartTitle}</h2>
        <p className="section-subtitle">{t.chartSub}</p>
        <div className="chart-card reveal" style={{ transitionDelay: '80ms' }}>

          {/* Header: title + month + legend */}
          <div className="chart-header">
            <div>
              <p className="chart-card-title">
                {t.chartCardTitle}
                <span className="chart-month-badge">{monthLabel}</span>
              </p>
              <p className="chart-card-sub">{lang === 'es' ? 'Datos en tiempo real' : 'Real-time data'}</p>
            </div>
            <div className="chart-legend">
              <span className="legend-item"><span className="legend-bar" />{t.chartLegend[0]}</span>
              <span className="legend-item"><span className="legend-line" />{t.chartLegend[1]}</span>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="chart-filters">
            {FILTERS[lang].map(f => (
              <button
                key={f.key}
                className={`chart-filter-btn${chartFilter === f.key ? ' active' : ''}`}
                onClick={() => changeFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className={`chart-wrap${chartVisible || loading ? ' chart-visible' : ' chart-hidden'}`}>
            {loading ? (
              <div className="chart-loader"><div className="spinner" /></div>
            ) : (
              <UsageChart chartData={activeData} />
            )}
          </div>

          {/* ── New Stats Grid ── */}
          <div className="stats-grid-row">
            <div className={`chart-col ${chartVisible || loading ? 'chart-visible' : 'chart-hidden'}`}>
              <h3 className="chart-col-title">
                {lang === 'es'
                  ? `Top Aulas (${chartFilter === 'dia' ? 'Hoy' : chartFilter === 'mes' ? 'Este mes' : 'Esta semana'})`
                  : `Top Classrooms (${chartFilter === 'dia' ? 'Today' : chartFilter === 'mes' ? 'This month' : 'This week'})`}
              </h3>
              {loading ? <div className="spinner-sm" /> : <ClassroomChart data={activeData.classrooms} />}
            </div>

            <div className={`chart-col ${chartVisible || loading ? 'chart-visible' : 'chart-hidden'}`}>
              <h3 className="chart-col-title">
                {lang === 'es'
                  ? `Dispositivos (${chartFilter === 'dia' ? 'Hoy' : chartFilter === 'mes' ? 'Este mes' : 'Esta semana'})`
                  : `Devices (${chartFilter === 'dia' ? 'Today' : chartFilter === 'mes' ? 'This month' : 'This week'})`}
              </h3>
              {loading ? <div className="spinner-sm" /> : <DeviceChart data={activeData.devices} />}
            </div>
          </div>


          {/* Dynamic footer stats */}
          <div className="chart-footer">
            <span>
              {lang === 'es' ? '📈 Pico: ' : '📈 Peak: '}
              <strong>{peakLabel} · {peakVal >= 1000 ? `${(peakVal / 1000).toFixed(1)}k` : peakVal} {lang === 'es' ? 'escaneos' : 'scans'}</strong>
            </span>
            <span>
              {lang === 'es' ? '📊 Promedio: ' : '📊 Average: '}
              <strong>{avgVal >= 1000 ? `${(avgVal / 1000).toFixed(1)}k` : avgVal} {lang === 'es' ? 'escaneos' : 'scans'}</strong>
            </span>
            <span>
              {lang === 'es' ? '🔢 Total: ' : '🔢 Total: '}
              <strong>{totalScans >= 1000 ? `${(totalScans / 1000).toFixed(1)}k` : totalScans} {lang === 'es' ? 'escaneos' : 'scans'}</strong>
            </span>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────── */}
      <section className="contact-section" id="contacto">
        {/* Banner superior */}
        <div className="contact-banner">
          <span className="contact-banner-text">{t.contactBanner}</span>
        </div>

        <div className="contact-grid">
          {/* Brand col */}
          <div className="contact-brand-col">
            <div className="contact-brand">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4facfe" strokeWidth="2.2">
                <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              <span>Aula<strong>QR</strong></span>
            </div>
            <p className="contact-brand-desc">
              {lang === 'es'
                ? 'Información académica instantánea desde cualquier aula, con solo escanear un código QR.'
                : 'Instant academic information from any classroom, with just a QR code scan.'}
            </p>
            <div className="contact-info-items">
              <a href={`mailto:${t.contactEmail}`} className="contact-info-link">
                <span className="contact-info-icon"><MailIcon /></span>
                {t.contactEmail}
              </a>
              <a href={`tel:${t.contactPhone}`} className="contact-info-link">
                <span className="contact-info-icon"><PhoneIcon /></span>
                {t.contactPhone}
              </a>
            </div>
          </div>

          {/* Link columns */}
          {t.contactCols.map(col => (
            <div key={col.heading} className="contact-col">
              <h4 className="contact-col-heading">{col.heading}</h4>
              <ul className="contact-col-links">
                {col.links.map(lk => <li key={lk}><a href="#">{lk}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="footer">
        <div className="footer-brand">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4facfe" strokeWidth="2.2">
            <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          Aula<span>QR</span>
        </div>
        <p className="footer-copy">{t.footerCopy}</p>
        <button className="lang-toggle lang-toggle-footer" onClick={toggleLang}>
          <GlobeIcon /><span>{lang === 'es' ? '🇺🇸 EN' : '🇪🇸 ES'}</span>
        </button>
      </footer>

    </div>
  )
}

export default App
