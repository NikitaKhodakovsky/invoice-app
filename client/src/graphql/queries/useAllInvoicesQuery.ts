import { gql, useQuery } from '@apollo/client'

export const AllInvoicesQuery = gql`
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
		fetchPolicy: 'no-cache'
	})
}
