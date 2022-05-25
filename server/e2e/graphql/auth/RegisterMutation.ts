import { gql } from 'graphql-request'

import { Mutation, RegisterInput } from '../../../../shared'
import { client } from '../client'

const RegisterMutationDocument = gql`
	mutation ($data: RegisterInput!) {
		register(data: $data) {
			id
			createdAt
			updatedAt
			username
		}
	}
`

export async function RegisterMutation(data: RegisterInput) {
	const res = await client.rawRequest<{ register: Mutation['register'] }, { data: RegisterInput }>(
		RegisterMutationDocument,
		{
			data
		}
	)

	return res.data.register
}
