import { HTMLAttributes } from 'react'

import { styler as s } from '../../utils'

import styles from './ArrowButton.module.scss'

export interface ArrowButtonProps extends HTMLAttributes<HTMLButtonElement> {
	direction?: 'left' | 'right'
	message: string
}

export function ArrowButton({ message, direction, className, ...other }: ArrowButtonProps) {
	return (
		<button className={`${className} ${s(styles, 'button', direction === 'left' ? 'left' : 'right')} `} {...other}>
			{message}
		</button>
	)
}
