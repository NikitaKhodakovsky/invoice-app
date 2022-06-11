import { GraphQLError } from 'graphql'

export class UserNotFoundError extends GraphQLError {
	constructor(message?: string) {
		super(message || 'User not found')
	}
}
