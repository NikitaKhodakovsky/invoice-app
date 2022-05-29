import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'

import { LoadUser } from '../../../common/middleware'
import { Context } from '../../../types'
import { User } from '../../user'

@Resolver()
export class MeResolver {
	@Query(() => User)
	@UseMiddleware(LoadUser)
	async me(@Ctx() ctx: Context) {
		return ctx.user
	}
}
