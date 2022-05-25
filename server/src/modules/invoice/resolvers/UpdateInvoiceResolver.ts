import { Arg, Ctx, ID, Mutation, Resolver, UseMiddleware } from 'type-graphql'

import { LoadUser } from '../../../common/middleware'
import { UpdateInvoiceInput } from '../inputs'
import { Context } from '../../../types'
import { Invoice } from '../entities'
import { User } from '../../user'

@Resolver()
export class UpdateInvoiceResolver {
	@Mutation(() => Invoice)
	@UseMiddleware(LoadUser)
	async updateInvoice(
		@Arg('id', () => ID) id: number,
		@Arg('data') data: UpdateInvoiceInput,
		@Ctx() ctx: Context<User>
	) {
		return ctx.invoiceService.updateInvoice(ctx.user, id, data)
	}
}
