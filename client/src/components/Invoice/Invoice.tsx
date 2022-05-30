import { useNavigate, useParams } from 'react-router-dom'

import styles from './Invoice.module.scss'

import { useDeleteInvoiceMutation } from '../../graphql/mutations'
import { useInvoiceByIdQuery } from '../../graphql/queries'
import { styler as s } from '../../utils'

import { InvoiceStatus } from '../InvoiceStatus'
import { ArrowButton } from '../ArrowButton'
import { Summary } from '../Summary'
import { Id } from '../Id'

export function Invoice() {
	const params = useParams()
	const navigate = useNavigate()

	const { data, loading } = useInvoiceByIdQuery(params.id as string)
	const [deleteMutation] = useDeleteInvoiceMutation(params.id as string)

	async function deleteHandler() {
		const decision = window.confirm(
			`Are you sure you want to delete invoice #${params.id}? This action cannot be undone.`
		)

		if (decision) {
			await deleteMutation()
			navigate('/', { replace: true })
		}
	}

	if (loading) return <div>Loading</div>
	if (!data?.invoice) return <div>Invoice not found</div>

	const { id, status, description, senderAddress, clientAddress, clientName, clientEmail, paymentDue, createdAt } =
		data.invoice

	return (
		<div className={styles.wrap}>
			<ArrowButton
				message='Go back'
				direction='left'
				className={styles.backButton}
				onClick={() => navigate(-1)}
			/>
			<div className={styles.header}>
				<p>Status</p>
				<InvoiceStatus status={status} className={styles.status} />
				<div className={styles.actions}>
					<button className={s(styles, 'edit', 'button')}>Edit</button>
					<button className={s(styles, 'delete', 'button')} onClick={deleteHandler}>
						Delete
					</button>
					<button className={s(styles, 'markAsPaid', 'button')}>Mark as Paid</button>
				</div>
			</div>

			<div className={styles.invoice}>
				<div className={styles.data}>
					<div className={styles.id}>
						<Id id={id} />
						<div>{description}</div>
					</div>

					<div className={s(styles, 'senderAddress', 'address')}>
						{senderAddress.street}
						<br />
						{senderAddress.city}
						<br />
						{senderAddress.postCode}
						<br />
						{senderAddress.country}
					</div>

					<div className={styles.billTo}>
						<p className={styles.subtitle}>Bill To</p>
						<strong>{clientName}</strong>
						<p className={styles.address}>
							{clientAddress.street} <br />
							{clientAddress.city} <br />
							{clientAddress.postCode} <br />
							{clientAddress.country}
						</p>
					</div>

					<div className={styles.block1}>
						<div className={styles.invoiceDate}>
							<p className={styles.subtitle}>Invoice Date</p>
							<strong>{new Date(createdAt).toDateString()}</strong>
						</div>

						<div>
							<p className={styles.subtitle}>Payment Due</p>
							<strong>{new Date(paymentDue).toDateString()}</strong>
						</div>
					</div>

					<div className={styles.sentTo}>
						<p className={styles.subtitle}>Sent to</p>
						<strong>{clientEmail}</strong>
					</div>
				</div>
				<Summary invoice={data.invoice} />
			</div>
		</div>
	)
}
