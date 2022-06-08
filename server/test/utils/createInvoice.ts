import { DataSource } from 'typeorm'

import { Invoice, InvoiceService } from '../../src/modules/invoice'
import { CreateMockInvoiceInput } from '../mock'
import { User } from '../../src/modules/user'
import { CreateInvoiceInput } from '../../src/modules/invoice/inputs'

export async function createInvoice(dataSource: DataSource, user: User, data?: CreateInvoiceInput): Promise<Invoice> {
	if (!data) {
		data = CreateMockInvoiceInput()
	}

	const invoiceService = new InvoiceService(dataSource)

	return invoiceService.createInvoice(user, data)
}
