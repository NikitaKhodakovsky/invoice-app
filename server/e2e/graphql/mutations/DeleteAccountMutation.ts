import { gql } from 'graphql-request'
import { serialize } from 'cookie'

import { DeleteAccountMutation, DeleteAccountMutationVariables } from '../../types'

import { client } from '../client'

export const DeleteAccountMutationDocument = gql`
	mutation DeleteAccount {
		deleteAccount
	}
`

export async function deleteAccountMutation(qid: string = '') {
	const res = await client.rawRequest<DeleteAccountMutation, DeleteAccountMutationVariables>(
		DeleteAccountMutationDocument,
		{},
		{
			Cookie: serialize('qid', qid)
		}
	)
	return res.data.deleteAccount
}
