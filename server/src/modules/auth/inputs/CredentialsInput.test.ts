import { validate, validateOrReject } from 'class-validator'
import { describe, expect, test } from '@jest/globals'

import { CreateMockCredentials } from '../../../../test/mock'
import { CredentialsInput } from './CredentialsInput'

const longString = 'abcdefghijkadsffffffffffffffffffffffffflmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

const { username, password } = CreateMockCredentials()

describe('CredentialsInput', () => {
	test('Should throw error if username is shorter than 4 symbols', async () => {
		expect.assertions(1)

		const credentials = new CredentialsInput()

		credentials.username = ' '
		credentials.password = password

		await validateOrReject(credentials).catch((e) => expect(e).toBeDefined())
	})

	test('Should throw error if password is shorter than 8 symbols', async () => {
		expect.assertions(1)

		const credentials = new CredentialsInput()

		credentials.username = username
		credentials.password = ' '

		await validateOrReject(credentials).catch((e) => expect(e).toBeDefined())
	})

	test('Should throw error if username is longer than 32 symbols', async () => {
		expect.assertions(1)

		const credentials = new CredentialsInput()

		credentials.username = longString
		credentials.password = password

		await validateOrReject(credentials).catch((e) => expect(e).toBeDefined())
	})

	test('Should throw error if password is longer than 32 symbols', async () => {
		expect.assertions(1)

		const credentials = new CredentialsInput()

		credentials.username = username
		credentials.password = longString

		await validateOrReject(credentials).catch((e) => expect(e).toBeDefined())
	})

	test('Should pass validation if conditions are met', async () => {
		const credentials = new CredentialsInput()

		credentials.username = 'username'
		credentials.password = 'some_password'

		const result = await validate(credentials)

		expect(result.length).toBe(0)
	})
})
