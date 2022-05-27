import { Field, InputType } from 'type-graphql'

import { Length } from '../../../common/decorators'

@InputType()
export class CredentialsInput {
	@Field()
	@Length(4, 32)
	username: string

	@Field()
	@Length(8, 32)
	password: string
}
