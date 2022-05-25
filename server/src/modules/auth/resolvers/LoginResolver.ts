import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'

import { Context } from '../../../types'
import { LoginInput } from '../inputs'
import { User } from '../../user'

@Resolver()
export class LoginResolver {
	@Mutation(() => User)
	async login(@Arg('data') { username, password }: LoginInput, @Ctx() ctx: Context): Promise<User> {
		const user = await ctx.authService.login(username, password)

		ctx.req.session.userId = user.id

		return user
	}
}
