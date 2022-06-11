import { GraphQLError } from 'graphql'

export class AuthenticationError extends GraphQLError {
	constructor(message?: string) {
		super(message || 'Login or password entered incorrectly')
	}
}
