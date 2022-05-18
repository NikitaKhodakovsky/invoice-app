import { ObjectType, Field } from 'type-graphql'
import { Entity, Column } from 'typeorm'

import { BaseEntity } from '../../../common/entities'

@Entity()
@ObjectType()
export class User extends BaseEntity {
	@Column({ unique: true })
	@Field(() => String)
	username: string

	@Column()
	password: string
}
