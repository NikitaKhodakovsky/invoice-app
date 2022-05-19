import { ApolloError } from 'apollo-server-express'

export class AddressNotFoundError extends ApolloError {
	constructor(message?: string) {
		super(message || 'Address not found', 'NOT_FOUND')
	}
}
