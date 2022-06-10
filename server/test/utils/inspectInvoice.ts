import { expect } from '@jest/globals'
import { addDays } from '../../src/utils'

import { inspectAddress } from './inspectAddress'
import { inspectOrderItems } from './inspectOrderItems'
import { inspectPaymentDue } from './inspectPaymentDue'

interface InvoiceRelations {
	clientAddress?: true
	senderAddress?: true
	orderItems?: true
}

export function inspectInvoice(invoice: any, skipRelationsCheck?: InvoiceRelations) {
	const { clientAddress, senderAddress, orderItems } = skipRelationsCheck || {}

	expect(typeof invoice.clientEmail).toBe('string')
	expect(typeof invoice.clientName).toBe('string')
	expect(typeof invoice.description).toBe('string')
	expect(typeof invoice.paymentTerms).toBe('number')

	inspectPaymentDue(invoice)

	if (!clientAddress) {
		inspectAddress(invoice.clientAddress)
	}

	if (!senderAddress) {
		inspectAddress(invoice.senderAddress)
	}

	if (!orderItems) {
		inspectOrderItems(invoice.orderItems)
	}
}
