import { ContextFunction } from 'apollo-server-core'

import { Address, Invoice } from '../modules/invoice'
import { dataSource } from './dataSource'
import { User } from '../modules/user'

export const context: ContextFunction = ({ req, res }) => {
	const invoiceRepository = dataSource.getRepository(Invoice)
	const addressRepository = dataSource.getRepository(Address)
	const userRepository = dataSource.getRepository(User)

	return {
		invoiceRepository,
		addressRepository,
		userRepository,
		req,
		res
	}
}
