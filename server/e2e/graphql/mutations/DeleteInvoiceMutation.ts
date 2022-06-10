import { gql } from 'graphql-request'
import { serialize } from 'cookie'

import { DeleteInvoiceMutation, DeleteInvoiceMutationVariables } from '../../types'
import { client } from '../client'

const DeleteInvoiceMutationDocument = gql`
	mutation DeleteInvoice($invoiceId: ID!) {
		deleteInvoice(id: $invoiceId)
	}
`

export async function deleteInvoiceMutation(qid: string, invoiceId: string) {
	const res = await client.rawRequest<DeleteInvoiceMutation, DeleteInvoiceMutationVariables>(
		DeleteInvoiceMutationDocument,
		{ invoiceId },
		{
			Cookie: serialize('qid', qid)
		}
	)

	return res.data.deleteInvoice
}
