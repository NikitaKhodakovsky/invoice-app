import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { Field, Int, ObjectType } from 'type-graphql'

import { BaseEntity } from '../../../common/entities'
import { OrderItem } from './OrderItemEntity'
import { Address } from './AddressEntity'
import { Status } from '../enums'
import { User } from '../../user'

@Entity()
@ObjectType()
export class Invoice extends BaseEntity {
	@Field(() => User)
	@ManyToOne(() => User, { eager: true })
	user: User

	@Field()
	@Column()
	paymentDue: Date

	@Field()
	@Column()
	description: string

	@Field(() => Int)
	@Column()
	paymentTerms: number

	@Field()
	@Column()
	clientName: string

	@Field()
	@Column()
	clientEmail: string

	@Field(() => Status)
	@Column({
		type: 'enum',
		enum: Status,
		default: Status.Pending
	})
	status: Status

	@Field(() => Address)
	@OneToOne(() => Address, { cascade: true, eager: true })
	@JoinColumn()
	senderAddress: Address

	@Field(() => Address)
	@OneToOne(() => Address, { cascade: true, eager: true })
	@JoinColumn()
	clientAddress: Address

	@Field(() => [OrderItem])
	@OneToMany(() => OrderItem, (orderItem) => orderItem.invoice, { cascade: true, eager: true })
	orderItems: OrderItem[]
}
