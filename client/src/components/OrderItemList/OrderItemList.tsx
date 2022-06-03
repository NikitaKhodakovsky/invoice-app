import { useReducer } from 'react'
import { Item, OrderItem } from './OrderItem'

import styles from './OrderItemList.module.scss'

interface AddAction {
	type: 'add'
}

interface DeleteAction {
	type: 'delete'
	payload: number
}

interface ChangeAction {
	type: 'change'
	payload: {
		id: number
		item: Item
	}
}

export type Action = AddAction | ChangeAction | DeleteAction

let id = 0

function reducer(items: Item[], action: Action): Item[] {
	switch (action.type) {
		case 'add': {
			id += 1
			return [...items, { name: '', quantity: 1, price: 0, id }]
		}

		case 'delete': {
			return [...items].filter((i) => i.id !== action.payload)
		}

		case 'change': {
			const idx = items.findIndex((i) => i.id === action.payload.id)
			const newItems = [...items]
			newItems.splice(idx, 1, action.payload.item)
			return newItems
		}
	}
}

export function OrderItemList() {
	const [items, dispatch] = useReducer(reducer, [])

	return (
		<div>
			<h1>Item List</h1>
			<div className={styles.header}>
				<div>Item Name</div>
				<div>Qty.</div>
				<div>Price</div>
				<div>Total</div>
			</div>
			<ul className={styles.items}>
				{items.map((item, idx) => (
					<OrderItem item={item} key={idx} dispatch={dispatch} />
				))}
			</ul>
			<button className='button large gray' onClick={() => dispatch({ type: 'add' })}>
				Add New Item
			</button>
		</div>
	)
}
