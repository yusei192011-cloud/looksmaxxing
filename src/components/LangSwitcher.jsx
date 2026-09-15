import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n/LangContext'

const LANG_NAMES = { ja: '日本語', en: 'English', ko: '한국어', zh: '中文', es: 'Español' }

export default function LangSwitcher() {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e) => { if (!ref.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [open])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button id="lang-btn" onClick={() => setOpen(o => !o)}>{lang.toUpperCase()} ▾</button>
      <div id="lang-dd" className={open ? 'open' : ''}>
        {Object.entries(LANG_NAMES).map(([code, name]) => (
          <div key={code} className={`lang-opt${code === lang ? ' on' : ''}`} onClick={() => { setLang(code); setOpen(false) }}>{name}</div>
        ))}
      </div>
    </div>
  )
}
