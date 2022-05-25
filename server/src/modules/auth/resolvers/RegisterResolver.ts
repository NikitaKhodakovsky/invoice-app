import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'

import { RegisterInput } from '../inputs'
import { Context } from '../../../types'
import { User } from '../../user'

@Resolver()
export class RegisterResolver {
	@Mutation(() => User)
	async register(
		@Arg('data') { username, password, passwordConfirmation }: RegisterInput,
		@Ctx() ctx: Context
	): Promise<User> {
		return ctx.authService.register(username, password, passwordConfirmation)
	}
}
