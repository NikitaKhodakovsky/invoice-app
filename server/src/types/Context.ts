import { DataSource, Repository } from 'typeorm'
import { Request, Response } from 'express'

import { User } from '../modules/user'

export interface Context {
	req: Request
	res: Response
	dataSource: DataSource
	userRepository: Repository<User>

	//After LoadUser middleware
	user: User
}
