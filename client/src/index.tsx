import ReactDOM from 'react-dom/client'
import { ThemeManager, ThemeProvider } from 'react-theme-lib'
import { BrowserRouter } from 'react-router-dom'

import './sass/index.scss'

import { App } from './components/App'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const manager = new ThemeManager({
	htmlElement: document.getElementById('body') as HTMLElement
})

const client = new ApolloClient({
	cache: new InMemoryCache(),
	uri: 'http://localhost:4200/graphql'
})

root.render(
	<ApolloProvider client={client}>
		<BrowserRouter>
			<ThemeProvider manager={manager}>
				<App />
			</ThemeProvider>
		</BrowserRouter>
	</ApolloProvider>
)
