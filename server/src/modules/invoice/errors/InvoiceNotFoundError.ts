import { GraphQLError } from 'graphql'

export class InvoiceNotFoundError extends GraphQLError {
	constructor(message?: string) {
		super(message || 'Invoice not found')
	}
}
