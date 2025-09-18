import React from 'react'
import { Users } from 'lucide-react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts'

const topStudents = [
  { id: 1, name: 'علی رضایی', statusText: 'عالی', statusColor: '#10B981', attendance: 95 },
  { id: 2, name: 'محمد کریمی', statusText: 'خوب', statusColor: '#3B82F6', attendance: 87 },
  { id: 3, name: 'شایان محمدی', statusText: 'عالی', statusColor: '#10B981', attendance: 90 },
]

const perfData = [
  { name: 'هنر', score: 12, target: 16 },
  { name: 'اجتماعی', score: 13, target: 20 },
  { name: 'فارسی', score: 18, target: 19 },
  { name: 'علوم', score: 15, target: 17 },
  { name: 'ریاضی', score: 16, target: 20 },
]

function TopStudentsCard() {
  return (
    <section className="w-full lg:w-[380px] bg-white rounded-[24px] border border-neutral-300 p-4 md:p-6 flex flex-col gap-4" aria-labelledby="top-students-title">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[18px] md:text-[20px] leading-7">
          <Users className="w-5 h-5 text-neutral-700" />
          <span id="top-students-title" className="font-semibold text-black">دانش آموزان برتر</span>
        </div>
      </div>
      <ul className="flex flex-col gap-2">
        {topStudents.map((s) => (
          <li key={s.id} className="list-none">
            <div className="h-[69px] w-full rounded-2xl bg-[#fbfbfc] flex items-center justify-between px-4">
              <div className="text-start">
                <div className="text-black text-sm font-medium">{s.name}</div>
                <div className="text-xs text-neutral-600 mt-0.5">حضور: {s.attendance}%</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium" style={{ color: s.statusColor }}>وضعیت: {s.statusText}</span>
                <div className="w-9 h-9 rounded-full bg-neutral-200 grid place-items-center">
                  <Users className="w-4 h-4 text-neutral-700" />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button
        type="button"
        aria-label="مشاهده بیشتر"
        className="mt-1 h-12 rounded-xl bg-[#43413D] grid place-items-center text-white text-sm relative overflow-hidden transition-colors duration-150 hover:bg-[#3b3a36] outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <span className="relative z-10 font-medium">مشاهده بیشتر</span>
      </button>
    </section>
  )
}

function PerformanceChartCard() {
  return (
    <section className="w-full bg-white rounded-[24px] border border-neutral-300 p-4 md:p-6" aria-labelledby="performance-title">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 id="performance-title" className="text-[18px] md:text-[20px] font-semibold text-black">عملکرد تحصیلی</h2>
          <p className="text-xs text-neutral-500 mt-0.5">گزارش عملکرد کلاس بر اساس دروس</p>
        </div>
      </div>
      <div className="h-[320px] md:h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={perfData} margin={{ top: 20, right: 20, left: 10, bottom: 8 }}>
            <defs>
              <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="targetFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="name" tick={{ fill: '#111827', fontSize: 12 }} axisLine={{ stroke: '#E5E7EB' }} tickLine={false} />
            <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={{ stroke: '#E5E7EB' }} tickLine={false} domain={[0, 20]} />
            <Tooltip formatter={(v) => [v, 'نمره']} labelFormatter={(l) => `${l}`} />
            <Bar dataKey="target" fill="url(#targetFill)" radius={[10, 10, 0, 0]} barSize={28} />
            <Bar dataKey="score" fill="url(#barFill)" radius={[10, 10, 0, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default function Reports() {
  return (
    <div className="px-4 md:px-8 py-4 flex flex-col lg:flex-row gap-4">
      <TopStudentsCard />
      <PerformanceChartCard />
    </div>
  )
}
