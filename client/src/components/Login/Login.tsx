import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import { useEffect } from 'react'
import { object } from 'yup'

import styles from './Login.module.scss'

import { passwordSchema, usernameSchema } from '../../utils/validation'
import { useLoginMutation } from '../../graphql/mutations'
import { parseAndHandle } from '../../utils'
import { useAuth } from '../../auth'

import { ArrowButton } from '../ArrowButton'
import { FormikInput } from '../FormikInput'

const validationSchema = object({
	username: usernameSchema,
	password: passwordSchema
})

const initialValues = {
	username: '',
	password: ''
}

export function Login() {
	const location = useLocation()
	const navigate = useNavigate()
	const { auth, setAuth } = useAuth()

	const [loginMutation] = useLoginMutation()

	//@ts-ignore
	const prev: string = location.state?.prevPath || '/'

	useEffect(() => {
		if (auth) {
			navigate(prev)
		}
	}, [auth, navigate, prev])

	const submitHandler = async (credentials: CredentialsInput) => {
		const res = await loginMutation({
			variables: {
				credentials
			}
		})

		if (res.error) {
			parseAndHandle(res.error)
		}

		if (res?.data && res.data.login) {
			setAuth(true)
			navigate(prev)
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
