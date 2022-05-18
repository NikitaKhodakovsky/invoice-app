import { Column, Entity, JoinColumn, ManyToOne, OneToOne, RelationId } from 'typeorm'
import { Field, ObjectType } from 'type-graphql'

import { BaseEntity } from '../../../common/entities'
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

	@Field()
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

	// items: [Item]
	// total: Int
}
