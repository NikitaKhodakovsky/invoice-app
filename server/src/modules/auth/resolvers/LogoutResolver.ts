import { destroySession } from '../../../utils'
import { Resolver, Mutation, Ctx, UseMiddleware } from 'type-graphql'
import { Authorized } from '../../../common/middleware'
import { Context } from '../../../types'

@Resolver()
export class LogoutResolver {
	@Mutation(() => Boolean)
	@UseMiddleware(Authorized)
	async logout(@Ctx() ctx: Context): Promise<boolean> {
		// return new Promise((res, rej) => {
		// 	ctx.req.session.destroy((e) => {
		// 		if (e) rej(e)
		// 		ctx.res.clearCookie('qid')
		// 		return res(true)
		// 	})
		// })
		return destroySession(ctx.req, ctx.res)
	}
}
