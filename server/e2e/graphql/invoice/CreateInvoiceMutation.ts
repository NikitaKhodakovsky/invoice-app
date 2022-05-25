import { gql } from 'graphql-request'
import { serialize } from 'cookie'

import { CreateInvoiceInput, Mutation } from '../../../../shared'
import { client } from '../client'
import { CreateMockInvoiceInput } from '../../../test/mock'

const CreateInvoiceMutationDocument = gql`
	mutation ($data: CreateInvoiceInput!) {
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
				createdAt
				street
				updatedAt
				city
				postCode
				country
			}
			clientAddress {
				createdAt
				id
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

export async function CreateInvoiceMutation(qid: string = '', data?: CreateInvoiceInput) {
	if (!data) {
		data = CreateMockInvoiceInput()
	}

	const res = await client.rawRequest<{ createInvoice: Mutation['createInvoice'] }, { data: CreateInvoiceInput }>(
		CreateInvoiceMutationDocument,
		{ data },
		{
			Cookie: serialize('qid', qid)
		}
	)

	return res.data.createInvoice
}
