import { gql } from 'graphql-request'
import { serialize } from 'cookie'

import { Mutation, UpdateInvoiceInput } from '../../../../shared'
import { client } from '../client'

const UpdateInvoiceMutationDocument = gql`
	mutation Mutation($data: UpdateInvoiceInput!, $invoiceId: ID!) {
		updateInvoice(data: $data, id: $invoiceId) {
			id
			createdAt
			updatedAt
			user {
				id
				createdAt
				updatedAt
				username
			}
			paymentDue
			description
			paymentTerms
			clientName
			clientEmail
			status
			senderAddress {
				id
				createdAt
				updatedAt
				street
				city
				postCode
				country
			}
			clientAddress {
				id
				createdAt
				updatedAt
				street
				city
				postCode
				country
			}
			orderItems {
				id
				createdAt
				name
				updatedAt
				quantity
				price
			}
		}
	}
`

export async function UpdateInvoiceMutation(qid: string, invoiceId: string, data: UpdateInvoiceInput) {
	const res = await client.rawRequest<{ updateInvoice: Mutation['updateInvoice'] }>(
		UpdateInvoiceMutationDocument,
		{ invoiceId, data },
		{
			Cookie: serialize('qid', qid)
		}
	)

	return res.data.updateInvoice
}
