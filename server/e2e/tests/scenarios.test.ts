import { describe, test, expect } from '@jest/globals'

import { registerAndLogin, registerLoginCreateInvoice, unautorizedCheck } from '../utils'
import { allInvoicesQuery, invoiceByIdQuery } from '../graphql/queries'
import { CreateMockInvoiceInput } from '../../test/mock'
import { compareInvoices } from '../../test/utils'
import {
	updateInvoiceMutation,
	createInvoiceMutation,
	deleteAccountMutation,
	deleteInvoiceMutation,
	loginMutation,
	logoutMutation
} from '../graphql/mutations'

describe('Scenarios', () => {
	describe('Auth', () => {
		test('Register - Login - Delete Account - Login', async () => {
			expect.assertions(1)

			const { qid, credentils } = await registerAndLogin()

			await deleteAccountMutation(qid)

			await loginMutation(credentils).catch((e) => expect(e).toBeDefined())
		})

		test('Register - Login - CI - Logout - AA - Login - Delete Account', async () => {
			expect.assertions(2)
			const { qid, credentils } = await registerAndLogin()

			const invoice = await createInvoiceMutation(qid)

			expect(invoice).toBeDefined()

			await logoutMutation(qid)

			await createInvoiceMutation(qid).catch((e) => unautorizedCheck(e))

			const { username, password } = credentils

			const loginResult = await loginMutation({ username, password })

			await deleteAccountMutation(loginResult.qid)
		})
	})

	describe('Invoice', () => {
		test('Register - Login - CI - UI - FI - FAllI - DI - FI - Delete Account', async () => {
			const { qid, invoice } = await registerLoginCreateInvoice()

			const data = CreateMockInvoiceInput()

			const updatedInvoice = await updateInvoiceMutation(qid, invoice.id, data)

			compareInvoices(data, updatedInvoice)

			const findedInvoice = await invoiceByIdQuery(qid, invoice.id)

			compareInvoices(updatedInvoice, findedInvoice)

			const allInvoices = await allInvoicesQuery(qid)

			expect(allInvoices.findIndex((i) => i.id === invoice.id)).toBeGreaterThanOrEqual(0)

			await deleteInvoiceMutation(qid, invoice.id)

			const unfindedInvoice = await invoiceByIdQuery(qid, invoice.id)

			expect(unfindedInvoice).toBeNull()

			await deleteAccountMutation(qid)
		})
	})
})
