/*
 * SVG REFERENCE 
 *
 * https://www.w3.org/TR/SVG/paths.html
 */


L.prototype.desc = function (txt) {
	var desc = new Element('desc');
	desc.tag.innerHTML = txt;
	return desc;
}

L.prototype.line = function (x1, y1, x2, y2) {
	var line = new Element('line');
	line.attrs({x1 : x1, y1 : y1, x2 : x2, y2 : y2});
	return line;
};
L.prototype.polyline = function () {
	var polyline = new Element('polyline'),
		points = [].slice.call(arguments, 0),
		pp = [],
		i = 0, l = points.length;
	for (null; i < l; i+=2) {
		pp.push(points[i] + ',' + points[i+1])
	}
	polyline.attrs({points : pp.join(' ')});
	return polyline;
};

L.prototype.image = function (x, y, w, h, src) {
	var image = new Element('image');
	image.attrs({x : x, y : y, width : w, height : h});
	image.tag.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', src);
	// image.tag.setAttribute('xmlns:xlink', "http://www.w3.org/1999/xlink");
	return image;
}

L.prototype.path = function (d) {
	var path = new Element('path');
	path.attrs({d : d});
	return path;
};

L.prototype.circle = function (cx, cy, r) {
	var circle = new Element('circle');
	circle.attrs({cx : cx, cy : cy, r : r});
	return circle;
};
L.prototype.ellipse = function (cx, cy, rx, ry) {
	var ellipse = new Element('ellipse');
	ellipse.attrs({cx : cx, cy : cy, rx : rx, ry : ry});
	return ellipse;
};
L.prototype.rect = function (x, y, w, h) {
	var rect = new Element('rect');
	rect.attrs({x : x, y : y, width : w, height : h});
	return rect;
};

L.prototype.polygon = function () {
	var polygon = new Element('polygon'),
		points = [].slice.call(arguments, 0),
		pp = [],
		i = 0, l = points.length;
	for (null; i < l; i+=2) {
		pp.push(points[i] + ',' + points[i+1])
	}
	polygon.attrs({points : pp.join(' ')});
	return polygon;
};

L.prototype.text = function (x, y, cnt) {
	var text = new Element('text'),
		bBox;
	text.attrs({x : x, y : y});
	text.tag.innerHTML = cnt;
	return text;
}
L.prototype.title = function (txt) {
	var text = new Element('title');
	text.tag.innerHTML = txt;
	return text;
}
L.prototype.textPath = function (id, d, cnt) {
	var self = this,
		text = new Element('text'),
		defs = new Element('defs'),
		path = self.path(d),
		textpath = new Element('textPath'),
		i, tmp;
	path.attrs({id : id});
	
	textpath.tag.innerHTML = cnt;

	textpath.tag.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', "#" + id);

	text.add(defs);
	text.add(textpath);
	defs.add(path);
	return text;
}

// path http://www.w3schools.com/graphics/svg_path.asp

L.prototype.group = function () {
	return new Element('g');
}
L.prototype.script = function (cnt) {
	var script = new Element('script');
	script.attrs({type : 'application/ecmascript'});
	if (cnt) {
		script.tag.innerHTML = "//<![CDATA[\n" + cnt + "\n]]>";
	}
	return script;
}


$$lib/LpathBuild.js$$