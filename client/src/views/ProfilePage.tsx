import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../utils/hooks'
import { updateProfileThunk } from '../store/slices/authSlice'

export const ProfilePage: React.FC = () => {
  const user = useAppSelector(s => s.auth.user)
  const dispatch = useAppDispatch()
  const [name, setName] = useState(user?.name || '')

  async function save(e: React.FormEvent) {
    e.preventDefault()
    await dispatch(updateProfileThunk({ name }))
  }

  return (
    <form onSubmit={save} style={{ display: 'grid', gap: 8, maxWidth: 360 }}>
      <h2>Profile</h2>
      <label>Name</label>
      <input value={name} onChange={e => setName(e.target.value)} />
      <label>Email</label>
      <input value={user?.email || ''} disabled />
      <button>Save</button>
    </form>
  )
}


