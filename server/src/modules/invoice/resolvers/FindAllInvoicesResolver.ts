import { Arg, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'

import { Authorized } from '../../../common/middleware'
import { Context } from '../../../types'
import { Invoice } from '../entities'
import { Status } from '../enums'

@Resolver()
export class FindAllInvoicesResolver {
	@Query(() => [Invoice])
	@UseMiddleware(Authorized)
	async invoices(
		@Arg('status', () => Status, { nullable: true }) status: Status,
		@Ctx() ctx: Context
	): Promise<Invoice[]> {
		// let builder: SelectQueryBuilder<Invoice> = ctx.invoiceRepository.createQueryBuilder('invoice')

		// switch (status) {
		// 	case Status.Draft:
		// 		builder = builder.where('invoice.status = :status', { status: Status.Draft })
		// 		break

		// 	case Status.Pending:
		// 		builder = builder.where('invoice.status = :status', { status: Status.Pending })
		// 		break

		// 	case Status.Paid:
		// 		builder = builder.where('invoice.status = :status', { status: Status.Paid })
		// 		break
		// }

		// return builder.orderBy('invoice.createdAt', 'DESC').getMany()

		return ctx.invoiceRepository.find({ where: { status } })
	}
}
