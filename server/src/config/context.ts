import { ExpressContext } from 'apollo-server-express'
import { ContextFunction } from 'apollo-server-core'

import { Address, Invoice, OrderItem } from '../modules/invoice'
import { dataSource } from './dataSource'
import { Context } from '../types'
import { AuthService } from '../modules/auth'

export const context: ContextFunction<ExpressContext, Context> = ({ req, res }) => {
	const orderItemRepository = dataSource.getRepository(OrderItem)
	const invoiceRepository = dataSource.getRepository(Invoice)
	const addressRepository = dataSource.getRepository(Address)
	const authService = new AuthService(dataSource)

	const user = undefined // :)

	return {
		orderItemRepository,
		invoiceRepository,
		addressRepository,
		authService,
		dataSource,
		user,
		req,
		res
	}
}
