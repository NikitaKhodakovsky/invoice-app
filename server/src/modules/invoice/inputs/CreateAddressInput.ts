import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateAddressInput {
	@Field()
	street: string

	@Field()
	city: string

	@Field()
	postCode: string

	@Field()
	country: string
}
