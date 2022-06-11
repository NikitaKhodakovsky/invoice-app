import { useMutation } from 'graphql-hooks'

export const LoginMutation = /* GraphQL */ `
	mutation Login($credentials: CredentialsInput!) {
		login(data: $credentials) {
			id
			createdAt
			updatedAt
			username
		}
	}
`

export function useLoginMutation() {
	return useMutation<LoginMutation, LoginMutationVariables>(LoginMutation)
}
