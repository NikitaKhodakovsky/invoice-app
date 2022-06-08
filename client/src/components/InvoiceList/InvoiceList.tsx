import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'

import { useAllInvoicesQuery } from '../../graphql/queries'

import styles from './InvoiceList.module.scss'

import { CreateInvoiceSidebar } from '../CreateInvoiceSidebar'
import { InvoiceListItem } from '../InvoiceListItem'
import { StatusFilter } from '../StatusFilter'
import { NotFound } from '../NotFound'
import { Loader } from '../Loader'

export function InvoiceList() {
	const [searchParams] = useSearchParams()

	const statuses: Status[] = searchParams
		.getAll('status')
		.filter((s) => s === 'Paid' || s === 'Pending' || s === 'Draft') as Status[]

	const { data, loading, error } = useAllInvoicesQuery(statuses.length > 0 ? statuses : undefined)
	const [isOpen, setIsOpen] = useState(false)

	if (loading)
		return (
			<div className={styles.wrap}>
				<Loader />
			</div>
		)

	if (!data?.invoices || error) return <div>Error!</div>

	const { invoices } = data

	return (
		<div className={styles.wrap}>
			<CreateInvoiceSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
			<div className={styles.header}>
				<div>
					<p className={styles.tittle}>Invoices</p>
					<p className={styles.subtitle}>
						{invoices.length > 0 ? `${invoices.length} Invoices` : 'No Invoices'}
					</p>
				</div>
				<StatusFilter className={styles.statusFilter} />
				<button className={`button purple ${styles.button}`} onClick={() => setIsOpen(true)}>
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
		</div>
	)
}
