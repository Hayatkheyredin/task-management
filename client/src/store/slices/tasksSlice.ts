import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../utils/api'

export type Subtask = {
  id: string
  title: string
  completed: boolean
  position: number
}

export type Task = {
  _id: string
  title: string
  description?: string
  dueDate?: string
  priority: 'low' | 'medium' | 'high'
  status: 'todo' | 'in_progress' | 'done'
  category?: string
  subtasks: Subtask[]
  position: number
}

type TasksState = {
  items: Task[]
  status: 'idle' | 'loading' | 'error'
}

const initialState: TasksState = {
  items: [],
  status: 'idle',
}

export const fetchTasks = createAsyncThunk('tasks/fetch', async (params: Record<string, string | undefined>) => {
  const res = await api.get('/tasks', { params })
  return (res.data.tasks as Task[])
})

export const createTaskThunk = createAsyncThunk('tasks/create', async (payload: Partial<Task>) => {
  const res = await api.post('/tasks', payload)
  return res.data.task as Task
})

export const updateTaskThunk = createAsyncThunk('tasks/update', async ({ id, updates }: { id: string; updates: Partial<Task> }) => {
  const res = await api.put(`/tasks/${id}`, updates)
  return res.data.task as Task
})

export const deleteTaskThunk = createAsyncThunk('tasks/delete', async (id: string) => {
  await api.delete(`/tasks/${id}`)
  return id
})

export const reorderTasksThunk = createAsyncThunk('tasks/reorder', async (orderedIds: string[]) => {
  await api.post('/tasks/reorder', { orderedIds })
  return orderedIds
})

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'idle'
        state.items = action.payload
      })
      .addCase(createTaskThunk.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        const idx = state.items.findIndex(t => t._id === action.payload._id)
        if (idx >= 0) state.items[idx] = action.payload
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t._id !== action.payload)
      })
      .addCase(reorderTasksThunk.fulfilled, (state, action) => {
        const idToPos = new Map(action.payload.map((id, i) => [id, i]))
        state.items.sort((a, b) => (idToPos.get(a._id)! - idToPos.get(b._id)!))
      })
  },
})

export default slice.reducer


