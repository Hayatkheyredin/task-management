import { createRoutesFromElements, Route } from 'react-router-dom'
import { RootLayout } from './ui/RootLayout'
import { LoginPage } from './views/LoginPage'
import { SignupPage } from './views/SignupPage'
import { DashboardPage } from './views/DashboardPage'
import { ProfilePage } from './views/ProfilePage'

export const AppRoutes = createRoutesFromElements(
  <Route path="/" element={<RootLayout/>}>
    <Route index element={<DashboardPage/>} />
    <Route path="login" element={<LoginPage/>} />
    <Route path="signup" element={<SignupPage/>} />
    <Route path="profile" element={<ProfilePage/>} />
  </Route>
)


