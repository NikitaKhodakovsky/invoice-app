import { Routes, Route } from 'react-router-dom'

import { InvoiceList } from './InvoiceList'
import { Header } from './Header'
import { Invoice } from './Invoice'

export function App() {
	return (
		<div>
			<Header />
			<Routes>
				<Route path='/' element={<InvoiceList />} />
				<Route path='/invoice/:id' element={<Invoice />} />
			</Routes>
		</div>
	)
}
