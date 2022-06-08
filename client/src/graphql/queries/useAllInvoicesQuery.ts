import { gql, useQuery } from '@apollo/client'

export const AllInvoicesQuery = gql`
	query ($statuses: [Status!]) {
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
	return useQuery<{ invoices: Query['invoices'] }, { statuses?: Status[] }>(AllInvoicesQuery, {
		variables: { statuses },
		fetchPolicy: 'no-cache'
	})
}
