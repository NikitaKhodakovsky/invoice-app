import { ApolloError } from 'apollo-server-express'

export class AuthenticationError extends ApolloError {
	constructor(message?: string) {
		super(message || 'Login or password entered incorrectly', 'UNAUTHENTICATED')
	}
}
