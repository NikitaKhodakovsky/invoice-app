import { beforeAll, describe, test, expect, afterAll } from '@jest/globals'

import { DeleteAccountMutation, RegisterAndLogin } from '../../graphql/auth'
import { CreateMockInvoiceInput } from '../../../test/mock'
import { Status } from '../../../src/modules/invoice/enums'
import { compareInvoices } from '../../../test/utils'

import {
	CreateInvoiceMutation,
	DeleteInvoiceMutation,
	FindInvoiceByIdQuery,
	UpdateInvoiceMutation,
	UpdateInvoiceStatusMutation
} from '../../graphql/invoice'

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
})
