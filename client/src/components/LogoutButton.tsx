import React from 'react'
import { useAppDispatch } from '../utils/hooks'
import { logoutThunk } from '../store/slices/authSlice'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'

interface LogoutButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ 
  variant = 'ghost', 
  size = 'default',
  className 
}) => {
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    await dispatch(logoutThunk())
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      className={className}
    >
      <LogOut className="h-4 w-4 mr-2" />
      Logout
    </Button>
  )
}
