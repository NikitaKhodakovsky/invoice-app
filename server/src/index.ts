import 'reflect-metadata'
import 'dotenv/config'

import { dataSource, createApp } from './config'
import { PORT } from './constants/config'

async function main() {
	await dataSource
		.initialize()
		.then(() => console.log('Data Source has been initialized!'))
		.catch((err) => console.error('Error during Data Source initialization', err))

	const app = createApp()

	app.listen(PORT, () => console.log(`Server started on port: http://localhost:${PORT}`))
}

main()
