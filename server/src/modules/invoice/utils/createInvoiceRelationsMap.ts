import { FindOptionsRelations } from 'typeorm'
import { GraphQLResolveInfo } from 'graphql'
import graphqlFields from 'graphql-fields'

import { Invoice } from '../entities'

export function createInvoiceRelationsMap(info: GraphQLResolveInfo): FindOptionsRelations<Invoice> {
	const keys = Object.keys(graphqlFields(info))

	const relations: FindOptionsRelations<Invoice> = {
		user: keys.includes('user'),
		senderAddress: keys.includes('senderAddress'),
		clientAddress: keys.includes('clientAddress'),
		orderItems: keys.includes('orderItems') || keys.includes('total')
	}

	return relations
}
