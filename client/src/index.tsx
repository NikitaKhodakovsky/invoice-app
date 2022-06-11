import { ThemeManager, ThemeProvider } from 'react-theme-lib'
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import { BrowserRouter } from 'react-router-dom'
import memCache from 'graphql-hooks-memcache'
import ReactDOM from 'react-dom/client'

import './sass/index.scss'

import { AuthProvider } from './contexts'
import { App } from './components/App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const manager = new ThemeManager({
	htmlElement: document.getElementById('body') as HTMLElement
})

const client = new GraphQLClient({
	url: 'http://localhost:4200/graphql',
	cache: memCache(),
	fetchOptions: {
		credentials: 'include'
	},
	headers: {
		'X-Forwarded-Proto': 'https'
	}
})

root.render(
	<ClientContext.Provider value={client}>
		<BrowserRouter>
			<AuthProvider>
				<ThemeProvider manager={manager}>
					<App />
				</ThemeProvider>
			</AuthProvider>
		</BrowserRouter>
	</ClientContext.Provider>
)
