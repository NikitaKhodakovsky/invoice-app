import { Arg, Ctx, ID, Mutation, Resolver, UseMiddleware } from 'type-graphql'

import { LoadUser } from '../../../common/middleware'
import { CreateOrderItemInput } from '../inputs'
import { Context } from '../../../types'
import { User } from '../../user'

@Resolver()
export class AddOrderItemsResolver {
	@Mutation(() => Boolean)
	@UseMiddleware(LoadUser)
	async addOrderItems(
		@Arg('invoiceId', () => ID) invoiceId: number,
		@Arg('data', () => [CreateOrderItemInput]) data: CreateOrderItemInput[],
		@Ctx() ctx: Context<User>
	): Promise<true> {
		await ctx.invoiceService.addOrderItems(ctx.user, invoiceId, data)

		return true
	}
}
