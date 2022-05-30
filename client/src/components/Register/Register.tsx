import { FormEventHandler, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import styles from './Register.module.scss'

import { useRegisterMutation } from '../../graphql/mutations'
import { useAuth } from '../../hooks'

import { ArrowButton } from '../ArrowButton'
import { Input } from '../Input'

export function Register() {
	const { auth } = useAuth()

	const navigate = useNavigate()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [confirmation, setConfirmation] = useState('')

	const [registerMutation] = useRegisterMutation()

	useEffect(() => {
		if (auth) {
			navigate('/')
		}
	}, [auth, navigate])

	const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()

		if (password !== confirmation) {
			return toast("Password's don't match")
		}

		const res = await registerMutation({
			variables: {
				credentials: {
					username,
					password
				}
			}
		}).catch((e) => {
			toast(e?.message)
		})

		if (res?.data?.register) {
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
			<form onSubmit={submitHandler}>
				<div className={styles.form}>
					<Input label='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
					<Input label='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
					<Input
						label='Password Confirmation'
						value={confirmation}
						onChange={(e) => setConfirmation(e.target.value)}
					/>
				</div>
				<button type='submit' className={styles.button}>
					Register
				</button>
			</form>
		</div>
	)
}
