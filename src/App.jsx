import React from 'react'
import { 
  BellIcon, 
  EnvelopeIcon, 
  MagnifyingGlassIcon,
  ChartBarIcon,
  UserGroupIcon,
  AcademicCapIcon,
  UsersIcon
} from '@heroicons/react/24/outline'

function StatCard({ title, value, sub, icon }) {
  return (
    <div className="w-[264px] h-[140px] rounded-3xl bg-card/100 flex flex-col justify-center px-6 relative overflow-hidden shadow-lg">
      <div className="flex items-center gap-6">
        <div className="w-9 h-9 rounded-xl bg-white/20 grid place-items-center relative">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/40 to-white/10 blur-sm"></div>
          <div className="relative z-10">{icon}</div>
        </div>
        <div className="text-white text-sm font-medium">{title}</div>
      </div>
      <div className="mt-3 text-white">
        <div className="text-3xl font-bold">{value}</div>
        {sub && <div className="text-xs mt-1 font-medium">{sub}</div>}
      </div>
      {/* Multiple light layers for enhanced effect */}
      <div className="absolute top-[-140px] left-1/2 transform -translate-x-1/2 w-[200px] h-[200px] rounded-full bg-white/25 blur-xl" />
      <div className="absolute top-[-100px] left-1/2 transform -translate-x-1/2 w-[150px] h-[150px] rounded-full bg-white/20 blur-lg" />
      <div className="absolute top-[-80px] left-1/2 transform -translate-x-1/2 w-[100px] h-[100px] rounded-full bg-white/15 blur-md" />
    </div>
  )
}

function UpcomingItem({ title, time, color }) {
  return (
    <div className="h-[69px] rounded-2xl bg-[#fbfbfc] flex items-center justify-between px-4">
      <div className="text-start">
        <div className="text-black text-sm">{title}</div>
        <div className="text-xs text-neutral-500 mt-0.5">{time}</div>
      </div>
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
    </div>
  )
}

function ActivityItem({ status, statusColor, title, meta }) {
  return (
    <div className="h-[69px] rounded-2xl bg-[#fbfbfc] flex items-center justify-between px-4">
      <div className="text-[14px] font-medium" style={{ color: statusColor }}>{status}</div>
      <div className="text-end">
        <div className="text-black text-sm">{title}</div>
        <div className="text-xs text-neutral-500 mt-0.5">{meta}</div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen p-2">
      <div className="max-w-[1440px] mx-auto flex gap-2">
        {/* Left sidebar */}
        <div className="w-[246px] h-[792px] flex flex-col gap-2">
          <div className="bg-sidebar rounded-[28px] shadow-lg h-[474px] relative overflow-hidden p-3">
            {/* Sidebar light effects */}
            <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2 w-[120px] h-[120px] rounded-full bg-white/20 blur-xl"></div>
            <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 w-[80px] h-[80px] rounded-full bg-white/15 blur-lg"></div>
            
            <div className="flex justify-end items-center h-[34px] mt-6 me-6 gap-2 relative">
              <div className="text-white text-2xl font-bold relative">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent blur-sm rounded"></div>
                <span className="relative z-10 font-bold">معلم یار</span>
              </div>
              <div className="w-[34px] h-[34px] rounded-full bg-white/20 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent blur-sm"></div>
                <div className="w-6 h-6 rounded-full bg-white/40 relative z-10"></div>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-1 px-3 relative z-10">
              {[
                ['داشبورد'],
                ['دانش آموزان'],
                ['وضعیت و آمار'],
                ['تولید محتوی و آزمون'],
                ['تقویم و برنامه ها'],
                ['دستیار هوشمند'],
                ['ساخت تصویر'],
              ].map(([label], idx) => (
                <div key={idx} className={`h-[46px] rounded-full flex items-center justify-end gap-3 px-3 cursor-pointer transition-all duration-200 hover:bg-white/10 relative ${idx===0 ? 'bg-white/30' : ''}`}>
                  {idx === 0 && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent blur-sm"></div>
                  )}
                  <span className="text-white text-sm font-medium relative z-10">{label}</span>
                  <div className="w-[42px] h-[42px] rounded-full bg-white/20 grid place-items-center relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent blur-sm"></div>
                    <div className="w-2 h-2 rounded-full bg-white/60 relative z-10"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-sidebar rounded-[28px] shadow-lg h-[78px] flex items-center justify-between px-4 relative overflow-hidden">
            {/* Profile light effects */}
            <div className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 w-[50px] h-[50px] rounded-full bg-white/15 blur-lg"></div>
            
            <div className="flex items-center gap-3 text-white relative z-10">
              <div className="w-4 h-4 rounded border border-white/60 relative">
                <div className="absolute inset-0 rounded bg-gradient-to-br from-white/20 to-transparent blur-sm"></div>
              </div>
              <div>
                <div className="text-sm font-semibold">محمدجواد رستمی</div>
                <div className="text-xs opacity-80 font-medium">rostamii1378@gmail.com</div>
              </div>
            </div>
            <div className="w-[42px] h-[42px] rounded-full bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent blur-sm"></div>
              <div className="w-8 h-8 rounded-full bg-white/30 relative z-10"></div>
            </div>
          </div>
        </div>

        {/* Main content container */}
        <div className="bg-[#f5f5f5] rounded-[28px] w-[1172px] h-[792px] p-0 overflow-hidden">
          {/* Header */}
          <div className="h-[92px] flex items-center justify-between px-8 relative">
            {/* Header light effects */}
            <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 w-[100px] h-[100px] rounded-full bg-blue-500/15 blur-xl"></div>
            <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 w-[60px] h-[60px] rounded-full bg-neutral-400/12 blur-lg"></div>
            
            {/* Search bar on the left */}
            <div className="w-[408px] h-11 rounded-full border border-neutral-300 flex items-center px-4 gap-2 relative overflow-hidden">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neutral-300/10 to-transparent blur-sm"></div>
              <MagnifyingGlassIcon className="w-4 h-4 text-neutral-500 relative z-10" />
              <div className="ms-auto text-neutral-500 text-sm relative z-10">جستجوی کنید ...</div>
            </div>

            {/* Icons on the right */}
            <div className="flex items-center gap-3 relative z-10">
              <div className="relative">
                <div className="w-11 h-11 rounded-full border border-neutral-300 grid place-items-center text-neutral-600 relative overflow-hidden">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/5 blur-sm"></div>
                  <BellIcon className="w-5 h-5 relative z-10" />
                </div>
                <span className="absolute -top-1 left-2 w-1.5 h-1.5 bg-[#D4151C] rounded-full shadow-lg">
                  <div className="absolute inset-0 bg-[#D4151C] rounded-full blur-sm opacity-60"></div>
                </span>
              </div>
              <div className="w-11 h-11 rounded-full border border-neutral-300 grid place-items-center text-neutral-600 relative overflow-hidden">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neutral-500/20 to-neutral-500/5 blur-sm"></div>
                <EnvelopeIcon className="w-5 h-5 relative z-10" />
              </div>
            </div>
          </div>

          {/* Stat cards row */}
          <div className="h-[160px] flex items-center gap-[18px] px-[30px]">
            <StatCard title="تعداد دانش آموزان" value={"34 نفر"} sub={null} icon={<UsersIcon className="w-5 h-5" />} />
            <StatCard title="میانگین نمرات" value={"17.24"} sub={"+2% نسبت به ماه قبل"} icon={<AcademicCapIcon className="w-5 h-5" />} />
            <StatCard title="میزان حضور در کلاس" value={"84.5%"} sub={"+5% نسبت به ماه قبل"} icon={<UserGroupIcon className="w-5 h-5" />} />
            <StatCard title="رشد تحصیلی کلاس" value={"+5 %"} sub={null} icon={<ChartBarIcon className="w-5 h-5" />} />
          </div>

          {/* Lower two panels */}
          <div className="h-[449px] flex gap-[18px] px-[30px] relative">
            {/* Background light effects for panels */}
            <div className="absolute top-[-60px] left-1/2 transform -translate-x-1/2 w-[180px] h-[180px] rounded-full bg-blue-500/12 blur-2xl"></div>
            <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 w-[120px] h-[120px] rounded-full bg-green-500/10 blur-xl"></div>
            
            {/* Recent activities - Left panel */}
            <div className="w-[546px] h-[401px] bg-white rounded-[24px] border border-neutral-300 p-6 flex flex-col gap-6 relative overflow-hidden shadow-lg">
              {/* Panel light effects */}
              <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 w-[80px] h-[80px] rounded-full bg-green-500/15 blur-xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-[22px] leading-8">
                  <span className="font-bold">جدیدترین فعالیت‌ها و تکالیف کلاس</span>
                </div>
                <div className="text-[13px] text-neutral-500 mt-1 font-medium">آخرین فعالیت‌های انجام شده</div>
              </div>
              <div className="flex flex-col gap-2 relative z-10">
                <ActivityItem status="تکمیل شده" statusColor="#36D6A0" title="آزمون: ریاضی فصل اول" meta="۲ ساعت پیش • ۲۴ دانش‌آموز" />
                <ActivityItem status="در حال انجام" statusColor="#3C83F6" title="درس: فتوسنتز" meta="در حال حاضر فعال • ۲۸ دانش‌آموز" />
                <ActivityItem status="در انتظار" statusColor="#F97316" title="تکلیف: نوشتن مقاله" meta="موعد تحویل فردا • ۳۱ دانش‌آموز" />
              </div>
              <div className="mt-auto h-[38px] rounded-xl bg-[#43413D] grid place-items-center text-white text-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent blur-sm"></div>
                <span className="relative z-10 font-medium">مشاهده همهٔ فعالیت‌ها</span>
              </div>
            </div>

            {/* Upcoming events - Right panel */}
            <div className="w-[546px] h-[401px] bg-white rounded-[24px] border border-neutral-300 p-6 flex flex-col gap-6 relative overflow-hidden shadow-lg">
              {/* Panel light effects */}
              <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 w-[80px] h-[80px] rounded-full bg-blue-500/15 blur-xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-[22px] leading-8">
                  <span className="font-bold">برنامه شما برای چند روز آینده:</span>
                </div>
                <div className="text-[13px] text-neutral-500 mt-1 font-medium">رویدادهای پیش رو</div>
              </div>
              <div className="flex flex-col gap-2 relative z-10">
                <UpcomingItem title="جلسه اولیاء و معلمان" time="امروز، ساعت ۳:۰۰ بعدازظهر" color="#3C83F6" />
                <UpcomingItem title="آماده‌سازی آزمایشگاه علوم" time="فردا، ساعت ۱۰:۰۰ صبح" color="#36D6A0" />
                <UpcomingItem title="آزمون ریاضی - فصل ۵" time="سه شنبه، ساعت ۲:۰۰ بعدازظهر" color="#F97316" />
              </div>
              <div className="mt-auto h-[38px] rounded-xl bg-[#43413D] grid place-items-center text-white text-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent blur-sm"></div>
                <span className="relative z-10 font-medium">مشاهده تقویم</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


