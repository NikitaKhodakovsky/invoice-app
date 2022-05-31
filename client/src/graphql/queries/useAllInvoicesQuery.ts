import { gql, useQuery } from '@apollo/client'
import { Query, Status } from '../../types/graphql'

export const AllInvoicesQuery = gql`
	query {
		invoices {
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
				createdAt
				updatedAt
				city
				street
				postCode
				country
			}
			clientAddress {
				id
				createdAt
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

export function useAllInvoicesQuery(status?: Status) {
	return useQuery<{ invoices: Query['invoices'] }, { status?: Status }>(AllInvoicesQuery, {
		variables: { status },
		fetchPolicy: 'no-cache'
	})
}
