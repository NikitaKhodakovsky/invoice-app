import { Field, InputType, Int } from 'type-graphql'

import { CreateOrderItemInput } from './CreateOrderItemInput'

@InputType()
export class UpdateOrderItemInput implements Partial<CreateOrderItemInput> {
	@Field({ nullable: true })
	name?: string

	@Field(() => Int, { nullable: true })
	quantity?: number

	@Field(() => Int, { nullable: true })
	price?: number
}
