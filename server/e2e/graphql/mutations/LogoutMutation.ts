import { gql } from 'graphql-request'
import { serialize } from 'cookie'

import { LoginMutationVariables, LogoutMutation } from '../../types'
import { client } from '../client'

export const LogoutMutationDocument = gql`
	mutation Logout {
		logout
	}
`

export async function logoutMutation(qid: string = '') {
	const res = await client.rawRequest<LogoutMutation, LoginMutationVariables>(LogoutMutationDocument, undefined, {
		Cookie: serialize('qid', qid)
	})
	return res.data.logout
}
