import { APIError } from 'graphql-hooks'
import toast from 'react-hot-toast'

/** If server encounter exception without data he sends response with 4xx or 5xx code and regular graphql response with this exception in body.
 * If client encounter response with 4xx or 5xx code he treat that response as http error and provide that response in httpError.body as string
 * This function merge graphql and http errors and sends toast with message of this errors
 */

export function parseAndHandle(error: APIError) {
	const messages: string[] = []

	if (error.httpError?.body) {
		const parsed = JSON.parse(error.httpError.body)

		if (Array.isArray(parsed.errors)) {
			parsed.errors.forEach((e: any) => typeof e.message === 'string' && messages.push(e.message))
		}
	}

	if (error.graphQLErrors) {
		error.graphQLErrors.forEach((e) => messages.push(e.message))
	}

	messages.forEach((m) => toast(m))
}
