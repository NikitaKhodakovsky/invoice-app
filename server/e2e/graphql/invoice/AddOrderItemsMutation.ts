import { gql } from 'graphql-request'
import { serialize } from 'cookie'

import { CreateOrderItemInput, Mutation } from '../../../../shared'
import { client } from '../client'

const AddOrderItemsMutationDocument = gql`
	mutation ($data: [CreateOrderItemInput!]!, $invoiceId: ID!) {
		addOrderItems(data: $data, invoiceId: $invoiceId)
	}
`

export async function AddOrderItemsMutation(qid: string, invoiceId: string, data: CreateOrderItemInput[]) {
	const res = await client.rawRequest<{ addOrderItems: Mutation['addOrderItems'] }>(
		AddOrderItemsMutationDocument,
		{
			invoiceId,
			data
		},
		{
			Cookie: serialize('qid', qid)
		}
	)

	return res.data.addOrderItems
}
