import { Resolver, Mutation, Ctx, UseMiddleware } from 'type-graphql'

import { LoadUser } from '../../../common/middleware'
import { destroySession } from '../../../utils'
import { Context } from '../../../types'
import { User } from '../../user'

@Resolver()
export class DeleteAccountResolver {
	@UseMiddleware(LoadUser)
	@Mutation(() => Boolean)
	async deleteAccount(@Ctx() ctx: Context<User>): Promise<boolean> {
		await ctx.authService.deleteAccount(ctx.user)

		// await new Promise((res, rej) => {
		// 	ctx.req.session.destroy((e) => {
		// 		if (e) rej(e)
		// 		ctx.res.clearCookie('qid')
		// 		return res(true)
		// 	})
		// })

		await destroySession(ctx.req, ctx.res)

		return true
	}
}
