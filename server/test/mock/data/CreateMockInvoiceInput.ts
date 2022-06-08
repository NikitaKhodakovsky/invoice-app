import { faker } from '@faker-js/faker'

import { CreateInvoiceInput, CreateOrderItemInput } from '../../../src/modules/invoice/inputs'
import { CreateMockOrderItemsInput } from './CreateMockOrderItemsInput'
import { CreateMockAddressInput } from './CreateMockAddressInput'
import { Status } from '../../../src/modules/invoice/enums'

interface CreateMockInvoiceInputArgs {
	status?: Status
	orderItems?: CreateOrderItemInput[]
}

export function CreateMockInvoiceInput({ status, orderItems }: CreateMockInvoiceInputArgs = {}): CreateInvoiceInput {
	const paymentTerms: number = parseInt(faker.random.numeric(2))
	const orderItemsCount: number = parseInt(faker.random.numeric(1, { bannedDigits: ['0'] }))

	if (!orderItems) {
		orderItems = CreateMockOrderItemsInput(orderItemsCount)
	}

	return {
		clientAddress: CreateMockAddressInput(),
		senderAddress: CreateMockAddressInput(),
		clientEmail: faker.internet.email(),
		clientName: faker.name.findName(),
		description: faker.commerce.productDescription(),
		paymentDue: faker.date.future(),
		paymentTerms,
		orderItems,
		status
	}
}
