import { DataSource, Repository } from 'typeorm'
import { Request, Response } from 'express'

import { Address, Invoice } from '../modules/invoice'
import { User } from '../modules/user'

export interface Context {
	req: Request
	res: Response
	dataSource: DataSource
	userRepository: Repository<User>
	addressRepository: Repository<Address>
	invoiceRepository: Repository<Invoice>

	//After LoadUser middleware
	user: User
}
