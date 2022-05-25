import { Arg, Ctx, ID, Mutation, Resolver, UseMiddleware } from 'type-graphql'

import { LoadUser } from '../../../common/middleware'
import { Context } from '../../../types'
import { User } from '../../user'

@Resolver()
export class DeleteOrderItemsResolver {
	@Mutation(() => Boolean)
	@UseMiddleware(LoadUser)
	async deleteOrderItems(
		@Arg('invoiceId', () => ID) invoiceId: number,
		@Arg('ids', () => [ID]) ids: number[],
		@Ctx() ctx: Context<User>
	): Promise<true> {
		await ctx.invoiceService.deleteOrderItems(ctx.user, invoiceId, ids)

		return true
	}
}
