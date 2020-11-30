const supportsNativeSmoothScroll =
	typeof document !== 'undefined'
	&& 'scrollBehavior' in document.documentElement.style;

export const scrollTo = (x, y) => {
	if (supportsNativeSmoothScroll) {
		window.scrollTo({
			top: y,
			left: x,
			behavior: 'smooth',
		});
	} else {
		window.scrollTo(x, y);
	}
}
