import { faker } from '@faker-js/faker'

import { CredentialsInput } from '../../../../shared'

export function CreateMockCredentials(): CredentialsInput {
	return {
		username: faker.internet.userName(),
		password: faker.internet.password()
	}
}
