import styles from './Register.module.scss'

import { Input } from '../Input'

export function Register() {
	return (
		<div className={styles.wrap}>
			<h3 className={styles.title}>Register</h3>
			<div className={styles.form}>
				<Input label='Username' />
				<Input label='Password' />
				<Input label='Password Confirmation' />
			</div>
			<button className={styles.loginButton}>Register</button>
		</div>
	)
}
