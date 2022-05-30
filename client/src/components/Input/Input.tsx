import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'

export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label: string
}

export function Input({ label, className, ...other }: InputProps) {
	return (
		<div className={`${styles.wrap} ${className}`}>
			<label>{label}</label>
			<input {...other} />
		</div>
	)
}
