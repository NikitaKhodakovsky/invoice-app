import { useFormikContext } from 'formik'

import styles from './OrderItem.module.scss'

import { FormValues } from '../CreateInvoiceSidebar'
import { FormikInput, Input } from '../Input'

export interface OrderItemProps {
	index: number
	onDelete: (...args: any[]) => any
}

export function OrderItem({ onDelete, index }: OrderItemProps) {
	const { values } = useFormikContext<FormValues>()

	const item = values.orderItems[index]

	return (
		<li className={styles.wrap}>
			<FormikInput name={`orderItems[${index}].name`} label='Item Name' className={styles.name} />
			<FormikInput name={`orderItems[${index}].quantity`} label='Qty.' type='number' pattern='[0-9]*' />
			<FormikInput name={`orderItems[${index}].price`} label='Price' type='number' pattern='[0-9]*' />
			<Input label='Total' className={styles.total} disabled value={item.price * item.quantity} />
			<button onClick={onDelete} type='button'>
				<img src='/icons/icon-delete.svg' alt='Delete' />
			</button>
		</li>
	)
}
