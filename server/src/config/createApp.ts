import { graphqlHTTP } from 'express-graphql'
import { GraphQLError } from 'graphql'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import { isProduction } from '../constants'
import { corsOptions } from './corsOptions'
import { createContext } from './context'
import { session } from './session'
import { schema } from './schema'

export function createApp() {
	const app = express()

	app.set('trust proxy', true)

	app.use(helmet())

	app.use(cors(corsOptions))

	app.use(session)

	app.use(
		'/graphql',
		graphqlHTTP(async (req, res) => {
			const context = createContext(req, res)

			function customFormatErrorFn(e: GraphQLError) {
				switch (e.message) {
					case 'Access denied':
						res.statusCode = 403
						break
				}

				return e
			}

			return {
				graphiql: !isProduction,
				customFormatErrorFn,
				schema,
				context,
			}
		})
	)

	return app
}
