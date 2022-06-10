import { gql } from 'graphql-request'
import { serialize } from 'cookie'

import { CreateMockInvoiceInput } from '../../../test/mock'
import { client } from '../client'
import {
	CreateInvoiceInput,
	CreateInvoiceMutation,
	CreateInvoiceTotalMutation,
	CreateInvoiceMutationVariables,
	CreateInvoiceTotalMutationVariables
} from '../../types'

const CreateInvoiceMutationDocument = gql`
	mutation CreateInvoice($data: CreateInvoiceInput!) {
		createInvoice(data: $data) {
			id
			createdAt
			updatedAt
			user {
				createdAt
				id
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

export async function createInvoiceMutation(qid: string = '', data?: CreateInvoiceInput) {
	if (!data) {
		data = CreateMockInvoiceInput()
	}

	const res = await client.rawRequest<CreateInvoiceMutation, CreateInvoiceMutationVariables>(
		CreateInvoiceMutationDocument,
		{ data },
		{
			Cookie: serialize('qid', qid)
		}
	)

	return res.data.createInvoice
}

/* ------------------------------------------------------ Total ----------------------------------------------------- */

const CreateInvoiceTotalMutationDocument = gql`
	mutation CreateInvoiceTotal($data: CreateInvoiceInput!) {
		createInvoice(data: $data) {
			total
		}
	}
`

export async function createInvoiceTotalMutation(qid: string = '', data?: CreateInvoiceInput) {
	if (!data) {
		data = CreateMockInvoiceInput()
	}

	const res = await client.rawRequest<CreateInvoiceTotalMutation, CreateInvoiceTotalMutationVariables>(
		CreateInvoiceTotalMutationDocument,
		{ data },
		{
			Cookie: serialize('qid', qid)
		}
	)

	return res.data.createInvoice
}
