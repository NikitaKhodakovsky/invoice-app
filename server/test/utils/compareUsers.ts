import { expect } from '@jest/globals'

import { CheckableUser } from './types'

export function compareUsers(a: CheckableUser, b: CheckableUser) {
	expect(a.username).toBe(b.username)
}
