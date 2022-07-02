import { useQuery } from 'graphql-hooks'

import {
	ChangeInvoiceStatusMutation,
	CreateInvoiceMutation,
	DeleteInvoiceMutation,
	UpdateInvoiceMutation,
} from '../mutations'

export const AllInvoicesQuery = /* GraphQL */ `
	query AllInvoices($statuses: [Status!]) {
		invoices(statuses: $statuses) {
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

export function useAllInvoicesQuery(statuses?: Status[]) {
	return useQuery<AllInvoicesQuery, AllInvoicesQueryVariables>(AllInvoicesQuery, {
		variables: { statuses },
		useCache: false,
		refetchAfterMutations: [
			ChangeInvoiceStatusMutation,
			CreateInvoiceMutation,
			UpdateInvoiceMutation,
			DeleteInvoiceMutation,
		],
	})
}
