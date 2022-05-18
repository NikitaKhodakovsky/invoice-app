import { buildSchemaSync, BuildSchemaOptions } from 'type-graphql'

import { AuthResolvers } from '../modules/auth'
import { TestResolver } from '../TestResolver'
import { isProduction } from '../constants'

export const schema = buildSchemaSync({
	resolvers: [TestResolver, ...AuthResolvers] as BuildSchemaOptions['resolvers'],
	emitSchemaFile: !isProduction
})
