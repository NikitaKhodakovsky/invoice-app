import { useField } from 'formik'
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

import styles from './Input.module.scss'

export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label: string
	error?: string
}

export function Input({ label, className, error, ...other }: InputProps) {
	return (
		<div className={`${styles.wrap} ${error ? styles.error : ''} ${className}`}>
			<label>{label}</label>
			{error && <p className={styles.message}>{error}</p>}
			<input {...other} />
		</div>
	)
}

export interface FormikInputProps extends InputProps {
	name: string
}

export function FormikInput({ name, ...other }: FormikInputProps) {
	const [field, { touched, error }] = useField(name)

	return <Input error={touched && error ? error : undefined} {...field} {...other} />
}
