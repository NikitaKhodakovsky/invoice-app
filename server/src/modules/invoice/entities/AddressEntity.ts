import { Field, ObjectType } from 'type-graphql'
import { Column, Entity } from 'typeorm'

import { BaseEntity } from '../../../common/entities'

@Entity()
@ObjectType()
export class Address extends BaseEntity {
	@Field()
	@Column()
	street: string

	@Field()
	@Column()
	city: string

	@Field()
	@Column()
	postCode: string

	@Field()
	@Column()
	country: string
}
