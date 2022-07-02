import { DataSource } from 'typeorm'

import { Address, Invoice, OrderItem } from '../src/modules/invoice'
import { User } from '../src/modules/user'

export const TestDataSource = new DataSource({
	type: 'postgres',
	entities: [User, Invoice, Address, OrderItem],
	host: 'test-db',
	username: 'postgres',
	password: 'password',
	synchronize: true,
	dropSchema: true,
})
