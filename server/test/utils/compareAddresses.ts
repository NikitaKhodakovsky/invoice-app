import { expect } from '@jest/globals'

import { CheckableAddress } from './types'

export function compareAddresses(a: CheckableAddress, b: CheckableAddress) {
	expect(a.city).toBe(b.city)
	expect(a.street).toBe(b.street)
	expect(a.country).toBe(b.country)
	expect(a.postCode).toBe(b.postCode)
}
