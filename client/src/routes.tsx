import { createRoutesFromElements, Route } from 'react-router-dom'
import { RootLayout } from './ui/RootLayout'
import { LoginPage } from './views/LoginPage'
import { SignupPage } from './views/SignupPage'
import DashboardPage from './views/DashboardPage'
import { HomePage } from './views/HomePage'
import { ProfilePage } from './views/ProfilePage'
import { FeaturesPage } from './views/FeaturesPage'
import { HowItWorksPage } from './views/HowItWorksPage'
import { AboutPage } from './views/AboutPage'
import { ContactPage } from './views/ContactPage'

export const AppRoutes = createRoutesFromElements(
  <Route path="/" element={<RootLayout/>}>
    <Route index element={<HomePage/>} />
    <Route path="app" element={<DashboardPage/>} />
    <Route path="login" element={<LoginPage/>} />
    <Route path="signup" element={<SignupPage/>} />
    <Route path="profile" element={<ProfilePage/>} />
    <Route path="features" element={<FeaturesPage/>} />
    <Route path="how-it-works" element={<HowItWorksPage/>} />
    <Route path="about" element={<AboutPage/>} />
    <Route path="contact" element={<ContactPage/>} />
  </Route>
)



