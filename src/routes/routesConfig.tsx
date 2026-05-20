import React from 'react'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Chat from '../pages/Chat'
import AdminDashboard from '../pages/AdminDashboard'

export interface RouteConfig {
  path: string
  element: React.ReactNode
  isProtected?: boolean
  isPublicOnly?: boolean // Only accessible when logged out
  dynamicRedirect?: boolean // Flag for root dynamic redirect
  allowedRoles?: ('user' | 'admin')[]
}

export const routesConfig: RouteConfig[] = [
  {
    path: '/',
    element: null,
    dynamicRedirect: true,
  },
  {
    path: '/login',
    element: <Login />,
    isPublicOnly: true,
  },
  {
    path: '/register',
    element: <Register />,
    isPublicOnly: true,
  },
  {
    path: '/chat',
    element: <Chat />,
    isProtected: true,
    allowedRoles: ['user', 'admin'],
  },
  {
    path: '/admin',
    element: <AdminDashboard />,
    isProtected: true,
    allowedRoles: ['admin'],
  },
]
