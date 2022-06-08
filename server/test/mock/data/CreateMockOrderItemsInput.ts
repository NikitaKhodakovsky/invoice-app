import { faker } from '@faker-js/faker'

export function CreateMockOrderItemsInput(count: number = 1): CreateOrderItemInput[] {
	const items: CreateOrderItemInput[] = []

	for (let i = 0; i < count; i++) {
		const item: CreateOrderItemInput = {
			name: faker.commerce.productName(),
			price: 900,
			quantity: 10
		}

		items.push(item)
	}

	return items
}
