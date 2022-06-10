import { gql } from 'graphql-request'
import { serialize } from 'cookie'

import {
	UpdateInvoiceInput,
	UpdateInvoiceMutation,
	UpdateInvoiceMutationVariables,
	UpdateInvoiceTotalMutation,
	UpdateInvoiceTotalMutationVariables
} from '../../types'
import { client } from '../client'

const UpdateInvoiceMutationDocument = gql`
	mutation UpdateInvoice($data: UpdateInvoiceInput!, $invoiceId: ID!) {
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

export async function updateInvoiceMutation(qid: string, invoiceId: string, data: UpdateInvoiceInput) {
	const res = await client.rawRequest<UpdateInvoiceMutation, UpdateInvoiceMutationVariables>(
		UpdateInvoiceMutationDocument,
		{ invoiceId, data },
		{
			Cookie: serialize('qid', qid)
		}
	)

	return res.data.updateInvoice
}

/* ------------------------------------------------------ Total ----------------------------------------------------- */

const UpdateInvoiceTotalMutationDocument = gql`
	mutation UpdateInvoiceTotal($data: UpdateInvoiceInput!, $invoiceId: ID!) {
		updateInvoice(data: $data, id: $invoiceId) {
			total
		}
	}
`

export async function updateInvoiceTotalMutation(qid: string, invoiceId: string, data: UpdateInvoiceInput) {
	const res = await client.rawRequest<UpdateInvoiceTotalMutation, UpdateInvoiceTotalMutationVariables>(
		UpdateInvoiceTotalMutationDocument,
		{ invoiceId, data },
		{
			Cookie: serialize('qid', qid)
		}
	)

	return res.data.updateInvoice
}
