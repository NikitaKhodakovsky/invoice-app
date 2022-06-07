import { ApolloServer } from 'apollo-server-express'

import { isProduction } from '../constants'

import { schema } from './schema'
import { context } from './context'

export const apolloServer = new ApolloServer({
	schema,
	context,
	introspection: !isProduction,
	csrfPrevention: true
})
