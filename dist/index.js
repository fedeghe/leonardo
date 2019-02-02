/*
 __    _____ _____ _____ _____ _____ ____  _____ 
|  |  |   __|     |   | |  _  | __  |    \|     |
|  |__|   __|  |  | | | |     |    -|  |  |  |  |
|_____|_____|_____|_|___|__|__|__|__|____/|_____|
                                                  V. 0.2

Federico Ghedina <federico.ghedina@gmail.com> 2019
~21KB
*/
(function(w) {
	
	/*
	[Malta] lib/L.js
	*/
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
	
	
	/**
	 * { function_description }
	 *
	 * @class      L (name)
	 * @param      {string}  width   The width
	 * @param      {string}  height  The height
	 * @param      {<type>}  opts    The options
	 */
	function L(width , height, opts) {
		var namespaces = this.namespaces = {
				'cc': 'http://creativecommons.org/ns#',
				'dc': 'http://purl.org/dc/elements/1.1/',
				'ev' : 'http://www.w3.org/2001/xml-events',
				'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
				'svg': 'http://www.w3.org/2000/svg',
				'xlink': 'http://www.w3.org/1999/xlink'
			},
			self = this,
			tmp, l;
		opts = opts || {};
	
	    this.tag = create('svg');
	    this.tag.setAttribute('width', width);
	    this.tag.setAttribute('height', height);
	    this.tag.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	    this.tag.setAttribute('viewbox', '0 0 ' + width + ' ' + height);
	    this.childs = [];
	    
	    for (tmp in opts)
			tmp !== 'ns'
			&& tmp !== 'target'
	    	&& this.tag.setAttribute(tmp, opts[tmp]);
	
	    this.target = 'target' in opts ? opts.target : null;
	
	    function addNs(l){
	    	l in namespaces 
	    	&& self.tag.setAttribute('xmlns:' + l, namespaces[l]);
	    }
	    if ('ns' in opts){
	    	if (opts.ns === '*')
	    		opts.ns = Object.keys(namespaces);
	    	for (tmp = 0, l = opts.ns.length;tmp < l; tmp++)
	    		addNs(opts.ns[tmp]);
		}
	}
	
	/**
	 * { function_description }
	 *
	 * @param      {<type>}  attrs   The attributes
	 * @return     {Object}  { description_of_the_return_value }
	 */
	L.prototype.attrs = function (attrs) {	
		var k;
		if (typeof attrs == 'string') return this.tag.getAttribute(attrs);
		for (k in attrs) this.tag.setAttribute(k, attrs[k]);
		return this;
	};
	
	/**
	 * { function_description }
	 *
	 * @param      {<type>}  styles  The styles
	 * @return     {Object}  { description_of_the_return_value }
	 */
	L.prototype.styles = function (styles) {	
		var k;
		for (k in styles) this.tag.style[k] = styles[k];
		return this;
	};
	
	/**
	 * { function_description }
	 *
	 * @return     {Object}  { description_of_the_return_value }
	 */
	L.prototype.add = function () {
		var self = this,
			els = [].slice.call(arguments, 0);
		els.forEach(function (el) {
			if( el instanceof Array){
				el.forEach(function (k) {
					self.childs.push(k);
					self.add(k);
				});
			} else {
				self.childs.push(el);
				self.tag.appendChild(el.tag);
			}
		});
		return this;
	};
	
	/**
	 * { function_description }
	 *
	 * @param      {<type>}    n       { parameter_description }
	 * @param      {Function}  cb      { parameter_description }
	 * @return     {Object}    { description_of_the_return_value }
	 */
	L.prototype.render = function (n, cb) {
		var trg = n || this.target;
		trg.innerHTML = '';
		trg.appendChild(this.tag);
		cb && cb.call(this);
		return this;
	};
	
	/**
	 * 
	 */
	L.prototype.downloadAnchor = function () {
		var serializer = new XMLSerializer(),
			source = '<?xml version="1.0" standalone="no"?>\r\n' + serializer.serializeToString(this.tag),
			url =null;
		if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
			source = source.replace(/^<svg/, '<svg xmlns="' + this.namespaces.svg + '"');
		}
		if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
			source = source.replace(/^<svg/, '<svg xmlns:xlink="' + this.namespaces.xlink + '"');
		}
		url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
	
	
		var a = document.createElement('a');
		a.download = 'download' + (+new Date) + '.svg';
		a.href = url;
		a.addEventListener('click', function () {
			this.download = 'download' + (+new Date) + '.svg'
		})
		a.innerHTML = 'download';
		return a;
	};
	/*
	[Malta] lib/Ltags.js
	*/
	/*
	 * SVG REFERENCE 
	 *
	 * https://www.w3.org/TR/SVG/paths.html
	 */
	
	
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
		circle.attrs({cx : cx, cy : cy, r : r});
		return circle;
	};
	
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
	 * @param      {<type>}   rx      The receive
	 * @param      {<type>}   ry      { parameter_description }
	 * @return     {Element}  { description_of_the_return_value }
	 */
	L.prototype.ellipse = function (cx, cy, rx, ry) {
		var ellipse = new Element('ellipse');
		ellipse.attrs({cx : cx, cy : cy, rx : rx, ry : ry});
		return ellipse;
	};
	
	/**
	 * { function_description }
	 *
	 * @return     {Element}  { description_of_the_return_value }
	 */
	L.prototype.group = function () {
		return new Element('g');
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
		image.attrs({x : x, y : y, width : w, height : h});
		image.tag.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', src);
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
		line.attrs({x1 : x1, y1 : y1, x2 : x2, y2 : y2});
		return line;
	};
	
	/**
	 * { function_description }
	 *
	 * @param      {<type>}   d       { parameter_description }
	 * @return     {Element}  { description_of_the_return_value }
	 */
	L.prototype.path = function (d) {
		var path = new Element('path');
		path.attrs({d : d});
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
		polygon.attrs({points : pp.join(' ')});
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
		polyline.attrs({points : pp.join(' ')});
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
		rect.attrs({x : x, y : y, width : w, height : h});
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
		text.attrs({x : x, y : y});
		text.tag.innerHTML = cnt;
		return text;
	};
	
	/**
	 * { function_description }
	 *
	 * @param      {string}   id      The identifier
	 * @param      {<type>}   d       { parameter_description }
	 * @param      {<type>}   cnt     The count
	 * @return     {Element}  { description_of_the_return_value }
	 */
	L.prototype.textPath = function (id, d, cnt) {
		var self = this,
			text = new Element('text'),
			defs = new Element('defs'),
			path = self.path(d),
			textpath = new Element('textPath'),
			i, tmp;
		path.attrs({id : id});
		textpath.tag.innerHTML = cnt;
		textpath.tag.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#' + id);
		text.add(defs);
		text.add(textpath);
		defs.add(path);
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
		script.attrs({type : 'application/ecmascript'});
		if (cnt) {
			script.tag.innerHTML = "//<![CDATA[\n" + cnt + "\n]]>";
		}
		return script;
	};
	
	
	/*
	[Malta] lib/LpathBuild.js
	*/
	/*
	 * 	M	moveto	(x y)+
	 *	Z	closepath	(none)
	 *	L	lineto	(x y)+
	 *	H	horizontal lineto	x+
	 *	V	vertical lineto	y+
	 *	C	curveto	(x1 y1 x2 y2 x y)+
	 *	Q	quadratic Bézier curveto	(x1 y1 x y)+
	 *	S	smooth curveto	(x2 y2 x y)+
	 *	T	smooth quadratic Bézier curveto	(x y)+
	 *	A	elliptical arc	(rx ry x-axis-rotation large-arc-flag sweep-flag x y)+
	 *	R	Catmull-Rom curveto*	x1 y1 (x y)+
	 */
	function Pathbuild() {
		var self = this;
		this.path = '';
		this.previous = null;
	}
	function createFun(letter) {
		return function () {
			var l = this.previous === letter ? ' ' : letter;
			this.path += [l].concat([[].slice.call(arguments, 0).join(',')]).join(' ') + ' ';
			this.previous = letter;
			return this;
		};
	}
	
	Pathbuild.prototype.M = createFun('M');
	Pathbuild.prototype.m = createFun('m');
	Pathbuild.prototype.Z = createFun('Z');
	Pathbuild.prototype.L = createFun('L');
	Pathbuild.prototype.l = createFun('l');
	Pathbuild.prototype.H = createFun('H');
	Pathbuild.prototype.h = createFun('h');
	Pathbuild.prototype.V = createFun('V');
	Pathbuild.prototype.v = createFun('v');
	Pathbuild.prototype.C = createFun('C');
	Pathbuild.prototype.c = createFun('c');
	Pathbuild.prototype.Q = createFun('Q');
	Pathbuild.prototype.q = createFun('q');
	Pathbuild.prototype.S = createFun('S');
	Pathbuild.prototype.s = createFun('s');
	Pathbuild.prototype.T = createFun('T');
	Pathbuild.prototype.t = createFun('t');
	Pathbuild.prototype.A = createFun('A');
	Pathbuild.prototype.a = createFun('a');
	Pathbuild.prototype.R = createFun('R');
	
	/**
	 * { function_description }
	 *
	 * @return     {(Object|pathbuild|string)}  { description_of_the_return_value }
	 */
	L.prototype.pathBuild = (function () {
		var pb = new Pathbuild();
		
		pb.toString = function (){
			var p = this.path + '';
			this.path = '';
			return p;
		};
		return pb;
	})();
	
	
	L.prototype.slice = function (cx, cy, radius, startAngle, endAngle) {
		var self = this,
			p = self.slicePath(cx, cy, radius, startAngle, endAngle);
	
		return self.path(p);
	};
	L.prototype.slicePath = function (cx, cy, radius, startAngle, endAngle) {
		var self = this,
			largeArc = 0;
		if (startAngle > endAngle) {
			var s = startAngle;
			startAngle = endAngle;
			endAngle = s;
		}
		/*
		if (Math.abs(endAngle - startAngle) > 360) {
			endAngle = 359.999;
		}*/
		
		largeArc = endAngle - startAngle <= 180 ? 0 : 1;
	
		startAngle = deg2rad(startAngle);
		endAngle = deg2rad(endAngle);
	
		return self.pathBuild
			.M(cx, cy)
			.L(
				cx + Math.cos(startAngle) * radius,
				cy - Math.sin(startAngle) * radius
			)
			.A(
				radius,
				radius,
				0,
				largeArc,
				0,
				cx + Math.cos(endAngle) * radius,
				cy - Math.sin(endAngle) * radius
			)
			.L(cx, cy);
	};
	
	
		
	/*
	[Malta] lib/Lfilters.js
	*/
	var filter_id = 0;
	/**
	 * { function_description }
	 *
	 * @return     {(Object|string)}  { description_of_the_return_value }
	 */
	L.prototype.filters = function () {
		var self = this,
			defs = null;
		if (this.defs) {
			defs = this.defs;
		} else {
			defs = this.defs = new Element('defs');
			self.add(this.defs);
		}
	
		function lid() {
			filter_id++;
			return 'leo_id_' + filter_id;
		}
	
		function lGrad(steps) {
			var id = lid(),
				linearGrad = new Element('linearGradient'),
				i, tmp;
	
			linearGrad.attrs({
				id : id,
				x1 : '0%',
				y1 : '0%',
				x2 : '100%',
				y2 : '0%'
			});
	
			for (i in steps) {
				tmp = new Element('stop');
				tmp.attrs({
					offset : i + '%',
					style : 'stop-opacity:1;stop-color:' + steps[i]
				});
				linearGrad.add(tmp)
			}
			defs.add(linearGrad);
			return 'url(#' + id + ')';
		}
	
		function rGrad(steps) {
			var id = lid(),
				radialGrad = new Element('radialGradient'),
				i, tmp;
			radialGrad.attrs({id : id});
	
			for (i in steps) {
				tmp = new Element('stop');
				tmp.attrs({
					offset : i + '%',
					style : 'stop-opacity:1;stop-color:' + steps[i]
				});
				radialGrad.add(tmp)
			}
			defs.add(radialGrad);
			return 'url(#' + id + ')';
		}
	
		return {
			lGrad : lGrad,
			rGrad : rGrad
		};
	};
		
	/*
	[Malta] lib/Lanimate.js
	*/
	/**
	 * { function_description }
	 *
	 * @return     {Object}  { description_of_the_return_value }
	 */
	L.prototype.animate = (function () {
		function parametricCartesian(el, fx, fy) {
			var t = 0,
				x = 0,
				y = 0,
				ti = setInterval(function () {
					x = fx(x, t);
					y = fy(y, t);
					t += 0.1;
					el.move(x, y);
				}, 20);
		}
		function parametricPolar(el, fr, fO) {
			var t = 0,
				r = 0,
				O = 0,
				ti = setInterval(function () {
					r = fr(r, t);
					O = fO(O, t);
					t += 0.1;
					el.move(
						r * Math.cos(O),
						r * Math.sin(O)
					);
				}, 20);
		}
	
		function attr(name, from, to, dur, repeat) {
			var animate = new Element('animate');
			animate.attrs({
				attributeType: 'XML',
				attributeName: name,
				from: from,
				to: to,
				dur: dur,
				repeatCount: repeat
			});
			return animate;
		};
	
		return {
			pCart : parametricCartesian,
			pPolar : parametricPolar,
			attr : attr
		};
	})();
		
	/*
	[Malta] lib/functions.js
	*/
	
	/**
	 * { function_description }
	 *
	 * @param      {<type>}  tag     The tag
	 * @param      {<type>}  ns      { parameter_description }
	 * @return     {<type>}  { description_of_the_return_value }
	 */
	function create(tag ,ns){
		ns = ns || 'http://www.w3.org/2000/svg';
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
	/*
	[Malta] lib/Element.js
	*/
	/**
	 * { function_description }
	 *
	 * @class      Element (name)
	 * @param      {Function}  tag     The tag
	 * @param      {<type>}    ns      { parameter_description }
	 */
	function Element(tag, ns) {
		this.t = tag;
		this.tag = create(tag, ns);
		this.childs = [];
		this.events = {};
		this.transforms = {
			rotate : '',
			move : '',
			scale : ''
		};
	}
	
	/**
	 * { item_description }
	 */
	Element.prototype.attrs = L.prototype.attrs;
	
	/**
	 * { item_description }
	 */
	Element.prototype.styles = L.prototype.styles;
	
	/**
	 * { item_description }
	 */
	Element.prototype.add = L.prototype.add;
	
	/**
	 * { function_description }
	 *
	 * @param      {<type>}    eventName  The event name
	 * @param      {Function}  cb         { parameter_description }
	 * @return     {Object}    { description_of_the_return_value }
	 */
	Element.prototype.on = function (eventName, cb) {
		if (eventName in this.events) {
			this.events[eventName].push(cb);
		} else {
			this.events[eventName] = [cb];
		}
		this.tag.addEventListener(eventName, cb);
		return this;
	};
	
	/**
	 * { function_description }
	 *
	 * @param      {<type>}    eventName  The event name
	 * @param      {Function}  cb         { parameter_description }
	 * @return     {Object}    { description_of_the_return_value }
	 */
	Element.prototype.off = function (eventName, cb) {	
		var self = this;
		if (eventName in this.events) {
			if (typeof cb === 'undefined') {
				this.events[eventName].forEach(function (fn) {
					self.tag.removeEventListener(eventName, fn);
				});
				this.events[eventName] = null;
			} else {
				// who cares about local function?
				// 
				self.tag.removeEventListener(eventName, cb);
			}
		}
		return this;
	};
	
	/**
	 * Creates a new instance of the object with same properties than original.
	 *
	 * @return     {Element}  Copy of this object.
	 */
	Element.prototype.clone = function () {
		var ret = new Element(this.t),
			attrNames = this.tag.attributes,
			children = this.tag.children,
			i = 0, l;
	
		ret.transforms.rotate = this.transforms.rotate;
		ret.transforms.move = this.transforms.move;
		ret.transforms.scale = this.transforms.scale;
	
		for (i = 0, l = attrNames.length; i < l; i++) {
			ret.tag.setAttribute(attrNames[i].name, attrNames[i].value);
		}
		// recur in childs
		for (i = 0, l = this.childs.length; i < l; i++) {
			ret.add(this.childs[i].clone())
		}
		return ret;
	};
	
	/**
	 * { function_description }
	 *
	 * @return     {Object}  { description_of_the_return_value }
	 */
	Element.prototype.trans = function () {
		this.attrs({transform : this.transforms.rotate + ' ' + this.transforms.move + ' ' + this.transforms.scale});
		return this;
	};
	
	/**
	 * { function_description }
	 *
	 * @param      {string}  r       { parameter_description }
	 * @param      {string}  rx      The receive
	 * @param      {string}  ry      { parameter_description }
	 * @return     {<type>}  { description_of_the_return_value }
	 */
	Element.prototype.rotate = function (r, rx, ry) {
		rx = rx || 0;
		ry = ry || 0;
		this.transforms.rotate = ' rotate(' + r + ' ' + rx + ' ' + ry + ')';
		return this.trans();
	};
	
	/**
	 * { function_description }
	 *
	 * @param      {string}  sx      { parameter_description }
	 * @param      {string}  sy      { parameter_description }
	 * @return     {<type>}  { description_of_the_return_value }
	 */
	Element.prototype.scale = function (sx, sy) {
		sx = sx || 0;
		sy = sy || 0;
		this.transforms.scale = ' scale(' + sx + ', ' + sy + ')';
		return this.trans();
	};
	
	/**
	 * { function_description }
	 *
	 * @return     {<type>}  { description_of_the_return_value }
	 */
	Element.prototype.mirrorO = function () {
		this.transforms.scale = ' scale(1, -1)';
		return this.trans();
	};
	
	/**
	 * { function_description }
	 *
	 * @return     {<type>}  { description_of_the_return_value }
	 */
	Element.prototype.mirrorV = function () {
		this.transforms.scale = ' scale(-1, 1)';
		return this.trans();
	};
	
	/**
	 * { function_description }
	 *
	 * @param      {string}  rx      The receive
	 * @param      {string}  ry      { parameter_description }
	 * @return     {<type>}  { description_of_the_return_value }
	 */
	Element.prototype.move = function (rx, ry) {
		rx = rx || 0;
		ry = ry || 0;
		this.transforms.move = ' translate(' + rx + ' ' + ry + ')';
		return this.trans();
	};
	
	Element.prototype.clear = function () {
		this.tag.parentNode.removeChild(this.tag);
	};
	
	Element.prototype.replace = function (currentOne, newOne) {
		currentOne.tag.parentNode.replaceChild(newOne.tag, currentOne.tag);
	}
	
	var Leonardo = function (w, h, attrs) {
		if (!w || !h) 
			return {
				ERROR : 'width or height not given!'
			};
		return new L(w, h, attrs);
	};
	Leonardo.import = L.import;
	Leonardo.getqs = L.getqs;

	w.Leonardo = Leonardo;
})(window);