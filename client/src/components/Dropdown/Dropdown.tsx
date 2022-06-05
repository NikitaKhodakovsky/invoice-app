import { useState } from 'react'

import styles from './Dropdown.module.scss'

import { styler as s } from '../../utils'
import { useField } from 'formik'

export interface DropdownOption {
	label: string
	value: any
}

export interface DropdownProps {
	className?: string
	label?: string
	error?: string | null

	options: DropdownOption[]

	value?: DropdownOption
	onChange: (v: DropdownOption) => any
}

export function Dropdown({ label, options, value, onChange, className, error }: DropdownProps) {
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
		<div className={`${styles.wrap} ${error ? styles.error : ''} ${className}`}>
			<label>{label}</label>
			{error && <p className={styles.message}>{error}</p>}
			<div
				className={s(styles, 'dropdown', isOpen ? 'active' : '', error ? 'error' : '')}
				onClick={() => setIsOpen(!isOpen)}
			>
				<span>{value?.label || options[0].label}</span>
			</div>
			{isOpen && <ul className={styles.content}>{content}</ul>}
		</div>
	)
}

export interface FormikDropdownProps extends DropdownProps {
	name: string
}

export function FormikDropdown({ name, ...props }: FormikDropdownProps) {
	const [option, setOption] = useState()
	const [{ value }, { error, touched }, { setValue }] = useField(name)

	return <div></div>

	// return (
	// 	<Dropdown
	// 		value={option}
	// 		error={error && touched ? error : null}
	// 		onChange={(v) => setValue(v.value)}
	// 		{...props}
	// 	/>
	// )
}
