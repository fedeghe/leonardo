'use strict';
/*
 __    _____ _____ _____ _____ _____ ____  _____ 
|  |  |   __|     |   | |  _  | __  |    \|     |
|  |__|   __|  |  | | | |     |    -|  |  |  |  |
|_____|_____|_____|_|___|__|__|__|__|____/|_____|
                                                  V. 1.0.15

Federico Ghedina <federico.ghedina@gmail.com> 2021
~25.65KB
*/
(function(w) {
	
	/*
	[Malta] lib/L.js
	*/
	var namespaces = {
	    cc: 'http://creativecommons.org/ns#',
	    dc: 'http://purl.org/dc/elements/1.1/',
	    ev: 'http://www.w3.org/2001/xml-events',
	    rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
	    svg: 'http://www.w3.org/2000/svg',
	    xlink: 'http://www.w3.org/1999/xlink'
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
		this.namespaces = namespaces;
		var self = this,
			tmp, l;
		opts = opts || {};
	
	    this.tag = create('svg');
	    this.tag.setAttribute('width', width);
	    this.tag.setAttribute('height', height);
	    this.tag.setAttribute('xmlns', namespaces.svg);
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
	 * @param      {<type>}  attrs   The attributes
	 * @return     {Object}  { description_of_the_return_value }
	 */
	L.prototype.setAttributes = function (attrs) {	
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
	L.prototype.append = function () {
		var self = this,
			els = [].slice.call(arguments, 0);
		els.forEach(function (el) {
			if( el instanceof Array){
				el.forEach(function (k) {
					self.childs.push(k);
					self.append(k);
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
	L.prototype.render = function (o) {
	    var trg = o && 'target' in o  ? o.target : this.target;
	    if (!trg) throw 'Target not set'
		trg.innerHTML = '';
		trg.appendChild(this.tag);
		o && o.cb && o.cb.call(this);
		return this;
	};
	
	/**
	 * 
	 */
	L.prototype.downloadAnchor = function (txt, name) {
		var serializer = new XMLSerializer(),
			source = '<?xml version="1.0" standalone="no"?>\r\n' + serializer.serializeToString(this.tag),
	        url = null,
	        a = document.createElement('a');
	    
	    txt = txt || 'download';
	    name = name || 'download';
	
		if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
			source = source.replace(/^<svg/, '<svg xmlns="' + this.namespaces.svg + '"');
		}
		if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
			source = source.replace(/^<svg/, '<svg xmlns:xlink="' + this.namespaces.xlink + '"');
		}
		url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
		
		a.download = name + (+new Date) + '.svg';
		a.href = url;
		a.addEventListener('click', function () {
			this.download = name + (+new Date) + '.svg'
		})
		a.innerHTML = txt;
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
	 * @return     {Element}  { description_of_the_return_value }
	 */
	L.prototype.path = function (d) {
		var path = new Element('path');
		path.setAttributes({d : d});
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
			textpath = new Element('textPath');
		path.setAttributes({id : id});
		textpath.tag.innerHTML = cnt;
		textpath.tag.setAttributeNS(namespaces.xlink, 'xlink:href', '#' + id);
		text.append(defs);
		text.append(textpath);
		defs.append(path);
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
	
	L.prototype.textBox = function (txt, w, h, textAttrs) {
	    var cnt = new Element('svg'),
	        rect = new Element('rect'),
	        text = new Element('text');
	    rect.setAttributes({
	        x : 0, y : 0,
	        width: w, height: h,
	        "stroke-width" : 0,
	        stroke : 'transparent',
	    });
	    cnt.setAttributes({width : w, height : h});
	    text.setAttributes({
	        x: '50%',
	        y: '50%',
	        'dominant-baseline': 'middle',
	        'text-anchor': 'middle'
	    });
	    textAttrs && text.setAttributes(textAttrs);
	    text.tag.innerHTML = txt;
	    cnt.append(rect, text);
	    return cnt;
	}
	
	/*
	[Malta] lib/LpathBuild.js
	*/
	/*
	 * 	M	moveto (x y)+
	 *	Z	closepath (none)
	 *	L	lineto (x y)+
	 *	H	horizontal lineto x+
	 *	V	vertical lineto	y+
	 *	C	curveto	(x1 y1 x2 y2 x y)+
	 *	Q	quadratic Bézier curveto (x1 y1 x y)+
	 *	S	smooth curveto	(x2 y2 x y)+
	 *	T	smooth quadratic Bézier curveto	(x y)+
	 *	A	elliptical arc (rx ry x-axis-rotation large-arc-flag sweep-flag x y)+
	 *	R	Catmull-Rom curveto	x1 y1 (x y)+
	 */
	function Pathbuild() {
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
		var largeArc = 0;
	
		if (startAngle > endAngle) {
			var s = startAngle;
			startAngle = endAngle;
			endAngle = s;
		}
		/*if (Math.abs(endAngle - startAngle) > 360) {
			endAngle = 359.999;
		}*/
		largeArc = endAngle - startAngle <= 180 ? 0 : 1;
		startAngle = deg2rad(startAngle);
		endAngle = deg2rad(endAngle);
		return this.pathBuild
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
	[Malta] lib/Lgradients.js
	*/
	var gradient_id = 0;
	
	function lid() {
	    gradient_id++;
	    return 'leo_id_' + gradient_id;
	}
	
	function getDefs(instance) {
	    if (!instance.defs) {
	        instance.defs = new Element('defs');
	        instance.append(instance.defs);
	    }
	    return instance.defs;
	}
	
	L.prototype.linearGradient = function(steps, rotate) {
	    var defs = getDefs(this),
	        id = lid(),
	        linearGrad = new Element('linearGradient'),
	        i, tmp,
	        attrs = {
	            id: id,
	            x1: '0%',
	            y1: '0%',
	            x2: '100%',
	            y2: '0%'
	        };
	
	    if (rotate) {
	        attrs.gradientTransform = 'rotate(' + rotate + ')'
	    }
	    linearGrad.setAttributes(attrs);
	    steps.forEach(function(step) {
	        tmp = new Element('stop');
	        var attrs = {
	            offset: step.perc + '%',
	            // style : 'stop-opacity:1;stop-color:' + steps[i],
	            'stop-color': step.color
	        };
	        if ('style' in step) attrs.style = step.style;
	        tmp.setAttributes(attrs);
	        linearGrad.append(tmp)
	    })
	    this.defs.append(linearGrad);
	    return 'url(#' + id + ')';
	}
	
	L.prototype.radialGradient = function radial(steps) {
	    var defs = getDefs(this),
	        id = lid(),
	        radialGrad = new Element('radialGradient'),
	        i, tmp;
	    radialGrad.setAttributes({ id: id });
	
	    steps.forEach(function(step) {
	        tmp = new Element('stop');
	        var attrs = {
	            offset: step.perc + '%',
	            // style : 'stop-opacity:1;stop-color:' + steps[i],
	            'stop-color': step.color
	        };
	        if ('style' in step) attrs.style = step.style;
	        tmp.setAttributes(attrs);
	        radialGrad.append(tmp)
	    })
	    this.defs.append(radialGrad);
	    return 'url(#' + id + ')';
	}	
    /*
    [Malta] lib/Lanimate.js
    */
    /**
     * { function_description }
     *
     * @return     {Object}  { description_of_the_return_value }
     */
    L.prototype.animate = (function () {
    	function parametricCartesian(el, fx, fy, interval) {
            interval = interval || 20;
    		var t = 0,
    			x = 0,
    			y = 0,
    			ti = setInterval(function () {
    				x = fx(x, t);
    				y = fy(y, t);
    				t += 0.1;
    				el.move(x, y);
                }, interval);
            return function () {
                clearInterval(ti)
            }
    	}
    	function parametricPolar(el, fr, fO, interval) {
            interval = interval || 20;
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
                }, interval);
            return function () {
                clearInterval(ti)
            }
    	}
    
    	function attr(params /* {attributeName, from, to, dur, repeatCount} */) {
    		var animate = new Element('animate');
    		animate.setAttributes({
    			attributeType: 'XML',
    			attributeName: params.attributeName,
    			from: params.from,
    			to: params.to,
                dur: params.dur,
                begin: params.begin || '0s',
    			repeatCount: params.repeatCount
    		});
    		return animate;
    	};
    
    	return {
    		cartesian : parametricCartesian,
    		polar : parametricPolar,
    		attr : attr
    	};
    })();
    	
    // ---
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
	Element.prototype.setAttributes = L.prototype.setAttributes;
	
	/**
	 * { item_description }
	 */
	Element.prototype.styles = L.prototype.styles;
	
	/**
	 * { item_description }
	 */
	Element.prototype.append = L.prototype.append;
	
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
				self.tag.removeEventListener(eventName, cb);
			}
		}
		return this;
	};
	
	Element.prototype.once = function (eventName, cb) {
	    var self = this;
		if (eventName in this.events) {
			this.events[eventName].push(cb);
		} else {
			this.events[eventName] = [cb];
		}
		this.tag.addEventListener(eventName, function _(e) {
	        cb(e)
	        self.off(eventName, _)
	    });
		return this;
	};
	
	/**
	 * Creates a new instance of the object with same properties than original.
	 *
	 * @return     {Element}  Copy of this object.
	 */
	// consider a way to use use.... but remember it need the original tag to have a id attribute
	// https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use
	Element.prototype.clone = function () {
		var ret = new Element(this.t),
			attrNames = this.tag.attributes,
			i = 0, l;
	
		ret.transforms.rotate = this.transforms.rotate;
		ret.transforms.move = this.transforms.move;
		ret.transforms.scale = this.transforms.scale;
	
		for (i = 0, l = attrNames.length; i < l; i++) {
			ret.tag.setAttribute(attrNames[i].name, attrNames[i].value);
		}
		// recur in childs
		for (i = 0, l = this.childs.length; i < l; i++) {
			ret.append(this.childs[i].clone());
	    }
	    if (l == 0) {
	        ret.tag.innerHTML  = this.tag.innerHTML 
	    }
		return ret;
	};
	
	Element.prototype.use = function () {
	    var id = this.tag.attributes.id,
	        ret = new Element('use');
	    if (!id) {
	        throw new Error('You can use use only on tags having an id attribute');
	    }
	    ret.tag.setAttribute('href', '#' + id.value);
	    return ret;
	};
	
	function trans(instance) {
	    instance.setAttributes({transform : instance.transforms.rotate + ' ' + instance.transforms.move + ' ' + instance.transforms.scale});
		return instance;
	}
	
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
		return trans(this);
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
		return trans(this);
	};
	
	/**
	 * { function_description }
	 *
	 * @return     {<type>}  { description_of_the_return_value }
	 */
	Element.prototype.mirrorH = function () {
		this.transforms.scale = ' scale(1, -1)';
		return trans(this);
	};
	
	/**
	 * { function_description }
	 *
	 * @return     {<type>}  { description_of_the_return_value }
	 */
	Element.prototype.mirrorV = function () {
		this.transforms.scale = ' scale(-1, 1)';
		return trans(this);
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
		return trans(this);
	};
	
	Element.prototype.remove = function () {
		this.tag.parentNode.removeChild(this.tag);
	};
	
	Element.prototype.bringToTop = function (){
	    this.bringTo(Infinity)
	};
	
	Element.prototype.bringToBottom = function (){
	    this.bringTo(-Infinity)
	};
	
	Element.prototype.timeout = function (fn, ms) {
	    var fnto = fn.bind(this)
		setTimeout(fnto, ms)
		return this;
	};
	
	Element.prototype.bringTo = function (where){
	    var parent = this.tag.ownerSVGElement;
	    switch (where) {
	        case Infinity: 
	            parent.removeChild(this.tag);
	            parent.appendChild(this.tag);
	            break;
	        case -Infinity:
	            parent.removeChild(this.tag);
	            parent.insertBefore(this.tag, parent.firstChild);
	            break;
	        default:
	            var n = this.tag
	            if (where > 0) {
	                while (where++ > 0 && n.nextSibling) {
	                    n = n.nextSibling
	                }
	                parent.removeChild(this.tag);
	                parent.insertBefore(this.tag, n.nextSibling);
	            } else if (where < 0) {
	                while (where-- < 0 && n.previousSibling) {
	                    n = n.previousSibling
	                }
	                parent.removeChild(this.tag);
	                parent.insertBefore(this.tag, n);
	            }
	            break;
	    }
	    
	    
	}
	Element.prototype.bringToTop = function (){
	    var parent = this.tag.ownerSVGElement;
	    parent.removeChild(this.tag);
	    parent.appendChild(this.tag);
	}
	
	Element.prototype.clear = function () {
		this.tag.innerHTML = '';
	};
	
	Element.prototype.replace = function (currentOne, newOne) {
		currentOne.tag.parentNode.replaceChild(newOne.tag, currentOne.tag);
	};
	
	Element.prototype.getBbox = function () {
		return this.tag.getBBox();
	};
	
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