import { jest, describe, test, expect, beforeEach, afterEach } from '@jest/globals'

import { Context } from '../../types'
import { ResolverData } from 'type-graphql'
import { ForbiddenError, UserNotFoundError } from '../errors'
import { LoadUser } from './LoadUser'
import { TestDataSource } from '../../../test'
import { compareUsers, createUser } from '../../../test/utils'
import { User } from '../../modules/user'

beforeEach(async () => {
	await TestDataSource.initialize()
})

afterEach(async () => {
	await TestDataSource.destroy()
})

describe('LoadUser', () => {
	test('Should call next function and attach user to context object', async () => {
		const middleware = new LoadUser()
		const next = jest.fn<() => Promise<any>>()

		const user = await createUser(TestDataSource)

		const data = {
			context: { req: { session: { userId: user.id } }, dataSource: TestDataSource }
		} as unknown as ResolverData<Context<User>>

		await middleware.use(data, next)

		compareUsers(user, data.context.user)

		expect(next).toBeCalledTimes(1)
	})

	test("Should throw ForbiddenError if session.userId doesn't exist", async () => {
		expect.assertions(2)

		const middleware = new LoadUser()

		const next = jest.fn<() => Promise<any>>()

		const data = { context: { req: { session: {} } } } as unknown as ResolverData<Context<User>>

		await middleware.use(data, next).catch((e) => expect(e).toBeInstanceOf(ForbiddenError))

		expect(next).toBeCalledTimes(0)
	})

	test("Should throw UserNotFoundError if user doesn't exist", async () => {
		expect.assertions(2)

		const middleware = new LoadUser()
		const next = jest.fn<() => Promise<any>>()

		const data = {
			context: { req: { session: { userId: 1 } }, dataSource: TestDataSource }
		} as unknown as ResolverData<Context<User>>

		await middleware.use(data, next).catch((e) => expect(e).toBeInstanceOf(UserNotFoundError))

		expect(next).toBeCalledTimes(0)
	})
})
