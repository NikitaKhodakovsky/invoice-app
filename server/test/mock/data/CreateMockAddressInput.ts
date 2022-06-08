import { faker } from '@faker-js/faker'

export function CreateMockAddressInput(): CreateAddressInput {
	return {
		country: faker.address.country(),
		city: faker.address.cityName(),
		postCode: faker.address.zipCode(),
		street: faker.address.street()
	}
}
