import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

import styles from './Input.module.scss'

export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label: string
	error?: string
	id?: string 
}

export function Input({ label, id, className, error, ...other }: InputProps) {
	return (
		<div className={`${styles.wrap} ${error ? styles.error : ''} ${className}`}>
			<label htmlFor={id || label}>{label}</label>
			{error && <p className={styles.message}>{error}</p>}
			<input id={id || label} {...other} />
		</div>
	)
}
