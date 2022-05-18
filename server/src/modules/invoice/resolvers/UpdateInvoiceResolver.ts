import { Arg, Ctx, ID, Mutation, Resolver, UseMiddleware } from 'type-graphql'

import { ForbiddenError, InvoiceNotFoundError } from '../../../common/errors'
import { LoadUser } from '../../../common/middleware'
import { UpdateInvoiceInput } from '../inputs'
import { Context } from '../../../types'
import { Invoice } from '../entities'

@Resolver()
export class UpdateInvoiceResolver {
	@Mutation(() => Invoice)
	@UseMiddleware(LoadUser)
	async updateInvoice(@Arg('id', () => ID) id: number, @Arg('data') data: UpdateInvoiceInput, @Ctx() ctx: Context) {
		const invoice = await ctx.invoiceRepository.findOne({ where: { id } })

		if (!invoice) throw new InvoiceNotFoundError()
		if (ctx.user.id !== invoice.user.id) throw new ForbiddenError()

		const { paymentDue, description, paymentTerms, clientName, clientEmail } = data

		if (paymentDue) invoice.paymentDue = paymentDue
		if (description) invoice.description = description
		if (paymentTerms) invoice.paymentTerms = paymentTerms
		if (clientName) invoice.clientName = clientName
		if (clientEmail) invoice.clientEmail = clientEmail

		return ctx.invoiceRepository.save(invoice)
	}
}
