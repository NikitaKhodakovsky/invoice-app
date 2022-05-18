import { Field, InputType } from 'type-graphql'

import { Status } from '../enums'

@InputType()
export class CreateInvoiceInput {
	@Field()
	paymentDue: Date

	@Field()
	description: string

	@Field()
	paymentTerms: number

	@Field()
	clientName: string

	@Field()
	clientEmail: string

	@Field(() => Status)
	status: Status
}
