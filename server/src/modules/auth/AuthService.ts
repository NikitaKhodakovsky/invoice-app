import { DataSource, Repository } from 'typeorm'
import argon2 from 'argon2'

import { AuthenticationError, UserInputError } from '../../common/errors'
import { CredentialsInput } from './inputs'
import { User } from '../user'

export class AuthService {
	private userRepository: Repository<User>

	constructor(dataSource: DataSource) {
		this.userRepository = dataSource.getRepository(User)
	}

	public async register({ username, password }: CredentialsInput): Promise<User> {
		const existedUser = await this.userRepository.findOne({ where: { username } })

		if (existedUser) throw new UserInputError('User with this username already exists')

		const hashedPassword = await argon2.hash(password)

		const user = this.userRepository.create({ username, password: hashedPassword })

		return this.userRepository.save(user)
	}

	public async login({ username, password }: CredentialsInput): Promise<User> {
		const user = await this.userRepository.findOne({ where: { username } })

		if (!user) throw new AuthenticationError()

		const comparePasswordResult = await argon2.verify(user.password, password)

		if (!comparePasswordResult) throw new AuthenticationError()

		return user
	}

	public async deleteAccount(user: User) {
		await this.userRepository.remove(user)
	}
}
