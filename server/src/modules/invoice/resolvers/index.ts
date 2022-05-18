import { BuildSchemaOptions } from 'type-graphql'

import { FindAllInvoicesResolver } from './FindAllInvoicesResolver'
import { FindInvoiceByIdResolver } from './FindInvoiceByIdResolver'
import { CreateInvoiceResolver } from './CreateInvoiceResolver'
import { DeleteInvoiceResolver } from './DeleteInvoiceResolver'

export const InvoiceResolvers: BuildSchemaOptions['resolvers'] = [
	FindAllInvoicesResolver,
	FindInvoiceByIdResolver,
	CreateInvoiceResolver,
	DeleteInvoiceResolver
]
