import { gql } from 'graphql-request'
import { serialize } from 'cookie'

import { Mutation, UpdateOrderItemInput } from '../../../../shared'
import { client } from '../client'

const UpdateOrderItemMutationDocument = gql`
	mutation ($data: UpdateOrderItemInput!, $orderItemId: ID!) {
		updateOrderItem(data: $data, id: $orderItemId)
	}
`

export async function UpdateOrderItemMutation(qid: string, orderItemId: string, data: UpdateOrderItemInput) {
	const res = await client.rawRequest<{ updateOrderItem: Mutation['updateOrderItem'] }>(
		UpdateOrderItemMutationDocument,
		{
			orderItemId,
			data
		},
		{
			Cookie: serialize('qid', qid)
		}
	)

	return res.data.updateOrderItem
}
