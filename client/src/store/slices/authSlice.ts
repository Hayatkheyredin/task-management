import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../utils/api'

type User = { id: string; name: string; email: string }

type AuthState = {
  user: User | null
  token: string | null
  status: 'idle' | 'loading' | 'error'
  error?: string
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
}

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }) => {
    const res = await api.post('/auth/login', payload)
    return res.data as { user: User; token: string }
  }
)

export const signupThunk = createAsyncThunk(
  'auth/signup',
  async (payload: { name: string; email: string; password: string }) => {
    const res = await api.post('/auth/signup', payload)
    return res.data as { user: User; token: string }
  }
)

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
    },
    setToken(state, action) {
      state.token = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = 'idle'
        state.user = action.payload.user
        state.token = action.payload.token
        localStorage.setItem('token', state.token!)
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = 'error'
        state.error = String(action.error.message || 'Login failed')
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.status = 'idle'
        state.user = action.payload.user
        state.token = action.payload.token
        localStorage.setItem('token', state.token!)
      })
  },
})

export const { logout, setToken } = slice.actions
export default slice.reducer


