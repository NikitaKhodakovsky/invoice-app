import { Arg, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'

import { LoadUser } from '../../../common/middleware'
import { Context } from '../../../types'
import { Invoice } from '../entities'
import { Status } from '../enums'
import { User } from '../../user'

@Resolver()
export class FindAllInvoicesResolver {
	@Query(() => [Invoice])
	@UseMiddleware(LoadUser)
	async invoices(
		@Arg('status', () => Status, { nullable: true }) status: Status,
		@Ctx() ctx: Context<User>
	): Promise<Invoice[]> {
		return ctx.invoiceService.findAll(ctx.user, status)
	}
}
