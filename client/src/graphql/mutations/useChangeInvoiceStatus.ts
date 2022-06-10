import { gql, useMutation } from '@apollo/client'

import { AllInvoicesQuery, InvoiceByIdQuery } from '../queries'

const ChangeInvoiceStatusMutation = gql`
	mutation ChangeInvoiceStatus($status: Status!, $invoiceId: ID!) {
		changeInvoiceStatus(status: $status, id: $invoiceId)
	}
`

export function useChangeInvoiceStatus(invoiceId: string, status: Status) {
	return useMutation<ChangeInvoiceStatusMutation, ChangeInvoiceStatusMutationVariables>(ChangeInvoiceStatusMutation, {
		variables: {
			invoiceId,
			status
		},
		refetchQueries: [InvoiceByIdQuery, AllInvoicesQuery]
	})
}
