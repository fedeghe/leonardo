
/**
 * { function_description }
 *
 * @param      {<type>}  tag     The tag
 * @param      {<type>}  ns      { parameter_description }
 * @return     {<type>}  { description_of_the_return_value }
 */
function create(tag ,ns){
	ns = ns || "http://www.w3.org/2000/svg";
	return document.createElementNS(ns, tag);
}

/**
 * { function_description }
 *
 * @param      {string}    o       { parameter_description }
 * @return     {string[]}  { description_of_the_return_value }
 */
function obj2attr(o) {
	var res = [], j;
	for (j in o) res.push(j + '(' + o[j] + ')');
	return res.join(' ');
}

/**
 * { function_description }
 *
 * @param      {<type>}  f       { parameter_description }
 * @param      {<type>}  obj     The object
 * @return     {<type>}  { description_of_the_return_value }
 */
function bind(f, obj) {
	return function () {
		var args = [].slice.call(arguments, 0);
		return f.apply(obj, args);
	}
}

function deg2rad(deg) {
	return deg * Math.PI / 180;
}

function rad2deg(rad) {
	return rad * 180 / Math.PI;
}