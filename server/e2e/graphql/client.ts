import { GraphQLClient } from 'graphql-request'

import { url } from '../config.json'

export const client = new GraphQLClient(url, {
	credentials: 'include',
	mode: 'same-origin',
	headers: {
		Origin: 'https://e2e.test',
		'X-Forwarded-Proto': 'https'
	}
})
