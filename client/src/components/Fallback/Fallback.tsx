import { Fragment } from 'react'
import { FallbackProps } from 'react-error-boundary'

import styles from './Fallback.module.scss'

export function Fallback({ resetErrorBoundary }: FallbackProps) {
	return (
		<Fragment>
			<div className={`container ${styles.wrap}`}>
				<h3>Something goes wrong</h3>
				<button className={styles.button} onClick={resetErrorBoundary}>
					Restart
				</button>
			</div>
		</Fragment>
	)
}
