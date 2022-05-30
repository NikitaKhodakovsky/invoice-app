import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { ThemeManager, ThemeProvider } from 'react-theme-lib'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'

import './sass/index.scss'

import { AuthProvider } from './contexts'
import { App } from './components/App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const manager = new ThemeManager({
	htmlElement: document.getElementById('body') as HTMLElement
})

const link = createHttpLink({
	credentials: 'include',
	uri: 'http://localhost:4200/graphql',
	headers: {
		'X-Forwarded-Proto': 'https'
	}
})

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link
})

root.render(
	<ApolloProvider client={client}>
		<BrowserRouter>
			<AuthProvider>
				<ThemeProvider manager={manager}>
					<App />
				</ThemeProvider>
			</AuthProvider>
		</BrowserRouter>
	</ApolloProvider>
)
