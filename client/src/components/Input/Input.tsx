import { HTMLAttributes } from 'react'
import styles from './Input.module.scss'

export interface InputProps extends HTMLAttributes<HTMLDivElement> {
	label: string
}

export function Input({ label, className }: InputProps) {
	return (
		<div className={`${styles.wrap} ${className}`}>
			<label>{label}</label>
			<input type='text' />
		</div>
	)
}
