import React from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import Students from './pages/Students.jsx'
import Reports from './pages/Reports.jsx'
import Content from './pages/Content.jsx'
import Calendar from './pages/Calendar.jsx'
import Assistant from './pages/Assistant.jsx'
import ImagePage from './pages/Image.jsx'
import {
  Bell,
  Mail,
  BarChart3,
  Users,
  GraduationCap,
  User,
  Home,
  CalendarDays,
  Sparkles,
  Image as ImageIcon,
  Menu,
  X,
  Settings
} from 'lucide-react'

function StatCard({ title, value, sub, icon }) {
  return (
    <div className="w-full min-h-36 rounded-3xl bg-card/100 flex flex-col justify-center px-5 relative overflow-hidden shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
      <div className="flex items-center gap-6">
        <div className="w-9 h-9 rounded-xl bg-white/20 grid place-items-center relative transition-transform duration-200">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/40 to-white/10 blur-sm pointer-events-none" aria-hidden="true"></div>
          <div className="relative z-10">{icon}</div>
        </div>
        <div className="text-white text-sm font-medium">{title}</div>
      </div>
      <div className="mt-3 text-white">
        <div className="text-3xl font-bold">{value}</div>
        {sub && <div className="text-xs mt-1 font-medium">{sub}</div>}
      </div>
      {/* Multiple light layers for enhanced effect */}
  <div className="hidden sm:block absolute top-[-140px] left-1/2 -translate-x-1/2 w-[200px] h-[200px] rounded-full bg-white/25 blur-xl pointer-events-none motion-reduce:transform-none" aria-hidden="true" />
  <div className="hidden sm:block absolute top-[-100px] left-1/2 -translate-x-1/2 w-[150px] h-[150px] rounded-full bg-white/20 blur-lg pointer-events-none motion-reduce:transform-none" aria-hidden="true" />
  <div className="hidden sm:block absolute top-[-80px] left-1/2 -translate-x-1/2 w-[100px] h-[100px] rounded-full bg-white/15 blur-md pointer-events-none motion-reduce:transform-none" aria-hidden="true" />
    </div>
  )
}

function UpcomingItem({ title, time, color }) {
  return (
    <button
      type="button"
  className="h-[69px] w-full rounded-2xl bg-[#fbfbfc] flex items-center justify-between px-4 transition-colors duration-150 hover:bg-neutral-100 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      aria-label={`${title} - ${time}`}
    >
      <div className="text-start">
        <div className="text-black text-sm">{title}</div>
        <div className="text-xs text-neutral-500 mt-0.5">{time}</div>
      </div>
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
    </button>
  )
}

function ActivityItem({ status, statusColor, title, meta }) {
  return (
    <button
      type="button"
  className="h-[69px] w-full rounded-2xl bg-[#fbfbfc] flex flex-row-reverse items-center justify-between px-4 transition-colors duration-150 hover:bg-neutral-100 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      aria-label={`${title}: ${status} — ${meta}`}
    >
      <div className="text-[14px] font-medium" style={{ color: statusColor }}>{status}</div>
      <div className="text-start">
        <div className="text-black text-sm">{title}</div>
        <div className="text-xs text-neutral-500 mt-0.5">{meta}</div>
      </div>
    </button>
  )
}

function Placeholder({ title }) {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold text-black mb-2">{title}</h1>
      <p className="text-sm text-neutral-600">این صفحه به زودی تکمیل می‌شود.</p>
    </div>
  )
}

function Dashboard() {
  return (
    <>
      {/* Stat cards row */}
      <div className="px-4 md:px-8 py-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
        <StatCard title="تعداد دانش آموزان" value={"34 نفر"} sub={null} icon={<User className="w-5 h-5" />} />
        <StatCard title="میانگین نمرات" value={"17.24"} sub={"+2% نسبت به ماه قبل"} icon={<GraduationCap className="w-5 h-5" />} />
        <StatCard title="میزان حضور در کلاس" value={"84.5%"} sub={"+5% نسبت به ماه قبل"} icon={<Users className="w-5 h-5" />} />
        <StatCard title="رشد تحصیلی کلاس" value={"+5 %"} sub={null} icon={<BarChart3 className="w-5 h-5" />} />
      </div>

      {/* Lower two panels */}
      <div className="flex flex-col lg:flex-row gap-4 md:gap-5 px-4 md:px-8 relative">
        {/* Background light effects for panels */}
  <div className="hidden sm:block absolute top-[-60px] left-1/2 -translate-x-1/2 w-[180px] h-[180px] rounded-full bg-blue-500/12 blur-2xl pointer-events-none motion-reduce:transform-none" aria-hidden="true"></div>
  <div className="hidden sm:block absolute top-[-40px] left-1/2 -translate-x-1/2 w-[120px] h-[120px] rounded-full bg-green-500/10 blur-xl pointer-events-none motion-reduce:transform-none" aria-hidden="true"></div>
        
        {/* Recent activities - Left panel */}
  <section className="w-full bg-white rounded-[24px] border border-neutral-300 p-6 flex flex-col gap-6 relative overflow-hidden shadow-lg min-h-96" aria-labelledby="recent-activities-heading">
          {/* Panel light effects */}
          <div className="hidden sm:block absolute top-[-30px] left-1/2 -translate-x-1/2 w-[80px] h-[80px] rounded-full bg-green-500/15 blur-xl pointer-events-none motion-reduce:transform-none" aria-hidden="true"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 text-[22px] leading-8">
              <span id="recent-activities-heading" className="font-semibold text-black">جدیدترین فعالیت‌ها و تکالیف کلاس</span>
            </div>
            <div className="text-[13px] text-neutral-500 mt-1 font-medium">آخرین فعالیت‌های انجام شده</div>
          </div>
          <ul className="flex flex-col gap-2 relative z-10" aria-labelledby="recent-activities-heading">
            <li className="list-none"><ActivityItem status="تکمیل شده" statusColor="#36D6A0" title="آزمون: ریاضی فصل اول" meta="۲ ساعت پیش • ۲۴ دانش‌آموز" /></li>
            <li className="list-none"><ActivityItem status="در حال انجام" statusColor="#3C83F6" title="درس: فتوسنتز" meta="در حال حاضر فعال • ۲۸ دانش‌آموز" /></li>
            <li className="list-none"><ActivityItem status="در انتظار" statusColor="#F97316" title="تکلیف: نوشتن مقاله" meta="موعد تحویل فردا • ۳۱ دانش‌آموز" /></li>
          </ul>
          <button
            type="button"
            aria-label="مشاهده همهٔ فعالیت‌ها"
            className="mt-auto h-12 rounded-xl bg-[#43413D] grid place-items-center text-white text-sm relative overflow-hidden transition-colors duration-150 hover:bg-[#3b3a36] active:translate-y-[1px] outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent blur-sm pointer-events-none" aria-hidden="true"></div>
            <span className="relative z-10 font-medium">مشاهده همهٔ فعالیت‌ها</span>
          </button>
        </section>

        {/* Upcoming events - Right panel */}
        <section className="w-full bg-white rounded-[24px] border border-neutral-300 p-6 flex flex-col gap-6 relative overflow-hidden shadow-lg min-h-96" aria-labelledby="upcoming-events-heading">
          {/* Panel light effects */}
          <div className="hidden sm:block absolute top-[-30px] left-1/2 -translate-x-1/2 w-[80px] h-[80px] rounded-full bg-blue-500/15 blur-xl pointer-events-none motion-reduce:transform-none" aria-hidden="true"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-[22px] leading-8">
              <span id="upcoming-events-heading" className="font-semibold text-black">برنامه شما برای چند روز آینده:</span>
            </div>
            <div className="text-[13px] text-neutral-500 mt-1 font-medium">رویدادهای پیش رو</div>
          </div>
          <ul className="flex flex-col gap-2 relative z-10" aria-labelledby="upcoming-events-heading">
            <li className="list-none"><UpcomingItem title="جلسه اولیاء و معلمان" time="امروز، ساعت ۳:۰۰ بعدازظهر" color="#3C83F6" /></li>
            <li className="list-none"><UpcomingItem title="آماده‌سازی آزمایشگاه علوم" time="فردا، ساعت ۱۰:۰۰ صبح" color="#36D6A0" /></li>
            <li className="list-none"><UpcomingItem title="آزمون ریاضی - فصل ۵" time="سه شنبه، ساعت ۲:۰۰ بعدازظهر" color="#F97316" /></li>
          </ul>
          <button
            type="button"
            aria-label="مشاهده تقویم"
            className="mt-auto h-12 rounded-xl bg-[#43413D] grid place-items-center text-white text-sm relative overflow-hidden transition-colors duration-150 hover:bg-[#3b3a36] active:translate-y-[1px] outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent blur-sm pointer-events-none" aria-hidden="true"></div>
            <span className="relative z-10 font-medium">مشاهده تقویم</span>
          </button>
        </section>
      </div>
    </>
  )
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const navItems = [
    { label: 'داشبورد', to: '/', Icon: Home },
    { label: 'دانش آموزان', to: '/students', Icon: User },
    { label: 'وضعیت و آمار', to: '/reports', Icon: BarChart3 },
    { label: 'تولید محتوی و آزمون', to: '/content', Icon: GraduationCap },
    { label: 'تقویم و برنامه ها', to: '/calendar', Icon: CalendarDays },
    { label: 'دستیار هوشمند', to: '/assistant', Icon: Sparkles },
    { label: 'ساخت تصویر', to: '/image', Icon: ImageIcon },
  ]
  // Shared nav link class helpers
  const getSidebarLinkClass = (isActive) =>
    `group h-12 rounded-full w-full flex flex-row-reverse items-center justify-end gap-3 px-3 transition-all duration-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/40 outline-none relative text-right ${isActive ? 'bg-white/30' : ''}`

  const getBottomLinkClass = (isActive) =>
    `group flex items-center justify-center py-2 rounded-2xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white/40 relative overflow-hidden ${isActive ? 'bg-white/20' : 'hover:bg-white/10'}`
  return (
    <div className="min-h-screen p-2">
      <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-2 md:gap-4">
        {/* Left sidebar */}
        <aside className="hidden lg:flex w-full lg:w-[246px] flex-col gap-2" role="complementary" aria-label="ناوبری جانبی">
          <div className="bg-sidebar rounded-[28px] shadow-lg relative overflow-hidden p-3">
            {/* Sidebar light effects */}
            <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2 w-[120px] h-[120px] rounded-full bg-white/20 blur-xl pointer-events-none" aria-hidden="true"></div>
            <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 w-[80px] h-[80px] rounded-full bg-white/15 blur-lg pointer-events-none" aria-hidden="true"></div>
            
            <div className="flex flex-row-reverse justify-end items-center h-[34px] mt-6 me-6 gap-2 relative">
              <div className="text-white text-2xl font-semibold relative">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent blur-sm rounded pointer-events-none" aria-hidden="true"></div>
                <span className="relative z-10 font-semibold">معلم یار</span>
              </div>
              <div className="w-[34px] h-[34px] rounded-full bg-white/20 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent blur-sm"></div>
                <div className="w-6 h-6 rounded-full bg-white/40 relative z-10"></div>
              </div>
            </div>
            <nav className="mt-8 px-3 relative z-10" aria-label="منوی اصلی">
              <ul className="flex flex-col gap-1">
                {navItems.map(({ label, Icon, to }, idx) => (
                  <li key={idx} className="list-none">
                    <NavLink
                      to={to}
                      end={to === '/'}
                      aria-label={label}
                      className={({ isActive }) => getSidebarLinkClass(isActive)}
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent blur-sm pointer-events-none" aria-hidden="true"></div>
                          )}
                          <span className="text-white text-sm font-medium relative z-10">{label}</span>
                          <div className="w-11 h-11 rounded-full border border-white/30 grid place-items-center text-white relative overflow-hidden transition-all duration-150 group-hover:bg-white/10 group-active:scale-95">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-sm pointer-events-none" aria-hidden="true"></div>
                            <Icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-accent' : 'text-white'}`} />
                          </div>
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="bg-sidebar rounded-[28px] shadow-lg h-20 flex items-center justify-between px-4 relative overflow-hidden">
            <div className="flex items-center gap-3 text-white relative z-10">
              {/* Avatar placeholder circle instead of small square */}
              <div className="w-11 h-11 rounded-full border border-white/30 grid place-items-center text-white relative overflow-hidden">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-sm pointer-events-none" aria-hidden="true"></div>
                <User className="w-5 h-5 relative z-10" aria-hidden="true" />
              </div>
              <div>
                <div className="text-sm font-medium">محمدجواد رستمی</div>
              </div>
            </div>
            {/* Settings icon instead of large decorative circle */}
            <button
              type="button"
              aria-label="تنظیمات"
              className="w-11 h-11 rounded-full border border-white/30 grid place-items-center text-white relative overflow-hidden transition-all duration-150 hover:bg-white/10 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-sm pointer-events-none" aria-hidden="true"></div>
              <Settings className="w-5 h-5 relative z-10" />
            </button>
          </div>
        </aside>
  {/* Main content container */}
  <main className="bg-[#f5f5f5] rounded-[28px] flex-1 w-full p-0 min-h-[calc(100vh-16px)] pb-24 lg:pb-0" role="main">
          {/* Header */}
          <header className="h-20 md:h-[88px] flex items-center justify-between px-4 md:px-8 relative" role="banner">
            {/* Header light effects */}
            <div className="hidden sm:block absolute top-[-40px] left-1/2 -translate-x-1/2 w-[100px] h-[100px] rounded-full bg-blue-500/15 blur-xl pointer-events-none motion-reduce:transform-none" aria-hidden="true"></div>
            <div className="hidden sm:block absolute top-[-20px] left-1/2 -translate-x-1/2 w-[60px] h-[60px] rounded-full bg-neutral-400/12 blur-lg pointer-events-none motion-reduce:transform-none" aria-hidden="true"></div>
            
            {/* Search bar (right side, RTL content inside the input) */}
            <div className="search-field relative w-full sm:w-72 md:w-96 lg:w-[408px] h-11 rounded-full overflow-hidden">
              {/* border and subtle gradient */}
              <div className="absolute inset-0 rounded-full border border-neutral-300 pointer-events-none" aria-hidden="true"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neutral-300/10 to-transparent blur-sm pointer-events-none" aria-hidden="true"></div>
              {/* real input with no inline styles; styles come from CSS */}
              <input type="text" dir="rtl" placeholder="جستجوی کنید ..." aria-label="جستجو" />
            </div>

            {/* Icons (left side) */}
            <div className="flex items-center gap-3 relative z-10">
              <div className="relative">
                <button
                  type="button"
                  aria-label="اعلان‌ها"
                  className="w-11 h-11 rounded-full border border-neutral-300 grid place-items-center text-neutral-600 relative overflow-hidden transition-all duration-150 hover:bg-white/60 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f5]"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/5 blur-sm pointer-events-none" aria-hidden="true"></div>
                  <Bell className="w-5 h-5 relative z-10" />
                </button>
                <span className="absolute -top-1 right-2 w-1.5 h-1.5 bg-[#D4151C] rounded-full shadow-lg" aria-hidden="true">
                  <div className="absolute inset-0 bg-[#D4151C] rounded-full blur-sm opacity-60"></div>
                </span>
              </div>
              <button
                type="button"
                aria-label="پیام‌ها"
                className="w-11 h-11 rounded-full border border-neutral-300 grid place-items-center text-neutral-600 relative overflow-hidden transition-all duration-150 hover:bg-white/60 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f5]"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neutral-500/20 to-neutral-500/5 blur-sm pointer-events-none" aria-hidden="true"></div>
                <Mail className="w-5 h-5 relative z-10" />
              </button>
              <button
                type="button"
                aria-label="باز کردن منو"
                onClick={() => setMobileMenuOpen(true)}
                className="w-11 h-11 rounded-full border border-neutral-300 grid place-items-center text-neutral-700 relative overflow-hidden transition-all duration-150 hover:bg-white/60 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f5] lg:hidden"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neutral-500/20 to-neutral-500/5 blur-sm pointer-events-none" aria-hidden="true"></div>
                <Menu className="w-5 h-5 relative z-10" />
              </button>
            </div>
          </header>

          {/* Routed content */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/content" element={<Content />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/image" element={<ImagePage />} />
          </Routes>

          {/* Mobile full menu overlay */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title">
              <div className="absolute inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)}></div>
              <div className="absolute inset-y-0 left-0 right-0 bg-white p-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 id="mobile-menu-title" className="text-lg font-semibold text-black">منوی اصلی</h2>
                  <button
                    type="button"
                    aria-label="بستن منو"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-full border border-neutral-300 grid place-items-center text-neutral-700 relative overflow-hidden hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav aria-label="منوی موبایل">
                  <ul className="flex flex-col gap-2">
                    {navItems.map(({ label, Icon, to }, idx) => (
                      <li key={idx} className="list-none">
                        <NavLink
                          to={to}
                          end={to === '/'}
                          aria-label={label}
                          onClick={() => setMobileMenuOpen(false)}
                          className={({ isActive }) =>
                            `group h-12 rounded-xl w-full flex flex-row-reverse items-center justify-between gap-3 px-4 transition-all duration-200 hover:bg-neutral-100 outline-none relative text-right ${isActive ? 'bg-neutral-100' : ''}`
                          }
                        >
                          <span className="text-black text-sm font-medium">{label}</span>
                          <div className="w-9 h-9 rounded-full bg-neutral-200 grid place-items-center">
                            <Icon className="w-4 h-4 text-neutral-700" />
                          </div>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          )}

          {/* Mobile bottom navigation (styled like sidebar) */}
          <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40">
            <div className="mx-0 mb-0 bg-sidebar rounded-t-[24px] rounded-b-none shadow-lg relative overflow-hidden p-3">
              {/* Light effects to mirror sidebar */}
              <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-[100px] h-[100px] rounded-full bg-white/20 blur-xl pointer-events-none" aria-hidden="true"></div>
              <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-[70px] h-[70px] rounded-full bg-white/15 blur-lg pointer-events-none" aria-hidden="true"></div>
              <ul className="grid grid-cols-4 gap-1 relative z-10">
                {[navItems[0], navItems[1], navItems[2], navItems[4]].map(({ label, to, Icon }, idx) => (
                  <li key={idx} className="list-none">
                    <NavLink
                      to={to}
                      end={to === '/'}
                      aria-label={label}
                      className={({ isActive }) => getBottomLinkClass(isActive)}
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent blur-sm pointer-events-none" aria-hidden="true"></div>
                          )}
                          <div className="w-14 h-14 rounded-full bg-white/20 grid place-items-center relative transition-transform duration-200 group-hover:scale-105">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent blur-sm pointer-events-none" aria-hidden="true"></div>
                            <Icon className={`w-7 h-7 relative z-10 ${isActive ? 'text-accent' : 'text-white'}`} />
                          </div>
                          {/* Label removed per feedback */}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </main>
      </div>
    </div>
  )
}


