import { gql } from 'graphql-request'

import { CredentialsInput, RegisterMutation, RegisterMutationVariables } from '../../types'
import { client } from '../client'

const RegisterMutationDocument = gql`
	mutation Register($data: CredentialsInput!) {
		register(data: $data) {
			id
			createdAt
			updatedAt
			username
		}
	}
`

export async function registerMutation(data: CredentialsInput) {
	const res = await client.rawRequest<RegisterMutation, RegisterMutationVariables>(RegisterMutationDocument, {
		data
	})

	return res.data.register
}
