import styles from './NotFoundPage.module.scss'

import { NotFound } from '../NotFound'
import { ArrowButton } from '../ArrowButton'
import { Link } from 'react-router-dom'

function Message() {
	return (
		<Link to='/'>
			<ArrowButton message='Main page' direction='right' />
		</Link>
	)
}

export function NotFoundPage() {
	return (
		<div>
			<NotFound title='Page not found' message={<Message />} />
		</div>
	)
}
