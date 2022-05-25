import { gql } from 'graphql-request'
import { serialize } from 'cookie'

import { client } from '../client'
import { Mutation } from '../../../../shared'

const DeleteOrderItemsMutationDocument = gql`
	mutation ($orderItemsIds: [ID!]!, $invoiceId: ID!) {
		deleteOrderItems(ids: $orderItemsIds, invoiceId: $invoiceId)
	}
`

export async function DeleteOrderItemsMutation(qid: string, invoiceId: string, orderItemsIds: string[]) {
	const res = await client.rawRequest<{ deleteOrderItems: Mutation['deleteOrderItems'] }>(
		DeleteOrderItemsMutationDocument,
		{
			invoiceId,
			orderItemsIds
		},
		{
			Cookie: serialize('qid', qid)
		}
	)

	return res.data.deleteOrderItems
}
