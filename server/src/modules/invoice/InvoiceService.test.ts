import { describe, test, beforeEach, afterEach, expect } from '@jest/globals'

import { compareInvoices, compareOrderItems, createInvoice, createUser, inspectInvoice } from '../../../test/utils'
import { CreateMockInvoiceInput, CreateMockOrderItemsInput } from '../../../test/mock'
import { InvoiceNotFoundError, OrderItemNotFoundError } from './errors'
import { ForbiddenError } from '../../common/errors'
import { InvoiceService } from './InvoiceService'
import { Address, OrderItem } from './entities'
import { TestDataSource } from '../../../test'
import { Status } from './enums'

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

			const { orderItems, ...updateData } = CreateMockInvoiceInput()

			//@ts-ignore
			const updatedInvoice = await invoiceService.updateInvoice(user, id, updateData)

			compareInvoices(updateData, updatedInvoice)
		})

		test("Should throw Error when Invoice don't exist", async () => {
			expect.assertions(1)

			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)

			const { status, orderItems, ...updateData } = CreateMockInvoiceInput()

			await invoiceService
				//@ts-ignore
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
		test('Should return Invoice', async () => {
			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)
			const { id } = await createInvoice(TestDataSource, user)

			const invoice = await invoiceService.findById(user, id)

			if (!invoice) throw new Error()

			inspectInvoice(invoice)
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
			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)
			const { id, status } = await createInvoice(TestDataSource, user)

			expect(status).toBe(Status.Pending)

			const result = await invoiceService.changeStatus(user, id, Status.Paid)

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

	describe('addOrderItems', () => {
		test('Should add OrderItems', async () => {
			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)
			const { id, orderItems } = await createInvoice(TestDataSource, user)

			const data = CreateMockOrderItemsInput(3)

			await invoiceService.addOrderItems(user, id, data)

			const invoice = await invoiceService.findById(user, id)

			if (!invoice) throw new Error()

			expect(invoice.orderItems.length).toBe(orderItems.length + data.length)
		})

		test("Should throw Error when Invoice don't exist", async () => {
			expect.assertions(1)

			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)

			const data = CreateMockOrderItemsInput(3)

			await invoiceService
				.addOrderItems(user, 1, data)
				.catch((e) => expect(e).toBeInstanceOf(InvoiceNotFoundError))
		})

		test("Should throw Error when trying to add OrderItems to someone else's Invoice", async () => {
			expect.assertions(1)

			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)
			const intruder = await createUser(TestDataSource)

			const { id } = await createInvoice(TestDataSource, user)

			const data = CreateMockOrderItemsInput(3)

			await invoiceService
				.addOrderItems(intruder, id, data)
				.catch((e) => expect(e).toBeInstanceOf(ForbiddenError))
		})
	})

	describe('updateOrderItem', () => {
		test('Should update OrderItem', async () => {
			const orderItemsRepository = TestDataSource.getRepository(OrderItem)
			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)
			const { orderItems } = await createInvoice(TestDataSource, user)

			const [orderItem] = orderItems

			const [data] = CreateMockOrderItemsInput(1)

			await invoiceService.updateOrderItem(user, orderItem.id, data)

			const result = await orderItemsRepository.findOne({ where: { id: orderItem.id } })

			if (!result) throw new Error()

			compareOrderItems(data, result)
		})

		test("Should throw Error when OrderItem don't exist", async () => {
			expect.assertions(1)

			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)

			const [data] = CreateMockOrderItemsInput(1)

			await invoiceService
				.updateOrderItem(user, 1, data)
				.catch((e) => expect(e).toBeInstanceOf(OrderItemNotFoundError))
		})

		test("Should throw Error when trying to update someone else's OrderItem", async () => {
			expect.assertions(1)

			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)
			const intruder = await createUser(TestDataSource)

			const { orderItems } = await createInvoice(TestDataSource, user)

			const [data] = CreateMockOrderItemsInput(1)

			await invoiceService
				.updateOrderItem(intruder, orderItems[0].id, data)
				.catch((e) => expect(e).toBeInstanceOf(ForbiddenError))
		})
	})

	describe('deleteOrderItem', () => {
		test('Should delete OrderItems', async () => {
			const orderItemsRepository = TestDataSource.getRepository(OrderItem)
			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)
			const { id, orderItems } = await createInvoice(TestDataSource, user)

			const [_, ...orderItemIds] = orderItems.map((i) => i.id)

			await invoiceService.deleteOrderItems(user, id, orderItemIds)

			const items = await Promise.all(
				orderItemIds.map((id) => {
					return orderItemsRepository.findOne({ where: { id } })
				})
			)

			items.forEach((i) => expect(i).toBeNull())
		})

		test('Should throw Error when trying to delete all OrderItems', async () => {
			expect.assertions(1)

			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)
			const { id, orderItems } = await createInvoice(TestDataSource, user)

			const orderItemIds = orderItems.map((i) => i.id)

			await invoiceService.deleteOrderItems(user, id, orderItemIds).catch((e) => expect(e).toBeDefined())
		})

		test("Should throw Error when trying to delete someone else's OrderItems", async () => {
			expect.assertions(1)

			const invoiceService = new InvoiceService(TestDataSource)

			const user = await createUser(TestDataSource)
			const intruder = await createUser(TestDataSource)

			const { id, orderItems } = await createInvoice(TestDataSource, user)

			const [orderItem] = orderItems

			await invoiceService
				.deleteOrderItems(intruder, id, [orderItem.id])
				.catch((e) => expect(e).toBeInstanceOf(ForbiddenError))
		})
	})
})
