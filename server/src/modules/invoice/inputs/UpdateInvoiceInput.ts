import { Field, InputType } from 'type-graphql'

@InputType()
export class UpdateInvoiceInput {
	@Field({ nullable: true })
	paymentDue?: Date

	@Field({ nullable: true })
	description?: string

	@Field({ nullable: true })
	paymentTerms?: number

	@Field({ nullable: true })
	clientName?: string

	@Field({ nullable: true })
	clientEmail?: string
}
