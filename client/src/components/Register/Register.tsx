import { Link } from 'react-router-dom'

import styles from './Register.module.scss'

import { ArrowButton } from '../ArrowButton'
import { Input } from '../Input'

export function Register() {
	return (
		<div className={styles.wrap}>
			<div className={styles.header}>
				<h3>Register</h3>
				<Link to='/login'>
					<ArrowButton message='Login' direction='right' />
				</Link>
			</div>
			<div className={styles.form}>
				<Input label='Username' />
				<Input label='Password' />
				<Input label='Password Confirmation' />
			</div>
			<button className={styles.loginButton}>Register</button>
		</div>
	)
}
