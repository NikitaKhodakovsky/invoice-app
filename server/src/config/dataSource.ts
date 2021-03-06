import { DataSource, DataSourceOptions } from 'typeorm'

import { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } from '../constants/config'
import { Invoice, Address, OrderItem } from '../modules/invoice'
import { User } from '../modules/user'

const dataSourceOptions: DataSourceOptions = {
	type: 'postgres',
	host: DB_HOST,
	port: DB_PORT,
	username: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_DATABASE,
	entities: [User, Invoice, Address, OrderItem],
}

export const dataSource = new DataSource(dataSourceOptions)
