import { Arg, Ctx, Query, Resolver, UseMiddleware, Info } from 'type-graphql'
import { GraphQLResolveInfo } from 'graphql'

import { LoadUser } from '../../../common/middleware'
import { createInvoiceRelationsMap } from '../utils'
import { Context } from '../../../types'
import { Invoice } from '../entities'
import { Status } from '../enums'
import { User } from '../../user'

@Resolver()
export class FindAllInvoicesResolver {
	@Query(() => [Invoice])
	@UseMiddleware(LoadUser)
	async invoices(
		@Arg('statuses', () => [Status], { nullable: true }) statuses: Status[],
		@Ctx() ctx: Context<User>,
		@Info() info: GraphQLResolveInfo
	): Promise<Invoice[]> {
		const relations = createInvoiceRelationsMap(info)

		return ctx.invoiceService.findAll(ctx.user, statuses, relations)
	}
}
