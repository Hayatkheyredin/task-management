import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'
import { 
  fetchTasksThunk, 
  createTaskThunk, 
  updateTaskThunk, 
  deleteTaskThunk, 
  completeTaskThunk, 
  startTaskThunk
} from '../store/slices/tasksSlice'
import type { Task } from '../store/slices/tasksSlice'
import { TaskList } from '../components/TaskList'
import { TaskForm } from '../components/TaskForm'
import styled from 'styled-components'

const DashboardContainer = styled.div`
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  min-height: 100vh;
  color: white;
  padding: 20px;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 0 16px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  p {
    color: #94a3b8;
    font-size: 1.1rem;
    margin: 0;
  }
`



const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading } = useSelector((state: RootState) => state.tasks);
  
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    dispatch(fetchTasksThunk({}));
  }, [dispatch]);

  const handleCreateTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleSubmitTask = async (taskData: {
    title: string;
    description: string;
    dueDate: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    tags: string[];
  }) => {
    try {
      if (editingTask) {
        await dispatch(updateTaskThunk({ taskId: editingTask._id, updates: taskData }));
      } else {
        await dispatch(createTaskThunk(taskData));
      }
      setShowTaskForm(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleCompleteTask = async (taskId: string) => {
    try {
      await dispatch(completeTaskThunk(taskId));
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleStartTask = async (taskId: string) => {
    try {
      await dispatch(startTaskThunk(taskId));
    } catch (error) {
      console.error('Error starting task:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await dispatch(deleteTaskThunk(taskId));
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleCloseForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  return (
    <DashboardContainer>
      <Header>
        <h1>Task Management Dashboard</h1>
        <p>Organize your tasks and stay productive</p>
      </Header>

      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', color: '#1f2937' }}>
        <TaskList
          tasks={tasks}
          loading={loading}
          onComplete={handleCompleteTask}
          onStart={handleStartTask}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onCreate={handleCreateTask}
        />
      </div>

      {showTaskForm && (
        <ModalOverlay onClick={handleCloseForm}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <TaskForm
              task={editingTask}
              onSubmit={handleSubmitTask}
              onCancel={handleCloseForm}
              loading={loading}
            />
          </ModalContent>
        </ModalOverlay>
      )}
    </DashboardContainer>
  );
}