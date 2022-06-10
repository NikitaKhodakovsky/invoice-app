import { gql } from 'graphql-request'
import { serialize } from 'cookie'

import {
	AllInvoicesQuery,
	AllInvoicesQueryVariables,
	AllInvoicesTotalQuery,
	AllInvoicesTotalQueryVariables
} from '../../types'
import { client } from '../client'

const AllInvoicesQueryDocument = gql`
	query AllInvoices {
		invoices {
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

export async function allInvoicesQuery(qid: string) {
	const res = await client.rawRequest<AllInvoicesQuery, AllInvoicesQueryVariables>(
		AllInvoicesQueryDocument,
		undefined,
		{
			Cookie: serialize('qid', qid)
		}
	)
	return res.data.invoices
}

/* ------------------------------------------------------ Total ----------------------------------------------------- */

const AllInvoicesTotalQueryDocument = gql`
	query AllInvoicesTotal {
		invoices {
			total
		}
	}
`

export async function allInvoicesTotalQuery(qid: string) {
	const res = await client.rawRequest<AllInvoicesTotalQuery, AllInvoicesTotalQueryVariables>(
		AllInvoicesTotalQueryDocument,
		undefined,
		{
			Cookie: serialize('qid', qid)
		}
	)
	return res.data.invoices
}
