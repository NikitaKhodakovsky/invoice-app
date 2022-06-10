import { faker } from '@faker-js/faker'

import { CreateAddressInput } from '../../../src/modules/invoice/inputs'

export function CreateMockAddressInput(): CreateAddressInput {
	return {
		country: faker.address.country(),
		city: faker.address.cityName(),
		postCode: faker.address.zipCode(),
		street: faker.address.street()
	}
}
