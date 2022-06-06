import { Link, useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { object } from 'yup'

import styles from './Login.module.scss'

import { passwordSchema, usernameSchema } from '../../utils/validation'
import { useLoginMutation } from '../../graphql/mutations'
import { useAuth } from '../../hooks'

import { ArrowButton } from '../ArrowButton'
import { FormikInput } from '../Input'

const validationSchema = object({
	username: usernameSchema,
	password: passwordSchema
})

const initialValues = {
	username: '',
	password: ''
}

export function Login() {
	const navigate = useNavigate()
	const { auth, setAuth } = useAuth()

	const [loginMutation] = useLoginMutation()

	useEffect(() => {
		if (auth) {
			navigate('/')
		}
	}, [auth, navigate])

	const submitHandler = async (credentials: CredentialsInput) => {
		const res = await loginMutation({
			variables: {
				credentials
			}
		}).catch((e) => {
			toast(e?.message)
		})

		if (res?.data && res.data.login) {
			setAuth(true)
			navigate('/')
		}
	}

	return (
		<div className={styles.wrap}>
			<div className={styles.header}>
				<h3>Login</h3>
				<Link to='/register'>
					<ArrowButton direction='right' message='Register' />
				</Link>
			</div>
			<Formik initialValues={initialValues} onSubmit={submitHandler} validationSchema={validationSchema}>
				<Form>
					<div className={styles.form}>
						<FormikInput name='username' label='Username' />
						<FormikInput name='password' label='Password' type='password' />
					</div>
					<button type='submit' className='button large element-bg'>
						Login
					</button>
				</Form>
			</Formik>
		</div>
	)
}
