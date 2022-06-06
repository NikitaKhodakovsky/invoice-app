import { string } from 'yup'

export const emailSchema = string().email('invalid email').required('required')
export const usernameSchema = string().required('required').min(4, 'To short').max(24, 'To long')
export const passwordSchema = string().required('required').min(8, 'To short').max(32, 'To long')
