
import { useField } from 'formik'

import { Input, InputProps } from './Input'

export interface FormikInputProps extends InputProps {
	name: string
}

export function FormikInput({ name, ...other }: FormikInputProps) {
	const [field, { touched, error }] = useField(name)

	return <Input error={touched && error ? error : undefined} id={name} {...field} {...other} />
}
