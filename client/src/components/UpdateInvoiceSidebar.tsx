import { useFormikContext } from 'formik'
import toast from 'react-hot-toast'
import { Fragment } from 'react'

import { useUpdateInvoiceMutation } from '../graphql/mutations'
import { parseAndHandle } from '../utils'

import { InvoiceSidebar } from './InvoiceSidebar'
import { SidebarProps } from './Sidebar'
import { Id } from './Id'

interface ActionsProps {
	setIsOpen: (v: boolean) => any
}

function Actions({ setIsOpen }: ActionsProps) {
	const { handleReset, isSubmitting } = useFormikContext()

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
			<button type='submit' disabled={isSubmitting} className='button mobile purple'>
				{isSubmitting ? 'Saving...' : 'Save & Send'}
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
		const { clientEmail, clientName, description, paymentTerms, clientAddress, senderAddress, orderItems } = values

		const formattedOrderItems: CreateOrderItemInput[] = orderItems.map(({ name, price, quantity }) => ({
			quantity,
			price,
			name
		}))

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
			paymentTerms,
			orderItems: formattedOrderItems
		}

		const res = await mutation({
			variables: {
				invoiceId: invoice.id,
				data
			}
		})

		if (res.error) {
			return parseAndHandle(res.error)
		}

		if (res.data?.updateInvoice) {
			toast('Successfully updated')
			props.setIsOpen(false)
		}
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
