import { DataSource } from 'typeorm'

import { Invoice, InvoiceService } from '../../src/modules/invoice'
import { CreateInvoiceInput } from '../../../shared'
import { CreateMockInvoiceInput } from '../mock'
import { User } from '../../src/modules/user'

export async function createInvoice(dataSource: DataSource, user: User, data?: CreateInvoiceInput): Promise<Invoice> {
	if (!data) {
		data = CreateMockInvoiceInput()
	}

	const invoiceService = new InvoiceService(dataSource)

	return invoiceService.createInvoice(user, data)
}
