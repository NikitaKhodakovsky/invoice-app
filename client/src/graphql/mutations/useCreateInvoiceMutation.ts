import { useMutation } from 'graphql-hooks'

export const CreateInvoiceMutation = /* GraphQL */ `
	mutation CreateInvoice($data: CreateInvoiceInput!) {
		createInvoice(data: $data) {
			id
			createdAt
			updatedAt
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
	return useMutation<CreateInvoiceMutation, MutationCreateInvoiceArgs>(CreateInvoiceMutation)
}
