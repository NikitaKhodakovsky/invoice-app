import { useQuery } from 'graphql-hooks'

import { ChangeInvoiceStatusMutation, DeleteInvoiceMutation, UpdateInvoiceMutation } from '../mutations'

export const InvoiceByIdQuery = /* GraphQL */ `
	query InvoiceById($id: ID!) {
		invoice(id: $id) {
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
			total
			senderAddress {
				id
				city
				street
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
		}
	}
`

export function useInvoiceByIdQuery(id: string) {
	return useQuery<InvoiceByIdQuery, InvoiceByIdQueryVariables>(InvoiceByIdQuery, {
		variables: { id },
		refetchAfterMutations: [
			{
				mutation: ChangeInvoiceStatusMutation,
				//@ts-ignore
				filter: (v: ChangeInvoiceStatusMutationVariables) => v.invoiceId === id,
			},
			{
				mutation: DeleteInvoiceMutation,
				//@ts-ignore
				filter: (v: DeleteInvoiceMutationVariables) => v.id === id,
			},
			{
				mutation: UpdateInvoiceMutation,
				//@ts-ignore
				filter: (v: UpdateInvoiceMutationVariables) => v.invoiceId === id,
			},
		],
	})
}
