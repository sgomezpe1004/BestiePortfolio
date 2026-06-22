import { useState, useRef, useEffect } from 'react'
import { useLanguage } from './context/LanguageContext.jsx'
import { useUser } from '@clerk/clerk-react'

const SYSTEM_PROMPT = `You are an AI assistant embedded in María Belén Hernández Caro's personal portfolio website. Your job is to help visitors learn about María Belén — her background, experience, skills, projects, and personality.

## ABOUT MARÍA BELÉN HERNÁNDEZ CARO
- **Role:** Estudiante de Negocios Internacionales (6.° Semestre) | Bilingüe (Inglés Avanzado) | Especialista en Atención al Cliente y Liderazgo
- **Location:** Montería, Colombia
- **Contact:** +57 302 2584585 | hdezmaria1004@gmail.com
- **LinkedIn:** Available on her portfolio

## PROFESSIONAL PROFILE
She is a dynamic and proactive International Business student (6th semester) with outstanding communication and leadership skills. She has excellent public speaking abilities, allowing her to convey ideas and projects clearly and effectively. She has solid experience in customer service, direct sales, and teaching English to various age groups. She has proven adaptability, fast learning, and problem-solving skills under pressure. She is goal-oriented and seeking a job opportunity to apply her knowledge in business and global affairs.

## AREAS OF EXPERTISE
- **Commerce & Business:** International trade, global business, market analysis, intercultural negotiation, and company internationalization.
- **Management & Strategy:** Organizational management, economic analysis, event planning, and logistical support.
- **Interpersonal Skills:** Team leadership, effective communication, interpersonal relationships, adaptability, and resilience.

## PROFESSIONAL EXPERIENCE

### Sales Advisor & Customer Service - Cero Pecado (Dessert Island) | June 2026
- Direct contact with consumers, providing personalized advice on the product portfolio.
- Implementation of cross-selling strategies and customer service aimed at meeting daily and monthly sales targets.
- Cash management and maintaining high-quality standards in the shopping experience for customer loyalty.

### English Teacher (Freelance) - Private Education for Children & Adults | Current
- Design, planning, and execution of personalized academic programs adapted to each student's needs and knowledge levels.
- Implementation of dynamic and interactive methodologies to facilitate effective English language learning.
- Continuous development of patience, pedagogical leadership, and assertive communication skills with different demographic groups.

### Logistics & Event Organization Assistant - Various Projects | Project-based
- Coordination of operational activities and comprehensive logistical support before, during, and after events.
- Direct attention to participants, speakers, and guests, ensuring an organized and smooth experience.
- Agile resolution of unforeseen issues and decision-making under pressure to ensure the success of the established schedule.

## EDUCATION
- **Bachelor's in International Business** (6th Semester in progress)
- **Focus:** Market research, international project structuring, macroeconomic analysis, organizational dynamics, and internationalization strategies.
- Development of advanced analytical skills for structured presentation of corporate proposals.

## SKILLS & STRENGTHS

| Professional Skills | Personal Strengths | Languages |
|---------------------|-------------------|-----------|
| Effective Communication | Leadership & Coordination | Spanish: Native |
| Public Speaking & Oratory | Adaptability to Change | English: Advanced (C1/C2) |
| Sales & Negotiation | Fast Learning | |
| Customer Service | Problem Solving | |
| Logistical Planning | Responsibility & Commitment | |
| Teamwork | Interpersonal Relationships | |

## CAREER OBJECTIVE
She aims to establish herself in a competitive business environment where she can actively apply the theoretical knowledge from her International Business studies and enhance her commercial and leadership skills. She seeks to contribute to organizational growth through project management, negotiation, and improvement of corporate or client relationships.

## WHAT TYPES OF JOBS SHE WOULD BE A GREAT FIT FOR:
Based on her skills and experience, she would excel in roles such as:
- International Business Analyst / Intern
- Customer Success Representative / Account Manager
- Sales Representative / Business Development
- Logistics Coordinator / Event Planner
- English Teacher / Bilingual Customer Service Agent
- Marketing Assistant / Market Research Analyst
- Administrative Assistant in multinational companies
- Import/Export Assistant
- Corporate Communications Assistant
- Human Resources Assistant (focus on training & development)

## HOW TO RESPOND:
When visitors ask about María Belén's skills, experience, or what jobs she's qualified for:
1. Be specific and reference her actual experience
2. Highlight her bilingual abilities (English C1/C2) as a major advantage
3. Emphasize her customer service and sales experience
4. Mention her leadership and public speaking skills
5. Suggest specific job roles that match her profile
6. Be warm, professional, and encouraging
7. If they ask about contacting her, provide her email (hdezmaria1004@gmail.com) and phone (+57 302 2584585)

CRITICAL FORMATTING RULES:
- Keep responses short and conversational, like you're chatting with someone
- Maximum 3-4 sentences per response unless they ask for detailed lists
- NEVER use markdown formatting (no **, no ##, no bullet points with •)
- NEVER use tables or structured lists
- Write in plain text only, like a normal conversation
- Be friendly but direct
- If they ask for a list, give it as a simple comma-separated sentence

Answer questions about her warmly and professionally. If you don't know something specific about her that isn't in this context, say so honestly and suggest the visitor explore her portfolio sections or contact her directly.

Keep responses concise, helpful, and engaging. You represent her personal brand, so be thoughtful, clear, and highlight her strengths effectively.`

const i18n = {
  es: {
    chats: 'Chats',
    newChat: 'Nuevo chat',
    deleteChat: 'Eliminar',
    newChatName: 'Nuevo chat',
    welcomeChat: 'Bienvenida',
    portfolioAssistant: 'La asistente de portafolio de Belén',
    askTitle: 'Pregúntame sobre Belén',
    askSubtitle: 'Su experiencia, habilidades, proyectos y más.',
    suggestions: ['¿Cuáles son sus habilidades?', 'Cuéntame sobre su experiencia', '¿Cómo puedo contactarla?'],
    placeholder: 'Pregunta sobre Belén…',
    enterHint: 'Enter para enviar · Shift+Enter para nueva línea',
    errorMsg: 'Algo salió mal. Por favor intenta de nuevo.',
    fallbackMsg: 'Lo siento, no pude responder.',
    chatWithAI: 'Chat con IA',
  },
  en: {
    chats: 'Chats',
    newChat: 'New chat',
    deleteChat: 'Delete',
    newChatName: 'New chat',
    welcomeChat: 'Welcome',
    portfolioAssistant: "Belén's portfolio assistant",
    askTitle: 'Ask me about Belén',
    askSubtitle: 'Her experience, skills, projects, and more.',
    suggestions: ['What are her skills?', 'Tell me about her experience', 'How can I contact her?'],
    placeholder: 'Ask about Belén…',
    enterHint: 'Press Enter to send · Shift+Enter for new line',
    errorMsg: 'Something went wrong. Please try again.',
    fallbackMsg: 'Sorry, I could not respond.',
    chatWithAI: 'Chat with AI',
  },
}

const API_URL = 'http://localhost:3001'

function generateId() {
  return Math.random().toString(36).slice(2, 10)
}

function createSession(name, _id) {
  return {
    id: _id || generateId(),
    name: name || 'New chat',
    messages: [],
    createdAt: Date.now(),
    _id: _id || null,
  }
}

function getInitialSessions(welcomeName) {
  try {
    const saved = localStorage.getItem('ai_sessions')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.length) return parsed
    }
  } catch (e) {
    // Ignorar error
  }
  return [createSession(welcomeName)]
}

function getInitialActiveId(sessions) {
  try {
    const savedActive = localStorage.getItem('ai_active')
    if (savedActive && sessions.find(s => s.id === savedActive)) {
      return savedActive
    }
  } catch (e) {
    // Ignorar error
  }
  return sessions[0]?.id || 'default'
}

// Avatar SVG component
function WomanAvatar({ className = "h-6 w-6", fill = "white" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={fill} className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
    </svg>
  )
}

// Floating bubble
function FloatingBubble({ onClick, hasUnread, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-light-primary shadow-lg transition hover:scale-105 hover:shadow-xl dark:bg-dark-primary"
    >
      {hasUnread && (
        <span className="absolute -right-1 -top-1 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
        </span>
      )}
      <WomanAvatar className="h-6 w-6" />
    </button>
  )
}

// Message bubble
function Message({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      {!isUser && (
        <div className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-light-primary dark:bg-dark-primary">
          <WomanAvatar className="h-4 w-4" />
        </div>
      )}
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'rounded-tr-sm bg-light-primary text-white dark:bg-dark-primary'
            : 'rounded-tl-sm bg-light-hover text-light-text-primary dark:bg-white/[0.06] dark:text-dark-text-primary'
        }`}
      >
        {msg.content}
      </div>
    </div>
  )
}

// Sidebar
function Sidebar({ sessions, activeId, onSelect, onNew, onDelete, t }) {
  return (
    <aside className="flex h-full w-56 shrink-0 flex-col border-r border-light-border bg-white/60 dark:border-dark-primary/15 dark:bg-dark-bg-primary/60">
      <div className="flex items-center justify-between px-4 py-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-light-text-secondary dark:text-dark-text-secondary">
          {t.chats}
        </span>
        <button
          onClick={onNew}
          title={t.newChat}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-light-border bg-white/80 text-light-text-secondary transition hover:bg-light-hover hover:text-light-primary dark:border-dark-primary/15 dark:bg-white/[0.03] dark:text-dark-text-primary dark:hover:border-dark-primary dark:hover:bg-dark-primary/12"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>
        </button>
      </div>

      <ul className="flex-1 overflow-y-auto px-2 pb-4">
        {sessions.map((s) => (
          <li key={s.id} className="group relative mb-1">
            <button
              onClick={() => onSelect(s.id)}
              className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                s.id === activeId
                  ? 'bg-light-hover text-light-primary dark:bg-dark-primary/12 dark:text-dark-text-primary'
                  : 'text-light-text-secondary hover:bg-light-hover/60 hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:bg-white/[0.04] dark:hover:text-dark-text-primary'
              }`}
            >
              <p className="truncate pr-5 font-medium">{s.name}</p>
              <p className="mt-0.5 text-xs opacity-50">
                {new Date(s.createdAt).toLocaleDateString()}
              </p>
            </button>
            {sessions.length > 1 && (
              <button
                onClick={() => onDelete(s._id || s.id)}
                title={t.deleteChat}
                className="absolute right-2 top-2.5 hidden rounded p-0.5 text-light-text-secondary opacity-60 hover:text-red-500 group-hover:flex dark:text-dark-text-secondary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                </svg>
              </button>
            )}
          </li>
        ))}
      </ul>
    </aside>
  )
}

// Main AI component
export default function AI({ embedded = false }) {
  const { language } = useLanguage()
  const t = i18n[language] || i18n.en
  const { user, isSignedIn, isLoaded } = useUser()

  const initialSessions = getInitialSessions(t.welcomeChat)
  const [sessions, setSessions] = useState(initialSessions)
  const [activeId, setActiveId] = useState(() => getInitialActiveId(initialSessions))
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(embedded)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  const activeSession = sessions.find((s) => s.id === activeId) || sessions[0]

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeSession?.messages, open])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open, activeId])

  // Guardar en localStorage siempre que cambien las sesiones
  useEffect(() => {
    try {
      localStorage.setItem('ai_sessions', JSON.stringify(sessions))
      localStorage.setItem('ai_active', activeId)
    } catch (e) {
      // Ignorar error
    }
  }, [sessions, activeId])

  function updateSession(id, updater) {
    setSessions((prev) => prev.map((s) => (s.id === id ? updater(s) : s)))
  }

  async function newSession() {
    // Crear en MongoDB si está autenticado (en segundo plano, no afecta UI)
    if (isSignedIn && user) {
      try {
        const res = await fetch(`${API_URL}/api/sessions/${user.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: t.newChatName }),
        })
        if (res.ok) {
          const dbSession = await res.json()
          const s = {
            id: dbSession._id,
            _id: dbSession._id,
            name: dbSession.name,
            messages: [],
            createdAt: dbSession.createdAt,
          }
          setSessions((prev) => [s, ...prev])
          setActiveId(s.id)
          return
        }
      } catch (error) {
        console.error('Error creating session in DB:', error)
      }
    }
    // Fallback a local
    const s = createSession(t.newChatName)
    setSessions((prev) => [s, ...prev])
    setActiveId(s.id)
  }

  async function deleteSession(id) {
    const sessionToDelete = sessions.find(s => s.id === id || s._id === id)
    
    // Eliminar de MongoDB si está autenticado
    if (isSignedIn && user && sessionToDelete?._id) {
      try {
        await fetch(`${API_URL}/api/sessions/${user.id}/${sessionToDelete._id}`, {
          method: 'DELETE',
        })
      } catch (error) {
        console.error('Error deleting session from DB:', error)
      }
    }

    setSessions((prev) => {
      const next = prev.filter((s) => s.id !== id && s._id !== id)
      if (activeId === id) setActiveId(next[0]?.id)
      return next
    })
  }

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')

    const userMsg = { role: 'user', content: text }
    
    setLoading(true)
    try {
      const currentMessages = [...(activeSession?.messages || []), userMsg]
      
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          messages: currentMessages,
          system: SYSTEM_PROMPT,
        }),
      })
      
      const data = await res.json()
      const reply = data.text || t.fallbackMsg
      
      const assistantMsg = { role: 'assistant', content: reply }
      
      updateSession(activeId, (s) => ({
        ...s,
        messages: [...s.messages, userMsg, assistantMsg],
        name: s.messages.length === 0 ? text.slice(0, 30) : s.name,
      }))

      // Guardar mensajes en MongoDB en segundo plano
      if (isSignedIn && user && activeSession?._id) {
        try {
          await fetch(`${API_URL}/api/sessions/${user.id}/${activeSession._id}/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role: 'user', content: text }),
          })
          await fetch(`${API_URL}/api/sessions/${user.id}/${activeSession._id}/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role: 'assistant', content: reply }),
          })
        } catch (error) {
          console.error('Error saving messages to DB:', error)
        }
      }
    } catch (error) {
      updateSession(activeId, (s) => ({
        ...s,
        messages: [...s.messages, userMsg, { role: 'assistant', content: t.errorMsg }],
      }))
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const chatUI = (
    <div className={`flex h-full flex-col overflow-hidden ${embedded ? '' : 'rounded-2xl border border-light-border shadow-2xl dark:border-dark-primary/20'} bg-white/95 dark:bg-dark-bg-primary/95`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-light-border px-4 py-3 dark:border-dark-primary/15">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-light-primary dark:bg-dark-primary">
            <WomanAvatar className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">Nala</p>
            <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{t.portfolioAssistant}</p>
          </div>
        </div>
        {!embedded && (
          <button
            onClick={() => setOpen(false)}
            className="rounded-full p-1.5 text-light-text-secondary transition hover:bg-light-hover hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:bg-white/[0.06]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        )}
      </div>

      {/* Body: sidebar + messages */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          sessions={sessions}
          activeId={activeId}
          onSelect={setActiveId}
          onNew={newSession}
          onDelete={deleteSession}
          t={t}
        />

        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {activeSession?.messages.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-light-primary/10 dark:bg-dark-primary/15">
                  <WomanAvatar className="h-6 w-6 text-light-primary dark:text-dark-primary" fill="currentColor" />
                </div>
                <div>
                  <p className="font-semibold text-light-text-primary dark:text-dark-text-primary">{t.askTitle}</p>
                  <p className="mt-1 text-xs text-light-text-secondary dark:text-dark-text-secondary">{t.askSubtitle}</p>
                </div>
                <div className="mt-2 flex flex-wrap justify-center gap-2">
                  {t.suggestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => { setInput(q); inputRef.current?.focus() }}
                      className="rounded-full border border-light-border bg-white/80 px-3 py-1.5 text-xs text-light-text-primary transition hover:bg-light-hover dark:border-dark-primary/15 dark:bg-white/[0.03] dark:text-dark-text-primary dark:hover:bg-dark-primary/12"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {activeSession?.messages.map((msg, i) => (
              <Message key={i} msg={msg} />
            ))}
            {loading && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-light-primary dark:bg-dark-primary">
                  <WomanAvatar className="h-4 w-4" />
                </div>
                <div className="flex gap-1 rounded-2xl rounded-tl-sm bg-light-hover px-4 py-3 dark:bg-white/[0.06]">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-light-text-secondary dark:bg-dark-text-secondary [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-light-text-secondary dark:bg-dark-text-secondary [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-light-text-secondary dark:bg-dark-text-secondary [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-light-border p-3 dark:border-dark-primary/15">
            <div className="flex items-end gap-2 rounded-xl border border-light-border bg-white/80 px-3 py-2 dark:border-dark-primary/20 dark:bg-white/[0.04]">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={t.placeholder}
                className="flex-1 resize-none bg-transparent text-sm text-light-text-primary outline-none placeholder:text-light-text-secondary dark:text-dark-text-primary dark:placeholder:text-dark-text-secondary"
                style={{ maxHeight: '120px' }}
                onInput={(e) => {
                  e.target.style.height = 'auto'
                  e.target.style.height = e.target.scrollHeight + 'px'
                }}
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-light-primary text-white transition hover:opacity-90 disabled:opacity-30 dark:bg-dark-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
                </svg>
              </button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-light-text-secondary dark:text-dark-text-secondary">
              {t.enterHint}
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  if (embedded) return (
    <div style={{ height: 'calc(100vh - 64px)' }} className="-mx-6 -my-10 lg:-mx-8">
      {chatUI}
    </div>
  )

  return (
    <>
      {!open && <FloatingBubble onClick={() => setOpen(true)} title={t.chatWithAI} />}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 h-[600px] w-[780px] max-w-[calc(100vw-2rem)]">
          {chatUI}
        </div>
      )}
    </>
  )
}