export function styler(styles: Record<string, string>, ...names: string[]) {
	return names.reduce((prev, current) => {
		if (!styles[current]) return prev

		return prev + ' ' + styles[current]
	}, '')
}
