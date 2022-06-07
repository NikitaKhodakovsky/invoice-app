import { Fragment, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Invoice.module.scss'

import { useChangeInvoiceStatus, useDeleteInvoiceMutation } from '../../graphql/mutations'
import { Status } from '../../enums'

export interface ActionsProps {
	status: Status
	editHandler: () => any
	id: string
}

export function Actions({ status, id, editHandler }: ActionsProps) {
	const [markAsPaid] = useChangeInvoiceStatus(id, Status.Paid)
	const [activate] = useChangeInvoiceStatus(id, Status.Pending)
	const [deleteMutation] = useDeleteInvoiceMutation(id)

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
