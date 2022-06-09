import { expect } from '@jest/globals'

export function inspectOrderItems(orderItems?: any[]) {
	if (!orderItems) throw new Error()

	orderItems.forEach(({ name, price, quantity }) => {
		expect(typeof name).toBe('string')
		expect(typeof price).toBe('number')
		expect(typeof quantity).toBe('number')
	})
}
