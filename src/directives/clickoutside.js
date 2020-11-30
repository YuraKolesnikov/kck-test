import Vue from 'vue';

function bind(el, binding, vnode) {
	unbind(el);
	const vm = vnode.context;
	const callback = binding.value;
	if (typeof callback !== 'function') {
		// eslint-disable-next-line no-constant-condition
		if ('development' !== 'production') {
			Vue.util.warn(
				'v-' + binding.name + '="' + binding.expression + '" expects a function value, ' + 'got ' + callback
			);
		}
		return;
	}
	let initialMacrotaskEnded = false;
	setTimeout(function () {
		initialMacrotaskEnded = true;
	}, 0);
	el[HANDLER] = function (ev) {
		const path = ev.path || (ev.composedPath ? ev.composedPath() : undefined);
		if (initialMacrotaskEnded && (path ? path.indexOf(el) < 0 : !el.contains(ev.target))) {
			return callback.call(vm, ev);
		}
	};
	document.documentElement.addEventListener('click', el[HANDLER], false);
}

function unbind(el) {
	document.documentElement.removeEventListener('click', el[HANDLER], false);
	delete el[HANDLER];
}

const HANDLER = '_click_outside_handler';

export default {
	bind: bind,
	update(el, binding, vnode) {
		if (binding.value === binding.oldValue) return;
		bind(el, binding, vnode);
	},
	unbind: unbind
};
