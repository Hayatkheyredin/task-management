import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppRoutes } from './routes'
import './style.css'
import { useAppDispatch } from './utils/hooks'
import { meThunk, setToken } from './store/slices/authSlice'

const router = createBrowserRouter(AppRoutes)

function Bootstrapper() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(setToken(token))
      dispatch(meThunk())
    }
  }, [dispatch])
  return <RouterProvider router={router} />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Bootstrapper />
    </Provider>
  </React.StrictMode>
)



