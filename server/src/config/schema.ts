import { buildSchemaSync, BuildSchemaOptions } from 'type-graphql'

import { InvoiceResolvers } from '../modules/invoice'
import { AuthResolvers } from '../modules/auth'
import { TestResolver } from '../TestResolver'
import { isProduction } from '../constants'

export const schema = buildSchemaSync({
	resolvers: [TestResolver, ...AuthResolvers, ...InvoiceResolvers] as BuildSchemaOptions['resolvers'],
	emitSchemaFile: !isProduction,
	dateScalarMode: 'isoDate'
})
