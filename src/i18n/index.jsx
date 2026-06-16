import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { dict } from './dict'

const LangCtx = createContext(null)
const LANG_KEY = 'khatun.lang'

function resolve(obj, key) {
  return key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj)
}

// Fill {tokens} in a template string.
export function format(str, vars = {}) {
  if (typeof str !== 'string') return str
  return str.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? vars[k] : `{${k}}`))
}

function detectInitial() {
  try {
    const saved = localStorage.getItem(LANG_KEY)
    if (saved === 'mn' || saved === 'en') return saved
  } catch {
    /* ignore */
  }
  // Mongolian-first by default; visitors can switch to EN (remembered).
  return 'mn'
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitial)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((l) => {
    setLangState(l)
    try {
      localStorage.setItem(LANG_KEY, l)
    } catch {
      /* ignore */
    }
  }, [])

  // t(key, vars?) — returns the value at the dotted path (string OR array/object).
  // Falls back to MN, then the key itself.
  const t = useCallback(
    (key, vars) => {
      let val = resolve(dict[lang], key)
      if (val === undefined) val = resolve(dict.mn, key)
      if (val === undefined) return key
      return vars && typeof val === 'string' ? format(val, vars) : val
    },
    [lang]
  )

  return (
    <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>
  )
}

export function useT() {
  const ctx = useContext(LangCtx)
  if (!ctx) throw new Error('useT must be used within LanguageProvider')
  return ctx
}
