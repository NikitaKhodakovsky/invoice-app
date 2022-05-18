import { CorsOptions } from 'cors'
import { red } from 'ansi-colors'

function getWhiteList(origin?: string): string[] {
	if (!origin) {
		console.error(red('Invalid origin environment variable'))
		return ['*']
	}

	return origin
		.split(' ')
		.map((url) => url.trim())
		.filter((i) => i.length > 1) //if origins divided by more than one space trim() creates empty strings
}

const whiteList: string[] = getWhiteList(process.env.ORIGIN)

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
