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
		const senderAddress = ctx.addressRepository.create(data.senderAddress)
		const clientAddress = ctx.addressRepository.create(data.clientAddress)

		const { paymentDue, paymentTerms, description, clientName, clientEmail, status } = data

		const invoice = ctx.invoiceRepository.create({
			user: ctx.user,
			paymentDue,
			paymentTerms,
			description,
			clientName,
			clientEmail,
			status,
			clientAddress,
			senderAddress
		})

		return ctx.invoiceRepository.save(invoice)
	}
}
