import { createRoutesFromElements, Route, Navigate } from 'react-router-dom'
import { RootLayout } from './ui/RootLayout'
import { LoginPage } from './views/LoginPage'
import { SignupPage } from './views/SignupPage'
import { DashboardPage } from './views/DashboardPage'
import { HomePage } from './views/HomePage'
import { ProfilePage } from './views/ProfilePage'
import { useAppSelector } from './utils/hooks'

function RequireAuth({ children }: { children: React.ReactElement }) {
  const token = useAppSelector(s => s.auth.token)
  if (!token) return <Navigate to="/login" replace />
  return children
}

export const AppRoutes = createRoutesFromElements(
  <Route path="/" element={<RootLayout/>}>
    <Route index element={<HomePage/>} />
    <Route path="app" element={<RequireAuth><DashboardPage/></RequireAuth>} />
    <Route path="login" element={<LoginPage/>} />
    <Route path="signup" element={<SignupPage/>} />
    <Route path="profile" element={<RequireAuth><ProfilePage/></RequireAuth>} />
  </Route>
)



