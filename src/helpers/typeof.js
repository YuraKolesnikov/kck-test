export const getTypeOf = variable => {
	if (typeof variable != 'number') {
		const result = ({}).toString.call(variable).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
		return result === 'uint'
			? 'buffer'
			: result

	}
	return isNaN(variable) ? 'nan' : 'number'
}
