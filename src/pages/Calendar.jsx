import React from 'react'
import dayjs from 'dayjs'
import jalaliday from 'jalaliday'
import 'dayjs/locale/fa'
import { ChevronRight, ChevronLeft, Plus, X } from 'lucide-react'

dayjs.extend(jalaliday)
dayjs.locale('fa')

const weekDayLabels = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه']

const toFaDigits = (input) => String(input).replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])

function useJMonth(initial) {
  const [month, setMonth] = React.useState(initial || dayjs().calendar('jalali'))
  const goPrev = () => setMonth((m) => m.calendar('jalali').subtract(1, 'month'))
  const goNext = () => setMonth((m) => m.calendar('jalali').add(1, 'month'))
  const goToday = () => setMonth(dayjs().calendar('jalali'))
  return { month, setMonth, goPrev, goNext, goToday }
}

function buildMonthGrid(month) {
  const firstOfMonth = month.calendar('jalali').startOf('month')
  // Convert to Gregorian day index and shift so Saturday=0
  const gregDay = firstOfMonth.day() // 0=Sun..6=Sat
  const satIndex = (gregDay + 1) % 7 // 0 for Sat
  const gridStart = firstOfMonth.subtract(satIndex, 'day')
  const days = []
  for (let i = 0; i < 42; i++) {
    days.push(gridStart.add(i, 'day'))
  }
  return days
}

function isSameJMonth(a, b) {
  const aj = a.calendar('jalali')
  const bj = b.calendar('jalali')
  return aj.year() === bj.year() && aj.month() === bj.month()
}

function startOfDayTs(d) {
  return d.startOf('day').valueOf()
}

export default function Calendar() {
  const { month, goPrev, goNext, goToday } = useJMonth()
  const today = dayjs()
  const days = buildMonthGrid(month)

  const [events, setEvents] = React.useState([])
  const [selectedTs, setSelectedTs] = React.useState(null)
  const [modal, setModal] = React.useState({ open: false, ts: null, title: '', type: 'meeting' })

  const openAdd = (d) => {
    setModal({ open: true, ts: startOfDayTs(d), title: '', type: 'meeting' })
  }
  const closeModal = () => setModal((m) => ({ ...m, open: false }))
  const addEvent = (e) => {
    e.preventDefault()
    if (!modal.title.trim()) return
    setEvents((prev) => [
      ...prev,
      { id: Date.now(), ts: modal.ts, title: modal.title.trim(), type: modal.type },
    ])
    setModal({ open: false, ts: null, title: '', type: 'meeting' })
  }

  const eventsByTs = React.useMemo(() => {
    const map = new Map()
    for (const ev of events) {
      const list = map.get(ev.ts) || []
      list.push(ev)
      map.set(ev.ts, list)
    }
    return map
  }, [events])

  const monthLabel = toFaDigits(month.calendar('jalali').format('YYYY MMMM'))

  const sidebarEvents = React.useMemo(() => {
    if (selectedTs) return { title: 'رویدادهای روز', list: eventsByTs.get(selectedTs) || [] }
    // Show all events in this month if none selected
    const start = month.calendar('jalali').startOf('month').startOf('day').valueOf()
    const end = month.calendar('jalali').endOf('month').endOf('day').valueOf()
    return {
      title: 'رویدادهای این ماه',
      list: events.filter((ev) => ev.ts >= start && ev.ts <= end).sort((a,b)=>a.ts-b.ts),
    }
  }, [selectedTs, eventsByTs, events, month])

  const typeColor = (t) => {
    switch (t) {
      case 'exam': return '#3C83F6'
      case 'homework': return '#36D6A0'
      case 'meeting': return '#F97316'
      default: return '#9CA3AF'
    }
  }

  return (
    <div className="px-4 md:px-8 py-4 flex flex-col lg:flex-row-reverse gap-4">
      {/* Events Sidebar */}
      <aside className="w-full lg:w-[360px] lg:sticky lg:top-4 bg-white rounded-[24px] border border-neutral-300 p-4 md:p-6 h-fit">
        <div className="text-[18px] md:text-[20px] font-semibold text-black mb-2">{sidebarEvents.title}</div>
        {sidebarEvents.list.length === 0 ? (
          <div className="text-sm text-neutral-600">رویدادی برای نمایش نیست.</div>
        ) : (
          <ul className="flex flex-col gap-2">
            {sidebarEvents.list.map((ev) => (
              <li key={ev.id} className="list-none">
                <div className="h-[60px] w-full rounded-2xl bg-[#fbfbfc] flex items-center justify-between px-4">
                  <div className="text-start">
                    <div className="text-black text-sm font-medium">{ev.title}</div>
                    <div className="text-xs text-neutral-700 mt-0.5">{toFaDigits(dayjs(ev.ts).calendar('jalali').format('YYYY/MM/DD'))}</div>
                  </div>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: typeColor(ev.type) }} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </aside>

      {/* Main calendar */}
      <section className="w-full bg-white rounded-[24px] border border-neutral-300 p-4 md:p-6">
        {/* Page title */}
        <div className="mb-3">
          <h2 className="text-[18px] md:text-[20px] font-semibold text-black">تقویم و برنامه‌ها</h2>
          <p className="text-sm text-neutral-700 mt-1">نمای ماهانه بر اساس تقویم هجری شمسی (شروع هفته از شنبه)</p>
        </div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button type="button" onClick={goNext} className="w-10 h-10 rounded-full border border-neutral-300 grid place-items-center hover:bg-neutral-50 outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label="ماه بعد"><ChevronRight className="w-5 h-5 text-neutral-700" /></button>
            <button type="button" onClick={goPrev} className="w-10 h-10 rounded-full border border-neutral-300 grid place-items-center hover:bg-neutral-50 outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label="ماه قبل"><ChevronLeft className="w-5 h-5 text-neutral-700" /></button>
            <button type="button" onClick={goToday} className="h-10 px-3 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 text-sm font-medium text-neutral-800 outline-none focus-visible:ring-2 focus-visible:ring-accent">امروز</button>
          </div>
          <div className="text-[18px] md:text-[20px] font-semibold text-black">{monthLabel}</div>
        </div>

        {/* Weekday header */}
        <div className="grid grid-cols-7 gap-2 text-center mb-2">
          {weekDayLabels.map((w, i) => (
            <div key={i} className="text-xs md:text-sm text-neutral-700 py-1">{w}</div>
          ))}
        </div>

        {/* Month grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((d, idx) => {
            const inMonth = isSameJMonth(d, month)
            const ts = startOfDayTs(d)
            const isToday = startOfDayTs(today) === ts
            const list = eventsByTs.get(ts) || []
            return (
              <div key={idx} className={`group relative rounded-2xl border ${inMonth ? 'border-neutral-200 bg-white' : 'border-neutral-100 bg-neutral-50'} p-2 min-h-[110px] flex flex-col gap-1 hover:shadow-sm`}
                   onMouseEnter={()=>{}} onMouseLeave={()=>{}}
              >
                <div className="flex items-center justify-between">
                  <button type="button" onClick={() => setSelectedTs(ts)} className={`text-sm font-medium ${inMonth ? 'text-neutral-800' : 'text-neutral-500'}`}>
                    {toFaDigits(d.calendar('jalali').format('D'))}
                  </button>
                  {isToday && <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true"></span>}
                </div>
                {/* Events chips */}
                <div className="flex flex-col gap-1 mt-1">
                  {list.slice(0, 3).map(ev => (
                    <div key={ev.id} className="h-6 rounded-md bg-[#fbfbfc] border border-neutral-200 px-2 text-xs flex items-center justify-between">
                      <span className="truncate">{ev.title}</span>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: typeColor(ev.type) }} />
                    </div>
                  ))}
                  {list.length > 3 && (
                    <div className="text-[11px] text-neutral-500">+{list.length - 3} مورد دیگر</div>
                  )}
                </div>
                {/* Hover + add button */}
                <button
                  type="button"
                  onClick={() => openAdd(d)}
                  className="absolute top-2 left-2 w-7 h-7 rounded-full border border-neutral-300 bg-white hidden group-hover:grid place-items-center hover:bg-neutral-50 outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="افزودن رویداد"
                >
                  <Plus className="w-4 h-4 text-neutral-700" />
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* Add Event Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/40" onClick={closeModal}></div>
          <div className="absolute inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-24 w-auto md:w-[520px] bg-white rounded-2xl border border-neutral-300 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-base font-semibold text-black">افزودن رویداد</div>
              <button type="button" onClick={closeModal} className="w-9 h-9 rounded-full border border-neutral-300 grid place-items-center hover:bg-neutral-50"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={addEvent} className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-sm text-neutral-600 mb-1">عنوان رویداد</label>
                <input value={modal.title} onChange={(e)=>setModal(m=>({...m,title:e.target.value}))} className="w-full h-11 rounded-xl border border-neutral-300 bg-white text-neutral-800 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent" required />
              </div>
              <div>
                <label className="block text-sm text-neutral-600 mb-1">نوع</label>
                <select value={modal.type} onChange={(e)=>setModal(m=>({...m,type:e.target.value}))} className="w-full h-11 rounded-xl border border-neutral-300 bg-white text-neutral-800 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  <option value="exam">آزمون</option>
                  <option value="homework">تکلیف</option>
                  <option value="meeting">جلسه</option>
                </select>
              </div>
              <div className="flex items-center justify-end gap-2 mt-1">
                <button type="button" onClick={closeModal} className="h-11 px-4 rounded-full border border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-50">انصراف</button>
                <button type="submit" className="h-11 px-5 rounded-xl bg-[#43413D] text-white hover:bg-[#3b3a36]">افزودن</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
