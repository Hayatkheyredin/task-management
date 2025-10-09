import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';

export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  completedAt?: string;
  tags: string[];
  user: string;
  createdAt: string;
  updatedAt: string;
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  stats: {
    total: number;
    overdue: number;
    byStatus: Record<string, number>;
  } | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
  stats: null
};

// Async thunks
export const fetchTasksThunk = createAsyncThunk(
  'tasks/fetchTasks',
  async (filters: { status?: string; priority?: string; dueDate?: string; search?: string } = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    const res = await api.get(`/tasks?${params.toString()}`);
    return res.data;
  }
);

export const fetchTaskThunk = createAsyncThunk(
  'tasks/fetchTask',
  async (taskId: string) => {
    const res = await api.get(`/tasks/${taskId}`);
    return res.data.task;
  }
);

export const createTaskThunk = createAsyncThunk(
  'tasks/createTask',
  async (taskData: {
    title: string;
    description?: string;
    dueDate: string;
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    tags?: string[];
  }) => {
    const res = await api.post('/tasks', taskData);
    return res.data.task;
  }
);

export const updateTaskThunk = createAsyncThunk(
  'tasks/updateTask',
  async ({ taskId, updates }: { taskId: string; updates: Partial<Task> }) => {
    const res = await api.put(`/tasks/${taskId}`, updates);
    return res.data.task;
  }
);

export const deleteTaskThunk = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: string) => {
    await api.delete(`/tasks/${taskId}`);
    return taskId;
  }
);

export const completeTaskThunk = createAsyncThunk(
  'tasks/completeTask',
  async (taskId: string) => {
    const res = await api.patch(`/tasks/${taskId}/complete`);
    return res.data.task;
  }
);

export const startTaskThunk = createAsyncThunk(
  'tasks/startTask',
  async (taskId: string) => {
    const res = await api.patch(`/tasks/${taskId}/start`);
    return res.data.task;
  }
);

export const fetchTaskStatsThunk = createAsyncThunk(
  'tasks/fetchStats',
  async () => {
    const res = await api.get('/tasks/stats');
    return res.data.stats;
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearTasks: (state) => {
      state.tasks = [];
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch tasks
    builder
      .addCase(fetchTasksThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
      })
      .addCase(fetchTasksThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch single task
    builder
      .addCase(fetchTaskThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskThunk.fulfilled, (state, action) => {
        state.loading = false;
        const existingIndex = state.tasks.findIndex(task => task._id === action.payload._id);
        if (existingIndex >= 0) {
          state.tasks[existingIndex] = action.payload;
        } else {
          state.tasks.push(action.payload);
        }
      })
      .addCase(fetchTaskThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create task
    builder
      .addCase(createTaskThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTaskThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTaskThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update task
    builder
      .addCase(updateTaskThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index >= 0) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTaskThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete task
    builder
      .addCase(deleteTaskThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      })
      .addCase(deleteTaskThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Complete task
    builder
      .addCase(completeTaskThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeTaskThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index >= 0) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(completeTaskThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Start task
    builder
      .addCase(startTaskThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startTaskThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index >= 0) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(startTaskThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch stats
    builder
      .addCase(fetchTaskStatsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskStatsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchTaskStatsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearTasks, clearError } = tasksSlice.actions;
export default tasksSlice.reducer;