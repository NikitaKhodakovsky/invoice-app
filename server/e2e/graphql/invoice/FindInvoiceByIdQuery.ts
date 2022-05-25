import { gql } from 'graphql-request'
import { serialize } from 'cookie'

import { Query } from '../../../../shared'
import { client } from '../client'

const FindInvoiceByIdQueryDocument = gql`
	query ($invoiceId: ID!) {
		invoice(id: $invoiceId) {
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
				updatedAt
				name
				quantity
				price
			}
		}
	}
`

export async function FindInvoiceByIdQuery(qid: string, invoiceId: string) {
	const res = await client.rawRequest<{ invoice: Query['invoice'] }>(
		FindInvoiceByIdQueryDocument,
		{ invoiceId },
		{
			Cookie: serialize('qid', qid)
		}
	)
	return res.data.invoice
}
