import { useMutation } from 'graphql-hooks'

export const DeleteInvoiceMutation = /* GraphQL */ `
	mutation DeleteInvoice($id: ID!) {
		deleteInvoice(id: $id)
	}
`

export function useDeleteInvoiceMutation(id: string) {
	return useMutation<DeleteInvoiceMutation, DeleteInvoiceMutationVariables>(DeleteInvoiceMutation, {
		variables: { id }
	})
}
