import { jest, describe, test, expect } from '@jest/globals'

import { Authorized } from './Authorized'
import { Context } from '../../types'
import { ResolverData } from 'type-graphql'
import { ForbiddenError } from '../errors'

describe('Authorized', () => {
	test('Should call next function if session.userId exist', async () => {
		const middleware = new Authorized()

		const next = jest.fn<() => Promise<any>>()

		const data = { context: { req: { session: { userId: 10 } } } } as unknown as ResolverData<Context>

		await middleware.use(data, next)

		expect(next).toBeCalledTimes(1)
	})

	test("Should throw ForbiddenError if session.userId doesn't exist", async () => {
		expect.assertions(2)

		const middleware = new Authorized()

		const next = jest.fn<() => Promise<any>>()

		const data = { context: { req: { session: {} } } } as unknown as ResolverData<Context>

		await middleware.use(data, next).catch((e) => expect(e).toBeInstanceOf(ForbiddenError))

		expect(next).toBeCalledTimes(0)
	})
})
