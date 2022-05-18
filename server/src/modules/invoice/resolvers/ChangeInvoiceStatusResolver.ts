import { Arg, Ctx, ID, Mutation, Resolver, UseMiddleware } from 'type-graphql'

import { ForbiddenError, InvoiceNotFoundError } from '../../../common/errors'
import { LoadUser } from '../../../common/middleware'
import { Context } from '../../../types'
import { Invoice } from '../entities'
import { Status } from '../enums'

@Resolver()
export class ChangeInvoiceStatusResolver {
	@Mutation(() => Invoice)
	@UseMiddleware(LoadUser)
	async changeInvoiceStatus(
		@Arg('id', () => ID) id: number,
		@Arg('status', () => Status) status: Status,
		@Ctx() ctx: Context
	): Promise<Invoice> {
		const invoice = await ctx.invoiceRepository.findOne({ where: { id } })

		if (!invoice) throw new InvoiceNotFoundError()
		if (ctx.user.id !== invoice.user.id) throw new ForbiddenError()

		invoice.status = status

		return ctx.invoiceRepository.save(invoice)
	}
}
