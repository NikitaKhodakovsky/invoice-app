import { FieldArray, useFormikContext } from 'formik'
import { Fragment } from 'react'

import styles from './OrderItemList.module.scss'

import { OrderItem } from './OrderItem'

export function OrderItemList() {
	const { values, errors } = useFormikContext<CreateInvoiceInput>()

	return (
		<div>
			<h1>Item List</h1>
			<div className={styles.header}>
				<div>Item Name</div>
				<div>Qty.</div>
				<div>Price</div>
				<div>Total</div>
			</div>
			<FieldArray name='orderItems'>
				{({ remove, push }) => (
					<Fragment>
						<ul className={styles.items}>
							{values.orderItems.map((_, idx) => {
								return <OrderItem key={idx} index={idx} onDelete={() => remove(idx)} />
							})}
						</ul>
						<button
							type='button'
							className='button large gray'
							onClick={() => push({ name: '', quantity: 0, price: 0 })}
						>
							Add New Item
						</button>
					</Fragment>
				)}
			</FieldArray>
			{typeof errors.orderItems === 'string' && <p className={styles.error}>{errors.orderItems}</p>}
		</div>
	)
}
