import { DataSourceOptions } from 'typeorm'

import config from './config.json'

import { User } from '../src/modules/user'

export const testDataSourceOptions = {
	...config,
	type: 'postgres',
	entities: [User],
	synchronize: true,
	dropSchema: true
} as DataSourceOptions
