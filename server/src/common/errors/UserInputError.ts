import { GraphQLError } from 'graphql'

export class UserInputError extends GraphQLError {
	constructor(message?: string) {
		super(message || 'Bad User Input')
	}
}
