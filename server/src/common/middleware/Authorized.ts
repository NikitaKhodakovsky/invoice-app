import { MiddlewareInterface, NextFn, ResolverData } from 'type-graphql'
import { ForbiddenError } from '../errors'
import { Context } from '../../types'

export class Authorized implements MiddlewareInterface<Context> {
	async use({ context }: ResolverData<Context>, next: NextFn) {
		const userId = context.req.session.userId

		if (!userId) throw new ForbiddenError()

		return next()
	}
}
