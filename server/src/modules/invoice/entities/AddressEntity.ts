import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'

@Entity()
@ObjectType()
export class Address {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number

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
