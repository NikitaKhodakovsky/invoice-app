import { HTMLAttributes, MouseEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowButton } from '../ArrowButton'

export interface BackButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export function BackButton({ onClick, ...other }: BackButtonProps) {
	const navigate = useNavigate()

	const handler: MouseEventHandler<HTMLButtonElement> = (e) => {
		if (onClick) {
			onClick(e)
		}

		navigate(-1)
	}

	return <ArrowButton message='Go back' direction='left' onClick={handler} {...other} />
}
