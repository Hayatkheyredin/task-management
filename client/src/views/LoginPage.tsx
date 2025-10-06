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

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const res = await dispatch(loginThunk({ email, password }))
    if ((res as any).meta.requestStatus === 'fulfilled') nav('/')
  }

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button disabled={auth.status==='loading'}>Login</button>
      {auth.error && <div style={{ color: 'red' }}>{auth.error}</div>}
    </form>
  )
}


