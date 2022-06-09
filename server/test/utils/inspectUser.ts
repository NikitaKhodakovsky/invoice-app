import { expect } from '@jest/globals'

export function inspectUser(user: any) {
	expect(typeof user.username).toBe('string')
}
