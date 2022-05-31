import { ErrorBoundary } from 'react-error-boundary'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { NotFoundPage } from './NotFoundPage'
import { InvoiceList } from './InvoiceList'
import { RequireAuth } from './RequireAuth'
import { Fallback } from './Fallback'
import { Register } from './Register'
import { Invoice } from './Invoice'
import { Layout } from './Layout'
import { Login } from './Login'

export function App() {
	return (
		<div>
			<ErrorBoundary FallbackComponent={Fallback} onReset={() => window.location.reload()}>
				<Toaster />
				<Routes>
					<Route element={<Layout />}>
						<Route element={<RequireAuth />}>
							<Route path='/' element={<InvoiceList />} />
							<Route path='/invoice/:id' element={<Invoice />} />
						</Route>
					</Route>

					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</ErrorBoundary>
		</div>
	)
}
