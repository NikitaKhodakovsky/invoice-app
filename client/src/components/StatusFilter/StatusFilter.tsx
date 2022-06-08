import { ChangeEventHandler, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import styles from './StatusFilter.module.scss'

import Checkbox from '../Checkbox/Checkbox'

import { useOutsideAlerter } from '../../hooks'
import { styler as s } from '../../utils'

export interface StatusFilterProps {
	className?: string
}

export function StatusFilter({ className }: StatusFilterProps) {
	const [isOpen, setIsOpen] = useState(false)

	const ref = useRef(null)
	useOutsideAlerter(ref, () => setIsOpen(false))

	const [searchParams, setSearchParams] = useSearchParams()

	const handler: ChangeEventHandler<HTMLInputElement> = (e) => {
		const value = e.target.value

		if (e.target.checked) {
			setSearchParams({ status: [...searchParams.getAll('status'), value] })
		} else {
			setSearchParams({ status: [...searchParams.getAll('status')].filter((i) => i !== value) })
		}
	}

	return (
		<div ref={ref} className={`${styles.wrap} ${className}`}>
			<p className={s(styles, 'title', isOpen ? 'active' : '')} onClick={() => setIsOpen(!isOpen)}>
				Filter
				<span className='hide-for-mobile'>&nbsp;by status</span>
			</p>
			<div className={s(styles, 'content', isOpen ? '' : 'hidden')}>
				<Checkbox id='Draft' label='Draft' value='Draft' onChange={handler} />
				<Checkbox id='Pending' label='Pending' value='Pending' onChange={handler} />
				<Checkbox id='Paid' label='Paid' value='Paid' onChange={handler} />
			</div>
		</div>
	)
}
