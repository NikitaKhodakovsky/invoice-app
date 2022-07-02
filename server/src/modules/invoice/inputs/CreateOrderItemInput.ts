import { Field, Float, InputType, Int } from 'type-graphql'

@InputType()
export class CreateOrderItemInput {
	@Field()
	name: string

	@Field(() => Int)
	quantity: number

	@Field(() => Float)
	price: number
}
