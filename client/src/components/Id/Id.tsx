import { HTMLAttributes } from 'react'
import styles from './Id.module.scss'

export interface IdProps extends HTMLAttributes<HTMLDivElement> {
	id: string
}

export function Id({ id, className }: IdProps) {
	return (
		<div className={`${styles.id} ${className}`}>
			<span>#</span>
			{id}
		</div>
	)
}
