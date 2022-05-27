import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'

import { CredentialsInput } from '../inputs'
import { Context } from '../../../types'
import { User } from '../../user'

@Resolver()
export class RegisterResolver {
	@Mutation(() => User)
	async register(@Arg('data') credentials: CredentialsInput, @Ctx() ctx: Context): Promise<User> {
		return ctx.authService.register(credentials)
	}
}
