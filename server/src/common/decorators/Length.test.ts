import { describe, test, expect } from '@jest/globals'

import { lengthValidation } from './Length'

describe('Length Decorator', () => {
	test('Should return true if conditions are met', () => {
		const result = lengthValidation('hello world', 4, 12)

		expect(result).toBe(true)
	})

	test('Should return false if conditions are not met', () => {
		const result = lengthValidation('hello world', 4, 6)

		expect(result).toBe(false)
	})

	test('Should perform trim before validation', () => {
		const result = lengthValidation('  aa  ', 4)

		expect(result).toBe(false)
	})

	test('Should return false if type of arg is not string', () => {
		const result = lengthValidation(undefined, 4)

		expect(result).toBe(false)
	})
})
