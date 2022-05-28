import { Routes, Route, useParams } from 'react-router-dom'

import { InvoiceList } from './InvoiceList'
import { Header } from './Header'

function Invoice() {
	const match = useParams()

	console.log(match)

	return <div className='container'>{`Invoice ${match.id}`}</div>
}

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
