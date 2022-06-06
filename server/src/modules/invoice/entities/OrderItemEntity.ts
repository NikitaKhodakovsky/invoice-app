import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, Int, ObjectType } from 'type-graphql'

import { Invoice } from './InvoiceEntity'

@Entity()
@ObjectType()
export class OrderItem {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number

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
