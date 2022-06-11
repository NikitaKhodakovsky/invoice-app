import { useQuery } from 'graphql-hooks'

export const MeQuery = /* GraphQL */ `
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
		useCache: false
	})
}
