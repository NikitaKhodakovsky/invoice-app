import { CreateMockCredentials, Credentials } from '../../../test/mock'
import { RegisterMutation } from './RegisterMutation'
import { LoginMutation } from './LoginMutation'
import { User } from '../../../../shared'

export interface RegisterAndLoginResult {
	credentils: Credentials
	user: User
	qid: string
}

export async function RegisterAndLogin(): Promise<RegisterAndLoginResult> {
	const { username, password } = CreateMockCredentials()

	await RegisterMutation({ username, password, passwordConfirmation: password })

	const { qid, user } = await LoginMutation({ username, password })

	return {
		credentils: {
			username,
			password
		},
		user,
		qid
	}
}
