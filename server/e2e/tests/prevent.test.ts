import { beforeAll, describe, test, expect, afterAll } from '@jest/globals'

import { DeleteAccountMutation, RegisterAndLogin, RegisterAndLoginResult } from '../graphql/auth'
import { CreateMockInvoiceInput, CreateMockOrderItemsInput } from '../../test/mock'
import { Invoice } from '../../../shared'

import {
	AddOrderItemsMutation,
	CreateInvoiceMutation,
	DeleteOrderItemsMutation,
	FindInvoiceByIdQuery,
	UpdateInvoiceMutation,
	UpdateOrderItemMutation
} from '../graphql/invoice'

let user: RegisterAndLoginResult
let invoice: Invoice

let intruder: RegisterAndLoginResult

beforeAll(async () => {
	user = await RegisterAndLogin()
	invoice = await CreateInvoiceMutation(user.qid)

	intruder = await RegisterAndLogin()
})

afterAll(async () => {
	await DeleteAccountMutation(user.qid)
	await DeleteAccountMutation(intruder.qid)
})

describe('Scenarios', () => {
	test('Access to not your Invoice', async () => {
		expect.assertions(1)

		await FindInvoiceByIdQuery(intruder.qid, invoice.id).catch((e) => expect(e).toBeDefined())
	})
	test('Update not your Invoice', async () => {
		expect.assertions(1)

		const { orderItems, status, ...input } = CreateMockInvoiceInput()

		await UpdateInvoiceMutation(intruder.qid, invoice.id, input).catch((e) => expect(e).toBeDefined())
	})

	test('Add OI to not your Invoice', async () => {
		expect.assertions(1)

		const input = CreateMockOrderItemsInput(3)
		await AddOrderItemsMutation(intruder.qid, invoice.id, input).catch((e) => expect(e).toBeDefined())
	})

	test('Update OI in not your Invoice', async () => {
		expect.assertions(1)

		const [input] = CreateMockOrderItemsInput(1)

		await UpdateOrderItemMutation(intruder.qid, invoice.orderItems[0].id, input).catch((e) =>
			expect(e).toBeDefined()
		)
	})

	test('Delete OIs from not your Invoice', async () => {
		expect.assertions(1)

		const { orderItems } = invoice

		const [orderItem] = orderItems

		await DeleteOrderItemsMutation(intruder.qid, invoice.id, [orderItem.id]).catch((e) => expect(e).toBeDefined())
	})
})
