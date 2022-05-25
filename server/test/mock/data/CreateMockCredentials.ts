import { faker } from '@faker-js/faker'

export interface Credentials {
	username: string
	password: string
}

export function CreateMockCredentials(): Credentials {
	return {
		username: faker.internet.userName(),
		password: faker.internet.password()
	}
}
