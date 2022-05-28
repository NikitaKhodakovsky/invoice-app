import { Link } from 'react-router-dom'

import styles from './InvoiceListItem.module.scss'

import { InvoiceStatus } from '../InvoiceStatus'
import { Invoice } from '../../types/graphql'

export interface InvoiceListItemProps {
	invoice: Invoice
}

export function InvoiceListItem({ invoice }: InvoiceListItemProps) {
	const { id, clientName, status, total } = invoice
	return (
		<Link to={`invoice/${id}`} className={styles.wrap}>
			<div className={styles.id}>
				<span>#</span>
				{id}
			</div>
			<div className={styles.date}>Due 19 Aug 2021</div>
			<div className={styles.name}>{clientName}</div>
			<div className={styles.price}>${total}</div>
			<InvoiceStatus status={status} className={styles.status} />
		</Link>
	)
}
