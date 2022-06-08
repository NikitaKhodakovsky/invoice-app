import { DataSource, Repository, SelectQueryBuilder } from 'typeorm'
import { UserInputError } from 'apollo-server-express'

import { CreateInvoiceInput, CreateOrderItemInput, UpdateInvoiceInput, UpdateOrderItemInput } from './inputs'
import { InvoiceNotFoundError, OrderItemNotFoundError } from './errors'
import { Address, Invoice, OrderItem } from './entities'
import { ForbiddenError } from '../../common/errors'
import { Status } from './enums'
import { User } from '../user'

export class InvoiceService {
	private orderItemRepository: Repository<OrderItem>
	private addressRepository: Repository<Address>
	private invoiceRepository: Repository<Invoice>

	constructor(dataSource: DataSource) {
		this.orderItemRepository = dataSource.getRepository(OrderItem)
		this.addressRepository = dataSource.getRepository(Address)
		this.invoiceRepository = dataSource.getRepository(Invoice)
	}

	public async createInvoice(user: User, data: CreateInvoiceInput) {
		const senderAddress = this.addressRepository.create(data.senderAddress)
		const clientAddress = this.addressRepository.create(data.clientAddress)

		const { paymentDue, paymentTerms, description, clientName, clientEmail, status } = data

		if (data.orderItems.length < 1) throw new UserInputError('You cannot create an Invoice without OrderItems')

		const orderItems: OrderItem[] = data.orderItems.map((oi) => this.orderItemRepository.create(oi))

		const invoice = this.invoiceRepository.create({
			paymentDue,
			paymentTerms,
			description,
			clientName,
			clientEmail,
			status,
			clientAddress,
			senderAddress,
			orderItems,
			user
		})

		return this.invoiceRepository.save(invoice)
	}

	public async updateInvoice(user: User, invoiceId: number, data: UpdateInvoiceInput) {
		const invoice = await this.invoiceRepository.findOne({ where: { id: invoiceId } })

		if (!invoice) throw new InvoiceNotFoundError()
		if (user.id !== invoice.user.id) throw new ForbiddenError()

		const { clientAddress, senderAddress, ...other } = data

		const updatedInvoice = this.invoiceRepository.merge(invoice, other)

		updatedInvoice.clientAddress = this.addressRepository.merge(invoice.clientAddress, clientAddress)
		updatedInvoice.senderAddress = this.addressRepository.merge(invoice.senderAddress, senderAddress)

		return this.invoiceRepository.save(updatedInvoice)
	}

	public async deleteInvoice(user: User, invoiceId: number) {
		const invoice = await this.invoiceRepository.findOne({ where: { id: invoiceId } })

		if (!invoice) throw new InvoiceNotFoundError()
		if (invoice.user.id !== user.id) throw new ForbiddenError()

		await this.invoiceRepository.remove(invoice)
		await this.addressRepository.remove(invoice.clientAddress)
		await this.addressRepository.remove(invoice.senderAddress)
	}

	public async findById(user: User, invoiceId: number): Promise<Invoice | null> {
		const invoice = await this.invoiceRepository.findOne({ where: { id: invoiceId } })

		if (!invoice) return null

		if (user.id !== invoice.user.id) throw new ForbiddenError()

		return invoice
	}

	public async findAll({ id }: User, statuses?: Status[]): Promise<Invoice[]> {
		let builder: SelectQueryBuilder<Invoice> = this.invoiceRepository.createQueryBuilder('invoice')

		if (statuses && statuses.length > 0) {
			builder = builder.where('invoice.status IN (:...statuses)', { statuses })
		}

		return await builder
			.innerJoinAndSelect('invoice.user', 'user', 'user.id = :userId', { userId: id })
			.innerJoinAndSelect('invoice.senderAddress', 'senderAddress')
			.innerJoinAndSelect('invoice.clientAddress', 'clientAddress')
			.innerJoinAndSelect('invoice.orderItems', 'orderItems')
			.getMany()
	}

	public async changeStatus(user: User, invoiceId: number, status: Status): Promise<Invoice> {
		const invoice = await this.invoiceRepository.findOne({ where: { id: invoiceId } })

		if (!invoice) throw new InvoiceNotFoundError()
		if (user.id !== invoice.user.id) throw new ForbiddenError()

		invoice.status = status

		return this.invoiceRepository.save(invoice)
	}

	public async addOrderItems(user: User, invoiceId: number, data: CreateOrderItemInput[]) {
		const invoice = await this.invoiceRepository.findOne({
			where: { id: invoiceId },
			relations: { user: true }
		})

		if (!invoice) throw new InvoiceNotFoundError()
		if (user.id !== invoice.user.id) throw new ForbiddenError()

		const orderItems: OrderItem[] = data.map((item) => {
			return this.orderItemRepository.create({
				...item,
				invoice
			})
		})

		await this.orderItemRepository.save(orderItems)
	}

	public async updateOrderItem(user: User, orderItemId: number, data: UpdateOrderItemInput) {
		const orderItem = await this.orderItemRepository.findOne({
			where: { id: orderItemId },
			relations: { invoice: true }
		})

		if (!orderItem) throw new OrderItemNotFoundError()

		if (user.id !== orderItem.invoice.user.id) throw new ForbiddenError()

		const updatedOrderItem = this.orderItemRepository.merge(orderItem, data)

		await this.orderItemRepository.save(updatedOrderItem)
	}

	public async deleteOrderItems(user: User, invoiceId: number, ids: (string | number)[]) {
		const invoice = await this.invoiceRepository.findOne({
			where: { id: invoiceId },
			relations: { user: true, orderItems: true }
		})

		if (!invoice) throw new InvoiceNotFoundError()
		if (user.id !== invoice.user.id) throw new ForbiddenError()

		const orderItemIds = ids.map((id) => +id)

		const orderItems: OrderItem[] = invoice.orderItems.filter((item) => orderItemIds.includes(item.id))

		if (orderItems.length === invoice.orderItems.length) throw new Error("You cannot delete all Order Item's")

		await this.orderItemRepository.remove(orderItems)
	}
}
