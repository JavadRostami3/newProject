import React from 'react'
import { Download, Plus, ChevronDown } from 'lucide-react'

const subjects = ['ریاضی', 'علوم', 'فارسی', 'اجتماعی']
const chapters = ['فصل ۱', 'فصل ۲', 'فصل ۳', 'فصل ۴']

const recentContents = [
  { id: 1, type: 'آزمون', title: 'آزمون ریاضی - فصل ۳', time: '۱۵ دقیقه پیش', color: '#3C83F6' },
  { id: 2, type: 'خلاصه', title: 'خلاصه درس فتوسنتز', time: '۲ ساعت پیش', color: '#36D6A0' },
  { id: 3, type: 'آزمون', title: 'آزمون تاریخ', time: 'یک روز پیش', color: '#F97316' },
]

function RecentCard() {
  return (
    <section className="w-full lg:w-[380px] lg:sticky lg:top-4 bg-white rounded-[24px] border border-neutral-300 p-4 md:p-6 flex flex-col gap-4 h-fit" aria-labelledby="recent-title">
      <div className="flex items-center justify-between">
        <div className="text-[18px] md:text-[20px] font-semibold text-black" id="recent-title">محتواهای اخیر</div>
      </div>
      <ul className="flex flex-col gap-2">
        {recentContents.map((c) => (
          <li key={c.id} className="list-none">
            <div className="h-[69px] w-full rounded-2xl bg-[#fbfbfc] flex items-center justify-between px-4">
              <div className="text-start">
                <div className="text-black text-sm font-medium">{c.title}</div>
                <div className="text-xs text-neutral-600 mt-0.5">{c.time}</div>
              </div>
              <div className="flex items-center gap-3">
                <button type="button" aria-label={`دانلود ${c.title}`} className="w-9 h-9 rounded-full border border-neutral-300 grid place-items-center text-neutral-700 bg-white hover:bg-neutral-50 outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  <Download className="w-4 h-4" />
                </button>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button type="button" className="mt-1 h-12 rounded-xl bg-[#43413D] grid place-items-center text-white text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent hover:bg-[#3b3a36]">مشاهده لیست</button>
    </section>
  )
}

export default function Content() {
  const [type, setType] = React.useState('آزمون') // آزمون | خلاصه
  const [subject, setSubject] = React.useState('ریاضی')
  const [mode, setMode] = React.useState('فصل') // فصل | صفحات
  const [selectedChapters, setSelectedChapters] = React.useState([])
  const [pageRange, setPageRange] = React.useState({ from: '', to: '' })
  const [helper, setHelper] = React.useState('')
  const [summaryTopic, setSummaryTopic] = React.useState('')
  const [summaryHelper, setSummaryHelper] = React.useState('')

  // question counts
  const [count, setCount] = React.useState(10)
  const [qTypes, setQTypes] = React.useState({
    چهارگزینه‌ای: 0,
    تشریحی: 0,
    'جای خالی': 0,
    'درست / نادرست': 0,
  })

  const sumTypes = React.useMemo(() => Object.values(qTypes).reduce((a, b) => a + (Number.isFinite(b) ? b : 0), 0), [qTypes])
  const mismatch = sumTypes !== count

  const equalize = () => {
    const keys = Object.keys(qTypes)
    const base = Math.floor(count / keys.length)
    const remainder = count % keys.length
    const next = {}
    keys.forEach((k, i) => {
      next[k] = base + (i < remainder ? 1 : 0)
    })
    setQTypes(next)
  }

  const toggleChapter = (ch) => {
    setSelectedChapters((prev) => prev.includes(ch) ? prev.filter(x => x !== ch) : [...prev, ch])
  }

  const issues = React.useMemo(() => {
    const errs = []
    if (type === 'آزمون') {
      if (mode === 'فصل') {
        if (selectedChapters.length === 0) errs.push('حداقل یک فصل را انتخاب کنید.')
      } else {
        const from = parseInt(pageRange.from, 10)
        const to = parseInt(pageRange.to, 10)
        if (!from || !to) errs.push('بازه صفحات را کامل وارد کنید.')
        else if (from <= 0 || to <= 0) errs.push('شماره صفحات باید بزرگتر از صفر باشد.')
        else if (from > to) errs.push('عدد شروع صفحه نمی‌تواند از عدد پایان بزرگتر باشد.')
      }
      if (count < 1) errs.push('تعداد سوالات باید حداقل ۱ باشد.')
      if (sumTypes !== count) errs.push('مجموع تعداد انواع سوال باید با تعداد کل برابر باشد.')
    } else {
      if (!summaryTopic.trim()) errs.push('مبحث یا بازه صفحات خلاصه را وارد کنید.')
    }
    return errs
  }, [type, mode, selectedChapters, pageRange, count, sumTypes, summaryTopic])

  const onGenerate = (e) => {
    e.preventDefault()
    if (issues.length > 0) return
    alert(`${type} ایجاد شد!`) // Placeholder; hook into API later
  }

  return (
    <div className="px-4 md:px-8 py-4 flex flex-col lg:flex-row-reverse gap-4">
      <RecentCard />

      <section className="w-full bg-white rounded-[24px] border border-neutral-300 p-4 md:p-6" aria-labelledby="gen-title">
        <div className="flex items-center justify-between mb-2">
          <h2 id="gen-title" className="text-[18px] md:text-[20px] font-semibold text-black">تولید محتوا (Generate Content)</h2>
        </div>
        <form onSubmit={onGenerate} className="grid grid-cols-1 gap-4">
          {/* نوع محتوا */}
          <div>
            <label className="block text-sm text-neutral-600 mb-1">نوع محتوا (Content Type)</label>
            <div className="relative">
              <select value={type} onChange={(e) => setType(e.target.value)} className="w-full h-11 rounded-xl border border-neutral-300 bg-white px-3 pe-8 text-sm text-neutral-800 outline-none focus-visible:ring-2 focus-visible:ring-accent appearance-none">
                <option>آزمون</option>
                <option>خلاصه درس</option>
              </select>
              <ChevronDown className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* آزمون */}
          {type === 'آزمون' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-neutral-600 mb-1">موضوع آزمون</label>
                <div className="relative">
                  <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full h-11 rounded-xl border border-neutral-300 bg-white px-3 pe-8 text-sm text-neutral-800 outline-none focus-visible:ring-2 focus-visible:ring-accent appearance-none">
                    {subjects.map(s => <option key={s}>{s}</option>)}
                  </select>
                  <ChevronDown className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-neutral-600 mb-1">روش انتخاب محتوا</label>
                <div className="flex items-center gap-2 h-11">
                  <label className="inline-flex items-center cursor-pointer">
                    <input name="content-mode" type="radio" checked={mode === 'فصل'} onChange={() => setMode('فصل')} className="peer sr-only" />
                    <span className="inline-flex items-center h-9 px-3 rounded-full border border-neutral-300 bg-white text-sm text-neutral-800 hover:bg-neutral-50 peer-checked:border-accent peer-checked:bg-accent/10 peer-checked:text-neutral-900 outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-accent">انتخاب بر اساس فصل‌ها</span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input name="content-mode" type="radio" checked={mode === 'صفحات'} onChange={() => setMode('صفحات')} className="peer sr-only" />
                    <span className="inline-flex items-center h-9 px-3 rounded-full border border-neutral-300 bg-white text-sm text-neutral-800 hover:bg-neutral-50 peer-checked:border-accent peer-checked:bg-accent/10 peer-checked:text-neutral-900 outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-accent">انتخاب بر اساس بازه صفحات</span>
                  </label>
                </div>
              </div>

              {mode === 'فصل' ? (
                <div className="md:col-span-2">
                  <label className="block text-sm text-neutral-600 mb-1">فصل‌ها</label>
                  <div className="flex flex-wrap gap-2">
                    {chapters.map(ch => (
                      <button type="button" key={ch} onClick={() => toggleChapter(ch)} className={`h-9 px-3 rounded-full border text-sm ${selectedChapters.includes(ch) ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'} outline-none focus-visible:ring-2 focus-visible:ring-accent`}>{ch}</button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-neutral-600 mb-1">از صفحه</label>
                    <input type="number" min={1} aria-invalid={issues.some(x=>x.includes('صفحات'))} value={pageRange.from} onChange={(e) => {
                      const v = e.target.value
                      setPageRange(r => ({ ...r, from: v }))
                    }} className="w-full h-11 rounded-xl border border-neutral-300 bg-white text-neutral-800 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent" placeholder="10" />
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-600 mb-1">تا صفحه</label>
                    <input type="number" min={1} aria-invalid={issues.some(x=>x.includes('صفحات'))} value={pageRange.to} onChange={(e) => {
                      const v = e.target.value
                      setPageRange(r => ({ ...r, to: v }))
                    }} className="w-full h-11 rounded-xl border border-neutral-300 bg-white text-neutral-800 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent" placeholder="25" />
                  </div>
                </div>
              )}

              <div className="md:col-span-2">
                <label className="block text-sm text-neutral-600 mb-1">متن راهنما</label>
                <textarea value={helper} onChange={(e) => setHelper(e.target.value)} rows={4} className="w-full rounded-xl border border-neutral-300 bg-white text-neutral-800 p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent" placeholder="مشخص کنید در تولید آزمون به چه نکاتی توجه شود..." />
              </div>

              {/* سوالات */}
              <div className="md:col-span-2">
                <label className="block text-sm text-neutral-600 mb-1">تعداد سوالات</label>
                <div className="relative">
                  <input type="number" min={1} value={count} onChange={(e) => {
                    const n = Math.max(1, parseInt(e.target.value || '1', 10))
                    setCount(n)
                  }} className="w-full h-11 rounded-xl border border-neutral-300 bg-white text-neutral-800 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent" />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-neutral-600 mb-1">درون‌ریزی انواع سوال</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {Object.keys(qTypes).map((k) => (
                    <div key={k} className="flex items-center gap-3 rounded-xl border border-neutral-300 p-2">
                      <span className="text-sm text-neutral-700 flex-1">{k}</span>
                      <input type="number" min={0} value={qTypes[k]} onChange={(e) => {
                        const v = parseInt(e.target.value || '0', 10)
                        setQTypes(prev => ({ ...prev, [k]: Math.max(0, Number.isFinite(v) ? v : 0) }))
                      }} className="h-10 w-20 rounded-lg border border-neutral-300 bg-white text-neutral-800 px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent" />
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className={`text-xs ${mismatch ? 'text-[#D4151C]' : 'text-neutral-600'}`}>مجموع انواع: {sumTypes} از {count}</div>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={equalize} className="h-9 px-3 rounded-full border border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-50 outline-none focus-visible:ring-2 focus-visible:ring-accent text-xs">تقسیم مساوی</button>
                    <button type="button" onClick={() => setQTypes({ چهارگزینه‌ای: 0, تشریحی: 0, 'جای خالی': 0, 'درست / نادرست': 0 })} className="h-9 px-3 rounded-full border border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-50 outline-none focus-visible:ring-2 focus-visible:ring-accent text-xs">پاک کردن</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* خلاصه درس */}
          {type === 'خلاصه درس' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm text-neutral-600 mb-1">مبحث یا بازه صفحات</label>
                <input value={summaryTopic} onChange={(e)=>setSummaryTopic(e.target.value)} className="w-full h-11 rounded-xl border border-neutral-300 bg-white text-neutral-800 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent" placeholder="مثلاً: فصل ۲ - از صفحه ۱۰ تا ۲۵" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-neutral-600 mb-1">متن راهنما</label>
                <textarea value={summaryHelper} onChange={(e)=>setSummaryHelper(e.target.value)} rows={4} className="w-full rounded-xl border border-neutral-300 bg-white text-neutral-800 p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent" placeholder="مشخص کنید در تولید خلاصه درس به چه نکاتی توجه شود..." />
              </div>
            </div>
          )}

          {issues.length > 0 && (
            <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm p-3">
              <ul className="list-disc ps-5">
                {issues.map((m,i)=>(<li key={i}>{m}</li>))}
              </ul>
            </div>
          )}

          <div className="mt-2">
            <button type="submit" disabled={issues.length>0} className={`w-full h-12 px-6 rounded-xl text-white outline-none focus-visible:ring-2 focus-visible:ring-accent ${issues.length>0 ? 'bg-neutral-400 cursor-not-allowed' : 'bg-[#43413D] hover:bg-[#3b3a36]'}`}>تولید {type === 'آزمون' ? 'آزمون' : 'خلاصه'}</button>
          </div>
        </form>
      </section>
    </div>
  )
}
