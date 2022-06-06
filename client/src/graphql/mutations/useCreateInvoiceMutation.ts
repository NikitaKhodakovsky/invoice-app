import { gql, useMutation } from '@apollo/client'

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
				street
				country
				city
				postCode
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
