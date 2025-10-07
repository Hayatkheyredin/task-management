import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../utils/hooks'
import { loginThunk } from '../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector(s => s.auth)
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const res = await dispatch(loginThunk({ email, password }))
    if ((res as any).meta.requestStatus === 'fulfilled') nav('/')
  }

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 360, margin: '0 auto', minHeight: '70vh', alignContent: 'center' }}>
      <h2>Login</h2>
      <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <div style={{ display: 'flex', gap: 8 }}>
        <input style={{ flex: 1 }} placeholder="Password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="button" onClick={() => setShowPassword(v => !v)}>{showPassword ? 'Hide' : 'Show'}</button>
      </div>
      <button disabled={auth.status==='loading'}>{auth.status==='loading' ? 'Logging in…' : 'Login'}</button>
      {auth.error && <div style={{ color: 'red' }}>{auth.error}</div>}
    </form>
  )
}


