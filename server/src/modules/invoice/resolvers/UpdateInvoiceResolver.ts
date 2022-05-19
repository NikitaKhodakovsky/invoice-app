import { Arg, Ctx, ID, Mutation, Resolver, UseMiddleware } from 'type-graphql'

import { ForbiddenError } from '../../../common/errors'
import { LoadUser } from '../../../common/middleware'
import { InvoiceNotFoundError } from '../errors'
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
		const invoice = await ctx.invoiceRepository.findOne({ where: { id } })

		if (!invoice) throw new InvoiceNotFoundError()
		if (ctx.user.id !== invoice.user.id) throw new ForbiddenError()

		const { clientAddress, senderAddress, ...other } = data

		const updatedInvoice = ctx.invoiceRepository.merge(invoice, other)

		updatedInvoice.clientAddress = ctx.addressRepository.merge(invoice.clientAddress, clientAddress)
		updatedInvoice.senderAddress = ctx.addressRepository.merge(invoice.senderAddress, senderAddress)

		return ctx.invoiceRepository.save(updatedInvoice)
	}
}
