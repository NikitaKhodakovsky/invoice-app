import { gql, useQuery } from '@apollo/client'
import { Query } from '../../types/graphql'

const InvoiceByIdQuery = gql`
	query ($id: ID!) {
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

export function useInvoiceByIdQuery(id: string) {
	return useQuery<{ invoice: Query['invoice'] }, { id: string }>(InvoiceByIdQuery, { variables: { id } })
}
