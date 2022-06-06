import { gql, useQuery } from '@apollo/client'
import { Status } from '../../enums'

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

export function useAllInvoicesQuery(status?: Status) {
	return useQuery<{ invoices: Query['invoices'] }, { status?: Status }>(AllInvoicesQuery, {
		variables: { status },
		fetchPolicy: 'no-cache'
	})
}
