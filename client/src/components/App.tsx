import { Routes, Route } from 'react-router-dom'

import { InvoiceList } from './InvoiceList'
import { Invoice } from './Invoice'
import { Header } from './Header'
import { Login } from './Login'
import { Register } from './Register'

export function App() {
	return (
		<div>
			<Header />
			<Routes>
				<Route path='/' element={<InvoiceList />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/invoice/:id' element={<Invoice />} />
			</Routes>
		</div>
	)
}
