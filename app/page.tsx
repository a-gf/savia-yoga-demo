"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const classes = [
  { icon: "☼", title: "Hatha suave", text: "Posturas conscientes y respiración para comenzar con calma.", level: "Todos los niveles", time: "60 min" },
  { icon: "◌", title: "Vinyasa flow", text: "Movimiento fluido para cultivar fuerza, presencia y energía.", level: "Nivel intermedio", time: "60 min" },
  { icon: "☾", title: "Yin restaurativo", text: "Una práctica lenta y profunda para liberar tensión y descansar.", level: "Todos los niveles", time: "75 min" },
];

const schedule = [
  ["Lun", "7:00", "Hatha suave", "18:30", "Vinyasa flow"],
  ["Mar", "8:00", "Vinyasa flow", "19:00", "Yin restaurativo"],
  ["Mié", "7:00", "Hatha suave", "18:30", "Vinyasa flow"],
  ["Jue", "8:00", "Vinyasa flow", "19:00", "Yin restaurativo"],
  ["Vie", "7:00", "Hatha suave", "17:30", "Yin restaurativo"],
  ["Sáb", "9:00", "Hatha suave", "10:30", "Vinyasa flow"],
];

const plans = [
  { name: "Clase suelta", price: "$35.000", note: "Para venir a tu ritmo", features: ["1 clase presencial", "Válida por 30 días"] },
  { name: "Raíz", price: "$120.000", note: "Tu práctica semanal", features: ["4 clases al mes", "Reserva anticipada", "10% en talleres"], featured: true },
  { name: "Florece", price: "$195.000", note: "Para crear constancia", features: ["8 clases al mes", "Reserva anticipada", "15% en talleres"] },
];

const faqs = [
  ["¿Necesito experiencia previa?", "No. Hatha suave y Yin restaurativo son ideales para comenzar, y nuestras profesoras ofrecen variaciones para cada cuerpo."],
  ["¿Debo llevar mi propio mat?", "Puedes traerlo, pero contamos con mats y elementos de apoyo sin costo adicional."],
  ["¿Cómo reservo una clase?", "Puedes reservar desde esta página. La reserva queda confirmada al completar el pago."],
  ["¿Puedo cancelar o reprogramar?", "Sí. Puedes reprogramar sin costo hasta 6 horas antes de la clase. Después de ese plazo, la clase se considera utilizada."],
  ["¿Dónde están ubicados?", "Estamos en Calle 12 #34–56, barrio Granada, Cali. La información es ficticia y hace parte de esta demostración."],
];

type Message = { role: "user" | "assistant"; text: string };

function renderMessage(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={index}>{part.slice(2, -2)}</strong>
      : part
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hola, soy Alma ✦ ¿Qué te gustaría saber sobre nuestras clases, horarios o planes?" },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, loading]);

  async function sendMessage(e: FormEvent) {
    e.preventDefault();
    const question = input.trim();
    if (!question || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: question }]);
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, sessionId: getSessionId() }),
      });
      const data = await response.json();
      setMessages((m) => [...m, { role: "assistant", text: data.answer }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", text: "No pude conectarme en este momento. Inténtalo de nuevo en unos minutos." }]);
    } finally { setLoading(false); }
  }

  return (
    <main>
      <header className="site-header">
        <a className="logo" href="#inicio" aria-label="Savia, inicio">Savia<span>.</span></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">{menuOpen ? "×" : "☰"}</button>
        <nav className={menuOpen ? "open" : ""}>
          {["Inicio", "Clases", "Horarios", "Precios", "FAQ"].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
        </nav>
        <a className="header-cta" href="#precios">Reservar</a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-bg" />
        <div className="hero-content">
          <p className="eyebrow">Yoga · bienestar · comunidad</p>
          <h1>Respira.<br />Conecta.<br />Vuelve a ti.</h1>
          <p className="hero-copy">Clases de yoga y bienestar para habitar tu cuerpo, calmar tu mente y cultivar equilibrio.</p>
          <div className="actions"><a className="button primary" href="#precios">Reserva tu clase</a><a className="button ghost" href="#clases">Explorar clases</a></div>
        </div>
        <div className="scroll-hint">Descubre <span>↓</span></div>
      </section>

      <section className="intro section-pad">
        <div><p className="eyebrow dark">Un espacio para ti</p><h2>No tienes que ser flexible.<br /><em>Solo tienes que llegar.</em></h2></div>
        <div className="intro-copy"><p>En Savia creemos que el yoga no se trata de alcanzar una postura perfecta, sino de aprender a escucharte. Te acompañamos con prácticas amables, grupos pequeños y profesoras certificadas.</p><div className="stats"><span><b>8</b> cupos por clase</span><span><b>3</b> estilos de yoga</span><span><b>6</b> días a la semana</span></div></div>
      </section>

      <section className="classes section-pad" id="clases">
        <div className="section-heading"><div><p className="eyebrow">Encuentra tu práctica</p><h2>Clases para cada momento</h2></div><p>Escucha lo que necesitas hoy. Siempre puedes cambiar de ritmo mañana.</p></div>
        <div className="class-grid">{classes.map((c, i) => <article className="class-card" key={c.title}><span className="class-number">0{i + 1}</span><span className="class-icon">{c.icon}</span><h3>{c.title}</h3><p>{c.text}</p><div><span>{c.level}</span><span>{c.time}</span></div></article>)}</div>
      </section>

      <section className="schedule section-pad" id="horarios">
        <div className="section-heading"><div><p className="eyebrow dark">Organiza tu semana</p><h2>Horarios</h2></div><p>Clases presenciales en grupos de máximo 8 personas.</p></div>
        <div className="schedule-list">{schedule.map((row) => <div className="schedule-row" key={row[0]}><b>{row[0]}</b><span><small>{row[1]}</small>{row[2]}</span><span><small>{row[3]}</small>{row[4]}</span><a href="#precios" aria-label={`Reservar el ${row[0]}`}>Reservar →</a></div>)}</div>
      </section>

      <section className="pricing section-pad" id="precios">
        <div className="pricing-title"><p className="eyebrow">Elige tu ritmo</p><h2>Una práctica que cabe<br />en tu vida</h2><p>Todos los planes incluyen mats y elementos de apoyo. Sin contratos ni permanencia.</p></div>
        <div className="plans">{plans.map((p) => <article key={p.name} className={`plan ${p.featured ? "featured" : ""}`}>{p.featured && <span className="tag">Más elegido</span>}<h3>{p.name}</h3><p>{p.note}</p><div className="price">{p.price}<small> COP</small></div><ul>{p.features.map(f => <li key={f}>✓ {f}</li>)}</ul><button onClick={() => setChatOpen(true)}>Elegir este plan</button></article>)}</div>
      </section>

      <section className="faq section-pad" id="faq">
        <div><p className="eyebrow dark">Antes de tu primera clase</p><h2>Preguntas frecuentes</h2><p>Si no encuentras lo que buscas, Alma puede ayudarte.</p><button className="text-link" onClick={() => setChatOpen(true)}>Pregúntale a Alma →</button></div>
        <div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
      </section>

      <footer><div className="logo">Savia<span>.</span></div><p>Un lugar para volver a ti.</p><div><span>Calle 12 #34–56 · Cali</span><span>Lun–Sáb · 7:00–20:00</span><span>hola@saviayoga.demo</span></div><small>Proyecto demostrativo · La información del negocio es ficticia.</small></footer>

      <button className={`chat-launcher ${chatOpen ? "active" : ""}`} onClick={() => setChatOpen(!chatOpen)} aria-label="Abrir asistente">{chatOpen ? "×" : "◌"}<span>¿Tienes preguntas?</span></button>
      {chatOpen && <aside className="chat-panel" aria-label="Chat con Alma">
        <div className="chat-head"><div className="avatar">A</div><div><b>Alma</b><small><i /> Asistente de Savia</small></div><button onClick={() => setChatOpen(false)}>×</button></div>
        <div className="chat-messages">{messages.map((m, i) => <div key={i} className={`message ${m.role}`}>{renderMessage(m.text)}</div>)}{loading && <div className="message assistant typing">•••</div>}<div ref={endRef} /></div>
        <div className="suggestions">{["¿Cuánto cuesta?", "¿Hay clases para principiantes?"].map(q => <button key={q} onClick={() => setInput(q)}>{q}</button>)}</div>
        <form onSubmit={sendMessage}><input value={input} onChange={e => setInput(e.target.value)} placeholder="Escribe tu pregunta…" aria-label="Tu pregunta" /><button disabled={loading} aria-label="Enviar">↑</button></form>
        <small className="chat-note">Alma responde con la información de Savia.</small>
      </aside>}
    </main>
  );
}

function getSessionId() {
  if (typeof window === "undefined") return "web-session";
  let id = sessionStorage.getItem("savia-session");
  if (!id) { id = crypto.randomUUID(); sessionStorage.setItem("savia-session", id); }
  return id;
}
