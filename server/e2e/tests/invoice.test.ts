import { beforeAll, describe, test, expect, afterAll } from '@jest/globals'

import { CreateMockInvoiceInput, CreateMockOrderItemsInput } from '../../test/mock'
import { DeleteAccountMutation, RegisterAndLogin } from '../graphql/auth'
import { compareInvoices, compareOrderItems } from '../../test/utils'
import { Status } from '../../../shared'

import {
	AddOrderItemsMutation,
	CreateInvoiceMutation,
	DeleteInvoiceMutation,
	DeleteOrderItemsMutation,
	FindInvoiceByIdQuery,
	UpdateInvoiceMutation,
	UpdateInvoiceStatusMutation,
	UpdateOrderItemMutation
} from '../graphql/invoice'

let qid: string

beforeAll(async () => {
	const res = await RegisterAndLogin()
	qid = res.qid
})

afterAll(async () => {
	await DeleteAccountMutation(qid)
})

describe('Invoice', () => {
	test('CI - UI', async () => {
		const invoice = await CreateInvoiceMutation(qid)

		const { orderItems, status, ...input } = CreateMockInvoiceInput()

		const updatedInvoice = await UpdateInvoiceMutation(qid, invoice.id, input)

		compareInvoices(updatedInvoice, input)
	})

	test('CI - UIS', async () => {
		const invoiceInput = CreateMockInvoiceInput({ status: Status.Draft })

		const invoice = await CreateInvoiceMutation(qid, invoiceInput)

		expect(invoice).toBeDefined()

		const status = await UpdateInvoiceStatusMutation(qid, invoice.id, Status.Pending)

		expect(status).toBe(Status.Pending)
	})

	test('CI - DI - FI', async () => {
		const invoice = await CreateInvoiceMutation(qid)

		const deleteResult = await DeleteInvoiceMutation(qid, invoice.id)

		expect(deleteResult).toBe(true)

		const findResult = await FindInvoiceByIdQuery(qid, invoice.id)

		expect(findResult).toBeNull()
	})

	test('CI - Add OIs - FI', async () => {
		const invoice = await CreateInvoiceMutation(qid)

		const newOrderItems = CreateMockOrderItemsInput(2)

		const addResult = await AddOrderItemsMutation(qid, invoice.id, newOrderItems)

		expect(addResult).toBe(true)

		const updatedInvoice = await FindInvoiceByIdQuery(qid, invoice.id)

		if (!updatedInvoice) throw new Error('null')

		expect(updatedInvoice.orderItems.length).toBe(invoice.orderItems.length + newOrderItems.length)
	})

	test('CI - Delete sole OI', async () => {
		expect.assertions(1)

		const createInvoiceInput = CreateMockInvoiceInput({
			orderItems: CreateMockOrderItemsInput(1)
		})

		const invoice = await CreateInvoiceMutation(qid, createInvoiceInput)

		const [orderItem] = invoice.orderItems

		await DeleteOrderItemsMutation(qid, invoice.id, [orderItem.id]).catch((e) => expect(e).toBeDefined())
	})

	test('CI - Delete all OIs', async () => {
		expect.assertions(1)

		const invoice = await CreateInvoiceMutation(qid)

		const ids = invoice.orderItems.map((i) => i.id)

		await DeleteOrderItemsMutation(qid, invoice.id, ids).catch((e) => expect(e).toBeDefined())
	})

	test('CI - Update OI - FI', async () => {
		const invoice = await CreateInvoiceMutation(qid)

		const [orderItem] = invoice.orderItems

		const [input] = CreateMockOrderItemsInput(1)

		const updateResult = await UpdateOrderItemMutation(qid, orderItem.id, input)

		expect(updateResult).toBe(true)

		const updatedInvoice = await FindInvoiceByIdQuery(qid, invoice.id)

		if (!updatedInvoice) throw new Error('null')

		const updatedOrderItem = updatedInvoice.orderItems.find((i) => i.id === orderItem.id)

		if (!updatedOrderItem) throw new Error()

		compareOrderItems(updatedOrderItem, input)
	})

	test('CI without OIs', async () => {
		expect.assertions(1)

		const input = CreateMockInvoiceInput()

		input.orderItems = []

		await CreateInvoiceMutation(qid, input).catch((e) => expect(e).toBeDefined())
	})
})
