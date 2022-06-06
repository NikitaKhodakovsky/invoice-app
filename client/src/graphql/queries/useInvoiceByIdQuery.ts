import { gql, useQuery } from '@apollo/client'

export const InvoiceByIdQuery = gql`
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
	return useQuery<{ invoice: Query['invoice'] }, { id: string }>(InvoiceByIdQuery, { variables: { id } })
}
