import { expect } from '@jest/globals'

export function inspectAddress(a?: any) {
	if (!a) throw new Error()

	expect(typeof a.city).toBe('string')
	expect(typeof a.street).toBe('string')
	expect(typeof a.country).toBe('string')
	expect(typeof a.postCode).toBe('string')
}
