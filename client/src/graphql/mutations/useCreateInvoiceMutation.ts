import { gql, useMutation } from '@apollo/client'

import { CreateInvoiceInput, Mutation } from '../../types/graphql'
import { AllInvoicesQuery } from '../queries'

const CreateInvoiceMutation = gql`
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
				updatedAt
				street
				country
				city
				postCode
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
				quantity
				name
				price
			}
			total
		}
	}
`

export function useCreateInvoiceMutation() {
	return useMutation<{ createInvoice: Mutation['createInvoice'] }, { data: CreateInvoiceInput }>(
		CreateInvoiceMutation,
		{
			refetchQueries: [AllInvoicesQuery]
		}
	)
}
