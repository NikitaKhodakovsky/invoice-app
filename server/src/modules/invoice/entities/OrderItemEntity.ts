import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne } from 'typeorm'

import { BaseEntity } from '../../../common/entities'
import { Invoice } from './InvoiceEntity'

@Entity()
@ObjectType()
export class OrderItem extends BaseEntity {
	@ManyToOne(() => Invoice, (invoice) => invoice.orderItems)
	invoice: Invoice

	@Field()
	@Column()
	name: string

	@Field()
	@Column()
	quantity: number

	@Field()
	@Column()
	price: number
}
