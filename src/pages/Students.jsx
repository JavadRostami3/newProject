import React from 'react'
import { Search, UserPlus, Eye, Pencil, Trash2, MoreHorizontal, Filter, ArrowUpDown, ChevronUp, ChevronDown, X } from 'lucide-react'

const mockStudents = [
  { id: 1, name: 'علیرضا محمدی', grade: 'دوازدهم ریاضی', email: 'alireza@example.com', last: '۲ ساعت پیش', status: 'فعال' },
  { id: 2, name: 'نگار احمدی', grade: 'یازدهم تجربی', email: 'negar@example.com', last: 'امروز', status: 'در حال بررسی' },
  { id: 3, name: 'سینا کاظمی', grade: 'دهم انسانی', email: 'sina@example.com', last: '۴ روز پیش', status: 'غیرفعال' },
  { id: 4, name: 'هدی رضایی', grade: 'یازدهم ریاضی', email: 'hoda@example.com', last: 'دیروز', status: 'فعال' },
  { id: 5, name: 'محمد پارسا', grade: 'دوازدهم تجربی', email: 'parsa@example.com', last: '۵ ساعت پیش', status: 'فعال' },
  { id: 6, name: 'رها مرادی', grade: 'دهم ریاضی', email: 'raha@example.com', last: '۱ هفته پیش', status: 'غیرفعال' },
  { id: 7, name: 'مهسا کریمی', grade: 'یازدهم انسانی', email: 'mahsa@example.com', last: '۲ روز پیش', status: 'در حال بررسی' },
  { id: 8, name: 'آرین بهرامی', grade: 'دوازدهم هنر', email: 'arian@example.com', last: '۳ ساعت پیش', status: 'فعال' },
]

function StatusPill({ status }) {
  const color = status === 'فعال' ? 'bg-emerald-100 text-emerald-700' : status === 'در حال بررسی' ? 'bg-amber-100 text-amber-700' : 'bg-neutral-200 text-neutral-700'
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${color}`}>{status}</span>
}

export default function Students() {
  const [students, setStudents] = React.useState(() => [...mockStudents])
  const [query, setQuery] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState('همه')
  const [gradeFilter, setGradeFilter] = React.useState('همه')
  const [sortKey, setSortKey] = React.useState('name')
  const [sortDir, setSortDir] = React.useState('asc')
  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(8)
  const [openAdd, setOpenAdd] = React.useState(false)
  const [form, setForm] = React.useState({ firstName: '', lastName: '', grade: '' })
  const [viewStudent, setViewStudent] = React.useState(null)
  const [editStudent, setEditStudent] = React.useState(null)
  const [menuForId, setMenuForId] = React.useState(null)

  const grades = React.useMemo(() => ['همه', ...Array.from(new Set(students.map(s => s.grade)))], [students])

  const toEnglishDigits = (str) => str.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
  const lastToValue = (str) => {
    const s = toEnglishDigits(str)
    if (s.includes('امروز')) return 0
    if (s.includes('دیروز')) return 24 * 60
    const numMatch = s.match(/(\d+)/)
    const n = numMatch ? parseInt(numMatch[1], 10) : 999999
    if (s.includes('ساعت')) return n * 60
    if (s.includes('روز')) return n * 24 * 60
    if (s.includes('هفته')) return n * 7 * 24 * 60
    return n
  }

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    let arr = students.filter(s =>
      (!q || [s.name, s.grade, s.email].some(v => v.toLowerCase().includes(q))) &&
      (statusFilter === 'همه' || s.status === statusFilter) &&
      (gradeFilter === 'همه' || s.grade === gradeFilter)
    )
    // sorting
    arr = arr.slice().sort((a, b) => {
      let av, bv
      switch (sortKey) {
        case 'grade':
          av = a.grade; bv = b.grade; break
        case 'last':
          av = lastToValue(a.last); bv = lastToValue(b.last); break
        case 'status':
          av = a.status; bv = b.status; break
        default:
          av = a.name; bv = b.name
      }
      if (av < bv) return sortDir === 'asc' ? -1 : 1
      if (av > bv) return sortDir === 'asc' ? 1 : -1
      return 0
    })
    return arr
  }, [students, query, statusFilter, gradeFilter, sortKey, sortDir])

  const total = filtered.length
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(page, pageCount)
  const paged = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, currentPage, pageSize])

  // Selection removed per request

  const headerSort = (key) => {
    if (sortKey === key) setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortKey(key); setSortDir('asc') }
  }

  const deleteOne = (id) => setStudents(prev => prev.filter(s => s.id !== id))

  const onAddSubmit = (e) => {
    e.preventDefault()
    const id = Math.max(0, ...students.map(s => s.id)) + 1
    const name = `${form.firstName.trim()} ${form.lastName.trim()}`.trim()
    setStudents(prev => [{ id, name, grade: form.grade.trim(), email: '', status: 'فعال', last: 'امروز' }, ...prev])
    setForm({ firstName: '', lastName: '', grade: '' })
    setOpenAdd(false)
  }

  const nameSplit = (fullName) => {
    const parts = (fullName || '').trim().split(/\s+/)
    if (parts.length === 0) return { firstName: '', lastName: '' }
    if (parts.length === 1) return { firstName: parts[0], lastName: '' }
    const lastName = parts.pop()
    return { firstName: parts.join(' '), lastName }
  }

  const onEditSubmit = (e) => {
    e.preventDefault()
    if (!editStudent) return
    const { firstName, lastName, grade, email, status } = editStudent
    const name = `${firstName.trim()} ${lastName.trim()}`.trim()
    setStudents(prev => prev.map(s => (s.id === editStudent.id ? { ...s, name, grade: grade.trim(), email: email || '', status } : s)))
    setEditStudent(null)
  }

  const toggleStatus = (s) => {
    const next = s.status === 'فعال' ? 'غیرفعال' : 'فعال'
    setStudents(prev => prev.map(x => (x.id === s.id ? { ...x, status: next } : x)))
  }

  const getPerformance = (s) => {
    const subjects = ['ریاضی', 'علوم', 'ادبیات']
    const scores = subjects.map((_, i) => {
      const seed = (s.id * 13 + i * 7) % 20
      return 10 + (seed % 11) // 10..20
    })
    const avg = Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100) / 100
    return { subjects, scores, avg }
  }

  return (
    <section className="px-4 md:px-8 py-4">
      <div className="bg-white rounded-[24px] border border-neutral-300 p-4 md:p-6 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-semibold text-black">دانش آموزان</h1>
            <span className="text-xs md:text-sm text-neutral-500">{total} نتیجه</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-72 h-11">
              <input
                type="text"
                dir="rtl"
                className="w-full h-full rounded-full border border-neutral-300 bg-white pe-10 ps-4 text-sm text-neutral-700 outline-none focus-visible:ring-2 focus-visible:ring-accent"
                placeholder="جستجو بین دانش‌آموزان..."
                aria-label="جستجو"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1) }}
              />
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
            </div>
            <button type="button" className="h-11 px-4 rounded-full border border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-50 outline-none focus-visible:ring-2 focus-visible:ring-accent flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span className="text-sm">فیلتر</span>
            </button>
            <button type="button" onClick={() => setOpenAdd(true)} className="h-11 px-4 rounded-full bg-[#43413D] text-white hover:bg-[#3b3a36] outline-none focus-visible:ring-2 focus-visible:ring-accent flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              <span className="text-sm">دانش‌آموز جدید</span>
            </button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {['همه', 'فعال', 'در حال بررسی', 'غیرفعال'].map(s => (
            <button
              key={s}
              type="button"
              onClick={() => { setStatusFilter(s); setPage(1) }}
              className={`h-9 px-3 rounded-full border text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent ${statusFilter === s ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'}`}
              aria-pressed={statusFilter === s}
            >
              {s}
            </button>
          ))}

          <div className="ms-auto flex items-center gap-2 w-full sm:w-auto">
            <label className="text-sm text-neutral-600" htmlFor="grade-filter">پایه/رشته:</label>
            <select id="grade-filter" value={gradeFilter} onChange={(e) => { setGradeFilter(e.target.value); setPage(1) }} className="h-9 rounded-full border border-neutral-300 bg-white px-3 text-sm text-neutral-700 outline-none focus-visible:ring-2 focus-visible:ring-accent">
              {grades.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table (desktop) */}
        <div className="mt-4 overflow-x-auto hidden sm:block">
          <table className="min-w-full text-sm" role="table" aria-label="لیست دانش‌آموزان">
            <thead>
              <tr className="text-neutral-500">
                <th scope="col" className="text-start py-3 ps-3 px-2">
                  <button type="button" onClick={() => headerSort('name')} className="inline-flex items-center gap-1 text-neutral-600 hover:text-neutral-800">
                    دانش‌آموز {sortKey === 'name' ? (sortDir === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />) : <ArrowUpDown className="w-3.5 h-3.5" />}
                  </button>
                </th>
                <th scope="col" className="text-start py-3 px-2">
                  <button type="button" onClick={() => headerSort('grade')} className="inline-flex items-center gap-1 text-neutral-600 hover:text-neutral-800">
                    پایه/رشته {sortKey === 'grade' ? (sortDir === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />) : <ArrowUpDown className="w-3.5 h-3.5" />}
                  </button>
                </th>
                <th scope="col" className="text-start py-3 px-2">
                  <button type="button" onClick={() => headerSort('last')} className="inline-flex items-center gap-1 text-neutral-600 hover:text-neutral-800">
                    آخرین فعالیت {sortKey === 'last' ? (sortDir === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />) : <ArrowUpDown className="w-3.5 h-3.5" />}
                  </button>
                </th>
                <th scope="col" className="text-start py-3 px-2">
                  <button type="button" onClick={() => headerSort('status')} className="inline-flex items-center gap-1 text-neutral-600 hover:text-neutral-800">
                    وضعیت {sortKey === 'status' ? (sortDir === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />) : <ArrowUpDown className="w-3.5 h-3.5" />}
                  </button>
                </th>
                <th scope="col" className="text-start py-3 px-2"></th>
              </tr>
            </thead>
            <tbody>
              {paged.map((s) => (
                <tr key={s.id} className="border-t border-neutral-200 hover:bg-neutral-50">
                  <td className="py-3 ps-3 px-2 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-neutral-200 grid place-items-center overflow-hidden">
                        <span className="text-neutral-600 text-xs">{s.name.at(0)}</span>
                      </div>
                      <div className="text-start">
                        <div className="text-[13px] md:text-sm text-black font-medium">{s.name}</div>
                        <div className="text-[11px] text-neutral-500">{s.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2 align-middle text-neutral-700">{s.grade}</td>
                  <td className="py-3 px-2 align-middle text-neutral-700">{s.last}</td>
                  <td className="py-3 px-2 align-middle"><StatusPill status={s.status} /></td>
                  <td className="py-3 px-2 align-middle">
                    <div className="flex items-center gap-1 justify-end">
                      <button type="button" onClick={() => setViewStudent(s)} className="w-8 h-8 grid place-items-center rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-100 outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label="مشاهده">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => {
                        const sp = nameSplit(s.name)
                        setEditStudent({ id: s.id, firstName: sp.firstName, lastName: sp.lastName, grade: s.grade, email: s.email || '', status: s.status })
                      }} className="w-8 h-8 grid place-items-center rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-100 outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label="ویرایش">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => deleteOne(s.id)} className="w-8 h-8 grid place-items-center rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-100 outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label="حذف">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="relative">
                        <button type="button" onClick={() => setMenuForId(id => id === s.id ? null : s.id)} className="w-8 h-8 grid place-items-center rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-100 outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label="بیشتر">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                        {menuForId === s.id && (
                          <div className="absolute left-0 top-10 z-20 bg-white border border-neutral-200 rounded-xl shadow-lg p-2 min-w-40 text-sm">
                            <button type="button" onClick={() => { toggleStatus(s); setMenuForId(null) }} className="w-full text-start px-3 py-2 rounded-lg hover:bg-neutral-100">{s.status === 'فعال' ? 'غیرفعال کردن' : 'فعال کردن'}</button>
                            <button type="button" onClick={() => { setViewStudent(s); setMenuForId(null) }} className="w-full text-start px-3 py-2 rounded-lg hover:bg-neutral-100">نمایش پروفایل</button>
                            <button type="button" onClick={() => { setMenuForId(null) }} className="w-full text-start px-3 py-2 rounded-lg hover:bg-neutral-100">ارسال پیام</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile list */}
        <div className="sm:hidden mt-4 flex flex-col gap-2">
          {paged.map(s => (
            <div key={s.id} className="rounded-2xl border border-neutral-200 p-3 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-neutral-200 grid place-items-center overflow-hidden">
                    <span className="text-neutral-600 text-xs">{s.name.at(0)}</span>
                  </div>
                  <div className="text-start">
                    <div className="text-sm text-black font-medium">{s.name}</div>
                    <div className="text-[11px] text-neutral-500">{s.email}</div>
                  </div>
                </div>
                <StatusPill status={s.status} />
              </div>
              <div className="mt-2 flex items-center justify-between text-[13px] text-neutral-700">
                <span>{s.grade}</span>
                <span>{s.last}</span>
              </div>
              <div className="mt-2 flex items-center justify-end gap-1">
                <button type="button" onClick={() => setViewStudent(s)} className="w-9 h-9 grid place-items-center rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-100 outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label="مشاهده">
                  <Eye className="w-4 h-4" />
                </button>
                <button type="button" onClick={() => { const sp = nameSplit(s.name); setEditStudent({ id: s.id, firstName: sp.firstName, lastName: sp.lastName, grade: s.grade, email: s.email || '', status: s.status }) }} className="w-9 h-9 grid place-items-center rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-100 outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label="ویرایش">
                  <Pencil className="w-4 h-4" />
                </button>
                <button type="button" onClick={() => deleteOne(s.id)} className="w-9 h-9 grid place-items-center rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-100 outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label="حذف">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Bulk actions removed */}

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <span>صفحه</span>
            <span className="font-medium text-neutral-800">{currentPage}</span>
            <span>/ {pageCount}</span>
            <span className="ms-3">نمایش</span>
            <select value={pageSize} onChange={(e) => { setPageSize(parseInt(e.target.value)); setPage(1) }} className="h-9 rounded-full border border-neutral-300 bg-white px-2 text-sm text-neutral-700 outline-none focus-visible:ring-2 focus-visible:ring-accent">
              {[5, 8, 10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <span>مورد در هر صفحه</span>
          </div>
          <div className="flex items-center gap-1">
            <button type="button" disabled={currentPage === 1} onClick={() => setPage(p => Math.max(1, p - 1))} className="h-9 px-3 rounded-full border border-neutral-300 text-neutral-700 disabled:opacity-50 hover:bg-neutral-100 outline-none focus-visible:ring-2 focus-visible:ring-accent">قبلی</button>
            {Array.from({ length: pageCount }).slice(0, 5).map((_, i) => {
              const idx = i + 1
              return (
                <button key={idx} type="button" onClick={() => setPage(idx)} className={`h-9 w-9 rounded-full border text-sm ${currentPage === idx ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'} outline-none focus-visible:ring-2 focus-visible:ring-accent`}>{idx}</button>
              )
            })}
            <button type="button" disabled={currentPage === pageCount} onClick={() => setPage(p => Math.min(pageCount, p + 1))} className="h-9 px-3 rounded-full border border-neutral-300 text-neutral-700 disabled:opacity-50 hover:bg-neutral-100 outline-none focus-visible:ring-2 focus-visible:ring-accent">بعدی</button>
          </div>
        </div>
      </div>

      {/* Add Student Modal */}
      {openAdd && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="add-student-title">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpenAdd(false)}></div>
          <div className="absolute inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[520px] bg-white rounded-2xl shadow-xl border border-neutral-200 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 id="add-student-title" className="text-lg font-semibold text-black">افزودن دانش‌آموز</h2>
              <button type="button" onClick={() => setOpenAdd(false)} aria-label="بستن" className="w-9 h-9 rounded-full border border-neutral-300 grid place-items-center text-neutral-700 hover:bg-neutral-100 outline-none focus-visible:ring-2 focus-visible:ring-accent"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={onAddSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-neutral-700 mb-1">نام</label>
                <input required value={form.firstName} onChange={(e) => setForm(f => ({ ...f, firstName: e.target.value }))} className="w-full h-11 rounded-xl border border-neutral-300 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent" />
              </div>
              <div>
                <label className="block text-sm text-neutral-700 mb-1">نام خانوادگی</label>
                <input required value={form.lastName} onChange={(e) => setForm(f => ({ ...f, lastName: e.target.value }))} className="w-full h-11 rounded-xl border border-neutral-300 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-neutral-700 mb-1">پایه/رشته</label>
                <input required value={form.grade} onChange={(e) => setForm(f => ({ ...f, grade: e.target.value }))} className="w-full h-11 rounded-xl border border-neutral-300 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent" />
              </div>
              <div className="md:col-span-2 flex items-center justify-end gap-2 mt-2">
                <button type="button" onClick={() => setOpenAdd(false)} className="h-11 px-4 rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-100 outline-none focus-visible:ring-2 focus-visible:ring-accent">انصراف</button>
                <button type="submit" className="h-11 px-6 rounded-full bg-[#43413D] text-white hover:bg-[#3b3a36] outline-none focus-visible:ring-2 focus-visible:ring-accent">افزودن</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Student Modal */}
      {viewStudent && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="view-student-title">
          <div className="absolute inset-0 bg-black/40" onClick={() => setViewStudent(null)}></div>
          <div className="absolute inset-x-4 top-[8%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[680px] bg-white rounded-2xl shadow-xl border border-neutral-200 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 id="view-student-title" className="text-lg font-semibold text-black">پروفایل دانش‌آموز</h2>
              <button type="button" onClick={() => setViewStudent(null)} aria-label="بستن" className="w-9 h-9 rounded-full border border-neutral-300 grid place-items-center text-neutral-700 hover:bg-neutral-100 outline-none focus-visible:ring-2 focus-visible:ring-accent"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-56 rounded-xl border border-neutral-200 p-3 bg-neutral-50">
                <div className="w-16 h-16 rounded-full bg-neutral-300 grid place-items-center text-neutral-700 mx-auto">{viewStudent.name.at(0)}</div>
                <div className="mt-3 text-center">
                  <div className="text-base font-medium text-black">{viewStudent.name}</div>
                  <div className="text-sm text-neutral-600">{viewStudent.grade}</div>
                  <div className="text-[12px] text-neutral-500 mt-1">{viewStudent.email || '—'}</div>
                </div>
                <div className="mt-3 text-center"><StatusPill status={viewStudent.status} /></div>
              </div>
              <div className="flex-1">
                {(() => {
                  const perf = getPerformance(viewStudent)
                  return (
                    <div className="rounded-xl border border-neutral-200 p-3">
                      <div className="text-sm font-medium text-neutral-800 mb-2">عملکرد در امتحانات اخیر</div>
                      <ul className="space-y-2">
                        {perf.subjects.map((subj, i) => (
                          <li key={subj} className="flex items-center justify-between">
                            <span className="text-neutral-700">{subj}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-40 h-2 rounded-full bg-neutral-200 overflow-hidden">
                                <div className="h-full bg-accent" style={{ width: `${(perf.scores[i] / 20) * 100}%` }}></div>
                              </div>
                              <span className="w-10 text-end text-neutral-800 font-medium">{perf.scores[i]}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-neutral-700">نمره کلی</span>
                        <span className="text-lg font-semibold text-black">{perf.avg}</span>
                      </div>
                    </div>
                  )
                })()}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button type="button" onClick={() => setViewStudent(null)} className="h-10 px-4 rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-100 outline-none focus-visible:ring-2 focus-visible:ring-accent">بستن</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editStudent && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="edit-student-title">
          <div className="absolute inset-0 bg-black/40" onClick={() => setEditStudent(null)}></div>
          <div className="absolute inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[520px] bg-white rounded-2xl shadow-xl border border-neutral-200 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 id="edit-student-title" className="text-lg font-semibold text-black">ویرایش دانش‌آموز</h2>
              <button type="button" onClick={() => setEditStudent(null)} aria-label="بستن" className="w-9 h-9 rounded-full border border-neutral-300 grid place-items-center text-neutral-700 hover:bg-neutral-100 outline-none focus-visible:ring-2 focus-visible:ring-accent"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={onEditSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-neutral-700 mb-1">نام</label>
                <input required value={editStudent.firstName} onChange={(e) => setEditStudent(v => ({ ...v, firstName: e.target.value }))} className="w-full h-11 rounded-xl border border-neutral-300 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent" />
              </div>
              <div>
                <label className="block text-sm text-neutral-700 mb-1">نام خانوادگی</label>
                <input required value={editStudent.lastName} onChange={(e) => setEditStudent(v => ({ ...v, lastName: e.target.value }))} className="w-full h-11 rounded-xl border border-neutral-300 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-neutral-700 mb-1">پایه/رشته</label>
                <input required value={editStudent.grade} onChange={(e) => setEditStudent(v => ({ ...v, grade: e.target.value }))} className="w-full h-11 rounded-xl border border-neutral-300 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-neutral-700 mb-1">ایمیل</label>
                <input type="email" value={editStudent.email} onChange={(e) => setEditStudent(v => ({ ...v, email: e.target.value }))} className="w-full h-11 rounded-xl border border-neutral-300 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-neutral-700 mb-1">وضعیت</label>
                <select value={editStudent.status} onChange={(e) => setEditStudent(v => ({ ...v, status: e.target.value }))} className="w-full h-11 rounded-xl border border-neutral-300 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  <option>فعال</option>
                  <option>در حال بررسی</option>
                  <option>غیرفعال</option>
                </select>
              </div>
              <div className="md:col-span-2 flex items-center justify-end gap-2 mt-2">
                <button type="button" onClick={() => setEditStudent(null)} className="h-11 px-4 rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-100 outline-none focus-visible:ring-2 focus-visible:ring-accent">انصراف</button>
                <button type="submit" className="h-11 px-6 rounded-full bg-[#43413D] text-white hover:bg-[#3b3a36] outline-none focus-visible:ring-2 focus-visible:ring-accent">ذخیره</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
