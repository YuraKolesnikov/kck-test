import clickoutside from './clickoutside';

export const GlobalDirectives = {
	install (Vue) {
		Vue.directive('clickoutside', clickoutside)
	}
}