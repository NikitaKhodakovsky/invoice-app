import { DataSource } from 'typeorm'

import { CreateMockCredentials } from '../mock'
import { User } from '../../src/modules/user'

export async function createUser(dataSource: DataSource): Promise<User> {
	const userRepository = dataSource.getRepository(User)

	const { username, password } = CreateMockCredentials()

	const user = userRepository.create({ username, password })

	return userRepository.save(user)
}
