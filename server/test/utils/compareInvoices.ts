import { expect } from '@jest/globals'

import { compareAddresses } from './compareAddresses'
import { CheckableInvoice } from './types'

export function compareInvoices(a: CheckableInvoice, b: CheckableInvoice) {
	expect(a.clientEmail).toBe(b.clientEmail)
	expect(a.clientName).toBe(b.clientName)
	expect(a.description).toBe(b.description)
	//expect(updatedInvoice.paymentDue).toBe(input.paymentDue)
	expect(a.paymentTerms).toBe(b.paymentTerms)

	compareAddresses(a.clientAddress, b.clientAddress)
	compareAddresses(a.senderAddress, b.senderAddress)
}
