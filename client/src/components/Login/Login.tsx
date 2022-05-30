import { useEffect, FormEventHandler, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import styles from './Login.module.scss'

import { useLoginMutation } from '../../graphql/mutations'
import { useAuth } from '../../hooks'

import { ArrowButton } from '../ArrowButton'
import { Input } from '../Input'

export function Login() {
	const navigate = useNavigate()
	const { auth, setAuth } = useAuth()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [loginMutation] = useLoginMutation()

	useEffect(() => {
		if (auth) {
			navigate('/')
		}
	}, [auth, navigate])

	const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()

		const res = await loginMutation({
			variables: {
				credentials: {
					username,
					password
				}
			}
		}).catch((e) => {
			toast(e?.message)
		})

		if (res?.data && res?.data?.login) {
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
			<form onSubmit={submitHandler}>
				<div className={styles.form}>
					<Input label='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
					<Input
						label='Password'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type='submit' className={styles.button}>
					Login
				</button>
			</form>
		</div>
	)
}
