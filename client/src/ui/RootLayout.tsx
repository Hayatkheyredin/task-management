import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../utils/hooks'
import { logout } from '../store/slices/authSlice'

const Shell = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
`

const Nav = styled.nav`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  a { text-decoration: none; }
`

export const RootLayout: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const token = useAppSelector(s => s.auth.token)
  return (
    <Shell>
      <Nav>
        <Link to="/">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <span style={{ flex: 1 }} />
        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/signup">Signup</Link>}
        {token && <button onClick={() => { dispatch(logout()); navigate('/login') }}>Logout</button>}
      </Nav>
      <Outlet />
    </Shell>
  )
}


