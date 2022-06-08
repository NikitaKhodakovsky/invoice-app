import { gql, useMutation } from '@apollo/client'

import { AllInvoicesQuery, InvoiceByIdQuery } from '../queries'

const ChangeInvoiceStatus = gql`
	mutation ($status: Status!, $invoiceId: ID!) {
		changeInvoiceStatus(status: $status, id: $invoiceId) {
			id
		}
	}
`

export function useChangeInvoiceStatus(invoiceId: string, status: Status) {
	return useMutation<{ changeInvoiceStatus: Mutation['changeInvoiceStatus'] }, { invoiceId: string; status: Status }>(
		ChangeInvoiceStatus,
		{
			variables: {
				invoiceId,
				status
			},
			refetchQueries: [InvoiceByIdQuery, AllInvoicesQuery]
		}
	)
}
