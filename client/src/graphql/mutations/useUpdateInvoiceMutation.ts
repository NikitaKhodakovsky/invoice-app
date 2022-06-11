import { useMutation } from 'graphql-hooks'

export const UpdateInvoiceMutation = /* GraphQL */ `
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

export function useUpdateInvoiceMutation() {
	return useMutation<UpdateInvoiceMutation, UpdateInvoiceMutationVariables>(UpdateInvoiceMutation)
}
