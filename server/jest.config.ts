import { Config } from '@jest/types'

const config: Config.InitialOptions = {
	preset: 'ts-jest',
	verbose: true,
	testEnvironment: 'node',
	setupFilesAfterEnv: ['./jest.setup.ts']
}

export default config
