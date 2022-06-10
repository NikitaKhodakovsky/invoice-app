import { gql, useMutation } from '@apollo/client'

export const LogoutMutation = gql`
	mutation Logout {
		logout
	}
`

export function useLogoutMutation() {
	return useMutation<LogoutMutation, LogoutMutationVariables>(LogoutMutation)
}
