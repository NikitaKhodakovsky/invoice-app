import { DataSource, Repository } from 'typeorm'
import { Request, Response } from 'express'

import { Address, Invoice, OrderItem } from '../modules/invoice'
import { AuthService } from '../modules/auth'
import { User } from '../modules/user'

export interface Context<TUser extends User | undefined = undefined> {
	req: Request
	res: Response
	dataSource: DataSource
	authService: AuthService
	addressRepository: Repository<Address>
	invoiceRepository: Repository<Invoice>
	orderItemRepository: Repository<OrderItem>

	//After LoadUser middleware
	user: TUser
}
