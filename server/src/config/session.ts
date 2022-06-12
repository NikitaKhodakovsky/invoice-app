import configSession, { SessionOptions } from 'express-session'
import connectRedis from 'connect-redis'
import ms from 'milliseconds'
import Redis from 'ioredis'

import { REDIS_HOST, REDIS_PORT, SESSION_SECRET } from '../constants/config'

const RedisStore = connectRedis(configSession)

const client = new Redis({
	port: REDIS_PORT,
	host: REDIS_HOST
})

export const session = configSession({
	secret: SESSION_SECRET,
	store: new RedisStore({ client }),
	httpOnly: true,
	name: 'qid',
	resave: false,
	saveUninitialized: false,
	cookie: {
		httpOnly: true,
		secure: true,
		maxAge: ms.years(1),
		sameSite: 'none'
	}
} as SessionOptions)
