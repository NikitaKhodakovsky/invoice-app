import parse from 'url-parse'

export function parseOrigins(origin?: string): string[] {
	if (!origin) throw new Error('Invalid origin variable')

	const urls = origin
		.split(' ')
		.map((url) => url.trim())
		.filter((i) => i.length > 1) //if origins divided by more than one space trim() creates empty strings
		.map((url) => {
			const origin = parse(url).origin

			if (origin === 'null') {
				throw new Error('Invalid Origin url')
			}

			return origin
		})

	return urls
}
