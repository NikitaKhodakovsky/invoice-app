import { gql } from 'graphql-request'

import { Mutation, CredentialsInput } from '../../../../shared'
import { client } from '../client'

const RegisterMutationDocument = gql`
	mutation ($data: CredentialsInput!) {
		register(data: $data) {
			id
			createdAt
			updatedAt
			username
		}
	}
`

export async function RegisterMutation(data: CredentialsInput) {
	const res = await client.rawRequest<{ register: Mutation['register'] }, { data: CredentialsInput }>(
		RegisterMutationDocument,
		{
			data
		}
	)

	return res.data.register
}
