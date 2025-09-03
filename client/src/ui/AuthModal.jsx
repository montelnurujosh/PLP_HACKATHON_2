import { useState } from 'react'

function AuthModal({ mode = 'login', onClose, onLogin, onSignup }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const isLogin = mode === 'login'

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      if (isLogin) await onLogin(email, password)
      else await onSignup(name, email, password)
      onClose()
    } catch (e) {
      setError('Authentication failed')
    }
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal>
      <div className="modal">
        <h2>{isLogin ? 'Log in' : 'Sign up'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin ? (
            <input className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          ) : null}
          <input className="input" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error ? <div className="error">{error}</div> : null}
          <div style={{ display: 'flex', gap: '.5rem', marginTop: '.5rem' }}>
            <button className="button" type="submit">{isLogin ? 'Log in' : 'Create account'}</button>
            <button className="tag" type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthModal




