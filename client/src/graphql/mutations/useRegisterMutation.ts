import { gql, useMutation } from '@apollo/client'

const RegisterMutation = gql`
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
