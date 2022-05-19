import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'

import { LoadUser } from '../../../common/middleware'
import { Invoice, OrderItem } from '../entities'
import { CreateInvoiceInput } from '../inputs'
import { Context } from '../../../types'
import { User } from '../../user'

@Resolver()
export class CreateInvoiceResolver {
	@Mutation(() => Invoice)
	@UseMiddleware(LoadUser)
	async createInvoice(@Ctx() ctx: Context<User>, @Arg('data') data: CreateInvoiceInput): Promise<Invoice> {
		const orderItemRepository = ctx.dataSource.getRepository(OrderItem)

		const senderAddress = ctx.addressRepository.create(data.senderAddress)
		const clientAddress = ctx.addressRepository.create(data.clientAddress)

		const { paymentDue, paymentTerms, description, clientName, clientEmail, status } = data

		const orderItems: OrderItem[] = data.orderItems.map((oi) => orderItemRepository.create(oi))

		const invoice = ctx.invoiceRepository.create({
			user: ctx.user,
			paymentDue,
			paymentTerms,
			description,
			clientName,
			clientEmail,
			status,
			clientAddress,
			senderAddress,
			orderItems
		})

		return ctx.invoiceRepository.save(invoice)
	}
}
