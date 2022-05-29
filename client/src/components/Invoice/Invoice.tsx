import styles from './Invoice.module.scss'

import { styler as s } from '../../utils'

import { Status } from '../../types/graphql'
import { InvoiceStatus } from '../InvoiceStatus'
import { useNavigate } from 'react-router-dom'
import { Id } from '../Id'
import { Summary } from '../Summary'
import { ArrowButton } from '../ArrowButton'

const invoice = {
	id: '4',
	createdAt: new Date(),
	updatedAt: new Date(),
	paymentDue: new Date(),
	user: {
		updatedAt: new Date(),
		username: 'username',
		createdAt: new Date(),
		id: '1'
	},
	description: 'Invoice description',
	paymentTerms: 12,
	clientName: 'Alex Grim',
	clientEmail: 'alexgrim@mail.com',
	status: Status.Pending,
	senderAddress: {
		id: '1',
		createdAt: new Date(),
		updatedAt: new Date(),
		street: 'Parkway Street',
		city: 'Dallas',
		postCode: '09090',
		country: 'USA'
	},
	orderItems: [
		{
			id: '1',
			createdAt: new Date(),
			updatedAt: new Date(),
			name: 'Banner Design',
			quantity: 1,
			price: 156
		},
		{
			id: '2',
			createdAt: new Date(),
			updatedAt: new Date(),
			name: 'Email Design',
			quantity: 2,
			price: 200
		}
	],
	clientAddress: {
		id: '2',
		createdAt: new Date(),
		updatedAt: new Date(),
		city: 'asdef',
		street: 'asdf',
		postCode: 'asdf',
		country: 'asdf'
	},
	total: 556
}

export function Invoice() {
	const navigate = useNavigate()
	//const { id } = useParams()

	return (
		<div className='container'>
			<div className={styles.wrap}>
				<ArrowButton
					message='Go back'
					direction='left'
					className={styles.backButton}
					onClick={() => navigate(-1)}
				/>
				<div className={styles.header}>
					<p>Status</p>
					<InvoiceStatus status={Status.Pending} className={styles.status} />
					<div className={styles.actions}>
						<button className={s(styles, 'edit', 'button')}>Edit</button>
						<button className={s(styles, 'delete', 'button')}>Delete</button>
						<button className={s(styles, 'markAsPaid', 'button')}>Mark as Paid</button>
					</div>
				</div>

				<div className={styles.invoice}>
					<div className={styles.data}>
						<div className={styles.id}>
							<Id id={'XM9141'} />
							<div>Graphic Design</div>
						</div>

						<div className={s(styles, 'senderAddress', 'address')}>
							19 Union Terrace
							<br />
							London
							<br />
							E1 3EZ
							<br />
							United Kingdom
						</div>

						<div className={styles.billTo}>
							<p className={styles.subtitle}>Bill To</p>
							<strong>Alex Grim</strong>
							<p className={styles.address}>
								84 Church Way <br />
								Bradford <br />
								BD1 9PB <br />
								United Kingdom
							</p>
						</div>

						<div className={styles.block1}>
							<div className={styles.invoiceDate}>
								<p className={styles.subtitle}>Invoice Date</p>
								<strong>21 Aug 2021</strong>
							</div>

							<div>
								<p className={styles.subtitle}>Payment Due</p>
								<strong>20 Sep 2021</strong>
							</div>
						</div>

						<div className={styles.sentTo}>
							<p className={styles.subtitle}>Sent to</p>
							<strong>alexgrim@mail.com</strong>
						</div>
					</div>
					<Summary invoice={invoice} />
				</div>
			</div>
		</div>
	)
}
