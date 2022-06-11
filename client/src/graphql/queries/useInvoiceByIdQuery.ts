import { useQuery } from 'graphql-hooks'

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
		useCache: false
	})
}
