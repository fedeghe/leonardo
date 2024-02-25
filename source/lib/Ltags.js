/*
 * SVG REFERENCE 
 *
 * https://www.w3.org/TR/SVG/paths.html
 */

/**
 * { function_description }
 *
 * @param      {<type>}   txt     The text
 * @return     {Element}  { description_of_the_return_value }
 */
L.prototype.desc = function (txt) {
	var desc = new Element('desc');
	desc.tag.innerHTML = txt;
	return desc;
};

/**
 * { function_description }
 *
 * @param      {<type>}   cx      { parameter_description }
 * @param      {<type>}   cy      { parameter_description }
 * @param      {<type>}   r       { parameter_description }
 * @return     {Element}  { description_of_the_return_value }
 */
L.prototype.circle = function (cx, cy, r) {
	var circle = new Element('circle');
	circle.setAttributes({cx : cx, cy : cy, r : r});
	return circle;
};

/**
 * { function_description }
 *
 * @param      {<type>}   cx      { parameter_description }
 * @param      {<type>}   cy      { parameter_description }
 * @param      {<type>}   rx      The receive
 * @param      {<type>}   ry      { parameter_description }
 * @return     {Element}  { description_of_the_return_value }
 */
L.prototype.ellipse = function (cx, cy, rx, ry) {
	var ellipse = new Element('ellipse');
	ellipse.setAttributes({cx : cx, cy : cy, rx : rx, ry : ry});
	return ellipse;
};

/**
 * { function_description }
 *
 * @return     {Element}  { description_of_the_return_value }
 */
L.prototype.group = function (a) {
	var g = new Element('g');
	if (a) g.append([].slice.call(arguments, 0))
	return g;
};

/**
 * { function_description }
 *
 * @param      {<type>}   x       { parameter_description }
 * @param      {<type>}   y       { parameter_description }
 * @param      {<type>}   w       { parameter_description }
 * @param      {<type>}   h       { parameter_description }
 * @param      {<type>}   src     The source
 * @return     {Element}  { description_of_the_return_value }
 */
L.prototype.image = function (x, y, w, h, src) {
	var image = new Element('image');
	image.setAttributes({x : x, y : y, width : w, height : h});
	image.tag.setAttributeNS(namespaces.xlink, 'xlink:href', src);
	return image;
};

/**
 * { function_description }
 *
 * @param      {<type>}   x1      The x 1
 * @param      {<type>}   y1      The y 1
 * @param      {<type>}   x2      The x 2
 * @param      {<type>}   y2      The y 2
 * @return     {Element}  { description_of_the_return_value }
 */
L.prototype.line = function (x1, y1, x2, y2) {
	var line = new Element('line');
	line.setAttributes({x1 : x1, y1 : y1, x2 : x2, y2 : y2});
	return line;
};

/**
 * { function_description }
 *
 * @param      {<type>}   d       { parameter_description }
 * @param      {<type>}   attrs   { parameter_description }
 * @return     {Element}  { description_of_the_return_value }
 */
L.prototype.path = function (d, attrs) {
	var path = new Element('path');
    attrs = attrs || {}
    attrs.d = d
	path.setAttributes(attrs);
	return path;
};

/**
 * { function_description }
 *
 * @return     {Element}  { description_of_the_return_value }
 */
L.prototype.polygon = function () {
	var polygon = new Element('polygon'),
		points = [].slice.call(arguments, 0),
		pp = [],
		i = 0, l = points.length;
	for (null; i < l; i+=2) {
		pp.push(points[i] + ',' + points[i+1])
	}
	polygon.setAttributes({points : pp.join(' ')});
	return polygon;
};

/**
 * { function_description }
 *
 * @return     {Element}  { description_of_the_return_value }
 */
L.prototype.polyline = function () {
	var polyline = new Element('polyline'),
		points = [].slice.call(arguments, 0),
		pp = [],
		i = 0, l = points.length;
	for (null; i < l; i+=2) {
		pp.push(points[i] + ',' + points[i+1])
	}
	polyline.setAttributes({points : pp.join(' ')});
	return polyline;
};

/**
 * { function_description }
 *
 * @param      {<type>}   x       { parameter_description }
 * @param      {<type>}   y       { parameter_description }
 * @param      {<type>}   w       { parameter_description }
 * @param      {<type>}   h       { parameter_description }
 * @return     {Element}  { description_of_the_return_value }
 */
L.prototype.rect = function (x, y, w, h) {
	h = h || w;
	var rect = new Element('rect');
	rect.setAttributes({x : x, y : y, width : w, height : h});
	return rect;
};

/**
 * { function_description }
 *
 * @param      {<type>}   x       { parameter_description }
 * @param      {<type>}   y       { parameter_description }
 * @param      {<type>}   cnt     The count
 * @return     {Element}  { description_of_the_return_value }
 */
L.prototype.text = function (x, y, cnt) {
	var text = new Element('text'),
		bBox;
	text.setAttributes({x : x, y : y});
	text.tag.textContent = cnt;
	return text;
};

/**
 * { function_description }
 *
 * @param      {<type>}   txt     The text
 * @return     {Element}  { description_of_the_return_value }
 */
L.prototype.title = function (txt) {
	var text = new Element('title');
	text.tag.innerHTML = txt;
	return text;
};

/**
 * { function_description }
 *
 * @param      {string}   cnt     The count
 * @return     {Element}  { description_of_the_return_value }
 */
L.prototype.script = function (cnt) {
	var script = new Element('script');
	script.setAttributes({type : 'application/ecmascript'});
	if (cnt) {
		script.tag.innerHTML = "//<![CDATA[\n" + cnt + "\n]]>";
	}
	return script;
};

/**
 * { function_description }
 *
 * @param      {string}   tagNAme     The count
 * @return     {Element}  { description_of_the_return_value }
 */
L.prototype.Element = function (tagName) {
	return new Element(tagName);
};



$$lib/LpathBuild.js$$