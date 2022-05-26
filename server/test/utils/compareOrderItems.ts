import { expect } from '@jest/globals'

import { CheckableOrderItem } from './types'

export function compareOrderItems(a: CheckableOrderItem, b: CheckableOrderItem) {
	expect(a.name).toBe(b.name)
	expect(a.price).toBe(b.price)
	expect(a.quantity).toBe(b.quantity)
}
