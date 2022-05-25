import { DataSource, Repository } from 'typeorm'
import { Request, Response } from 'express'

import { Address, Invoice, OrderItem, InvoiceService } from '../modules/invoice'
import { AuthService } from '../modules/auth'
import { User } from '../modules/user'

export interface Context<TUser extends User | undefined = undefined> {
	req: Request
	res: Response
	dataSource: DataSource
	authService: AuthService
	invoiceService: InvoiceService

	//After LoadUser middleware
	user: TUser
}
