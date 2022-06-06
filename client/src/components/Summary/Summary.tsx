import styles from './Summary.module.scss'

export interface SummaryProps {
	invoice: Invoice
}

export function Summary({ invoice }: SummaryProps) {
	const { total, orderItems } = invoice
	return (
		<div className={styles.wrap}>
			<div className={styles.items}>
				{orderItems.map((i) => (
					<SummaryItem item={i} key={i.id} />
				))}
			</div>
			<div className={styles.total}>
				<div>Total</div>
				<strong>${total}</strong>
			</div>
		</div>
	)
}

export interface SummaryItemProps {
	item: OrderItem
}

export function SummaryItem({ item }: SummaryItemProps) {
	const { name, quantity, price } = item
	return (
		<div className={styles.item}>
			<div className={styles.itemTitle}>{name}</div>
			<div className={styles.qty}>
				{quantity} x ${price}
			</div>
			<div className={styles.itemTotal}>${price * quantity}</div>
		</div>
	)
}
