import { gql, useMutation } from '@apollo/client'

const DeleteInvoiceMutation = gql`
	mutation DeleteInvoice($id: ID!) {
		deleteInvoice(id: $id)
	}
`

export function useDeleteInvoiceMutation(id: string) {
	return useMutation<DeleteInvoiceMutation, DeleteInvoiceMutationVariables>(DeleteInvoiceMutation, {
		variables: { id }
	})
}
