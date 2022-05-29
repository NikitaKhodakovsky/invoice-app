import { ArrowButton } from '../ArrowButton'
import { Input } from '../Input'
import styles from './Login.module.scss'

export function Login() {
	return (
		<div className={styles.wrap}>
			<div className={styles.header}>
				<h3>Login</h3>
				<ArrowButton direction='right' message='Register' />
			</div>
			<Input label='Username' className={styles.username} />
			<Input label='Password' className={styles.password} />
			<button className={styles.loginButton}>Login</button>
		</div>
	)
}
