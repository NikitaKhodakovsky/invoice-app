import { InvoiceService } from '../modules/invoice'
import { AuthService } from '../modules/auth'
import { dataSource } from './dataSource'
import { Context } from '../types'

export function createContext(req: any, res: any): Context {
	const invoiceService = new InvoiceService(dataSource)
	const authService = new AuthService(dataSource)

	const user = undefined // :)

	return {
		invoiceService,
		authService,
		dataSource,
		user,
		req,
		res,
	}
}
