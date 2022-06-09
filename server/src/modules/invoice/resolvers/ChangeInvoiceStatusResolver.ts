import { Arg, Ctx, ID, Mutation, Resolver, UseMiddleware } from 'type-graphql'

import { LoadUser } from '../../../common/middleware'
import { Context } from '../../../types'
import { Status } from '../enums'
import { User } from '../../user'

@Resolver()
export class ChangeInvoiceStatusResolver {
	@Mutation(() => Boolean)
	@UseMiddleware(LoadUser)
	async changeInvoiceStatus(
		@Arg('id', () => ID) id: number,
		@Arg('status', () => Status) status: Status,
		@Ctx() ctx: Context<User>
	): Promise<boolean> {
		await ctx.invoiceService.changeStatus(ctx.user, id, status)

		return true
	}
}
