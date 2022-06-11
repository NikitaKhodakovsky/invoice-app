import { graphqlHTTP } from 'express-graphql'
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

	app.set('trust proxy', !isProduction)

	app.use(helmet())

	app.use(cors(corsOptions))

	app.use(session)

	app.use(
		'/graphql',
		graphqlHTTP(async (req, res) => {
			const context = createContext(req, res)

			return {
				schema,
				context
			}
		})
	)

	return app
}
