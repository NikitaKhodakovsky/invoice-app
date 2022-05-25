import { describe, expect, test, beforeEach, afterEach } from '@jest/globals'
import { UserInputError } from 'apollo-server-express'
import { DataSource } from 'typeorm'

import { inspectUser, testDataSourceOptions } from '../../../test'
import { AuthenticationError } from '../../common/errors'
import { AuthService } from './AuthService'

const username = 'username'
const password = 'password'

const TestDataSource = new DataSource(testDataSourceOptions)

beforeEach(async () => {
	await TestDataSource.initialize()
})

afterEach(async () => {
	await TestDataSource.destroy()
})

describe('AuthService', () => {
	describe('register', () => {
		test('Should create a user', async () => {
			const authRepository = new AuthService(TestDataSource)

			const user = await authRepository.register('username', 'password', 'password')

			inspectUser(user)
		})

		test("Should throw error when passwords don't match", async () => {
			expect.assertions(1)

			const authRepository = new AuthService(TestDataSource)

			try {
				await authRepository.register('username', 'password', 'hello world')
			} catch (e) {
				expect(e).toBeInstanceOf(UserInputError)
			}
		})

		test('Should throw error when user with that username already exists', async () => {
			expect.assertions(1)

			const authRepository = new AuthService(TestDataSource)

			await authRepository.register(username, password, password)

			try {
				await authRepository.register(username, password, password)
			} catch (e) {
				expect(e).toBeInstanceOf(UserInputError)
			}
		})
	})

	describe('login', () => {
		test('Should login', async () => {
			const authRepository = new AuthService(TestDataSource)

			await authRepository.register(username, password, password)

			const user = await authRepository.login(username, password)

			inspectUser(user)
		})

		test('Should throw error when password is entered incorrectly', async () => {
			expect.assertions(1)

			const authRepository = new AuthService(TestDataSource)

			await authRepository.register(username, password, password)

			try {
				await authRepository.login(username, 'hello world')
			} catch (e) {
				expect(e).toBeInstanceOf(AuthenticationError)
			}
		})

		test('Should throw error when user does not exist', async () => {
			expect.assertions(1)

			const authRepository = new AuthService(TestDataSource)

			try {
				await authRepository.login(username, password)
			} catch (e) {
				expect(e).toBeInstanceOf(AuthenticationError)
			}
		})
	})
})
