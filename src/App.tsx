import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Chat from './pages/Chat'
import { useI18n } from './i18n'

const Home: React.FC = () => {
	const { t } = useI18n()
	return (
		<div style={{ padding: 24 }}>
			<h1>{t('appName')}</h1>
			<p>{t('homeWelcome')}</p>
			<Link to="/login">{t('login')}</Link>
			<br />
			<Link to="/chat">{t('appName')}</Link>
		</div>
	)
}

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/chat" element={<Chat />} />
		</Routes>
	)
}
