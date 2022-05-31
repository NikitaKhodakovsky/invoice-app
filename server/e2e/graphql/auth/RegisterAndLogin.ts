import { User, CredentialsInput } from '../../../../shared'
import { CreateMockCredentials } from '../../../test/mock'
import { RegisterMutation } from './RegisterMutation'
import { LoginMutation } from './LoginMutation'

export interface RegisterAndLoginResult {
	credentils: CredentialsInput
	user: User
	qid: string
}

export async function RegisterAndLogin(): Promise<RegisterAndLoginResult> {
	const credentils = CreateMockCredentials()

	await RegisterMutation(credentils)

	const { qid, user } = await LoginMutation(credentils)

	return {
		credentils,
		user,
		qid
	}
}
