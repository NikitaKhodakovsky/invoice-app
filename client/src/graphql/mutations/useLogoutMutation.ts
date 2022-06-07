import { gql, useMutation } from '@apollo/client'

export const LogoutMutation = gql`
	mutation {
		logout
	}
`

export function useLogoutMutation() {
	return useMutation<{ logout: Mutation['logout'] }>(LogoutMutation)
}
