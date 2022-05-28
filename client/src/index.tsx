import ReactDOM from 'react-dom/client'
import { ThemeManager, ThemeProvider } from 'react-theme-lib'

import './sass/index.scss'

import { App } from './components/App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const manager = new ThemeManager({
	htmlElement: document.getElementById('body') as HTMLElement
})

root.render(
	<ThemeProvider manager={manager}>
		<App />
	</ThemeProvider>
)
