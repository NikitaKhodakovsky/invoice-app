import { CorsOptions } from 'cors'

import { parseOrigins } from '../utils'

const whiteList: string[] = parseOrigins(process.env.ORIGIN)

export const corsOptions: CorsOptions = {
	credentials: true,
	origin: function (origin, callback) {
		if (origin && whiteList.indexOf(origin) !== -1) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	}
}
