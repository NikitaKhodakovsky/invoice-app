import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateOrderItemInput {
	@Field()
	name: string

	@Field()
	quantity: number

	@Field()
	price: number
}
