import { Query, Resolver, UseMiddleware } from 'type-graphql'
import { LoadUser } from './common/middleware'

@Resolver()
export class TestResolver {
	@Query(() => String)
	ping() {
		return 'pong'
	}

	@Query(() => String)
	@UseMiddleware(LoadUser)
	authorizedPing() {
		return 'authorized pong'
	}
}
