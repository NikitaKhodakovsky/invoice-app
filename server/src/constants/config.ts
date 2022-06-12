import { red, bold, yellow } from 'ansi-colors'

function setDefaultString(name: string, defaultValue: string, value?: string): string {
	let result: string

	if (!value) {
		result = defaultValue
		console.warn(yellow(`${bold(name)} variable is not provided. Set default ${bold(defaultValue)}`))
	} else {
		result = value
	}

	return result
}

function setDefaultInt(name: string, defaultValue: number, value?: string): number {
	let result: number

	if (!value) {
		result = defaultValue
		console.warn(yellow(`${bold(name)} variable is not provided. Set default ${bold(defaultValue.toString())}`))
	} else {
		const parsedValue = parseInt(value)
		if (isNaN(parsedValue)) {
			console.log(yellow(`${bold(name)} has invalid value. Set default ${bold(defaultValue.toString())}`))
			result = defaultValue
		} else {
			result = parsedValue
		}
	}

	return result
}

function throwIfNotProvided(name: string, value?: string): string {
	if (!value) throw new Error(`${name} variable is not provided`)

	return value
}

interface Config {
	PORT: number
	SESSION_SECRET: string
	ORIGIN: string

	DB_HOST: string
	DB_PORT: number
	DB_USERNAME: string
	DB_PASSWORD: string
	DB_DATABASE: string

	REDIS_PORT: number
	REDIS_HOST: string
}

function getConfig(): Config | void {
	try {
		const PORT = setDefaultInt('PORT', 4200, process.env.PORT)

		const SESSION_SECRET = throwIfNotProvided('SESSION_SECRET', process.env.SESSION_SECRET)

		const ORIGIN = throwIfNotProvided('ORIGIN', process.env.ORIGIN)

		const DB_HOST = setDefaultString('DB_HOST', 'localhost', process.env.DB_HOST)
		const DB_PORT = setDefaultInt('DB_PORT', 5432, process.env.DB_PORT)
		const DB_USERNAME = throwIfNotProvided('DB_USERNAME', process.env.DB_USERNAME)
		const DB_PASSWORD = throwIfNotProvided('DB_PASSWORD', process.env.DB_PASSWORD)
		const DB_DATABASE = setDefaultString('DB_DATABASE', 'postgres', process.env.DB_DATABASE)

		const REDIS_PORT = setDefaultInt('REDIS_PORT', 6379, process.env.REDIS_PORT)
		const REDIS_HOST = setDefaultString('REDIS_HOST', 'localhost', process.env.REDIS_HOST)

		return {
			PORT,
			DB_DATABASE,
			DB_HOST,
			DB_PORT,
			DB_USERNAME,
			DB_PASSWORD,
			REDIS_HOST,
			SESSION_SECRET,
			ORIGIN,
			REDIS_PORT
		}
	} catch (e: any) {
		console.error(red(e?.message))
		process.exit()
	}
}

export const {
	PORT,
	DB_DATABASE,
	DB_HOST,
	DB_PORT,
	DB_USERNAME,
	DB_PASSWORD,
	REDIS_HOST,
	SESSION_SECRET,
	ORIGIN,
	REDIS_PORT
} = getConfig() || {}
