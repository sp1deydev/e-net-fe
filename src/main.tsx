import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { I18nProvider } from './i18n'
import './index.css'
import 'antd/dist/reset.css'

createRoot(document.getElementById('root') as HTMLElement).render(
	<BrowserRouter>
		<I18nProvider>
			<App />
		</I18nProvider>
	</BrowserRouter>
)
