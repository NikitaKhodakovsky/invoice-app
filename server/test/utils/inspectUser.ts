import { expect } from '@jest/globals'

import { CheckableUser } from './types'

export function inspectUser(user: CheckableUser) {
	expect(typeof user.username).toBe('string')
}
