import { gql, useQuery } from '@apollo/client'

export const MeQuery = gql`
	query {
		me {
			id
			createdAt
			updatedAt
			username
		}
	}
`

export function useMeQuery() {
	return useQuery<{ me: Query['me'] }>(MeQuery, {
		fetchPolicy: 'no-cache'
	})
}
