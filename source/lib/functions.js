

function create(tag ,ns){
	ns = ns || namespaces.svg;
	return document.createElementNS(ns, tag);
}

/* istanbul ignore next */
function obj2attr(o) {
	var res = [], j;
	for (j in o) res.push(j + '(' + o[j] + ')');
	return res.join(' ');
}


/* istanbul ignore next */
function bind(f, obj) {
	return function () {
		var args = [].slice.call(arguments, 0);
		return f.apply(obj, args);
	}
}
/* istanbul ignore next */
function deg2rad(deg) {
	return deg * Math.PI / 180;
}
/* istanbul ignore next */
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
/* istanbul ignore next */
function getDefs(instance) {
    if (!instance.defs) {
        instance.defs = new Element('defs');
        instance.append(instance.defs);
    }
    return instance.defs;
}

function polarToCartesian(cx, cy, r, deg) {
  var rad = (deg-90) * Math.PI / 180.0;

  return {
    x: cx + (r * Math.cos(rad)),
    y: cy + (r * Math.sin(rad))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){
    var start = polarToCartesian(x, y, radius, endAngle),
        end = polarToCartesian(x, y, radius, startAngle),
        /* istanbul ignore next */
        largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
        "M", x, y,
        "L", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "Z" 
    ].join(" ");     
}