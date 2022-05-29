import { Routes, Route } from 'react-router-dom'

import { InvoiceList } from './InvoiceList'
import { Invoice } from './Invoice'
import { Header } from './Header'
import { Login } from './Login'

export function App() {
	return (
		<div>
			<Header />
			<Routes>
				<Route path='/' element={<InvoiceList />} />
				<Route path='/login' element={<Login />} />
				<Route path='/invoice/:id' element={<Invoice />} />
			</Routes>
		</div>
	)
}
