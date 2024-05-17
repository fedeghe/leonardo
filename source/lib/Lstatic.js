/**
 * static function to import a documentor a string
 * @param {*} d 
 */
// external use with Leo
// internal use with L
// proto
Leo.import = L.import = L.prototype.import =function (d) {
	// document of string ?
	if (typeof d === 'string') {
		d = L.toDocument(d);
	}
	var newL = new L(1, 1);
	newL.tag = d;
	return newL;
};

/**
 * 
 */
Leo.getqs = L.getqs= L.prototype.getqs = function () {
	var q = window.location.search.substring(1),
		els = q.split('&'),
		qs = {}, tmp, el;
	for (tmp in els) {
		el = els[tmp].split('=');
		qs[el[0]] = el.length > 1 ? decodeURIComponent(el[1]) : null;
	}
	return qs;
};

/**
 * 
 */
Leo.toString = L.toString= L.prototype.toString = function (SVGDocument) {
	var tmpParent = document.createElement('div');
	tmpParent.appendChild(SVGDocument);
	return tmpParent.innerHTML;
};

/**
 * 
 * @param {*} SVGString 
 * @returns 
 */
Leo.toDocument = L.toDocument = L.prototype.toDocument = function (SVGString) {
	const parser = new DOMParser();
	return parser.parseFromString(SVGString, 'image/svg+xml').children[0];
};

/**
 * 
 * @param {\} full 
 * @returns 
 */
Leo.randomColor = L.randomColor = L.prototype.randomColor = function (full) {
	var len = full ? 6 : 3,
		base = full ? 16777215 : 4095,
		r = (~~(Math.random() * base)).toString(16);
	while (r.length < len) r = '0' + r;
	return r;
};

/**
 * @param top input top range value needed
 * @param scale defaulted to 100
 * @param zoom
 * @param precision
 * 
 * @returns function
 * scaler function accepting a number in [0,scale] and
 * returning the mapped value in [0, top]
 * 
 */
Leo.getScaler = L.getScaler = L.prototype.getScaler = function (top, scale, zoom, precision) {
	scale = 'undefined' !== typeof scale ? ~~scale : 100;
	zoom = 'undefined' !== typeof zoom ? ~~zoom : 1;
	precision = 'undefined' !== typeof precision ? ~~precision : 1;
	return function (p) {
		return parseFloat((p * zoom * top / scale).toFixed(precision), 10);
	}
};