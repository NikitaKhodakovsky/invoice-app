import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { UserInputError } from 'apollo-server-express'
import argon2 from 'argon2'

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
		const existedUser = await ctx.userRepository.findOne({ where: { username } })

		if (existedUser) throw new UserInputError('User with this username already exists')
		if (password !== passwordConfirmation) throw new UserInputError("Passwords don't match")

		const hashedPassword = await argon2.hash(password)

		const user = ctx.userRepository.create({ username, password: hashedPassword })

		return await ctx.userRepository.save(user)
	}
}
