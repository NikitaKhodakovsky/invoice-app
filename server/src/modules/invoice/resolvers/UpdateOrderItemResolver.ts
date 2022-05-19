import { Arg, Ctx, ID, Mutation, Resolver, UseMiddleware } from 'type-graphql'

import { ForbiddenError } from '../../../common/errors'
import { LoadUser } from '../../../common/middleware'
import { OrderItemNotFoundError } from '../errors'
import { UpdateOrderItemInput } from '../inputs'
import { User } from '../../../modules/user'
import { Context } from '../../../types'

@Resolver()
export class UpdateOrderItemResolver {
	@Mutation(() => Boolean)
	@UseMiddleware(LoadUser)
	async updateOrderItem(
		@Arg('id', () => ID, { description: 'Order item id' }) id: number,
		@Arg('data') data: UpdateOrderItemInput,
		@Ctx() ctx: Context<User>
	): Promise<boolean> {
		const orderItem = await ctx.orderItemRepository.findOne({ where: { id }, relations: { invoice: true } })

		if (!orderItem) throw new OrderItemNotFoundError()

		if (ctx.user.id !== orderItem.invoice.user.id) throw new ForbiddenError()

		const updatedOrderItem = ctx.orderItemRepository.merge(orderItem, data)

		await ctx.orderItemRepository.save(updatedOrderItem)

		return true
	}
}
