import { ContextFunction } from 'apollo-server-core'

import { Address, Invoice, OrderItem } from '../modules/invoice'
import { dataSource } from './dataSource'
import { User } from '../modules/user'
import { Context } from '../types'

export const context: ContextFunction<Context> = ({ req, res }) => {
	const orderItemRepository = dataSource.getRepository(OrderItem)
	const invoiceRepository = dataSource.getRepository(Invoice)
	const addressRepository = dataSource.getRepository(Address)
	const userRepository = dataSource.getRepository(User)

	return {
		orderItemRepository,
		invoiceRepository,
		addressRepository,
		userRepository,
		dataSource,
		req,
		res
	}
}
