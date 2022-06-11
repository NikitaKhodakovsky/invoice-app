import { DataSource, FindOptionsRelations, Repository, SelectQueryBuilder } from 'typeorm'

import { ForbiddenError, UserInputError } from '../../common/errors'
import { CreateInvoiceInput, UpdateInvoiceInput } from './inputs'
import { Address, Invoice, OrderItem } from './entities'
import { InvoiceNotFoundError } from './errors'
import { addDays } from '../../utils'
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

	public async createInvoice(user: User, data: CreateInvoiceInput): Promise<Invoice> {
		const senderAddress = this.addressRepository.create(data.senderAddress)
		const clientAddress = this.addressRepository.create(data.clientAddress)

		const { paymentTerms, description, clientName, clientEmail, status } = data

		if (data.orderItems.length < 1) throw new UserInputError('You cannot create an Invoice without OrderItems')

		const orderItems: OrderItem[] = data.orderItems.map((oi) => this.orderItemRepository.create(oi))

		const paymentDue = addDays(new Date(), paymentTerms)

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
		const invoice = await this.invoiceRepository.findOne({
			where: { id: invoiceId },
			relations: { clientAddress: true, senderAddress: true, orderItems: true }
		})

		if (!invoice) throw new InvoiceNotFoundError()
		if (user.id !== invoice.user.id) throw new ForbiddenError()

		const { clientAddress, senderAddress, orderItems, paymentTerms, ...other } = data

		const updatedInvoice = this.invoiceRepository.merge(invoice, other)

		if (paymentTerms) {
			updatedInvoice.paymentTerms = paymentTerms
			updatedInvoice.paymentDue = addDays(invoice.createdAt, paymentTerms)
		}

		if (clientAddress) {
			updatedInvoice.clientAddress = this.addressRepository.merge(invoice.clientAddress, clientAddress)
		}

		if (senderAddress) {
			updatedInvoice.senderAddress = this.addressRepository.merge(invoice.senderAddress, senderAddress)
		}

		if (orderItems) {
			if (orderItems.length < 1) throw new UserInputError("You cannot delete all Order Item's")

			await this.orderItemRepository.remove(invoice.orderItems)

			updatedInvoice.orderItems = orderItems.map((oi) => this.orderItemRepository.create(oi))
		}

		return this.invoiceRepository.save(updatedInvoice)
	}

	public async deleteInvoice(user: User, invoiceId: number): Promise<void> {
		const invoice = await this.invoiceRepository.findOne({
			where: { id: invoiceId },
			relations: { clientAddress: true, senderAddress: true }
		})

		if (!invoice) throw new InvoiceNotFoundError()
		if (invoice.user.id !== user.id) throw new ForbiddenError()

		await this.invoiceRepository.remove(invoice)
		await this.addressRepository.remove(invoice.clientAddress)
		await this.addressRepository.remove(invoice.senderAddress)
	}

	public async findById(
		user: User,
		invoiceId: number,
		relations?: FindOptionsRelations<Invoice>
	): Promise<Invoice | null> {
		const invoice = await this.invoiceRepository.findOne({
			where: { id: invoiceId },
			relations
		})

		if (!invoice) return null

		if (user.id !== invoice.user.id) throw new ForbiddenError()

		return invoice
	}

	public async findAll(
		{ id }: User,
		statuses?: Status[],
		relations?: FindOptionsRelations<Invoice>
	): Promise<Invoice[]> {
		let builder: SelectQueryBuilder<Invoice> = this.invoiceRepository
			.createQueryBuilder('invoice')
			.where('invoice.user = :userId', { userId: id })

		if (statuses && statuses.length > 0) {
			builder = builder.andWhere('invoice.status IN (:...statuses)', { statuses })
		}

		if (relations?.clientAddress) {
			builder = builder.innerJoinAndSelect('invoice.clientAddress', 'clientAddress')
		}

		if (relations?.senderAddress) {
			builder = builder.innerJoinAndSelect('invoice.senderAddress', 'senderAddress')
		}

		if (relations?.orderItems) {
			builder = builder.innerJoinAndSelect('invoice.orderItems', 'orderItems')
		}

		if (relations?.user) {
			builder = builder.innerJoinAndSelect('invoice.user', 'user')
		}

		return await builder.getMany()
	}

	public async changeStatus(user: User, invoiceId: number, status: Status): Promise<void> {
		const invoice = await this.invoiceRepository.findOne({ where: { id: invoiceId } })

		if (!invoice) throw new InvoiceNotFoundError()
		if (user.id !== invoice.user.id) throw new ForbiddenError()
		if (invoice.status === Status.Paid)
			throw new UserInputError('You cannot change the status of an Invoice already paid for')

		invoice.status = status

		await this.invoiceRepository.save(invoice)
	}
}
