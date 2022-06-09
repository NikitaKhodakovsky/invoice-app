import { expect } from '@jest/globals'

export function compareOrderItems(a?: any, b?: any) {
	if (!a || !b) throw new Error()

	expect(a.name).toBe(b.name)
	expect(a.price).toBe(b.price)
	expect(a.quantity).toBe(b.quantity)
}
