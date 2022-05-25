import { gql } from 'graphql-request'
import { serialize } from 'cookie'

import { Mutation } from '../../../../shared'
import { client } from '../client'

const LogoutMutationDocument = gql`
	mutation {
		logout
	}
`

export async function LogoutMutation(qid: string = '') {
	const res = await client.rawRequest<{ logout: Mutation['logout'] }>(
		LogoutMutationDocument,
		{},
		{
			Cookie: serialize('qid', qid)
		}
	)
	return res.data.logout
}
