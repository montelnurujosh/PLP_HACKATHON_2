import { createContext, useContext, useMemo, useState } from 'react'
import { api } from '../state/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('edu_user')
      return raw ? JSON.parse(raw) : null
    } catch { return null }
  })

  function persist(token, nextUser) {
    localStorage.setItem('edu_token', token)
    localStorage.setItem('edu_user', JSON.stringify(nextUser))
    setUser(nextUser)
  }

  async function login(email, password) {
    const { token, user: u } = await api.login({ email, password })
    persist(token, u)
  }

  async function signup(name, email, password) {
    const { token, user: u } = await api.signup({ name, email, password })
    persist(token, u)
  }

  function logout() {
    localStorage.removeItem('edu_token')
    localStorage.removeItem('edu_user')
    setUser(null)
  }

  const value = useMemo(() => ({ user, login, signup, logout }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}




