import { BuildSchemaOptions } from 'type-graphql'

import { DeleteAccountResolver } from './DeleteAccountResolver'
import { RegisterResolver } from './RegisterResolver'
import { LogoutResolver } from './LogoutResolver'
import { LoginResolver } from './LoginResolver'
import { MeResolver } from './MeResolver'

export const AuthResolvers: BuildSchemaOptions['resolvers'] = [
	DeleteAccountResolver,
	RegisterResolver,
	LoginResolver,
	LogoutResolver,
	MeResolver
]
