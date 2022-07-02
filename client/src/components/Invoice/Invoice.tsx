import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import styles from './Invoice.module.scss'

import { useInvoiceByIdQuery } from '../../graphql/queries'
import { styler as s } from '../../utils'

import { UpdateInvoiceSidebar } from '../UpdateInvoiceSidebar'
import { InvoiceStatus } from '../InvoiceStatus'
import { BackButton } from '../BackButton'
import { NotFound } from '../NotFound'
import { Summary } from '../Summary'
import { Actions } from './Actions'
import { Loader } from '../Loader'
import { Id } from '../Id'

export function Invoice() {
	const [isOpen, setIsOpen] = useState(false)

	const params = useParams()

	useEffect(() => {
		document.title = `Invoice ${params.id}`
	}, [])

	const { data, loading } = useInvoiceByIdQuery(params.id as string)

	if (loading)
		return (
			<div className={styles.wrap}>
				<Loader />
			</div>
		)
	if (!data?.invoice) return <NotFound title='Invoice not found' message={<BackButton />} />

	const { id, status, description, senderAddress, clientAddress, clientName, clientEmail, paymentDue, createdAt } =
		data.invoice

	return (
		<div className={styles.wrap}>
			<BackButton className={styles.backButton} />
			<div className={styles.header}>
				<p>Status</p>
				<InvoiceStatus status={status} className={styles.status} />
				<Actions status={status} id={id} editHandler={() => setIsOpen(true)} />
			</div>
			<UpdateInvoiceSidebar isOpen={isOpen} setIsOpen={setIsOpen} invoice={{ ...data.invoice }} />
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
