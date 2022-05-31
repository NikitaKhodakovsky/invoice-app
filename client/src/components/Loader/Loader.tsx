import styles from './Loader.module.scss'

export function Loader() {
	return (
		<div className={styles.wrap}>
			<span className={styles.loader}></span>
		</div>
	)
}
