import { ReactNode } from 'react'

import styles from './NotFound.module.scss'

export interface NotFoundProps {
	title?: string
	message?: string | ReactNode
}

export function NotFound({ title, message }: NotFoundProps) {
	return (
		<div className={styles.wrap}>
			<img src='/img/illustration-empty.svg' alt='Not found' />
			<div className={styles.title}>{title || 'There is nothing here'}</div>
			<div className={styles.message}>{message}</div>
		</div>
	)
}
