import { Fragment } from 'react'
import { useAllInvoicesQuery } from '../../graphql/queries'
import { InvoiceListItem } from '../InvoiceListItem'
import { Loader } from '../Loader'
import { NotFound } from '../NotFound'

import styles from './InvoiceList.module.scss'

export function InvoiceList() {
	const { data, loading, error } = useAllInvoicesQuery()

	if (loading)
		return (
			<div className={styles.wrap}>
				<Loader />
			</div>
		)

	if (!data?.invoices || error) return <div>Error!</div>

	const invoices = data.invoices

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
