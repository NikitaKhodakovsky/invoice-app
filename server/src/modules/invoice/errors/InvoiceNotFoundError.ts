import { ApolloError } from 'apollo-server-express'

export class InvoiceNotFoundError extends ApolloError {
	constructor(message?: string) {
		super(message || 'Invoice not found', 'NOT_FOUND')
	}
}
