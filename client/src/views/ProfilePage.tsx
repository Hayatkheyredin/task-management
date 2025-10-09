import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../utils/hooks'
import { updateProfileThunk } from '../store/slices/authSlice'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { User, Mail, Settings } from 'lucide-react'

export const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { user, status } = useAppSelector(s => s.auth)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    avatarUrl: user?.avatarUrl || ''
  })

  const handleSave = async () => {
    await dispatch(updateProfileThunk(formData))
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      avatarUrl: user?.avatarUrl || ''
    })
    setIsEditing(false)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Personal Information</span>
          </CardTitle>
          <CardDescription>
            Update your personal details and profile information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            {isEditing ? (
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
              />
            ) : (
              <div className="flex items-center space-x-2 p-2 border rounded-md bg-muted">
                <User className="h-4 w-4" />
                <span>{user?.name}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex items-center space-x-2 p-2 border rounded-md bg-muted">
              <Mail className="h-4 w-4" />
              <span>{user?.email}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Email cannot be changed. Contact support if you need to update your email.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatarUrl">Avatar URL</Label>
            {isEditing ? (
              <Input
                id="avatarUrl"
                value={formData.avatarUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, avatarUrl: e.target.value }))}
                placeholder="Enter avatar URL (optional)"
              />
            ) : (
              <div className="flex items-center space-x-2 p-2 border rounded-md bg-muted">
                <User className="h-4 w-4" />
                <span>{user?.avatarUrl || 'No avatar set'}</span>
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave} disabled={status === 'loading'}>
                  {status === 'loading' ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            Manage your account preferences and security settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Notifications</h4>
              <p className="text-sm text-muted-foreground">
                Receive email notifications for task updates
              </p>
            </div>
            <Button variant="outline" size="sm">
              {user?.settings?.notificationsEnabled ? 'Enabled' : 'Disabled'}
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Theme</h4>
              <p className="text-sm text-muted-foreground">
                Choose your preferred theme
              </p>
            </div>
            <Button variant="outline" size="sm">
              {user?.settings?.theme || 'Light'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}