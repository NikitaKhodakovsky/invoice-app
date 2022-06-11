import { useMutation } from 'graphql-hooks'

export const RegisterMutation = /* GraphQL */ `
	mutation Register($credentials: CredentialsInput!) {
		register(data: $credentials) {
			id
			createdAt
			updatedAt
			username
		}
	}
`

export function useRegisterMutation() {
	return useMutation<RegisterMutation, RegisterMutationVariables>(RegisterMutation)
}
