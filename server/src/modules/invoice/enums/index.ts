import { registerEnumType } from 'type-graphql'

export enum Status {
	Draft,
	Pending,
	Paid
}

registerEnumType(Status, {
	name: 'Status'
})
