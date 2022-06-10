import { gql, useMutation } from '@apollo/client'

const LoginMutation = gql`
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
