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

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const res = await dispatch(signupThunk({ name, email, password }))
    if ((res as any).meta.requestStatus === 'fulfilled') nav('/')
  }

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
      <h2>Signup</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button>Signup</button>
    </form>
  )
}


