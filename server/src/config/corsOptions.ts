import { CorsOptions } from 'cors'

import { ORIGIN } from '../constants/config'
import { isProduction } from '../constants'
import { parseOrigins } from '../utils'

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
