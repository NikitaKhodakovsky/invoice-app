import { DataSource, DataSourceOptions } from 'typeorm'

import config from './config.json'

import { User } from '../src/modules/user'
import { Address, Invoice, OrderItem } from '../src/modules/invoice'

export const testDataSourceOptions = {
	...config,
	type: 'postgres',
	entities: [User, Invoice, Address, OrderItem],
	synchronize: true,
	dropSchema: true
} as DataSourceOptions

export const TestDataSource = new DataSource(testDataSourceOptions)
