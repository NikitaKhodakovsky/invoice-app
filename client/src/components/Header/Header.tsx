import { useTheme } from 'react-theme-lib'
import { Link } from 'react-router-dom'

import styles from './Header.module.scss'

import { useLogoutMutation } from '../../graphql/mutations'
import { useAuth } from '../../auth'

export function Header() {
	const { theme, toggleTheme } = useTheme()
	const [logout] = useLogoutMutation()
	const { setAuth } = useAuth()

	const logoutHandler = async () => {
		await logout()
		setAuth(false)
	}

	return (
		<div className={styles.wrap}>
			<Link to='/' className={styles.logo}>
				<img src='/icons/logo.svg' alt='logo' width="28" height="26" />
			</Link>
			<div className={styles.toggle}>
				<button onClick={toggleTheme}>
					{theme === 'dark' && <img src='/icons/icon-sun.svg' alt='toggle' />}
					{theme === 'light' && <img src='/icons/icon-moon.svg' alt='toggle' />}
				</button>
			</div>
			<div className={styles.logout}>
				<button aria-label='logout' onClick={logoutHandler} />
			</div>
		</div>
	)
}
