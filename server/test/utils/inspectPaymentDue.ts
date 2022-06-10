import { expect } from '@jest/globals'

import { Invoice } from '../../src/modules/invoice'
import { addDays } from '../../src/utils'

export function inspectPaymentDue(invoice: Invoice) {
	const paymentDueMs = addDays(new Date(invoice.createdAt), invoice.paymentTerms).getTime()

	expect(new Date(invoice.paymentDue).getTime()).toBeLessThan(paymentDueMs + 50)
	expect(new Date(invoice.paymentDue).getTime()).toBeGreaterThan(paymentDueMs - 50)
}
