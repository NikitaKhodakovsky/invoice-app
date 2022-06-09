import { expect } from '@jest/globals'

export function compareAddresses(a?: any, b?: any) {
	if (!a || !b) throw new Error()

	expect(a.city).toBe(b.city)
	expect(a.street).toBe(b.street)
	expect(a.country).toBe(b.country)
	expect(a.postCode).toBe(b.postCode)
}
