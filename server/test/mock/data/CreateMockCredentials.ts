import { faker } from '@faker-js/faker'

import { CredentialsInput } from '../../../src/modules/auth/inputs'

export function CreateMockCredentials(): CredentialsInput {
	return {
		username: faker.internet.userName(),
		password: faker.internet.password()
	}
}
