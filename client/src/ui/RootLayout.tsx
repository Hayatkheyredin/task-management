import React, { useEffect } from 'react'
import { Outlet, Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../utils/hooks'
import { logout, meThunk, setToken } from '../store/slices/authSlice'

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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  a { 
    text-decoration: none; 
    color: white;
    font-weight: 500;
    transition: all 0.2s ease;
    &:hover {
      color: #f0f9ff;
      transform: translateY(-1px);
    }
  }
  button {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: 8px 16px;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s ease;
    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
    }
  }
  span {
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
  }
`

export const RootLayout: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { user, token } = useAppSelector(s => s.auth)

  // Check for token on app load
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken && !token) {
      dispatch(setToken(storedToken))
      dispatch(meThunk())
    }
  }, [dispatch, token])

  // Redirect to login if not authenticated and trying to access protected routes
  useEffect(() => {
    const protectedRoutes = ['/app', '/profile']
    if (!token && protectedRoutes.some(route => location.pathname.startsWith(route))) {
      navigate('/login')
    }
  }, [token, location.pathname, navigate])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <Shell>
      <Nav>
        <NavLink to="/" style={{ fontWeight: 700 }}>Focus Hub</NavLink>
        {!token && (
          <div style={{ margin: '0 auto', display: 'flex', gap: 12 }}>
            <Link to="/features">Features</Link>
            <Link to="/how-it-works">How It Works</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        )}
        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/signup">Sign Up</Link>}
        {token && (
          <>
            <span style={{ color: '#9ca3af', fontSize: '14px' }}>
              Welcome, {user?.name || 'User'}
            </span>
            <Link to="/app">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </Nav>
      <div className="container card">
        <Outlet />
      </div>
      <footer className="container" style={{ marginTop: 24 }}>
        <div className="card" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <strong>Focus Hub</strong>
            <span style={{ color: '#9ca3af' }}>© 2025 Focus Hub. All rights reserved.</span>
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


