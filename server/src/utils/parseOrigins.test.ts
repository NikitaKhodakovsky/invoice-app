import { expect, test } from '@jest/globals'

import { parseOrigins } from './parseOrigins'

test('Should return Origins from the string', () => {
	const result = parseOrigins('https://www.deepl.com   http://localhost:3000')

	expect(result).toEqual(['https://www.deepl.com', 'http://localhost:3000'])
})

test('Should extract Origin correctly', () => {
	const result = parseOrigins('https://www.deepl.com/translate http://localhost:3000/orders')

	expect(result).toEqual(['https://www.deepl.com', 'http://localhost:3000'])
})

test('Should throw an error on invalid url', () => {
	const fn = () => parseOrigins('hello world')

	expect(fn).toThrowError()
})

test('Should throw an error if origin not provided', () => {
	const fn = () => parseOrigins()

	expect(fn).toThrowError()
})
