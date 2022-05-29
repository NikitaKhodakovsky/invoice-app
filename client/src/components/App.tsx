import { Routes, Route } from 'react-router-dom'

import { InvoiceList } from './InvoiceList'
import { Invoice } from './Invoice'
import { Login } from './Login'
import { Register } from './Register'
import { NotFoundPage } from './NotFoundPage'
import { Layout } from './Layout'

export function App() {
	return (
		<div>
			<Routes>
				<Route element={<Layout />}>
					<Route path='/' element={<InvoiceList />} />
					<Route path='/invoice/:id' element={<Invoice />} />
				</Route>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</div>
	)
}
