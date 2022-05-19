import { Arg, Ctx, ID, Mutation, Resolver, UseMiddleware } from 'type-graphql'

import { ForbiddenError, InvoiceNotFoundError } from '../../../common/errors'
import { LoadUser } from '../../../common/middleware'
import { Context } from '../../../types'
import { OrderItem } from '../entities'
import { User } from '../../user'

@Resolver()
export class DeleteOrderItemsResolver {
	@Mutation(() => Boolean)
	@UseMiddleware(LoadUser)
	async deleteOrderItems(
		@Arg('invoiceId', () => ID) invoiceId: number,
		@Arg('ids', () => [ID]) ids: string[],
		@Ctx() ctx: Context<User>
	): Promise<true> {
		const invoice = await ctx.invoiceRepository.findOne({
			where: { id: invoiceId },
			relations: { user: true, orderItems: true }
		})

		if (!invoice) throw new InvoiceNotFoundError()
		if (ctx.user.id !== invoice.user.id) throw new ForbiddenError()
		if (invoice.orderItems.length <= 1) throw new Error('You cannot delete a sole Order Item')

		const orderItemIds = ids.map((id) => parseInt(id))
		const orderItems: OrderItem[] = invoice.orderItems.filter((item) => orderItemIds.includes(item.id))

		if (orderItems.length === invoice.orderItems.length) throw new Error("You cannot delete all Order Item's")

		await ctx.orderItemRepository.remove(orderItems)

		return true
	}
}
