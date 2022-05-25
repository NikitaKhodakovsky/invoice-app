import { ExpressContext } from 'apollo-server-express'
import { ContextFunction } from 'apollo-server-core'

import { Address, Invoice, InvoiceService, OrderItem } from '../modules/invoice'
import { dataSource } from './dataSource'
import { Context } from '../types'
import { AuthService } from '../modules/auth'

export const context: ContextFunction<ExpressContext, Context> = ({ req, res }) => {
	const invoiceService = new InvoiceService(dataSource)
	const authService = new AuthService(dataSource)

	const user = undefined // :)

	return {
		invoiceService,
		authService,
		dataSource,
		user,
		req,
		res
	}
}
