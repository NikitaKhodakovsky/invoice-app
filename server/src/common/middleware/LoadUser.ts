import { MiddlewareInterface, NextFn, ResolverData } from 'type-graphql'
import { UserNotFoundError, ForbiddenError } from '../errors'
import { destroySession } from '../../utils'
import { User } from '../../modules/user'
import { Context } from '../../types'

export class LoadUser implements MiddlewareInterface<Context<User>> {
	async use({ context }: ResolverData<Context<User>>, next: NextFn) {
		const userId = context.req.session.userId

		if (!userId) throw new ForbiddenError()

		const userRepository = context.dataSource.getRepository(User)

		const user = await userRepository.findOne({ where: { id: userId } })

		if (!user) {
			await destroySession(context.req, context.res)

			throw new UserNotFoundError()
		}

		context.user = user

		return next()
	}
}
