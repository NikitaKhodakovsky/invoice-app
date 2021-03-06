import { useFormikContext } from 'formik'

import styles from './OrderItem.module.scss'

import { FormikInput } from '../FormikInput'
import { Input } from '../Input'

export interface OrderItemProps {
	index: number
	onDelete: (...args: any[]) => any
}

export function OrderItem({ onDelete, index }: OrderItemProps) {
	const { values } = useFormikContext<CreateInvoiceInput>()

	const item = values.orderItems[index]

	const total = (item.price || 0) * (item.quantity || 0)

	return (
		<li className={styles.wrap}>
			<FormikInput name={`orderItems[${index}].name`} label='Item Name' className={styles.name} />
			<FormikInput name={`orderItems[${index}].quantity`} label='Qty.' type='number' pattern='[0-9]*' />
			<FormikInput name={`orderItems[${index}].price`} label='Price' type='number' pattern='[0-9]*' />
			<Input id={`orderItems[${index}].total`} label='Total' className={styles.total} disabled value={total} />
			<button onClick={onDelete} type='button'>
				<img src='/icons/icon-delete.svg' width="13" height="16" alt='Delete' />
			</button>
		</li>
	)
}
