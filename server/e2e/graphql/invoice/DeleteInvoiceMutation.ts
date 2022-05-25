import { gql } from 'graphql-request'
import { serialize } from 'cookie'

import { client } from '../client'
import { Mutation } from '../../../../shared'

const DeleteInvoiceMutationDocument = gql`
	mutation ($invoiceId: ID!) {
		deleteInvoice(id: $invoiceId)
	}
`

export async function DeleteInvoiceMutation(qid: string, invoiceId: string) {
	const res = await client.rawRequest<{ deleteInvoice: Mutation['deleteInvoice'] }>(
		DeleteInvoiceMutationDocument,
		{ invoiceId },
		{
			Cookie: serialize('qid', qid)
		}
	)

	return res.data.deleteInvoice
}
