import { BuildSchemaOptions } from 'type-graphql'

import { ChangeInvoiceStatusResolver } from './ChangeInvoiceStatusResolver'
import { FindAllInvoicesResolver } from './FindAllInvoicesResolver'
import { FindInvoiceByIdResolver } from './FindInvoiceByIdResolver'
import { CreateInvoiceResolver } from './CreateInvoiceResolver'
import { DeleteInvoiceResolver } from './DeleteInvoiceResolver'
import { UpdateInvoiceResolver } from './UpdateInvoiceResolver'

export const InvoiceResolvers: BuildSchemaOptions['resolvers'] = [
	ChangeInvoiceStatusResolver,
	FindAllInvoicesResolver,
	FindInvoiceByIdResolver,
	CreateInvoiceResolver,
	DeleteInvoiceResolver,
	UpdateInvoiceResolver
]
