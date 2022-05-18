import { BuildSchemaOptions } from 'type-graphql'

import { DeleteAccountResolver } from './DeleteAccountResolver'
import { RegisterResolver } from './RegisterResolver'
import { LogoutResolver } from './LogoutResolver'
import { LoginResolver } from './LoginResolver'

export const AuthResolvers: BuildSchemaOptions['resolvers'] = [
	RegisterResolver,
	LoginResolver,
	LogoutResolver,
	DeleteAccountResolver
]
