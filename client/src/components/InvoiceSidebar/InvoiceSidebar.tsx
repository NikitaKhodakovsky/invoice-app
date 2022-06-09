import { string, object, number, array } from 'yup'
import { Form, Formik, FormikConfig } from 'formik'
import { ReactNode } from 'react'

import styles from './InvoiceSidebar.module.scss'

import { Sidebar, SidebarProps } from '../Sidebar'
import { OrderItemList } from '../OrderItemList'
import { FormikDropdown } from '../Dropdown'
import { FormikInput } from '../Input'

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

	paymentTerms: number().required('required').min(1, 'Must be positive'),

	orderItems: array(
		object({
			name: string().required(' '),
			price: number().required(' ').min(1, ' '),
			quantity: number().required(' ').min(1, ' ')
		})
	).min(1, 'You can not create Invoice without items')
})

export interface InvoiceSidebarProps extends SidebarProps {
	title: string | ReactNode
	onSubmit: FormikConfig<CreateInvoiceInput>['onSubmit']
	initialValues: CreateInvoiceInput
	actions: ReactNode
}

export function InvoiceSidebar({ title, onSubmit, initialValues, actions, ...props }: InvoiceSidebarProps) {
	return (
		<Sidebar {...props}>
			<h1 className={styles.title}>{title}</h1>
			<Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
				<Form autoComplete='off'>
					<div className={styles.content}>
						<h3 className='full-row'>Bill From</h3>
						<div className={`${styles.addressWrap} ${styles.billFrom} full-row`}>
							<FormikInput name='senderAddress.street' label='Street Address' className='full-row' />
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
							<FormikInput name='clientAddress.street' label='Street Address' className='full-row' />
							<FormikInput name='clientAddress.city' label='City' />
							<FormikInput name='clientAddress.postCode' label='Post Code' />
							<FormikInput
								name='clientAddress.country'
								label='Country'
								className={styles.addressCountry}
							/>
						</div>
						<FormikDropdown name='paymentTerms' label='Payment Terms' options={options} />
						<FormikInput name='description' label='Project Description' className='full-row' />
					</div>
					<OrderItemList />
					<div className={styles.actions}>{actions}</div>
				</Form>
			</Formik>
		</Sidebar>
	)
}
