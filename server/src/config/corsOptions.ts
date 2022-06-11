import { CorsOptions } from 'cors'

import { parseOrigins } from '../utils'
import { isProduction, ORIGIN } from '../constants'

const whiteList: string[] = parseOrigins(ORIGIN)

const productionOptions: CorsOptions = {
	credentials: true,
	origin: function (origin, callback) {
		if (origin && whiteList.indexOf(origin) !== -1) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	}
}

const devOptions: CorsOptions = {
	credentials: true,
	origin: function (_, callback) {
		callback(null, true)
	}
}

export const corsOptions = isProduction ? productionOptions : devOptions
