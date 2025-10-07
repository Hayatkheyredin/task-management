import React from 'react'
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom'
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
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding: 12px 16px;
  background: #0b1220;
  border: 1px solid #1f2937;
  border-radius: 12px;
  a { text-decoration: none; }
`

export const RootLayout: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const token = useAppSelector(s => s.auth.token)
  return (
    <Shell>
      <Nav>
        <NavLink to="/" style={{ fontWeight: 700 }}>Focus Hub</NavLink>
        <div style={{ margin: '0 auto', display: 'flex', gap: 12 }}>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/signup">Sign Up</Link>}
        {token && <button onClick={() => { dispatch(logout()); navigate('/login') }}>Logout</button>}
      </Nav>
      <div className="container card">
        <Outlet />
      </div>
      <footer className="container" style={{ marginTop: 24 }}>
        <div className="card" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <strong>TaskEase</strong>
            <span style={{ color: '#9ca3af' }}>© 2025 TaskEase. All rights reserved.</span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <NavLink to="#">About</NavLink>
            <NavLink to="#">Contact</NavLink>
            <NavLink to="#">Privacy</NavLink>
            <NavLink to="#">Terms</NavLink>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
          </div>
        </div>
      </footer>
    </Shell>
  )
}


