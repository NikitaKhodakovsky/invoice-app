import { buildSchemaSync, BuildSchemaOptions } from 'type-graphql'

import { InvoiceResolvers } from '../modules/invoice'
import { AuthResolvers } from '../modules/auth'
import { isProduction } from '../constants'

export const schema = buildSchemaSync({
	resolvers: [...AuthResolvers, ...InvoiceResolvers] as BuildSchemaOptions['resolvers'],
	emitSchemaFile: !isProduction,
	dateScalarMode: 'isoDate'
})
