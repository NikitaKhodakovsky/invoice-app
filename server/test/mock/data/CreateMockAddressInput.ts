import { faker } from '@faker-js/faker'

import { CreateAddressInput } from '../../../../shared'

export function CreateMockAddressInput(): CreateAddressInput {
	return {
		country: faker.address.country(),
		city: faker.address.cityName(),
		postCode: faker.address.zipCode(),
		street: faker.address.street()
	}
}
