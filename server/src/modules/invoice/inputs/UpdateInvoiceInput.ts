import { Field, InputType, Int } from 'type-graphql'
import { UpdateAddressInput } from './UpdateAddressInput'

@InputType()
export class UpdateInvoiceInput {
	@Field({ nullable: true })
	paymentDue?: Date

	@Field({ nullable: true })
	description?: string

	@Field(() => Int, { nullable: true })
	paymentTerms?: number

	@Field({ nullable: true })
	clientName?: string

	@Field({ nullable: true })
	clientEmail?: string

	@Field(() => UpdateAddressInput, { nullable: true })
	senderAddress: UpdateAddressInput

	@Field(() => UpdateAddressInput, { nullable: true })
	clientAddress: UpdateAddressInput
}
