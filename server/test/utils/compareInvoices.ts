import { expect } from '@jest/globals'

import { compareAddresses } from './compareAddresses'

export function compareInvoices(a?: any, b?: any) {
	if (!a || !b) throw new Error()

	expect(a.clientEmail).toBe(b.clientEmail)
	expect(a.clientName).toBe(b.clientName)
	expect(a.description).toBe(b.description)
	//expect(updatedInvoice.paymentDue).toBe(input.paymentDue)
	expect(a.paymentTerms).toBe(b.paymentTerms)

	compareAddresses(a.clientAddress, b.clientAddress)
	compareAddresses(a.senderAddress, b.senderAddress)
}
