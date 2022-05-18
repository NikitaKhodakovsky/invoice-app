import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Field, ObjectType, ID } from 'type-graphql'

@Entity()
@ObjectType()
export abstract class BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number

	@Field()
	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date

	@Field()
	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date
}
