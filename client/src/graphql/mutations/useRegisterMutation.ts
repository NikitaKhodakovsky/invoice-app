import { gql, useMutation } from '@apollo/client'

import { CredentialsInput, Mutation } from '../../types/graphql'

const RegisterMutation = gql`
	mutation ($credentials: CredentialsInput!) {
		register(data: $credentials) {
			id
			createdAt
			updatedAt
			username
		}
	}
`

export function useRegisterMutation() {
	return useMutation<{ register: Mutation['register'] }, { credentials: CredentialsInput }>(RegisterMutation)
}