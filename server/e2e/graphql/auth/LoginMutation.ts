import { gql } from 'graphql-request'
import cookie from 'cookie'

import { CredentialsInput, Mutation } from '../../../../shared'
import { client } from '../client'

const LoginMutationDocument = gql`
	mutation ($data: CredentialsInput!) {
		login(data: $data) {
			id
			createdAt
			updatedAt
			username
		}
	}
`

export async function LoginMutation(data: CredentialsInput) {
	const res = await client.rawRequest<{ login: Mutation['login'] }, { data: CredentialsInput }>(
		LoginMutationDocument,
		{
			data
		}
	)

	const cookies = res.headers.get('Set-Cookie')

	const parsed = cookie.parse(cookies as string)

	return {
		qid: parsed['qid'],
		user: res.data.login
	}
}
