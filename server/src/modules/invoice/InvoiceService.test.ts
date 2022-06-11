import { describe, test, beforeEach, afterEach, expect } from '@jest/globals'

import { CreateMockInvoiceInput, CreateMockOrderItemsInput } from '../../../test/mock'
import { ForbiddenError, UserInputError } from '../../common/errors'
import { Address, Invoice, OrderItem } from './entities'
import { InvoiceService } from './InvoiceService'
import { InvoiceNotFoundError } from './errors'
import { TestDataSource } from '../../../test'
import { Status } from './enums'
import {
	inspectOrderItems,
	compareInvoices,
	inspectAddress,
	inspectInvoice,
	createInvoice,
	createUser,
	inspectPaymentDue
} from '../../../test/utils'

describe('InoviceService', () => {
	beforeEach(async () => {
		await TestDataSource.initialize()
	})

	afterEach(async () => {
		await TestDataSource.destroy()
	})

	describe('createInvoice', () => {
		test('Should create Invoice', async () => {
			const user = await createUser(TestDataSource)

			const invoice = await createInvoice(TestDataSource, user)

			inspectInvoice(invoice)
		})

		test('Should add proper paymentDue', async () => {
			const user = await createUser(TestDataSource)

			const invoice = await createInvoice(TestDataSource, user)

			inspectPaymentDue(invoice)
		})

		test('Should set default Status', async () => {
			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)

			const { status, ...data } = CreateMockInvoiceInput()

			const invoice = await invoiceService.createInvoice(user, data)

			expect(invoice.status).toBe(Status.Pending)
		})

		test('Should throw an error when trying to create an Invoice without OrderItems', async () => {
			expect.assertions(1)

			const invoiceService = new InvoiceService(TestDataSource)
			const user = await createUser(TestDataSource)

			const data = CreateMockInvoiceInput({ orderItems: [] })

			await invoiceService.createInvoice(user, data).catch((e) => expect(e).toBeDefined())
		})
	})

	describe('updateInvoice', () => {
		test('Should update Invoice', async () => {
			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)

			const { id } = await createInvoice(TestDataSource, user)

			const data = CreateMockInvoiceInput()

			const updatedInvoice = await invoiceService.updateInvoice(user, id, data)

			compareInvoices(data, updatedInvoice)
		})

		test('Should compute proper paymentDue', async () => {
			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)

			const { id } = await createInvoice(TestDataSource, user)

			const data = CreateMockInvoiceInput()

			const updatedInvoice = await invoiceService.updateInvoice(user, id, data)

			inspectPaymentDue(updatedInvoice)
		})

		test('Should update OrderItems', async () => {
			const orderItemRepository = TestDataSource.getRepository(OrderItem)

			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)

			const invoice = await createInvoice(
				TestDataSource,
				user,
				CreateMockInvoiceInput({ orderItems: CreateMockOrderItemsInput(3) })
			)

			const data = CreateMockInvoiceInput({ orderItems: CreateMockOrderItemsInput(5) })

			const updatedInvoice = await invoiceService.updateInvoice(user, invoice.id, data)

			expect(updatedInvoice.orderItems.length).toBe(data.orderItems.length)

			const oldOrderItemsIds = invoice.orderItems.map((i) => i.id)

			const orderItems = await Promise.all(
				oldOrderItemsIds.map((id) => {
					return orderItemRepository.findOne({ where: { id } })
				})
			)

			orderItems.forEach((i) => expect(i).toBeNull())
		})

		test('Should throw Error when trying to delete all OrderItems', async () => {
			expect.assertions(1)

			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)

			const { id } = await createInvoice(TestDataSource, user)

			const data = CreateMockInvoiceInput()

			data.orderItems = []

			await invoiceService.updateInvoice(user, id, data).catch((e) => expect(e).toBeInstanceOf(UserInputError))
		})

		test("Should throw Error when Invoice don't exist", async () => {
			expect.assertions(1)

			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)

			const { status, orderItems, ...updateData } = CreateMockInvoiceInput()

			await invoiceService
				.updateInvoice(user, 1, updateData)
				.catch((e) => expect(e).toBeInstanceOf(InvoiceNotFoundError))
		})

		test("Should throw Error when trying to update someone else's Invoice", async () => {
			expect.assertions(1)

			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)
			const intruder = await createUser(TestDataSource)

			const { id } = await createInvoice(TestDataSource, user)

			const { status, orderItems, ...updateData } = CreateMockInvoiceInput()

			await invoiceService
				.updateInvoice(intruder, id, updateData)
				.catch((e) => expect(e).toBeInstanceOf(ForbiddenError))
		})
	})

	describe('deleteInvoice', () => {
		test('Should delete Invoice', async () => {
			const orderItemRepository = TestDataSource.getRepository(OrderItem)
			const addressRepository = TestDataSource.getRepository(Address)

			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)
			const invoice = await createInvoice(TestDataSource, user)

			await invoiceService.deleteInvoice(user, invoice.id)

			const clientAddress = await addressRepository.findOne({ where: { id: invoice.clientAddress.id } })

			expect(clientAddress).toBeNull()

			const senderAddress = await addressRepository.findOne({ where: { id: invoice.senderAddress.id } })

			expect(senderAddress).toBeNull()

			const orderItemsIds = invoice.orderItems.map((i) => i.id)

			const orderItems = await Promise.all(
				orderItemsIds.map((id) => {
					return orderItemRepository.findOne({ where: { id } })
				})
			)

			orderItems.forEach((i) => expect(i).toBeNull())
		})

		test("Should throw Error when Invoice don't exist", async () => {
			expect.assertions(1)

			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)

			await invoiceService.deleteInvoice(user, 1).catch((e) => expect(e).toBeInstanceOf(InvoiceNotFoundError))
		})

		test("Should throw Error when trying to delete someone else's Invoice", async () => {
			expect.assertions(1)

			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)
			const intruder = await createUser(TestDataSource)

			const { id } = await createInvoice(TestDataSource, user)

			await invoiceService.deleteInvoice(intruder, id).catch((e) => expect(e).toBeInstanceOf(ForbiddenError))
		})
	})

	describe('findById', () => {
		test('Should return Invoice with loaded relations', async () => {
			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)
			const { id } = await createInvoice(TestDataSource, user)

			const invoice = await invoiceService.findById(user, id, {
				senderAddress: true,
				clientAddress: true,
				orderItems: true
			})

			if (!invoice) throw new Error()

			inspectInvoice(invoice)
		})

		test('Should not load relations if relations object is not provided', async () => {
			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)
			const { id } = await createInvoice(TestDataSource, user)

			const invoice = await invoiceService.findById(user, id)

			if (!invoice) throw new Error()

			expect(invoice.orderItems).toBeUndefined()
			expect(invoice.clientAddress).toBeUndefined()
			expect(invoice.senderAddress).toBeUndefined()
		})

		test("Should return null when Invoice don't exist", async () => {
			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)

			const invoice = await invoiceService.findById(user, 1)

			expect(invoice).toBeNull()
		})

		test("Should throw Error when trying to find someone else's Invoice", async () => {
			expect.assertions(1)

			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)
			const intruder = await createUser(TestDataSource)

			const { id } = await createInvoice(TestDataSource, user)

			await invoiceService.findById(intruder, id).catch((e) => expect(e).toBeInstanceOf(ForbiddenError))
		})
	})

	describe('findAll', () => {
		test('Should return user Invoices', async () => {
			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)
			const stranger = await createUser(TestDataSource)

			await createInvoice(TestDataSource, user)
			await createInvoice(TestDataSource, user)
			await createInvoice(TestDataSource, user)

			const strangerInvoice = await createInvoice(TestDataSource, stranger)

			const userInvoices = await invoiceService.findAll(user)

			expect(userInvoices.length).toBe(3)
			expect(userInvoices.find((i) => i.id === strangerInvoice.id)).toBeFalsy()
		})

		test('Should not load relations if relations object is not provided', async () => {
			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)

			await createInvoice(TestDataSource, user)

			const [invoice] = await invoiceService.findAll(user)

			expect(invoice.orderItems).toBeUndefined()
			expect(invoice.clientAddress).toBeUndefined()
			expect(invoice.senderAddress).toBeUndefined()
		})

		test('Should load relations if relations object is provided', async () => {
			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)

			await createInvoice(TestDataSource, user)

			const [invoice] = await invoiceService.findAll(user, undefined, {
				orderItems: true,
				clientAddress: true,
				senderAddress: true
			})

			inspectOrderItems(invoice.orderItems)
			inspectAddress(invoice.clientAddress)
			inspectAddress(invoice.senderAddress)
		})

		test('Should filter Invoices by statuses', async () => {
			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)
			const stranger = await createUser(TestDataSource)

			await createInvoice(TestDataSource, stranger, CreateMockInvoiceInput({ status: Status.Paid }))
			await createInvoice(TestDataSource, stranger, CreateMockInvoiceInput({ status: Status.Draft }))
			await createInvoice(TestDataSource, stranger, CreateMockInvoiceInput({ status: Status.Pending }))

			await createInvoice(TestDataSource, user, CreateMockInvoiceInput({ status: Status.Paid }))
			await createInvoice(TestDataSource, user, CreateMockInvoiceInput({ status: Status.Paid }))
			await createInvoice(TestDataSource, user, CreateMockInvoiceInput({ status: Status.Draft }))
			await createInvoice(TestDataSource, user, CreateMockInvoiceInput({ status: Status.Draft }))
			await createInvoice(TestDataSource, user, CreateMockInvoiceInput({ status: Status.Draft }))
			await createInvoice(TestDataSource, user, CreateMockInvoiceInput({ status: Status.Pending }))
			await createInvoice(TestDataSource, user, CreateMockInvoiceInput({ status: Status.Pending }))
			await createInvoice(TestDataSource, user, CreateMockInvoiceInput({ status: Status.Pending }))
			await createInvoice(TestDataSource, user, CreateMockInvoiceInput({ status: Status.Pending }))

			const paid = await invoiceService.findAll(user, [Status.Paid])
			const draft = await invoiceService.findAll(user, [Status.Draft])
			const pending = await invoiceService.findAll(user, [Status.Pending])
			const draftAndPaid = await invoiceService.findAll(user, [Status.Draft, Status.Paid])
			const paidAndPending = await invoiceService.findAll(user, [Status.Paid, Status.Pending])
			const draftAndPending = await invoiceService.findAll(user, [Status.Draft, Status.Pending])

			expect(paid.length).toBe(2)
			expect(draft.length).toBe(3)
			expect(pending.length).toBe(4)
			expect(draftAndPaid.length).toBe(5)
			expect(paidAndPending.length).toBe(6)
			expect(draftAndPending.length).toBe(7)
		})
	})

	describe('changeStatus', () => {
		test('Should update Invoice Status', async () => {
			const invoiceRepository = TestDataSource.getRepository(Invoice)

			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)
			const { id, status } = await createInvoice(TestDataSource, user)

			expect(status).toBe(Status.Pending)

			await invoiceService.changeStatus(user, id, Status.Paid)

			const result = await invoiceRepository.findOne({ where: { id } })

			if (!result) throw new Error()

			expect(result.status).toBe(Status.Paid)
		})

		test("Should throw Error when Invoice don't exist", async () => {
			expect.assertions(1)

			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)

			await invoiceService
				.changeStatus(user, 1, Status.Paid)
				.catch((e) => expect(e).toBeInstanceOf(InvoiceNotFoundError))
		})

		test('Should throw an error when you try to change the status of an Invoice already paid for', async () => {
			expect.assertions(2)

			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)

			const { id, status } = await createInvoice(
				TestDataSource,
				user,
				CreateMockInvoiceInput({ status: Status.Paid })
			)

			expect(status).toBe(Status.Paid)

			await invoiceService
				.changeStatus(user, id, Status.Pending)
				.catch((e) => expect(e).toBeInstanceOf(UserInputError))
		})

		test("Should throw Error when trying to update someone else's Invoice Status", async () => {
			expect.assertions(1)

			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)
			const intruder = await createUser(TestDataSource)

			const { id } = await createInvoice(TestDataSource, user)

			await invoiceService
				.changeStatus(intruder, id, Status.Paid)
				.catch((e) => expect(e).toBeInstanceOf(ForbiddenError))
		})
	})
})
