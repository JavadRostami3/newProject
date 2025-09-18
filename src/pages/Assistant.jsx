import React from 'react'
import { Send, Sparkles, Lightbulb, BookOpen, Loader2 } from 'lucide-react'

function Suggestion({ text, onClick }) {
  return (
    <button type="button" onClick={() => onClick(text)} className="h-9 px-3 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 text-xs text-neutral-900 outline-none focus-visible:ring-2 focus-visible:ring-accent">
      {text}
    </button>
  )
}

export default function Assistant() {
  const [messages, setMessages] = React.useState([
    { id: 1, role: 'assistant', text: 'سلام! من دستیار هوشمند شما هستم. چطور کمک‌تون کنم؟' },
  ])
  const [input, setInput] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const addMessage = (role, text) => setMessages((prev) => [...prev, { id: Date.now() + Math.random(), role, text }])

  const send = async (text) => {
    const value = (text ?? input).trim()
    if (!value) return
    addMessage('user', value)
    setInput('')
    setLoading(true)
    // Simulate AI reply
    setTimeout(() => {
      addMessage('assistant', 'این یک پاسخ نمونه است. برای اتصال به مدل واقعی بعداً API اضافه می‌کنیم.')
      setLoading(false)
    }, 700)
  }

  const suggestions = ['برنامه هفتگی کلاس را پیشنهاد بده', 'سوال آزمون ریاضی فصل ۲ بساز', 'یک خلاصه برای فتوسنتز بده']

  return (
    <div className="px-4 md:px-8 py-4 flex flex-col lg:flex-row-reverse gap-4">
      {/* Right panel - tips */}
      <aside className="w-full lg:w-[320px] lg:sticky lg:top-4 bg-white rounded-[24px] border border-neutral-300 p-4 md:p-6 h-fit">
        <div className="flex items-center gap-2 text-[18px] md:text-[20px] font-semibold text-black mb-1"><Sparkles className="w-5 h-5" /> ترفندها</div>
        <ul className="list-disc ps-5 text-sm text-neutral-800 space-y-1">
          <li>می‌توانید از من بخواهید سوال، خلاصه یا برنامه تولید کنم.</li>
          <li>با اشاره به کلاس/پایه/درس نتیجه دقیق‌تر می‌شود.</li>
          <li>پاسخ‌ها قابل کپی هستند؛ بعداً دکمه ذخیره اضافه می‌کنیم.</li>
        </ul>
      </aside>

      {/* Chat area */}
  <section className="w-full bg-white rounded-[24px] border border-neutral-300 p-4 md:p-6 flex flex-col min-h-[60vh] text-neutral-900">
        <div className="mb-3">
          <h2 className="text-[18px] md:text-[20px] font-semibold text-black">دستیار هوشمند</h2>
          <p className="text-sm text-neutral-700 mt-1">سوال بپرسید، تمرین و آزمون بسازید، یا خلاصه دریافت کنید.</p>
        </div>
        <div className="flex-1 overflow-auto space-y-3 pe-1">
          {messages.map((m) => (
            <div key={m.id} className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm text-neutral-900 ${m.role === 'assistant' ? 'bg-[#fbfbfc] border border-neutral-200 self-start me-auto' : 'bg-accent/10 border border-accent/40 self-end ms-auto'}`}
                 dir="rtl">
              {m.text}
            </div>
          ))}
          {loading && (
            <div className="max-w-[85%] rounded-2xl px-3 py-2 text-sm text-neutral-900 bg-[#fbfbfc] border border-neutral-200 self-start me-auto inline-flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> در حال نوشتن...
            </div>
          )}
        </div>

        {/* Suggestions */}
        <div className="mt-3 flex flex-wrap gap-2">
          {suggestions.map((s, i) => (
            <Suggestion key={i} text={s} onClick={send} />
          ))}
        </div>

        {/* Input */}
        <form onSubmit={(e)=>{e.preventDefault(); send()}} className="mt-3 flex items-center gap-2">
          <input
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            dir="rtl"
            placeholder="پیام خود را بنویسید..."
            className="flex-1 h-12 rounded-xl border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 caret-accent px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
            style={{ WebkitTextFillColor: '#111827' }}
          />
          <button type="submit" className="h-12 px-4 rounded-xl bg-[#43413D] text-white hover:bg-[#3b3a36] outline-none focus-visible:ring-2 focus-visible:ring-accent"><Send className="w-4 h-4" /></button>
        </form>
      </section>
    </div>
  )
}
