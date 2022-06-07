import { Outlet } from 'react-router-dom'
import { Fragment } from 'react'

import styles from './Layout.module.scss'

import { Header } from '../Header'

export function Layout() {
	return (
		<Fragment>
			<Header />
			<div className={`container ${styles.container}`}>
				<Outlet />
			</div>
		</Fragment>
	)
}
