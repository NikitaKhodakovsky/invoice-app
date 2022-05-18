import { Resolver, Mutation, Ctx } from 'type-graphql'
import { Context } from '../../../types'

@Resolver()
export class LogoutResolver {
	@Mutation(() => Boolean)
	async logout(@Ctx() ctx: Context): Promise<boolean> {
		return new Promise((res, rej) => {
			ctx.req.session.destroy((e) => {
				if (e) rej(e)
				ctx.res.clearCookie('qid')
				return res(true)
			})
		})
	}
}
