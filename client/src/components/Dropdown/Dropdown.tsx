import { useState } from 'react'

import styles from './Dropdown.module.scss'

import { styler as s } from '../../utils'

export interface DropdownOption {
	label: string
	value: any
}

export interface DropdownProps {
	className?: string
	label?: string

	options: DropdownOption[]

	value?: DropdownOption
	onChange: (v: DropdownOption) => any
}

export function Dropdown({ label, options, value, onChange, className }: DropdownProps) {
	const [isOpen, setIsOpen] = useState(false)

	const handler = (value: DropdownOption) => {
		onChange(value)
		setIsOpen(false)
	}

	const content = options.map((option) => {
		return (
			<li key={option.value} onClick={() => handler(option)}>
				{option.label}
			</li>
		)
	})

	return (
		<div className={`${styles.wrap} ${className}`}>
			<label>{label}</label>
			<div className={s(styles, 'dropdown', isOpen ? 'active' : '')} onClick={() => setIsOpen(!isOpen)}>
				<span>{value?.label || options[0].label}</span>
			</div>
			{isOpen && <ul className={styles.content}>{content}</ul>}
		</div>
	)
}
