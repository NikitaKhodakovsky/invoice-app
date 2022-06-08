import { useRef, useState } from 'react'
import { useField } from 'formik'

import styles from './Dropdown.module.scss'

import { useOutsideAlerter } from '../../hooks'
import { styler as s } from '../../utils'

export interface DropdownOption {
	label: string
	value: string | number
}

export interface DropdownProps {
	className?: string
	label?: string
	error?: string | null

	options: DropdownOption[]

	value: any
	onChange: (value: any) => any
}

export function Dropdown({ label, options, className, error, value, onChange }: DropdownProps) {
	const [isOpen, setIsOpen] = useState(false)

	const ref = useRef(null)
	useOutsideAlerter(ref, () => setIsOpen(false))

	const handler = (v: string | number) => {
		onChange(v)
		setIsOpen(false)
	}

	const currentOption = options.find((o) => o.value === value)

	return (
		<div ref={ref} className={`${styles.wrap} ${error ? styles.error : ''} ${className}`}>
			<label>{label}</label>
			{error ? <p className={styles.message}>{error}</p> : null}
			<div
				className={s(styles, 'dropdown', isOpen ? 'active' : '', error ? 'error' : '')}
				onClick={() => setIsOpen(!isOpen)}
			>
				<span>{currentOption?.label || currentOption?.value || 'Choose option'}</span>
			</div>
			{isOpen && (
				<ul className={styles.content}>
					{options.map((option) => (
						<li key={option.value} onClick={() => handler(option.value)}>
							{option.label}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export interface FormikDropdownProps {
	name: string

	label?: string
	className?: string

	options: DropdownOption[]
}

export function FormikDropdown({ name, options, label, className }: FormikDropdownProps) {
	const [, { value, error, touched }, { setValue, setTouched }] = useField(name)

	const onChange = (v: any) => {
		setTouched(true)
		setValue(v)
	}

	return (
		<Dropdown
			options={options}
			label={label}
			className={className}
			value={value}
			onChange={onChange}
			error={touched && error ? error : null}
		/>
	)
}
