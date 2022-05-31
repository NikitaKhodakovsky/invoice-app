import { useState } from 'react'

import styles from './StatusFilter.module.scss'

import Checkbox from '../Checkbox/Checkbox'

import { styler as s } from '../../utils'

export interface StatusFilterProps {
	className?: string
}

export function StatusFilter({ className }: StatusFilterProps) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className={`${styles.wrap} ${className}`}>
			<p className={s(styles, 'title', isOpen ? 'active' : '')} onClick={() => setIsOpen(!isOpen)}>
				Filter
				<span className='hide-for-mobile'>&nbsp;by status</span>
			</p>
			<div className={s(styles, 'content', isOpen ? '' : 'hidden')}>
				<Checkbox id='Draft' label='Draft' />
				<Checkbox id='Pending' label='Pending' />
				<Checkbox id='Paid' label='Paid' />
			</div>
		</div>
	)
}
