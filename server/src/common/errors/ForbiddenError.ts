import { ApolloError } from 'apollo-server-express'

export class ForbiddenError extends ApolloError {
	constructor(message?: string) {
		super(message || 'Access denied', 'FORBIDDEN')
	}
}
