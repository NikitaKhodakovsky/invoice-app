import { gql } from 'graphql-request'
import { serialize } from 'cookie'

import { client } from '../client'
import {
	InvoiceByIdQuery,
	InvoiceByIdQueryVariables,
	InvoiceByIdTotalQuery,
	InvoiceByIdTotalQueryVariables
} from '../../types'

const InvoiceByIdQueryDocument = gql`
	query InvoiceById($invoiceId: ID!) {
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
				street
				city
				postCode
				country
			}
			clientAddress {
				id
				street
				city
				postCode
				country
			}
			orderItems {
				id
				name
				quantity
				price
			}
			total
		}
	}
`

export async function invoiceByIdQuery(qid: string, invoiceId: string) {
	const res = await client.rawRequest<InvoiceByIdQuery, InvoiceByIdQueryVariables>(
		InvoiceByIdQueryDocument,
		{ invoiceId },
		{
			Cookie: serialize('qid', qid)
		}
	)
	return res.data.invoice
}

/* ------------------------------------------------------ Total ----------------------------------------------------- */

const InvoiceByIdTotalQueryDocument = gql`
	query InvoiceByIdTotal($invoiceId: ID!) {
		invoice(id: $invoiceId) {
			total
		}
	}
`

export async function invoiceByIdTotalQuery(qid: string, invoiceId: string) {
	const res = await client.rawRequest<InvoiceByIdTotalQuery, InvoiceByIdTotalQueryVariables>(
		InvoiceByIdTotalQueryDocument,
		{ invoiceId },
		{
			Cookie: serialize('qid', qid)
		}
	)
	return res.data.invoice
}
