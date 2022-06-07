import { useFormikContext } from 'formik'
import toast from 'react-hot-toast'
import { Fragment } from 'react'

import { useUpdateInvoiceMutation } from '../graphql/mutations'

import { InvoiceSidebar } from './InvoiceSidebar'
import { SidebarProps } from './Sidebar'
import { Id } from './Id'

interface ActionsProps {
	setIsOpen: (v: boolean) => any
}

function Actions({ setIsOpen }: ActionsProps) {
	const { handleReset } = useFormikContext()

	return (
		<Fragment>
			<button
				className='button mobile gray'
				onClick={(e) => {
					handleReset(e)
					setIsOpen(false)
				}}
			>
				Cancel
			</button>
			<button type='submit' className='button mobile purple'>
				Save & Send
			</button>
		</Fragment>
	)
}

export interface UpdateInvoiceSidebarProps extends SidebarProps {
	invoice: Invoice
}

export function UpdateInvoiceSidebar({ invoice, ...props }: UpdateInvoiceSidebarProps) {
	const [mutation] = useUpdateInvoiceMutation()

	const submitHandler = async (values: CreateInvoiceInput) => {
		const { clientEmail, clientName, description, paymentDue, paymentTerms, clientAddress, senderAddress } = values

		const data: UpdateInvoiceInput = {
			clientAddress: {
				city: clientAddress.city,
				country: clientAddress.country,
				postCode: clientAddress.postCode,
				street: clientAddress.street
			},
			senderAddress: {
				city: senderAddress.city,
				country: senderAddress.country,
				postCode: senderAddress.postCode,
				street: senderAddress.street
			},
			clientEmail,
			clientName,
			description,
			paymentDue,
			paymentTerms
		}

		await mutation({
			variables: {
				invoiceId: invoice.id,
				data
			}
		})
			.then(() => toast('Successfully updated'))
			.catch((e) => toast(e.message))

		props.setIsOpen(false)
	}

	return (
		<InvoiceSidebar
			title={
				<Fragment>
					Edit <Id id={invoice.id} />
				</Fragment>
			}
			initialValues={invoice}
			onSubmit={submitHandler}
			actions={<Actions setIsOpen={props.setIsOpen} />}
			{...props}
		/>
	)
}
