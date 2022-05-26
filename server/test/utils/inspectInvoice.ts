import { expect } from '@jest/globals'

import { inspectAddress } from './inspectAddress'
import { CheckableInvoice } from './types'

export function inspectInvoice(invoice: CheckableInvoice) {
	expect(typeof invoice.clientEmail).toBe('string')
	expect(typeof invoice.clientName).toBe('string')
	expect(typeof invoice.description).toBe('string')
	//expect(updatedInvoice.paymentDue).toBe(input.paymentDue)
	expect(typeof invoice.paymentTerms).toBe('number')

	inspectAddress(invoice.clientAddress)
	inspectAddress(invoice.senderAddress)
}
