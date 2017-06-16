function create(tag ,ns){
	ns = ns || "http://www.w3.org/2000/svg";
	return document.createElementNS(ns, tag);
}

function obj2attr(o) {
	var res = [], j;
	for (j in o) res.push(j + '(' + o[j] + ')');
	return res.join(' ');
}

function bind(f, obj) {
	return function () {
		var args = [].slice.call(arguments, 0);
		return f.apply(obj, args);
	}
}