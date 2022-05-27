import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'

import { CredentialsInput } from '../inputs'
import { Context } from '../../../types'
import { User } from '../../user'

@Resolver()
export class LoginResolver {
	@Mutation(() => User)
	async login(@Arg('data') credentials: CredentialsInput, @Ctx() ctx: Context): Promise<User> {
		const user = await ctx.authService.login(credentials)

		ctx.req.session.userId = user.id

		return user
	}
}
