import { ApolloError } from 'apollo-server-express'

export class OrderItemNotFoundError extends ApolloError {
	constructor(message?: string) {
		super(message || 'Order item not found', 'NOT_FOUND')
	}
}
