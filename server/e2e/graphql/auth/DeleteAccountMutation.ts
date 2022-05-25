import { gql } from 'graphql-request'
import { serialize } from 'cookie'

import { Mutation } from '../../../../shared'
import { client } from '../client'

const DeleteAccountMutationDocument = gql`
	mutation {
		deleteAccount
	}
`

export async function DeleteAccountMutation(qid: string = '') {
	const res = await client.rawRequest<{ deleteAccount: Mutation['deleteAccount'] }>(
		DeleteAccountMutationDocument,
		{},
		{
			Cookie: serialize('qid', qid)
		}
	)
	return res.data.deleteAccount
}
