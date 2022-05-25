import { Arg, Ctx, ID, Mutation, Resolver, UseMiddleware } from 'type-graphql'

import { LoadUser } from '../../../common/middleware'
import { Context } from '../../../types'
import { User } from '../../user'

@Resolver()
export class DeleteInvoiceResolver {
	@Mutation(() => Boolean)
	@UseMiddleware(LoadUser)
	async deleteInvoice(@Arg('id', () => ID) id: number, @Ctx() ctx: Context<User>): Promise<boolean> {
		await ctx.invoiceService.deleteInvoice(ctx.user, id)
		return true
	}
}
