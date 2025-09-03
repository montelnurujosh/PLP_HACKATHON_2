import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../state/api.js'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('edu_theme')
    return saved || 'system'
  })
  const [fontScale, setFontScale] = useState(() => {
    const saved = localStorage.getItem('edu_font_scale')
    return saved ? Number(saved) : 1
  })
  const [user, setUser] = useState(null)

  useEffect(() => {
    api.getUser().then(setUser).catch(() => setUser(null))
  }, [])

  useEffect(() => {
    localStorage.setItem('edu_theme', theme)
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('edu_font_scale', String(fontScale))
    document.documentElement.style.setProperty('--font-scale', String(fontScale))
  }, [fontScale])

  const value = useMemo(() => ({
    user,
    theme,
    setTheme,
    fontScale,
    increaseFont: () => setFontScale((v) => Math.min(1.6, parseFloat((v + 0.1).toFixed(2)))) ,
    decreaseFont: () => setFontScale((v) => Math.max(0.8, parseFloat((v - 0.1).toFixed(2))))
  }), [user, theme, fontScale])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}


