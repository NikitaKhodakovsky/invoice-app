import { FormikHelpers, useFormikContext } from 'formik'
import { Fragment, useState } from 'react'
import toast from 'react-hot-toast'

import styles from './CreateInvoiceSidebar.module.scss'

import { useCreateInvoiceMutation } from '../../graphql/mutations'

import { InvoiceSidebar } from '../InvoiceSidebar'
import { SidebarProps } from '../Sidebar'

const initialValues: CreateInvoiceInput = {
	senderAddress: {
		street: '',
		city: '',
		postCode: '',
		country: ''
	},

	clientAddress: {
		street: '',
		city: '',
		postCode: '',
		country: ''
	},

	clientName: '',
	clientEmail: '',
	description: '',

	paymentTerms: 14,
	paymentDue: new Date().toISOString(),

	orderItems: []
}

interface ActionsProps {
	setIsOpen: (v: boolean) => any
	setAsDraft: (v: boolean) => any
}

function Actions({ setIsOpen, setAsDraft }: ActionsProps) {
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
				Discard
			</button>
			<button
				type='submit'
				onClick={() => setAsDraft(true)}
				className={`button mobile black ${styles.saveAsDraft}`}
			>
				Save as Draft
			</button>
			<button type='submit' className='button mobile purple'>
				Save & Send
			</button>
		</Fragment>
	)
}

export function CreateInvoiceSidebar(props: SidebarProps) {
	const [asDraft, setAsDraft] = useState(false)
	const [mutation] = useCreateInvoiceMutation()

	const submitHandler = async (values: CreateInvoiceInput, { resetForm }: FormikHelpers<CreateInvoiceInput>) => {
		const data: CreateInvoiceInput = {
			...values,
			status: asDraft ? 'Draft' : 'Pending'
		}

		await mutation({ variables: { data } })
			.then(() => toast('Successfully created'))
			.catch((e) => toast(e?.message))

		resetForm(initialValues)

		props.setIsOpen(false)
	}

	return (
		<InvoiceSidebar
			title='New Invoice'
			initialValues={initialValues}
			onSubmit={submitHandler}
			actions={<Actions setIsOpen={props.setIsOpen} setAsDraft={setAsDraft} />}
			{...props}
		/>
	)
}
