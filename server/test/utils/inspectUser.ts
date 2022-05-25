import { expect } from '@jest/globals'

import { User } from '../../src/modules/user'

export function inspectUser(user: User) {
	expect(user.id).toBeDefined()
	expect(user.username).toBeDefined()
	expect(user.password).toBeDefined()
}
