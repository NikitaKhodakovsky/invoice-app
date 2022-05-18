import { DataSource, Repository } from 'typeorm'
import { Request, Response } from 'express'

import { Invoice } from '../modules/invoice'
import { User } from '../modules/user'

export interface Context {
	req: Request
	res: Response
	dataSource: DataSource
	userRepository: Repository<User>
	invoiceRepository: Repository<Invoice>

	//After LoadUser middleware
	user: User
}
