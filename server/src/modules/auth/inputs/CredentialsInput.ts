import { Field, InputType } from 'type-graphql'

@InputType()
export class CredentialsInput {
	@Field()
	username: string

	@Field()
	password: string
}
