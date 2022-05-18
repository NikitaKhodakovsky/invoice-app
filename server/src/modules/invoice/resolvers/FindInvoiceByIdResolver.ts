import { Arg, Ctx, ID, Query, Resolver, UseMiddleware } from 'type-graphql'

import { Authorized } from '../../../common/middleware'
import { Context } from '../../../types'
import { Invoice } from '../entities'

@Resolver()
export class FindInvoiceByIdResolver {
	@Query(() => Invoice, { nullable: true })
	@UseMiddleware(Authorized)
	async invoice(@Arg('id', () => ID) id: number, @Ctx() ctx: Context): Promise<Invoice | null> {
		return ctx.invoiceRepository.findOne({ where: { id } })
	}
}
