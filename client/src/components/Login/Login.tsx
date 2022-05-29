import { Link } from 'react-router-dom'
import { ArrowButton } from '../ArrowButton'
import { Input } from '../Input'
import styles from './Login.module.scss'

export function Login() {
	return (
		<div className={styles.wrap}>
			<div className={styles.header}>
				<h3>Login</h3>
				<Link to='/register'>
					<ArrowButton direction='right' message='Register' />
				</Link>
			</div>
			<div className={styles.form}>
				<Input label='Username' />
				<Input label='Password' type='password' />
			</div>
			<button className={styles.loginButton}>Login</button>
		</div>
	)
}
