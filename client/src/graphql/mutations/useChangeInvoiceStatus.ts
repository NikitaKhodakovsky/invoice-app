import { useMutation } from 'graphql-hooks'

export const ChangeInvoiceStatusMutation = /* GraphQL */ `
	mutation ChangeInvoiceStatus($status: Status!, $invoiceId: ID!) {
		changeInvoiceStatus(status: $status, id: $invoiceId)
	}
`

export function useChangeInvoiceStatus(invoiceId: string, status: Status) {
	return useMutation<ChangeInvoiceStatusMutation, ChangeInvoiceStatusMutationVariables>(ChangeInvoiceStatusMutation, {
		variables: {
			invoiceId,
			status
		}
	})
}
