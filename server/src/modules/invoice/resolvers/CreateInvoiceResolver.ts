import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'

import { LoadUser } from '../../../common/middleware'
import { CreateInvoiceInput } from '../inputs'
import { Context } from '../../../types'
import { Invoice } from '../entities'

@Resolver()
export class CreateInvoiceResolver {
	@Mutation(() => Invoice)
	@UseMiddleware(LoadUser)
	async createInvoice(@Ctx() ctx: Context, @Arg('data') data: CreateInvoiceInput): Promise<Invoice> {
		const invoice = ctx.invoiceRepository.create({ ...data, user: ctx.user })
		return ctx.invoiceRepository.save(invoice)
	}
}
