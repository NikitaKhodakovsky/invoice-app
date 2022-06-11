import { describe, expect, test, beforeEach, afterEach } from '@jest/globals'

import { AuthenticationError, UserInputError } from '../../common/errors'
import { CreateMockCredentials } from '../../../test/mock'
import { inspectUser } from '../../../test/utils'
import { TestDataSource } from '../../../test'
import { AuthService } from './AuthService'

const credentials = CreateMockCredentials()

describe('AuthService', () => {
	beforeEach(async () => {
		await TestDataSource.initialize()
	})

	afterEach(async () => {
		await TestDataSource.destroy()
	})

	describe('register', () => {
		test('Should create a user', async () => {
			const authRepository = new AuthService(TestDataSource)

			const user = await authRepository.register(credentials)

			expect(user).toBeDefined()
		})

		test('Should throw error when user with that username already exists', async () => {
			expect.assertions(1)

			const authRepository = new AuthService(TestDataSource)

			await authRepository.register(credentials)

			await authRepository.register(credentials).catch((e) => expect(e).toBeInstanceOf(UserInputError))
		})
	})

	describe('login', () => {
		test('Should login', async () => {
			const authRepository = new AuthService(TestDataSource)

			await authRepository.register(credentials)

			const user = await authRepository.login(credentials)

			inspectUser(user)
		})

		test('Should throw error when password is entered incorrectly', async () => {
			expect.assertions(1)

			const authRepository = new AuthService(TestDataSource)

			await authRepository.register(credentials)

			const { username } = credentials

			await authRepository
				.login({ username, password: 'hello world' })
				.catch((e) => expect(e).toBeInstanceOf(AuthenticationError))
		})

		test('Should throw error when user does not exist', async () => {
			expect.assertions(1)

			const authRepository = new AuthService(TestDataSource)

			await authRepository.login(credentials).catch((e) => expect(e).toBeInstanceOf(AuthenticationError))
		})
	})
})
