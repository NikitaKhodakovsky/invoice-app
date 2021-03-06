import { Field, InputType, Int } from 'type-graphql'

import { CreateOrderItemInput } from './CreateOrderItemInput'
import { CreateAddressInput } from './CreateAddressInput'
import { Status } from '../enums'

@InputType()
export class CreateInvoiceInput {
	@Field()
	description: string

	@Field(() => Int)
	paymentTerms: number

	@Field()
	clientName: string

	@Field()
	clientEmail: string

	@Field(() => Status, { nullable: true })
	status?: Status

	@Field(() => CreateAddressInput)
	senderAddress: CreateAddressInput

	@Field(() => CreateAddressInput)
	clientAddress: CreateAddressInput

	@Field(() => [CreateOrderItemInput])
	orderItems: CreateOrderItemInput[]
}
