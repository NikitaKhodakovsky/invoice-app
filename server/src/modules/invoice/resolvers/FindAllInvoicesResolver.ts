import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'

import { Authorized } from '../../../common/middleware'
import { Context } from '../../../types'
import { Invoice } from '../entities'

@Resolver()
export class FindAllInvoicesResolver {
	@Query(() => [Invoice])
	@UseMiddleware(Authorized)
	async invoices(@Ctx() ctx: Context): Promise<Invoice[]> {
		return ctx.invoiceRepository.find()
	}
}
