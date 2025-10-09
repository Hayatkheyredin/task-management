import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { api } from '../../utils/api'

export type User = { 
  id: string; 
  name: string; 
  email: string; 
  avatarUrl?: string;
  settings?: {
    notificationsEnabled?: boolean;
    theme?: string;
  }
}

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
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      console.log('Making login API request to:', api.defaults.baseURL + '/auth/login')
      console.log('Login payload:', payload)
      const res = await api.post('/auth/login', payload)
      console.log('Login API response:', res.data)
      return res.data as { user: User; token: string }
    } catch (error: any) {
      console.error('Login API error:', error)
      console.error('Error response:', error.response)
      return rejectWithValue(error.response?.data?.message || 'Login failed')
    }
  }
)

export const signupThunk = createAsyncThunk(
  'auth/signup',
  async (payload: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await api.post('/auth/signup', payload)
      return res.data as { user: User; token: string }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed')
    }
  }
)

export const meThunk = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/auth/me')
    return res.data.user as User
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch user')
  }
})

export const updateProfileThunk = createAsyncThunk('auth/updateProfile', async (payload: Partial<User>, { rejectWithValue }) => {
  try {
    const res = await api.put('/auth/me', payload)
    return res.data.user as User
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update profile')
  }
})

export const logoutThunk = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await api.post('/auth/logout')
    return true
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Logout failed')
  }
})

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = 'loading'
        state.error = undefined
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = 'idle'
        state.user = action.payload.user
        state.token = action.payload.token
        state.error = undefined
        localStorage.setItem('token', state.token!)
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = 'error'
        state.error = String(action.payload || 'Login failed')
      })
      .addCase(signupThunk.pending, (state) => {
        state.status = 'loading'
        state.error = undefined
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.status = 'idle'
        state.user = action.payload.user
        state.token = action.payload.token
        state.error = undefined
        localStorage.setItem('token', state.token!)
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.status = 'error'
        state.error = String(action.payload || 'Signup failed')
      })
      .addCase(meThunk.fulfilled, (state, action) => {
        state.user = action.payload
        state.error = undefined
      })
      .addCase(meThunk.rejected, (state, action) => {
        state.status = 'error'
        state.error = String(action.payload || 'Failed to fetch user')
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.user = action.payload
        state.error = undefined
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.error = String(action.payload || 'Failed to update profile')
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.status = 'idle'
        state.error = undefined
        localStorage.removeItem('token')
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.error = String(action.payload || 'Logout failed')
      })
  },
})

export const { logout, setToken } = slice.actions
export default slice.reducer


