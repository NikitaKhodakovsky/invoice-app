import { Fragment } from 'react'
import { Invoice, Status } from '../../types/graphql'
import { InvoiceListItem } from '../InvoiceListItem'
import { NotFound } from '../NotFound'

import styles from './InvoiceList.module.scss'

const invoices: Invoice[] = [
	{
		id: '1',
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
		clientName: 'Jensen Huang',
		clientEmail: 'jensenhuang@gmail.com',
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
				name: 'asdf',
				quantity: 123,
				price: 123
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
		total: 1200
	},
	{
		id: '2',
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
		clientName: 'Jensen Huang',
		clientEmail: 'jensenhuang@gmail.com',
		status: Status.Paid,
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
				name: 'asdf',
				quantity: 123,
				price: 123
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
		total: 3499
	},
	{
		id: '3',
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
		clientName: 'Jensen Huang',
		clientEmail: 'jensenhuang@gmail.com',
		status: Status.Draft,
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
				name: 'asdf',
				quantity: 123,
				price: 123
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
		total: 1400
	},
	{
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
		clientName: 'Jensen Huang',
		clientEmail: 'jensenhuang@gmail.com',
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
				name: 'asdf',
				quantity: 123,
				price: 123
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
		total: 1756
	}
]

export function InvoiceList() {
	return (
		<Fragment>
			<div className={styles.wrap}>
				<div>
					<p className={styles.tittle}>Invoices</p>
					<p className={styles.subtitle}>
						{invoices.length > 0 ? `${invoices.length} Invoices` : 'No Invoices'}
					</p>
				</div>
				<div className={styles.filter}>
					Filter
					<span className='hide-for-mobile'>&nbsp;by status</span>
				</div>
				<button className={styles.button}>
					<span>
						<img src='icons/icon-plus.svg' alt='+' />
					</span>
					New
					<div className='hide-for-mobile'>&nbsp;Invoice</div>
				</button>
			</div>
			{invoices.length === 0 && (
				<NotFound message='Create an invoice by clicking the New button and get started' />
			)}
			<div className={styles.list}>
				{invoices.map((i) => (
					<InvoiceListItem invoice={i} key={i.id} />
				))}
			</div>
		</Fragment>
	)
}
