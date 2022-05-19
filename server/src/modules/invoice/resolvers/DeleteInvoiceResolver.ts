import { Arg, Ctx, ID, Mutation, Resolver, UseMiddleware } from 'type-graphql'

import { ForbiddenError, InvoiceNotFoundError } from '../../../common/errors'
import { LoadUser } from '../../../common/middleware'
import { Context } from '../../../types'
import { User } from '../../user'

@Resolver()
export class DeleteInvoiceResolver {
	@Mutation(() => Boolean)
	@UseMiddleware(LoadUser)
	async deleteInvoice(@Arg('id', () => ID) id: number, @Ctx() ctx: Context<User>): Promise<boolean> {
		const invoice = await ctx.invoiceRepository.findOne({ where: { id } })

		if (!invoice) throw new InvoiceNotFoundError()
		if (invoice.user.id !== ctx.user.id) throw new ForbiddenError()

		await ctx.invoiceRepository.remove(invoice)

		return true
	}
}
