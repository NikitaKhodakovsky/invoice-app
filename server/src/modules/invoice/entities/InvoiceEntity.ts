import { Column, Entity, ManyToOne } from 'typeorm'
import { Field, ObjectType } from 'type-graphql'

import { BaseEntity } from '../../../common/entities'
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
	// senderAdress: Adress
	// clientAdress: Adress
	// items: [Item]
	// total: Int
}
