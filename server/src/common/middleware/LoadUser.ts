import { MiddlewareInterface, NextFn, ResolverData } from 'type-graphql'
import { UserNotFoundError, ForbiddenError } from '../errors'
import { Context } from '../../types'

export class LoadUser implements MiddlewareInterface<Context> {
	async use({ context }: ResolverData<Context>, next: NextFn) {
		const userId = context.req.session.userId

		if (!userId) throw new ForbiddenError()

		const user = await context.userRepository.findOne({ where: { id: userId } })

		if (!user) throw new UserNotFoundError()

		context.user = user

		return next()
	}
}
