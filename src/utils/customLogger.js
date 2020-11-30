/* TODO: Добавить новые опции, обработчик ошибок */

export const customLogger = ({ message, type = 'log', source = undefined, data }) => {
	let color;

	switch (source) {
		case 'component':
			color = '#38DCE1';
			break;
		case 'vuex':
			color = '#41B883';
			break;
		case 'api':
			color = '#EB5A46';
			break;
		default:
			source = 'default';
			color = '#5E5E5E';
			break;
	}

	if (!type) {
		console.log(
			`%c[${source.toUpperCase()} MESSAGE] ${message}`,
			`color: ${color}`
		);
		return console.dir(data || '');
	}

	if (type == 'groupStart') {
		return console.groupCollapsed(`%c[${message}]:`, `color: ${color}`);
	}

	console[type](
		`%c[${source.toUpperCase()} MESSAGE] ${message}`,
		`color: ${color}`

	);
	console[type](data || '');
};
