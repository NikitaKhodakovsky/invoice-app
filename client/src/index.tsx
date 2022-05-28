import ReactDOM from 'react-dom/client'
import { ThemeManager, ThemeProvider } from 'react-theme-lib'
import { BrowserRouter } from 'react-router-dom'

import './sass/index.scss'

import { App } from './components/App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const manager = new ThemeManager({
	htmlElement: document.getElementById('body') as HTMLElement
})

root.render(
	<BrowserRouter>
		<ThemeProvider manager={manager}>
			<App />
		</ThemeProvider>
	</BrowserRouter>
)
