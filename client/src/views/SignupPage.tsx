import React, { useState } from 'react'
import { useAppDispatch } from '../utils/hooks'
import { signupThunk } from '../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'

export const SignupPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) return alert('Passwords do not match')
    const res = await dispatch(signupThunk({ name, email, password }))
    if ((res as any).meta.requestStatus === 'fulfilled') nav('/')
  }

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 360, margin: '0 auto', minHeight: '70vh', alignContent: 'center' }}>
      <h2>Signup</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <div style={{ display: 'grid', gap: 8 }}>
        <input placeholder="Password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required />
        <input placeholder="Confirm Password" type={showPassword ? 'text' : 'password'} value={confirm} onChange={e => setConfirm(e.target.value)} required />
        <button type="button" onClick={() => setShowPassword(v => !v)}>{showPassword ? 'Hide' : 'Show'} Passwords</button>
      </div>
      <button>Signup</button>
    </form>
  )
}


