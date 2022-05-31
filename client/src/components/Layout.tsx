import { Outlet } from 'react-router-dom'
import { Fragment } from 'react'

import { Header } from './Header'

export function Layout() {
	return (
		<Fragment>
			<Header />
			<div className='container'>
				<Outlet />
			</div>
		</Fragment>
	)
}
