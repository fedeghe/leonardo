
/**
 * { function_description }
 *
 * @param      {<type>}  tag     The tag
 * @param      {<type>}  ns      { parameter_description }
 * @return     {<type>}  { description_of_the_return_value }
 */
function create(tag ,ns){
	ns = ns || namespaces.svg;
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

var lid = (function () {
    var leo_id = 0;

    return function() {
        leo_id++;
        return 'leo_id_' + leo_id;
    }
})()

function getDefs(instance) {
    if (!instance.defs) {
        instance.defs = new Element('defs');
        instance.append(instance.defs);
    }
    return instance.defs;
}