import { describe, test, expect } from '@jest/globals'

import { meQuery, invoiceByIdQuery, allInvoicesQuery } from '../graphql/queries'
import { unautorizedCheck, registerLoginCreateInvoice } from '../utils'
import { CreateMockInvoiceInput } from '../../test/mock'
import {
	changeInvoiceStatusMutation,
	createInvoiceMutation,
	deleteInvoiceMutation,
	updateInvoiceMutation,
	deleteAccountMutation,
	logoutMutation
} from '../graphql/mutations'

const invalidToken = 'hello world'

describe('Prevent unauthorized access', () => {
	describe('Query', () => {
		test('invoices', async () => {
			expect.assertions(1)

			await allInvoicesQuery(invalidToken).catch((e) => unautorizedCheck(e))
		})

		test('invoice', async () => {
			expect.assertions(1)

			const { invoice } = await registerLoginCreateInvoice()

			await invoiceByIdQuery(invalidToken, invoice.id).catch((e) => unautorizedCheck(e))
		})

		test('me', async () => {
			expect.assertions(1)

			await meQuery(invalidToken).catch((e) => unautorizedCheck(e))
		})
	})

	describe('Mutation', () => {
		test('changeInvoiceStatus', async () => {
			expect.assertions(1)

			const { invoice } = await registerLoginCreateInvoice()

			await changeInvoiceStatusMutation(invalidToken, invoice.id, 'Paid').catch((e) => unautorizedCheck(e))
		})

		test('createInvoice', async () => {
			await createInvoiceMutation(invalidToken).catch((e) => unautorizedCheck(e))
		})

		test('deleteInvoice', async () => {
			expect.assertions(1)

			const { invoice } = await registerLoginCreateInvoice()

			await deleteInvoiceMutation(invalidToken, invoice.id).catch((e) => unautorizedCheck(e))
		})

		test('updateInvoice', async () => {
			expect.assertions(1)

			const { invoice } = await registerLoginCreateInvoice()

			await updateInvoiceMutation(invalidToken, invoice.id, CreateMockInvoiceInput()).catch((e) =>
				unautorizedCheck(e)
			)
		})

		test('deleteAccount', async () => {
			await deleteAccountMutation(invalidToken).catch((e) => unautorizedCheck(e))
		})

		test('logout', async () => {
			await logoutMutation(invalidToken).catch((e) => unautorizedCheck(e))
		})
	})
})
