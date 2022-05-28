import styles from './InvoiceListItem.module.scss'

import { Invoice } from '../../types/graphql'
import { InvoiceStatus } from '../InvoiceStatus'

export interface InvoiceListItemProps {
	invoice: Invoice
}

export function InvoiceListItem({ invoice }: InvoiceListItemProps) {
	const { id, clientName, status, total } = invoice
	return (
		<div className={styles.wrap}>
			<div className={styles.id}>
				<span>#</span>
				{id}
			</div>
			<div className={styles.date}>Due 19 Aug 2021</div>
			<div className={styles.name}>{clientName}</div>
			<div className={styles.price}>${total}</div>
			<InvoiceStatus status={status} className={styles.status} />
		</div>
	)
}
