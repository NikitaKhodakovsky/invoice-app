import { HTMLAttributes, HTMLInputTypeAttribute } from 'react'
import styles from './Input.module.scss'

export interface InputProps extends HTMLAttributes<HTMLDivElement> {
	label: string
	type?: HTMLInputTypeAttribute
}

export function Input({ label, className, type = 'text' }: InputProps) {
	return (
		<div className={`${styles.wrap} ${className}`}>
			<label>{label}</label>
			<input type={type} />
		</div>
	)
}
