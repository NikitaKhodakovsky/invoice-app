import { gql, useMutation } from '@apollo/client'
import { CredentialsInput, Mutation } from '../../types/graphql'

const LoginMutation = gql`
	mutation ($credentials: CredentialsInput!) {
		login(data: $credentials) {
			id
			createdAt
			updatedAt
			username
		}
	}
`

export function useLoginMutation() {
	return useMutation<{ login: Mutation['login'] }, { credentials: CredentialsInput }>(LoginMutation)
}
