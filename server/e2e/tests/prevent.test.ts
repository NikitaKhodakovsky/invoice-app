import { beforeAll, describe, test, expect, afterAll } from '@jest/globals'

import { DeleteAccountMutation, RegisterAndLogin, RegisterAndLoginResult } from '../graphql/auth'
import { CreateInvoiceMutation, FindInvoiceByIdQuery } from '../graphql/invoice'
import { Invoice } from '../../../shared'

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
	// test('Update not your Invoice', async () => {})
	// test('AOI to not your Invoice', async () => {})
	// test('UOI in not your Invoice', async () => {})
	// test('DOIs from not your Invoice', async () => {})
})
