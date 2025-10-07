import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../utils/hooks'
import type { Task } from '../store/slices/tasksSlice'
import { fetchTasks, createTaskThunk, updateTaskThunk, deleteTaskThunk } from '../store/slices/tasksSlice'
import styled from 'styled-components'

const Row = styled.div`
  display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-bottom: 12px;
`

export const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { items } = useAppSelector(s => s.tasks)
  const [filter, setFilter] = useState<{status?: string; priority?: string}>({})
  const [newTask, setNewTask] = useState<{title: string; priority: 'low'|'medium'|'high'; description?: string}>({ title: '', priority: 'medium' })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState('')

  useEffect(() => {
    dispatch(fetchTasks(filter as any))
  }, [dispatch, filter])

  const grouped = useMemo(() => {
    const byStatus: Record<string, Task[]> = { todo: [], in_progress: [], done: [] }
    items.forEach(t => byStatus[t.status].push(t))
    return byStatus
  }, [items])

  async function addTask(e: React.FormEvent) {
    e.preventDefault()
    if (!newTask.title.trim()) return
    await dispatch(createTaskThunk({ title: newTask.title.trim(), priority: newTask.priority, description: newTask.description }))
    setNewTask({ title: '', priority: 'medium' })
  }

  function toggleStatus(t: Task) {
    const next = t.status === 'todo' ? 'in_progress' : t.status === 'in_progress' ? 'done' : 'todo'
    dispatch(updateTaskThunk({ id: t._id, updates: { status: next } }))
  }

  return (
    <div>
      <h1>Task Management Dashboard</h1>
      <Row>
        <select value={filter.status || ''} onChange={e => setFilter(f => ({...f, status: e.target.value || undefined}))}>
          <option value="">All Statuses</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select value={filter.priority || ''} onChange={e => setFilter(f => ({...f, priority: e.target.value || undefined}))}>
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </Row>

      <form onSubmit={addTask} style={{ display: 'grid', gap: 8, maxWidth: 520, marginBottom: 12 }}>
        <input placeholder="Task title" value={newTask.title} onChange={e => setNewTask(t => ({...t, title: e.target.value}))} />
        <div style={{ display: 'flex', gap: 8 }}>
          <select value={newTask.priority} onChange={e => setNewTask(t => ({...t, priority: e.target.value as any}))}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input style={{ flex: 1 }} placeholder="Description (optional)" value={newTask.description || ''} onChange={e => setNewTask(t => ({...t, description: e.target.value}))} />
          <button type="submit">Add Task</button>
        </div>
      </form>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        {(['todo','in_progress','done'] as const).map(col => (
          <div key={col} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 8, minHeight: 200 }}>
            <h3>{col.replace('_',' ')}</h3>
            {grouped[col].map(t => (
              <div key={t._id} style={{ border: '1px solid #ccc', borderRadius: 6, padding: 8, marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  {editingId === t._id ? (
                    <input autoFocus value={editingTitle} onChange={e => setEditingTitle(e.target.value)} onBlur={() => { setEditingId(null); setEditingTitle('') }} onKeyDown={e => { if (e.key === 'Enter') { dispatch(updateTaskThunk({ id: t._id, updates: { title: editingTitle.trim() || t.title } })); setEditingId(null); setEditingTitle('') } }} />
                  ) : (
                    <strong onDoubleClick={() => { setEditingId(t._id); setEditingTitle(t.title) }} title="Double-click to edit title">{t.title}</strong>
                  )}
                  <span>{t.priority}</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => toggleStatus(t)}>Next Status</button>
                  <button onClick={() => dispatch(deleteTaskThunk(t._id))}>Delete</button>
                </div>
              </div>
            ))}
            {grouped[col].length === 0 && <div style={{ color: '#666' }}>No tasks</div>}
          </div>
        ))}
      </div>
    </div>
  )
}


