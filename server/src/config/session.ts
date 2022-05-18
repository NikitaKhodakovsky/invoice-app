import configSession, { SessionOptions } from 'express-session'
import ms from 'milliseconds'

export const session = configSession({
	secret: process.env.SESSION_SECRET,
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
