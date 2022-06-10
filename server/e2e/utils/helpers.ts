import { expect } from '@jest/globals'

export function getErrorMessages(e: any): string[] {
	return e.response.errors.map((e: any) => e.message)
}

export function unautorizedCheck(e: any) {
	expect(getErrorMessages(e).includes('Access denied')).toBe(true)
}
