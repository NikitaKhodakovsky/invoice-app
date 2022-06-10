import { registerAndLogin, RegisterAndLoginResult } from './RegisterAndLogin'
import { createInvoiceMutation } from '../graphql/mutations'
import { Invoice } from '../types'

export interface RegisterLoginCreateInvoiceResult extends RegisterAndLoginResult {
	invoice: Invoice
}

export async function registerLoginCreateInvoice(): Promise<RegisterLoginCreateInvoiceResult> {
	const result = await registerAndLogin()

	const invoice = await createInvoiceMutation(result.qid)

	return { ...result, invoice }
}
