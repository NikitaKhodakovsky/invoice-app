import { registerEnumType } from 'type-graphql'

export enum Status {
	Draft = 'Draft',
	Pending = 'Pending',
	Paid = 'Paid'
}

registerEnumType(Status, {
	name: 'Status'
})
