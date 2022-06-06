import { useNavigate, useParams } from 'react-router-dom'
import { Fragment, ReactNode, useState } from 'react'

import styles from './Invoice.module.scss'

import { useChangeInvoiceStatus, useDeleteInvoiceMutation } from '../../graphql/mutations'
import { useInvoiceByIdQuery } from '../../graphql/queries'
import { styler as s } from '../../utils'
import { Status } from '../../enums'

import { InvoiceStatus } from '../InvoiceStatus'
import { BackButton } from '../BackButton'
import { NotFound } from '../NotFound'
import { Summary } from '../Summary'
import { Loader } from '../Loader'
import { Id } from '../Id'

interface ActionsProps {
	status: Status
	editHandler: () => any
	id: string
}

function Actions({ status, id, editHandler }: ActionsProps) {
	const [deleteMutation] = useDeleteInvoiceMutation(id)
	const [markAsPaid] = useChangeInvoiceStatus(id, Status.Paid)
	const [activate] = useChangeInvoiceStatus(id, Status.Pending)

	const navigate = useNavigate()

	async function deleteHandler() {
		const decision = window.confirm(`Are you sure you want to delete invoice #${id}? This action cannot be undone.`)

		if (decision) {
			await deleteMutation()
			navigate('/', { replace: true })
		}
	}

	let buttons: ReactNode

	switch (status) {
		case Status.Draft:
			buttons = (
				<Fragment>
					<button className='button grey' onClick={editHandler}>
						Edit
					</button>
					<button className='button red' onClick={deleteHandler}>
						Delete
					</button>
					<button className='button purple' onClick={() => activate()}>
						Activate
					</button>
				</Fragment>
			)

			break

		case Status.Pending:
			buttons = (
				<Fragment>
					<button className='button grey' onClick={editHandler}>
						Edit
					</button>
					<button className='button red' onClick={deleteHandler}>
						Delete
					</button>
					<button className='button purple' onClick={() => markAsPaid()}>
						Mark as Paid
					</button>
				</Fragment>
			)
			break

		case Status.Paid:
			buttons = (
				<Fragment>
					<button className='button red' onClick={deleteHandler}>
						Delete
					</button>
				</Fragment>
			)
			break
	}

	return <div className={styles.actions}>{buttons}</div>
}

export function Invoice() {
	const [isOpen, setIsOpen] = useState(false)

	const params = useParams()

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
			{/* <UpdateInvoiceSidebar isOpen={isOpen} setIsOpen={setIsOpen} invoice={data.invoice} /> */}
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
