import { useTheme } from 'react-theme-lib'

import styles from './Header.module.scss'

export function Header() {
	const { theme, toggleTheme } = useTheme()

	return (
		<div className={styles.wrap}>
			<div className={styles.logo}>
				<img src='icons/logo.svg' alt='logo' />
			</div>
			<div className={styles.toggle}>
				<button onClick={toggleTheme}>
					{theme === 'dark' && <img src='icons/icon-sun.svg' alt='toggle' />}
					{theme === 'light' && <img src='icons/icon-moon.svg' alt='toggle' />}
				</button>
			</div>
			<div className={styles.avatar}>
				<img src='img/avatar.jpg' alt='avatar' />
			</div>
		</div>
	)
}
