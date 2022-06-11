import { useMutation } from 'graphql-hooks'

export const LogoutMutation = /* GraphQL */ `
	mutation Logout {
		logout
	}
`

export function useLogoutMutation() {
	return useMutation<LogoutMutation, LogoutMutationVariables>(LogoutMutation)
}
