import { gql } from 'graphql-request'
import { serialize } from 'cookie'

import { MeQuery, MeQueryVariables } from '../../types'
import { client } from '../client'

export const MeQueryDocument = gql`
	query Me {
		me {
			id
			createdAt
			updatedAt
			username
		}
	}
`

export async function meQuery(qid: string = '') {
	const res = await client.rawRequest<MeQuery, MeQueryVariables>(MeQueryDocument, undefined, {
		Cookie: serialize('qid', qid)
	})
	return res.data.me
}
