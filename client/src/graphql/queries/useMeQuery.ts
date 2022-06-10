import { gql, useQuery } from '@apollo/client'

export const MeQuery = gql`
	query Me {
		me {
			id
			createdAt
			updatedAt
			username
		}
	}
`

export function useMeQuery() {
	return useQuery<MeQuery, MeQueryVariables>(MeQuery, {
		fetchPolicy: 'no-cache'
	})
}
