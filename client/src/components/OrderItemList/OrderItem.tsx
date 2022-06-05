// import { ChangeEventHandler, Dispatch } from 'react'

// import styles from './OrderItem.module.scss'

// import { CreateOrderItemInput } from '../../types/graphql'

// import { Action } from './OrderItemList'
// import { Input } from '../Input'

// export interface Item extends CreateOrderItemInput {
// 	id: number
// }

// export interface OrderItemProps {
// 	item: Item
// 	dispatch: Dispatch<Action>
// }

// export function OrderItem({ item, dispatch }: OrderItemProps) {
// 	const changeHandler = (item: Item) => {
// 		dispatch({ type: 'change', payload: { id: item.id, item } })
// 	}

// 	const nameHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
// 		changeHandler({ ...item, name: e.target.value })
// 	}

// 	const priceHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
// 		const price = parseInt(e.target.value) || 0
// 		changeHandler({ ...item, price })
// 	}

// 	const quantityHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
// 		const quantity = parseInt(e.target.value) || 0
// 		changeHandler({ ...item, quantity })
// 	}

// 	return (
// 		<li className={styles.wrap}>
// 			<Input label='Item Name' value={item.name} onChange={nameHandler} className={styles.name} />
// 			<Input label='Qty.' value={item.quantity} pattern='[0-9]*' onChange={quantityHandler} />
// 			<Input label='Price' value={item.price} pattern='[0-9]*' onChange={priceHandler} />
// 			<Input label='Total' className={styles.total} disabled value={item.price * item.quantity} />
// 			<button onClick={() => dispatch({ type: 'delete', payload: item.id })}>
// 				<img src='/icons/icon-delete.svg' alt='Delete' />
// 			</button>
// 		</li>
// 	)
// }

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
