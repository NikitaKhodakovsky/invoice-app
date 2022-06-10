import { loginMutation, registerMutation } from '../graphql/mutations'
import { CreateMockCredentials } from '../../test/mock'
import { CredentialsInput, User } from '../types'

export interface RegisterAndLoginResult {
	credentils: CredentialsInput
	user: User
	qid: string
}

export async function registerAndLogin(): Promise<RegisterAndLoginResult> {
	const credentils = CreateMockCredentials()

	await registerMutation(credentils)

	const { qid, user } = await loginMutation(credentils)

	return {
		credentils,
		user,
		qid
	}
}
