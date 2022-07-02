import 'reflect-metadata'
import 'dotenv/config'

import { dataSource, createApp } from './config'
import { isProduction } from './constants'
import { PORT } from './constants/config'

async function main() {
	if (isProduction) {
		console.log('Starting server in production environment')
	}

	await dataSource
		.initialize()
		.then(() => console.log('Data Source has been initialized!'))
		.catch((err) => {
			console.error('Error during Data Source initialization', err)
			process.exit(1)
		})

	const app = createApp()

	app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
}

main()
