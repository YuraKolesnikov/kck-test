import { getTypeOf } from './typeof';

export const clearObject = (obj, mode = 'soft') => {
	Object.keys(obj).forEach(field => {
		const type = getTypeOf(obj[field])

		if (type === 'map') {
			obj[field] = new Map()
		} else if (type === 'set') {
			obj[field] = new Set()
		} else if (type === 'object') {
			if (mode === 'soft') {
				clearObject(obj[field])
			} else
				obj[field] = {}
		} else if (type === 'array') {
			obj[field] = []
		} else if (type === 'number') {
			obj[field] = 0
		} else if (type === 'boolean') {
			obj[field] = false
		} else if (type === 'string') {
			obj[field] = ''
		} else {
			obj[field] = null
		}
	})
}
