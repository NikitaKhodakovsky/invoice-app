import { describe, test, expect } from '@jest/globals'

import { allInvoicesQuery, allInvoicesTotalQuery, invoiceByIdQuery, invoiceByIdTotalQuery } from '../graphql/queries'
import { createInvoiceMutation, createInvoiceTotalMutation, updateInvoiceMutation } from '../graphql/mutations'
import { registerAndLogin, registerLoginCreateInvoice } from '../utils'
import { CreateMockInvoiceInput } from '../../test/mock'
import { inspectInvoice } from '../../test/utils'

describe('Complex resolvers test', () => {
	describe('Query', () => {
		test('invoices', async () => {
			const { qid } = await registerLoginCreateInvoice()

			const [invoice] = await allInvoicesQuery(qid)

			inspectInvoice(invoice)
		})

		test('invoices.total', async () => {
			const { qid } = await registerLoginCreateInvoice()

			const [invoice] = await allInvoicesTotalQuery(qid)

			expect(typeof invoice.total).toBe('number')
		})

		test('invoice', async () => {
			const {
				qid,
				invoice: { id }
			} = await registerLoginCreateInvoice()

			const invoice = await invoiceByIdQuery(qid, id)

			inspectInvoice(invoice)
		})

		test('invoice.total', async () => {
			const {
				qid,
				invoice: { id }
			} = await registerLoginCreateInvoice()

			const invoice = await invoiceByIdTotalQuery(qid, id)

			if (!invoice) throw new Error()

			expect(typeof invoice.total).toBe('number')
		})
	})

	describe('Mutation', () => {
		test('createInvoice', async () => {
			const { qid } = await registerAndLogin()

			const invoice = await createInvoiceMutation(qid)

			inspectInvoice(invoice)
		})

		test('createInvoice.total', async () => {
			const { qid } = await registerAndLogin()

			const invoice = await createInvoiceTotalMutation(qid)

			expect(typeof invoice.total).toBe('number')
		})

		test('updateInvoice', async () => {
			const {
				qid,
				invoice: { id }
			} = await registerLoginCreateInvoice()

			const invoice = await updateInvoiceMutation(qid, id, CreateMockInvoiceInput())

			inspectInvoice(invoice)
		})

		test('updateInvoice.total', async () => {
			const {
				qid,
				invoice: { id }
			} = await registerLoginCreateInvoice()

			const invoice = await updateInvoiceMutation(qid, id, CreateMockInvoiceInput())

			expect(typeof invoice.total).toBe('number')
		})
	})
})
