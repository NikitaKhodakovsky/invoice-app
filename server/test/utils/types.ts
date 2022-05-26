import { Address, Invoice, OrderItem, User } from '../../../shared'

//'paymentDue'

export type CheckableInvoice = Pick<Invoice, 'clientEmail' | 'clientName' | 'description' | 'paymentTerms'> & {
	clientAddress: CheckableAddress
	senderAddress: CheckableAddress
}

export type CheckableOrderItem = Pick<OrderItem, 'name' | 'price' | 'quantity'>

export type CheckableAddress = Pick<Address, 'city' | 'street' | 'postCode' | 'country'>

export type CheckableUser = Pick<User, 'username'>
