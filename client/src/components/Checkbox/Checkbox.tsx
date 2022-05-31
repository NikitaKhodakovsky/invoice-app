import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import styles from './Checkbox.module.scss'

export interface CheckboxProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label?: string
}

export default function Checkbox({ id, label, ...other }: CheckboxProps) {
	return (
		<div className={styles.wrap}>
			<input type='checkbox' id={id} {...other} />
			{label && <label htmlFor={id}>{label}</label>}
		</div>
	)
}
