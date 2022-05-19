import express, { Express } from 'express'
import helmet from 'helmet'
import cors from 'cors'

import { corsOptions } from './corsOptions'
import { session } from './session'

export function getApp(): Express {
	const app = express()

	app.set('trust proxy', process.env.NODE_ENV !== 'production')

	app.use(helmet())

	app.use(cors(corsOptions))

	app.use(session)

	return app
}
