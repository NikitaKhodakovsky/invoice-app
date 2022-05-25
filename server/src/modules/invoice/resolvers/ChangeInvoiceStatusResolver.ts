import { Arg, Ctx, ID, Mutation, Resolver, UseMiddleware } from 'type-graphql'

import { LoadUser } from '../../../common/middleware'
import { Context } from '../../../types'
import { Invoice } from '../entities'
import { Status } from '../enums'
import { User } from '../../user'

@Resolver()
export class ChangeInvoiceStatusResolver {
	@Mutation(() => Invoice)
	@UseMiddleware(LoadUser)
	async changeInvoiceStatus(
		@Arg('id', () => ID) id: number,
		@Arg('status', () => Status) status: Status,
		@Ctx() ctx: Context<User>
	): Promise<Invoice> {
		return ctx.invoiceService.changeStatus(ctx.user, id, status)
	}
}
