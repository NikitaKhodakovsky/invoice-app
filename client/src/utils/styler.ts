export function styler(styles: Record<string, string>, ...names: (string | undefined)[]) {
	const filteredNames = names.filter((i) => typeof i === 'string') as string[]

	return filteredNames.reduce((prev, current) => {
		if (!styles[current]) return prev

		return prev + ' ' + styles[current]
	}, '')
}
