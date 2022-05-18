import { ContextFunction } from 'apollo-server-core'

import { dataSource } from './dataSource'
import { User } from '../modules/user'

export const context: ContextFunction = ({ req, res }) => {
	const userRepository = dataSource.getRepository(User)

	return {
		userRepository,
		req,
		res
	}
}
