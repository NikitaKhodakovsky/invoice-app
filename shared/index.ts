/* -------- If declared as global, there is often a compilation error ------- */

export interface Query {
	invoice: Invoice | null
	invoices: Invoice[]
	me: User
}

export interface Mutation {
	addOrderItems: boolean
	changeInvoiceStatus: Invoice
	createInvoice: Invoice
	deleteAccount: boolean
	deleteInvoice: boolean
	deleteOrderItems: boolean
	login: User
	logout: boolean
	register: User
	updateInvoice: Invoice
	updateOrderItem: boolean
}

export enum Status {
	Draft = 'Draft',
	Paid = 'Paid',
	Pending = 'Pending'
}

export interface User {
	createdAt: Date
	id: string
	updatedAt: Date
	username: string
}

export interface Invoice {
	clientAddress: Address
	clientEmail: string
	clientName: string
	createdAt: Date
	description: string
	id: string
	orderItems: OrderItem[]
	paymentDue: Date
	paymentTerms: number
	senderAddress: Address
	status: Status
	updatedAt: Date
	user: User
}

export interface Address {
	city: string
	country: string
	createdAt: Date
	id: string
	postCode: string
	street: string
	updatedAt: Date
}

export interface OrderItem {
	createdAt: Date
	id: string
	name: string
	price: number
	quantity: number
	updatedAt: Date
}

export interface CreateAddressInput {
	city: string
	country: string
	postCode: string
	street: string
}

export interface CreateInvoiceInput {
	clientAddress: CreateAddressInput
	clientEmail: string
	clientName: string
	description: string
	orderItems: CreateOrderItemInput[]
	paymentDue: Date
	paymentTerms: number
	senderAddress: CreateAddressInput
	status?: Status
}

export interface CreateOrderItemInput {
	name: string
	price: number
	quantity: number
}

export interface CredentialsInput {
	password: string
	username: string
}

export interface UpdateAddressInput {
	city?: string
	country?: string
	postCode?: string
	street?: string
}

export interface UpdateInvoiceInput {
	clientAddress?: UpdateAddressInput
	clientEmail?: string
	clientName?: string
	description?: string
	paymentDue?: Date
	paymentTerms?: number
	senderAddress?: UpdateAddressInput
}

export interface UpdateOrderItemInput {
	name?: string
	price?: number
	quantity?: number
}
