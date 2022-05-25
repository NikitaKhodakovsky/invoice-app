import { gql } from 'graphql-request'
import { serialize } from 'cookie'

import { Invoice, Mutation, Status } from '../../../../shared'
import { client } from '../client'

const UpdateInvoiceStatusMutationDocument = gql`
	mutation Mutation($status: Status!, $changeInvoiceStatusId: ID!) {
		changeInvoiceStatus(status: $status, id: $changeInvoiceStatusId) {
			status
		}
	}
`

export async function UpdateInvoiceStatusMutation(qid: string = '', id: Invoice['id'], status: Status) {
	const res = await client.rawRequest<{ changeInvoiceStatus: Mutation['changeInvoiceStatus'] }>(
		UpdateInvoiceStatusMutationDocument,
		{ changeInvoiceStatusId: id, status },
		{
			Cookie: serialize('qid', qid)
		}
	)

	return res.data.changeInvoiceStatus.status
}
