/**
 * static function to import a documentor a string
 * @param {*} d 
 */
L.import = function (d) {
	// document of string ?
	if (typeof d === 'string') {
		d = L.toDocument(d);
	}
	var newL = new L(1, 1);
	newL.tag = d.children[0];
	return newL;
};

/**
 * 
 */
L.getqs = function () {
	var q = document.location.search.substr(1),
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
L.toString = function (SVGDocument) {
	var tmpParent = document.createElement('div');
	tmpParent.appendChild(SVGDocument);
	return tmpParent.innerHTML;
};

/**
 * 
 */
L.toDocument = function (SVGString) {
	const parser = new DOMParser();
	return parser.parseFromString(SVGString, 'image/svg+xml');
};