import { HTMLAttributes } from 'react'

import styles from './InvoiceStatus.module.scss'

import { Status } from '../../enums'

export interface InvoiceStatusProps extends HTMLAttributes<HTMLDivElement> {
	status: Status
}

export function InvoiceStatus({ status, className }: InvoiceStatusProps) {
	return (
		<div className={`${className}`}>
			<div className={`${styles.status} ${styles[status]}`}>{status}</div>
		</div>
	)
}
