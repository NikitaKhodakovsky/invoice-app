import { ApolloError } from 'apollo-server-express'

export class UserNotFoundError extends ApolloError {
	constructor(message?: string) {
		super(message || 'User not found', 'NOT_FOUND')
	}
}
