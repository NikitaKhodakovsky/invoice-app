import { string, object, number, array } from 'yup'
import { Form, Formik } from 'formik'
import { useState } from 'react'

import styles from './CreateInvoiceSidebar.module.scss'

import { CreateInvoiceInput, CreateOrderItemInput, Status } from '../../types/graphql'
import { useCreateInvoiceMutation } from '../../graphql/mutations'

import { Sidebar, SidebarProps } from '../Sidebar'
import { OrderItemList } from '../OrderItemList'
import { FormikInput } from '../Input'
import { Dropdown } from '../Dropdown'

const options = [
	{ label: 'Net 1 Day', value: 1 },
	{ label: 'Net 7 Days', value: 7 },
	{ label: 'Net 14 Days', value: 14 },
	{ label: 'Net 30 Days', value: 30 }
]

const validationSchema = object({
	senderAddress: object({
		street: string().required('required'),
		city: string().required('required'),
		postCode: string().required('required'),
		country: string().required('required')
	}).required(),

	clientAddress: object({
		street: string().required('required'),
		city: string().required('required'),
		postCode: string().required('required'),
		country: string().required('required')
	}).required(),

	clientName: string().required('required'),
	clientEmail: string().email('invalid email').required('required'),
	description: string().required('required'),

	orderItems: array(
		object({
			name: string().required(' '),
			price: number().required('required').min(1, ' '),
			quantity: number().required('required').min(1, ' ')
		})
	).min(1)
})

export interface FormValues {
	senderAddress: {
		street: string
		city: string
		postCode: string
		country: string
	}
	clientAddress: {
		street: string
		city: string
		postCode: string
		country: string
	}

	clientName: string
	clientEmail: string
	description: string

	orderItems: CreateOrderItemInput[]
}

const initialValues: FormValues = {
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

	orderItems: []
}

export function CreateInvoiceSidebar(props: SidebarProps) {
	const [paymentTerms, setPaymentTerms] = useState(options[3])
	const [mutation] = useCreateInvoiceMutation()
	const [asDraft, setAsDraft] = useState(false)

	return (
		<Sidebar {...props}>
			<h1 className={styles.title}>New Invoice</h1>
			<Formik
				validationSchema={validationSchema}
				initialValues={initialValues}
				onSubmit={async (values, { resetForm }) => {
					const data: CreateInvoiceInput = {
						...values,
						status: asDraft ? Status.Draft : Status.Pending,
						paymentTerms: paymentTerms.value,
						paymentDue: new Date().toISOString()
					}
					await mutation({ variables: { data } })
					resetForm()
					props.setIsOpen(false)
				}}
			>
				{({ handleReset }) => {
					return (
						<Form autoComplete='off'>
							<div className={styles.content}>
								<h3 className='full-row'>Bill From</h3>
								<div className={`${styles.addressWrap} ${styles.billFrom} full-row`}>
									<FormikInput
										name='senderAddress.street'
										label='Street Address'
										className='full-row'
									/>
									<FormikInput name='senderAddress.city' label='City' />
									<FormikInput name='senderAddress.postCode' label='Post Code' />
									<FormikInput
										name='senderAddress.country'
										label='Country'
										className={styles.addressCountry}
									/>
								</div>
								<h3 className='full-row'>Bill To</h3>
								<FormikInput name='clientName' label='Client’s Name' className='full-row' />
								<FormikInput name='clientEmail' label='Client’s Email' className='full-row' />
								<div className={`${styles.addressWrap} full-row`}>
									<FormikInput
										name='clientAddress.street'
										label='Street Address'
										className='full-row'
									/>
									<FormikInput name='clientAddress.city' label='City' />
									<FormikInput name='clientAddress.postCode' label='Post Code' />
									<FormikInput
										name='clientAddress.country'
										label='Country'
										className={styles.addressCountry}
									/>
								</div>
								<Dropdown
									label='Payment Terms'
									value={paymentTerms}
									onChange={setPaymentTerms}
									options={options}
								/>
								<FormikInput name='description' label='Project Description' className='full-row' />
							</div>
							<OrderItemList />
							<div className={styles.actions}>
								<button
									className='button mobile gray'
									onClick={(e) => {
										handleReset(e)
										props.setIsOpen(false)
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
							</div>
						</Form>
					)
				}}
			</Formik>
		</Sidebar>
	)
}
