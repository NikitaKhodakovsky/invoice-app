import { Field, Int, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne } from 'typeorm'

import { BaseEntity } from '../../../common/entities'
import { Invoice } from './InvoiceEntity'

@Entity()
@ObjectType()
export class OrderItem extends BaseEntity {
	@ManyToOne(() => Invoice, (invoice) => invoice.orderItems, { onDelete: 'CASCADE' })
	invoice: Invoice

	@Field()
	@Column()
	name: string

	@Field(() => Int)
	@Column()
	quantity: number

	@Field(() => Int)
	@Column()
	price: number
}
