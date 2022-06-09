import { Fragment, ReactNode } from 'react'

import styles from './Sidebar.module.scss'

import { styler as s } from '../../utils'

import { ArrowButton } from '../ArrowButton'

export interface SidebarProps {
	children?: ReactNode
	isOpen: boolean
	setIsOpen: (v: boolean) => any
}

export function Sidebar({ children, isOpen, setIsOpen }: SidebarProps) {
	return (
		<Fragment>
			{isOpen && <div className={styles.placeholder} onClick={() => setIsOpen(!isOpen)}></div>}
			<div className={s(styles, 'sidebar', isOpen ? 'open' : '')}>
				<div className={styles.content}>
					<ArrowButton
						message='Go back'
						direction='left'
						onClick={() => setIsOpen(!isOpen)}
						className={styles.closeButton}
					/>
					{children}
				</div>
			</div>
		</Fragment>
	)
}
