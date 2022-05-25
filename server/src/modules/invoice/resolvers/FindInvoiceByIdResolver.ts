import { Arg, Ctx, ID, Query, Resolver, UseMiddleware } from 'type-graphql'

import { LoadUser } from '../../../common/middleware'
import { Context } from '../../../types'
import { Invoice } from '../entities'
import { User } from '../../user'

@Resolver()
export class FindInvoiceByIdResolver {
	@Query(() => Invoice, { nullable: true })
	@UseMiddleware(LoadUser)
	async invoice(@Arg('id', () => ID) id: number, @Ctx() ctx: Context<User>): Promise<Invoice | null> {
		return ctx.invoiceService.findById(ctx.user, id)
	}
}
