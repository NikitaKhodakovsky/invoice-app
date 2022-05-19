import { Field, InputType } from 'type-graphql'

@InputType()
export class UpdateOrderItemInput {
	@Field({ nullable: true })
	name?: string

	@Field({ nullable: true })
	quantity?: number

	@Field({ nullable: true })
	price?: number
}
