import { ThemeManager, ThemeProvider } from 'react-theme-lib'
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import { BrowserRouter } from 'react-router-dom'
import memCache from 'graphql-hooks-memcache'
import ReactDOM from 'react-dom/client'
import toast from 'react-hot-toast'

import './sass/index.scss'

import { MeQuery } from './graphql/queries'

import { AuthManager, AuthProvider } from './auth'
import { App } from './components/App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const themeManager = new ThemeManager({
	htmlElement: document.getElementById('body') as HTMLElement
})

const authManager = new AuthManager()

const client = new GraphQLClient({
	url: '/graphql',
	cache: memCache(),
	fetchOptions: {
		credentials: 'include'
	},
	logErrors: process.env.NODE_ENV !== 'production',
	onError: async ({ result, operation }) => {
		if (result.error?.httpError?.status === 403) {
			if (operation.query === MeQuery) {
				return authManager.setAuth(false)
			}

			const res = await client.request({ query: MeQuery })

			if (res.error?.httpError?.status === 403) {
				authManager.setAuth(false)
			}

			return toast('Access denied')
		}
	}
})

client.request<MeQuery>({ query: MeQuery })
	.then(res => authManager.setAuth(res?.data?.me ? true : false))
	.catch(e => console.log(e))

root.render(
	<ClientContext.Provider value={client}>
		<BrowserRouter>
			<AuthProvider manager={authManager}>
				<ThemeProvider manager={themeManager}>
					<App />
				</ThemeProvider>
			</AuthProvider>
		</BrowserRouter>
	</ClientContext.Provider>
)
