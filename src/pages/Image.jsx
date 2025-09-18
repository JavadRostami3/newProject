import React from 'react'
import { Image as ImageIcon, Wand2, Download, Loader2 } from 'lucide-react'

const aspectOptions = [
  { value: '1:1', label: '۱:۱ مربع' },
  { value: '3:4', label: '۳:۴ عمودی' },
  { value: '4:3', label: '۴:۳ افقی' },
]

function MockTile({ url, onDownload }) {
  return (
    <div className="relative rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50">
      <img src={url} alt="generated" className="w-full h-40 object-cover" />
      <button type="button" onClick={onDownload} className="absolute bottom-2 left-2 h-9 px-3 rounded-full bg-white/90 border border-neutral-200 backdrop-blur text-xs hover:bg-white inline-flex items-center gap-2"><Download className="w-4 h-4" /> دانلود</button>
    </div>
  )
}

export default function ImagePage() {
  const [prompt, setPrompt] = React.useState('یک پوستر آموزشی درباره فتوسنتز با سبک فلت')
  const [aspect, setAspect] = React.useState('1:1')
  const [seed, setSeed] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [images, setImages] = React.useState([])

  const generate = () => {
    setLoading(true)
    setTimeout(() => {
      const url = `https://picsum.photos/seed/${encodeURIComponent(prompt + aspect + (seed||'x'))}/600/400`
      setImages((prev) => [{ id: Date.now(), url }, ...prev].slice(0, 8))
      setLoading(false)
    }, 800)
  }

  const download = (url) => {
    // For now, open in new tab; real download later
    window.open(url, '_blank')
  }

  return (
    <div className="px-4 md:px-8 py-4 flex flex-col lg:flex-row-reverse gap-4">
      {/* Right panel - tips */}
      <aside className="w-full lg:w-[320px] lg:sticky lg:top-4 bg-white rounded-[24px] border border-neutral-300 p-4 md:p-6 h-fit">
        <div className="flex items-center gap-2 text-[18px] md:text-[20px] font-semibold text-black mb-1"><ImageIcon className="w-5 h-5" /> نکات ساخت تصویر</div>
        <ul className="list-disc ps-5 text-sm text-neutral-700 space-y-1">
          <li>موضوع، سبک، رنگ غالب و جزئیات را در پرامپت بنویسید.</li>
          <li>نسبت تصویر را بر اساس کاربرد انتخاب کنید (پوستر/استوری/کارت).</li>
          <li>با Seed یکسان می‌توانید نتایج مشابه بگیرید.</li>
        </ul>
      </aside>

      <section className="w-full bg-white rounded-[24px] border border-neutral-300 p-4 md:p-6">
        <div className="mb-3">
          <h2 className="text-[18px] md:text-[20px] font-semibold text-black">ساخت تصویر</h2>
          <p className="text-sm text-neutral-700 mt-1">تصاویر آموزشی و پوستر برای کلاس تولید کنید.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2">
            <label className="block text-sm text-neutral-600 mb-1">پرامپت</label>
            <textarea value={prompt} onChange={(e)=>setPrompt(e.target.value)} rows={4} className="w-full rounded-xl border border-neutral-300 bg-white text-neutral-800 p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent" placeholder="توضیح دهید چه تصویری می‌خواهید" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-neutral-600 mb-1">نسبت تصویر</label>
              <select value={aspect} onChange={(e)=>setAspect(e.target.value)} className="w-full h-11 rounded-xl border border-neutral-300 bg-white text-neutral-800 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent">
                {aspectOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-600 mb-1">Seed (اختیاری)</label>
              <input value={seed} onChange={(e)=>setSeed(e.target.value)} className="w-full h-11 rounded-xl border border-neutral-300 bg-white text-neutral-800 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent" placeholder="مثلاً: 1234" />
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <button type="button" onClick={generate} className="h-12 px-5 rounded-xl bg-[#43413D] text-white hover:bg-[#3b3a36] inline-flex items-center gap-2"><Wand2 className="w-5 h-5" /> ساخت تصویر</button>
          {loading && <div className="text-sm text-neutral-700 inline-flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> در حال تولید...</div>}
        </div>

        {/* Gallery */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {images.map((im) => (
            <MockTile key={im.id} url={im.url} onDownload={() => download(im.url)} />
          ))}
          {images.length === 0 && (
            <div className="rounded-xl border border-dashed border-neutral-300 p-6 text-center text-neutral-600">
              هنوز تصویری ساخته نشده است.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
