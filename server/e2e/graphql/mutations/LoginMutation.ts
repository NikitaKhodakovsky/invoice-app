import { gql } from 'graphql-request'
import cookie from 'cookie'

import { CredentialsInput, LoginMutation, LoginMutationVariables } from '../../types'
import { client } from '../client'

export const LoginMutationDocument = gql`
	mutation Login($data: CredentialsInput!) {
		login(data: $data) {
			id
			createdAt
			updatedAt
			username
		}
	}
`

export async function loginMutation(data: CredentialsInput) {
	const res = await client.rawRequest<LoginMutation, LoginMutationVariables>(LoginMutationDocument, {
		data
	})

	const cookies = res.headers.get('Set-Cookie')

	const parsed = cookie.parse(cookies as string)

	return {
		qid: parsed['qid'],
		user: res.data.login
	}
}
