import { Field, InputType } from 'type-graphql'

@InputType()
export class UpdateAddressInput {
	@Field({ nullable: true })
	street: string

	@Field({ nullable: true })
	city: string

	@Field({ nullable: true })
	postCode: string

	@Field({ nullable: true })
	country: string
}
