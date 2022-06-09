import { expect } from '@jest/globals'

export function compareUsers(a: any, b: any) {
	expect(a.username).toBe(b.username)
}
