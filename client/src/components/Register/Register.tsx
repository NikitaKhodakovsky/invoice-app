import { Link, useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import { object, string } from 'yup'
import toast from 'react-hot-toast'
import { useEffect } from 'react'

import styles from './Register.module.scss'

import { passwordSchema, usernameSchema } from '../../utils/validation'
import { useRegisterMutation } from '../../graphql/mutations'
import { parseAndHandle } from '../../utils'
import { useAuth } from '../../auth'

import { ArrowButton } from '../ArrowButton'
import { FormikInput } from '../FormikInput'

interface FormValues extends CredentialsInput {
	confirmation: string
}

const initialValues: FormValues = {
	username: '',
	password: '',
	confirmation: ''
}

const validationSchema = object({
	username: usernameSchema,
	password: passwordSchema,
	confirmation: string()
		.required('required')
		.test('confirmation', "Password's don't match", function (value) {
			return this.parent.password === value
		})
})

export function Register() {
	const { auth } = useAuth()

	const navigate = useNavigate()

	const [registerMutation] = useRegisterMutation()

	useEffect(() => {
		document.title = 'Register'

		if (auth) {
			navigate('/')
		}
	}, [auth, navigate])

	const submitHandler = async ({ confirmation, ...credentials }: FormValues) => {
		const res = await registerMutation({
			variables: {
				credentials
			}
		})

		if (res.error) {
			parseAndHandle(res.error)
		}

		if (res?.data?.register) {
			toast('User successfully created')
			navigate('/login')
		}
	}

	return (
		<div className={styles.wrap}>
			<div className={styles.header}>
				<h3>Register</h3>
				<Link to='/login'>
					<ArrowButton message='Login' direction='right' />
				</Link>
			</div>
			<Formik initialValues={initialValues} onSubmit={submitHandler} validationSchema={validationSchema}>
				<Form>
					<div className={styles.form}>
						<FormikInput name='username' label='Username' />
						<FormikInput name='password' type='password' label='Password' />
						<FormikInput name='confirmation' type='password' label='Password Confirmation' />
					</div>
					<button type='submit' className='button large element-bg'>
						Register
					</button>
				</Form>
			</Formik>
		</div>
	)
}
