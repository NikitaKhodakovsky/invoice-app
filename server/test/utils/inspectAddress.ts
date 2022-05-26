import { expect } from '@jest/globals'

import { CheckableAddress } from './types'

export function inspectAddress(a: CheckableAddress) {
	expect(typeof a.city).toBe('string')
	expect(typeof a.street).toBe('string')
	expect(typeof a.country).toBe('string')
	expect(typeof a.postCode).toBe('string')
}
