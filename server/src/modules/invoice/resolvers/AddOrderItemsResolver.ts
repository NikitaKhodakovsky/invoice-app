import { Arg, Ctx, ID, Mutation, Resolver, UseMiddleware } from 'type-graphql'

import { ForbiddenError } from '../../../common/errors'
import { LoadUser } from '../../../common/middleware'
import { CreateOrderItemInput } from '../inputs'
import { InvoiceNotFoundError } from '../errors'
import { Context } from '../../../types'
import { OrderItem } from '../entities'
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
		const invoice = await ctx.invoiceRepository.findOne({ where: { id: invoiceId }, relations: { user: true } })

		if (!invoice) throw new InvoiceNotFoundError()
		if (ctx.user.id !== invoice.user.id) throw new ForbiddenError()

		const orderItems: OrderItem[] = data.map((item) => {
			return ctx.orderItemRepository.create({
				...item,
				invoice
			})
		})

		await ctx.orderItemRepository.save(orderItems)

		return true
	}
}
