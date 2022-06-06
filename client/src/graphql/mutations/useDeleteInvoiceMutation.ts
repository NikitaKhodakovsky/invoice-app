import { gql, useMutation } from '@apollo/client'

const DeleteInvoiceMutation = gql`
	mutation ($id: ID!) {
		deleteInvoice(id: $id)
	}
`

export function useDeleteInvoiceMutation(id: string) {
	return useMutation<{ deleteInvoice: Mutation['deleteInvoice'] }, { id: string }>(DeleteInvoiceMutation, {
		variables: { id }
	})
}
