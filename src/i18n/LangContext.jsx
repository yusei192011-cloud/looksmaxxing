import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import ja from './strings/ja'
import en from './strings/en'
import ko from './strings/ko'
import zh from './strings/zh'
import es from './strings/es'

const STRINGS = { ja, en, ko, zh, es }
const STORAGE_KEY = 'lang'

const LangContext = createContext(null)

function readInitialLang() {
  try {
    return localStorage.getItem(STORAGE_KEY) || 'ja'
  } catch {
    return 'ja'
  }
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(readInitialLang)

  const setLang = useCallback((l) => {
    if (!STRINGS[l]) return
    setLangState(l)
    try { localStorage.setItem(STORAGE_KEY, l) } catch { /* private mode etc. */ }
  }, [])

  const t = useCallback((key) => {
    const table = STRINGS[lang] || STRINGS.en
    return table[key] ?? STRINGS.en[key] ?? key
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within a LangProvider')
  return ctx
}
