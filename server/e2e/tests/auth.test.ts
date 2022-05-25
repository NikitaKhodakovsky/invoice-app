import { describe, test, expect } from '@jest/globals'

import { DeleteAccountMutation, LoginMutation, LogoutMutation, RegisterAndLogin } from '../graphql/auth'
import { CreateInvoiceMutation } from '../graphql/invoice'

describe('Auth', () => {
	test('Register - Login - Delete Account - Login', async () => {
		expect.assertions(1)

		const { qid, credentils } = await RegisterAndLogin()

		await DeleteAccountMutation(qid)

		await LoginMutation(credentils).catch((e) => expect(e).toBeDefined())
	})

	test('Register - Login - CI - Logout - AA - Login - Delete Account', async () => {
		expect.assertions(2)
		const { qid, credentils } = await RegisterAndLogin()

		const invoice = await CreateInvoiceMutation(qid)

		expect(invoice).toBeDefined()

		await LogoutMutation(qid)

		await CreateInvoiceMutation(qid).catch((e) => expect(e).toBeDefined())

		const { username, password } = credentils

		const loginResult = await LoginMutation({ username, password })

		await DeleteAccountMutation(loginResult.qid)
	})
})
