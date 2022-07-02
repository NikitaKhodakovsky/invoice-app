import { IsInt, IsNotEmpty, IsString, Max, Min, validateSync, ValidationArguments } from 'class-validator'
import { red, yellow } from 'ansi-colors'

const portValidationMessage = ({ property }: ValidationArguments) => `${property} must be in range from 0 to 65536`

class Config {
	@IsInt()
	@Min(0, { message: portValidationMessage })
	@Max(65536, { message: portValidationMessage })
	public PORT: number

	@IsString()
	@IsNotEmpty()
	public ORIGIN: string

	@IsString()
	@IsNotEmpty()
	public SESSION_SECRET: string

	@IsString()
	@IsNotEmpty()
	public REDIS_HOST: string

	@IsInt()
	@Min(0, { message: portValidationMessage })
	@Max(65536, { message: portValidationMessage })
	public REDIS_PORT: number

	@IsString()
	@IsNotEmpty()
	public REDIS_PASSWORD: string

	@IsString()
	@IsNotEmpty()
	public DB_HOST: string

	@IsInt()
	@Min(0, { message: portValidationMessage })
	@Max(65536, { message: portValidationMessage })
	public DB_PORT: number

	@IsString()
	@IsNotEmpty()
	public DB_USERNAME: string

	@IsString()
	@IsNotEmpty()
	public DB_PASSWORD: string

	@IsString()
	@IsNotEmpty()
	public DB_DATABASE: string
}

const config = new Config()

config.PORT = parseInt(process.env.PORT || '')
config.ORIGIN = process.env.ORIGIN as string
config.SESSION_SECRET = process.env.SESSION_SECRET as string

config.REDIS_HOST = process.env.REDIS_HOST as string
config.REDIS_PORT = parseInt(process.env.REDIS_PORT || '')
config.REDIS_PASSWORD = process.env.REDIS_PASSWORD as string

config.DB_HOST = process.env.DB_HOST as string
config.DB_PORT = parseInt(process.env.DB_PORT || '')
config.DB_USERNAME = process.env.DB_USERNAME as string
config.DB_PASSWORD = process.env.DB_PASSWORD as string
config.DB_DATABASE = process.env.DB_DATABASE as string

if (!config.REDIS_HOST) {
	const host = 'redis'
	console.log(yellow(`REDIS_HOST variable is not provided. Defaulting to ${host}`))
	config.REDIS_HOST = host
}

if (!config.REDIS_PORT) {
	const port = 6379
	console.log(yellow(`REDIS_PORT variable is not provided. Defaulting to ${port}`))
	config.REDIS_PORT = port
}

if (!config.DB_HOST) {
	const host = 'postgres'
	console.log(yellow(`DB_HOST variable is not provided. Defaulting to ${host}`))
	config.DB_HOST = host
}

if (!config.DB_PORT) {
	const port = 5432
	console.log(yellow(`DB_PORT variable is not provided. Defaulting to ${port}`))
	config.DB_PORT = port
}

if (!config.DB_DATABASE) {
	const database = 'postgres'
	console.log(yellow(`DB_DATABASE variable is not provided. Defaulting to ${database}`))
	config.DB_DATABASE = database
}

const result = validateSync(config)

if (result.length !== 0) {
	console.error(red('Environment variables validation error'))
	for (let i = 0; i < result.length; i++) {
		const { constraints } = result[i]
		const messages = Object.values(constraints || {})
		messages.forEach((message) => console.error(red(message)))
	}
	process.exit(1)
}

export const {
	PORT,
	ORIGIN,
	SESSION_SECRET,
	REDIS_HOST,
	REDIS_PORT,
	REDIS_PASSWORD,
	DB_HOST,
	DB_PORT,
	DB_USERNAME,
	DB_PASSWORD,
	DB_DATABASE,
} = config
