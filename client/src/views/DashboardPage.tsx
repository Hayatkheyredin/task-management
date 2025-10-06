import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../utils/hooks'
import { Task, fetchTasks, createTaskThunk, updateTaskThunk, deleteTaskThunk, reorderTasksThunk } from '../store/slices/tasksSlice'
import styled from 'styled-components'
import { useSocket } from '../utils/socket'

const Row = styled.div`
  display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-bottom: 12px;
`

export const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { items } = useAppSelector(s => s.tasks)
  const [filter, setFilter] = useState<{status?: string; priority?: string}>({})
  const socket = useSocket()

  useEffect(() => {
    dispatch(fetchTasks(filter as any))
  }, [dispatch, filter])

  useEffect(() => {
    function onTaskUpdated() { dispatch(fetchTasks(filter as any)) }
    socket.on('task:updated', onTaskUpdated)
    return () => { socket.off('task:updated', onTaskUpdated) }
  }, [socket, dispatch, filter])

  const grouped = useMemo(() => {
    const byStatus: Record<string, Task[]> = { todo: [], in_progress: [], done: [] }
    items.forEach(t => byStatus[t.status].push(t))
    return byStatus
  }, [items])

  function addTask() {
    const title = prompt('Task title?')
    if (title) dispatch(createTaskThunk({ title }))
  }

  function toggleStatus(t: Task) {
    const next = t.status === 'todo' ? 'in_progress' : t.status === 'in_progress' ? 'done' : 'todo'
    dispatch(updateTaskThunk({ id: t._id, updates: { status: next } }))
  }

  return (
    <div>
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
        <button onClick={addTask}>Add Task</button>
      </Row>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        {(['todo','in_progress','done'] as const).map(col => (
          <div key={col} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 8, minHeight: 200 }}>
            <h3>{col.replace('_',' ')}</h3>
            {grouped[col].map(t => (
              <div key={t._id} style={{ border: '1px solid #ccc', borderRadius: 6, padding: 8, marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{t.title}</strong>
                  <span>{t.priority}</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => toggleStatus(t)}>Next Status</button>
                  <button onClick={() => dispatch(deleteTaskThunk(t._id))}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}


