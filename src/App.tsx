import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppSelector } from './store'
import { routesConfig } from './routes/routesConfig'

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: ('user' | 'admin')[] }> = ({ children, allowedRoles }) => {
	const { currentUser } = useAppSelector((state) => state.user)
	if (!currentUser) {
		return <Navigate to="/login" replace />
	}
	if (allowedRoles && (!currentUser.role || !allowedRoles.includes(currentUser.role))) {
		return <Navigate to={currentUser.role === 'admin' ? "/admin" : "/chat"} replace />
	}
	return <>{children}</>
}

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { currentUser } = useAppSelector((state) => state.user)
	if (currentUser) {
		return <Navigate to={currentUser.role === 'admin' ? "/admin" : "/chat"} replace />
	}
	return <>{children}</>
}

export default function App() {
	const { currentUser } = useAppSelector((state) => state.user)

	return (
		<Routes>
			{routesConfig.map((route) => {
				if (route.dynamicRedirect) {
					const targetPath = currentUser
						? currentUser.role === 'admin'
							? '/admin'
							: '/chat'
						: '/login'
					return (
						<Route
							key={route.path}
							path={route.path}
							element={<Navigate to={targetPath} replace />}
						/>
					)
				}

				let element = route.element

				if (route.isProtected) {
					element = <ProtectedRoute allowedRoles={route.allowedRoles}>{element}</ProtectedRoute>
				} else if (route.isPublicOnly) {
					element = <PublicRoute>{element}</PublicRoute>
				}

				return <Route key={route.path} path={route.path} element={element} />
			})}
		</Routes>
	)
}
