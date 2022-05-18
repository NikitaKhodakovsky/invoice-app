import { ContextFunction } from 'apollo-server-core'

import { dataSource } from './dataSource'
import { Invoice } from '../modules/invoice'
import { User } from '../modules/user'

export const context: ContextFunction = ({ req, res }) => {
	const invoiceRepository = dataSource.getRepository(Invoice)
	const userRepository = dataSource.getRepository(User)

	return {
		invoiceRepository,
		userRepository,
		req,
		res
	}
}
