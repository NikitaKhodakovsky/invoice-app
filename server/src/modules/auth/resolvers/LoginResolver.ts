import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import argon2 from 'argon2'

import { AuthenticationError } from '../../../common/errors'
import { Context } from '../../../types'
import { LoginInput } from '../inputs'
import { User } from '../../user'

@Resolver()
export class LoginResolver {
	@Mutation(() => User)
	async login(@Arg('data') { username, password }: LoginInput, @Ctx() ctx: Context): Promise<User> {
		const user = await ctx.userRepository.findOne({ where: { username } })

		if (!user) throw new AuthenticationError()

		const comparePasswordResult = await argon2.verify(user.password, password)

		if (!comparePasswordResult) throw new AuthenticationError()

		ctx.req.session.userId = user.id

		return user
	}
}
