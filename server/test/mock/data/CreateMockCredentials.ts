import { faker } from '@faker-js/faker'

export function CreateMockCredentials(): CredentialsInput {
	return {
		username: faker.internet.userName(),
		password: faker.internet.password()
	}
}
