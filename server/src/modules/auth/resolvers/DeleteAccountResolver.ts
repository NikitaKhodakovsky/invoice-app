import { Resolver, Mutation, Ctx, UseMiddleware } from 'type-graphql'
import { LoadUser } from '../../../common/middleware'
import { Context } from '../../../types'

@Resolver()
export class DeleteAccountResolver {
	@UseMiddleware(LoadUser)
	@Mutation(() => Boolean)
	async deleteAccount(@Ctx() ctx: Context): Promise<boolean> {
		const user = await ctx.userRepository.findOne({ where: { id: ctx.user.id } })

		if (!user) return false

		await ctx.userRepository.remove(user)

		await new Promise((res, rej) => {
			ctx.req.session.destroy((e) => {
				if (e) rej(e)
				ctx.res.clearCookie('qid')
				return res(true)
			})
		})

		return true
	}
}
