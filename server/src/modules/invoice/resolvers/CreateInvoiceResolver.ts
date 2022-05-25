import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'

import { LoadUser } from '../../../common/middleware'
import { CreateInvoiceInput } from '../inputs'
import { Context } from '../../../types'
import { Invoice } from '../entities'
import { User } from '../../user'

@Resolver()
export class CreateInvoiceResolver {
	@Mutation(() => Invoice)
	@UseMiddleware(LoadUser)
	async createInvoice(@Ctx() ctx: Context<User>, @Arg('data') data: CreateInvoiceInput): Promise<Invoice> {
		return ctx.invoiceService.createInvoice(ctx.user, data)
	}
}
