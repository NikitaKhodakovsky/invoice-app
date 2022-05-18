import { BuildSchemaOptions } from 'type-graphql'

import { FindAllInvoicesResolver } from './FindAllInvoicesResolver'
import { CreateInvoiceResolver } from './CreateInvoiceResolver'

export const InvoiceResolvers: BuildSchemaOptions['resolvers'] = [FindAllInvoicesResolver, CreateInvoiceResolver]
