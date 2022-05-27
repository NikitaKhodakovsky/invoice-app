import { describe, test, expect } from '@jest/globals'

import { isNotBlankValidation } from './IsNotBlank'

describe('IsNotBlank Decorator', () => {
	test('Should return true if string is not empty', () => {
		const result = isNotBlankValidation('hello world')

		expect(result).toBe(true)
	})

	test('Should return false if string is empty', () => {
		const result = isNotBlankValidation('')

		expect(result).toBe(false)
	})

	test('Should perform trim before validation', () => {
		const result = isNotBlankValidation('    ')

		expect(result).toBe(false)
	})

	test('Should return false if type of arg is not string', () => {
		const result = isNotBlankValidation(undefined)

		expect(result).toBe(false)
	})
})
