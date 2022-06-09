import { Arg, Ctx, ID, Info, Query, Resolver, UseMiddleware } from 'type-graphql'
import { GraphQLResolveInfo } from 'graphql'

import { LoadUser } from '../../../common/middleware'
import { createInvoiceRelationsMap } from '../utils'
import { Context } from '../../../types'
import { Invoice } from '../entities'
import { User } from '../../user'

@Resolver()
export class FindInvoiceByIdResolver {
	@Query(() => Invoice, { nullable: true })
	@UseMiddleware(LoadUser)
	async invoice(
		@Arg('id', () => ID) id: number,
		@Ctx() ctx: Context<User>,
		@Info() info: GraphQLResolveInfo
	): Promise<Invoice | null> {
		const relations = createInvoiceRelationsMap(info)

		return ctx.invoiceService.findById(ctx.user, id, relations)
	}
}
