import { gql } from 'graphql-request'
import { serialize } from 'cookie'

import { ChangeInvoiceStatusMutation, ChangeInvoiceStatusMutationVariables, Status } from '../../types'
import { client } from '../client'

const ChangeInvoiceStatusMutationDocument = gql`
	mutation ChangeInvoiceStatus($status: Status!, $changeInvoiceStatusId: ID!) {
		changeInvoiceStatus(status: $status, id: $changeInvoiceStatusId)
	}
`

export async function changeInvoiceStatusMutation(qid: string = '', id: string, status: Status) {
	const res = await client.rawRequest<ChangeInvoiceStatusMutation, ChangeInvoiceStatusMutationVariables>(
		ChangeInvoiceStatusMutationDocument,
		{ changeInvoiceStatusId: id, status },
		{
			Cookie: serialize('qid', qid)
		}
	)

	return res.data.changeInvoiceStatus
}
