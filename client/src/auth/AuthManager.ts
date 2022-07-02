export type Subscriber = (auth: boolean) => any
export type UnsubscribeFunction = () => void

export interface AuthManagerOptions {
	auth?: boolean
}

export class AuthManager {
	private subscribers: Subscriber[] = []
	private auth: boolean

	constructor({ auth }: AuthManagerOptions = {}) {
		const prevAuth = localStorage.getItem('auth') === 'true'
		this.auth = auth || prevAuth
	}

	public subscribe(subscriber: Subscriber): UnsubscribeFunction {
		this.subscribers.push(subscriber)
		return () => (this.subscribers = this.subscribers.filter((s) => s !== subscriber))
	}

	public setAuth(auth: boolean) {
		this.auth = auth

		if (auth) {
			localStorage.setItem('auth', 'true')
		} else {
			localStorage.removeItem('auth')
		}

		this.subscribers.forEach((s) => s(this.getAuth()))
	}

	public getAuth() {
		return this.auth
	}
}
