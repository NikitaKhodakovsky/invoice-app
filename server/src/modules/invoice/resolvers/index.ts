import { BuildSchemaOptions } from 'type-graphql'

import { ChangeInvoiceStatusResolver } from './ChangeInvoiceStatusResolver'
import { DeleteOrderItemsResolver } from './DeleteOrderItemsResolver'
import { FindAllInvoicesResolver } from './FindAllInvoicesResolver'
import { FindInvoiceByIdResolver } from './FindInvoiceByIdResolver'
import { UpdateOrderItemResolver } from './UpdateOrderItemResolver'
import { CreateInvoiceResolver } from './CreateInvoiceResolver'
import { DeleteInvoiceResolver } from './DeleteInvoiceResolver'
import { UpdateInvoiceResolver } from './UpdateInvoiceResolver'
import { AddOrderItemsResolver } from './AddOrderItemsResolver'

export const InvoiceResolvers: BuildSchemaOptions['resolvers'] = [
	ChangeInvoiceStatusResolver,
	DeleteOrderItemsResolver,
	UpdateOrderItemResolver,
	FindAllInvoicesResolver,
	FindInvoiceByIdResolver,
	CreateInvoiceResolver,
	DeleteInvoiceResolver,
	UpdateInvoiceResolver,
	AddOrderItemsResolver
]
