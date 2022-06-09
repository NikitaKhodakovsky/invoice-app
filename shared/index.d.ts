/* -------- If declared as global, there is often a compilation error ------- */

type Status = 'Draft' | 'Pending' | 'Paid'

interface Query {
	invoice: Invoice | null
	invoices: Invoice[]
	me: User
}

interface Mutation {
	changeInvoiceStatus: boolean
	createInvoice: Invoice
	deleteAccount: boolean
	deleteInvoice: boolean
	login: User
	logout: boolean
	register: User
	updateInvoice: Invoice
}

interface User {
	createdAt: string
	id: string
	updatedAt: string
	username: string
}

interface Invoice {
	clientAddress: Address
	clientEmail: string
	clientName: string
	createdAt: string
	description: string
	id: string
	orderItems: OrderItem[]
	paymentDue: string
	paymentTerms: number
	senderAddress: Address
	status: Status
	updatedAt: string
	user: User
	total: number
}

interface Address {
	city: string
	country: string
	id: string
	postCode: string
	street: string
}

interface OrderItem {
	id: string
	name: string
	price: number
	quantity: number
}

interface CredentialsInput {
	password: string
	username: string
}

interface CreateAddressInput {
	city: string
	country: string
	postCode: string
	street: string
}

interface CreateOrderItemInput {
	name: string
	price: number
	quantity: number
}

interface CreateInvoiceInput {
	clientAddress: CreateAddressInput
	clientEmail: string
	clientName: string
	description: string
	orderItems: CreateOrderItemInput[]
	paymentDue: string
	paymentTerms: number
	senderAddress: CreateAddressInput
	status?: Status
}

type UpdateAddressInput = Partial<CreateAddressInput>

interface UpdateInvoiceInput {
	clientAddress?: UpdateAddressInput
	clientEmail?: string
	clientName?: string
	description?: string
	paymentDue?: string
	paymentTerms?: number
	senderAddress?: UpdateAddressInput
	orderItems?: CreateOrderItemInput[]
}

type UpdateOrderItemInput = Partial<CreateOrderItemInput>
