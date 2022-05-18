import 'reflect-metadata'
import 'dotenv/config'

import { corsOptions, dataSource, getApp, apolloServer } from './config'
import { PORT } from './constants'

async function main() {
	await dataSource
		.initialize()
		.then(() => console.log('Data Source has been initialized!'))
		.catch((err) => console.error('Error during Data Source initialization', err))

	await apolloServer.start()

	const app = getApp()

	apolloServer.applyMiddleware({ app, cors: corsOptions })

	app.listen(PORT, () => console.log(`Server started on port: http://localhost:${PORT}`))
}

main()
