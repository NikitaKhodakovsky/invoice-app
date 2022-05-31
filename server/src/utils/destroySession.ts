import { Request, Response } from 'express'

export async function destroySession(req: Request, res: Response): Promise<boolean> {
	return new Promise((resolve, reject) => {
		req.session.destroy((e) => {
			if (e) reject(e)

			res.clearCookie('qid')

			return resolve(true)
		})
	})
}
