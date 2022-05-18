import { DataSource, DataSourceOptions } from 'typeorm'

import { isProduction } from '../constants'
import { User } from '../modules/user'

const dataSourceOptions = {
	type: 'postgres',
	host: process.env.DB_HOST || 'localhost',
	port: process.env.DB_PORT,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE || 'postgres',
	entities: [User],
	synchronize: !isProduction
} as DataSourceOptions

export const dataSource = new DataSource(dataSourceOptions)
