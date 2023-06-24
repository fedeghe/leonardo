'use strict';
/*
 __    _____ _____ _____ _____ _____ ____  _____ 
|  |  |   __|     |   | |  _  | __  |    \|     |
|  |__|   __|  |  | | | |     |    -|  |  |  |  |
|_____|_____|_____|_|___|__|__|__|__|____/|_____|
                                                  V. 1.0.25

Federico Ghedina <federico.ghedina@gmail.com> 2023
~32.25KB
*/
const Leonardo = (function(w) {
	
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
		this.width = width;
		this.height = height;
	
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
	 * @param      {Function}  cb      { parameter_description }
	 * @return     {Object}    { description_of_the_return_value }
	 */
	L.prototype.render = function (o) {
	    var trg = o && 'target' in o  ? o.target : this.target;
	    if (!trg) throw 'Target not set'
		trg.innerHTML = '';
	    if (o && o.fade) {
	        this.tag.style.opacity = 0;
	    }
		trg.appendChild(this.tag);
	    if (o) {
		    o.cb && o.cb.call(this);
	        o.fade && this.fadeIn(parseInt(o.fade, 10))
	    }
		return this;
	};
	
	L.prototype.fadeIn = function (t, target) {
	    var start = null,
	        self = this,
	        r;
	    target = target ||  self;
	    target.tag.style.opacity = 0;
	    function fade(now) {
	        start = start || now;
	        var p = (now - start) / t;
	        target.tag.style.opacity = p;
	        if (p < 1) {
	            r = requestAnimationFrame(fade)
	        } else {
	            target.tag.style.opacity = 1;
	            cancelAnimationFrame(r)
	        }
	    }
	    r = requestAnimationFrame(fade)
	}
	L.prototype.fadeOut = function (t , target) {
	    var start = null,
	        self = this,r;
	    
	    target = target ||  self;
	    target.tag.style.opacity = 1;
	    function fade(now) {
	        start = start || now
	        
	        var p = 1 - parseFloat((now - start) / t, 10);
	        target.tag.style.opacity = p;
	        if (p > 0) {
	            r = requestAnimationFrame(fade)
	        } else {
	            cancelAnimationFrame(r);
	            target.tag.style.opacity = 0;
	        }
	    }
	    r = requestAnimationFrame(fade);
	}
	/**
	 * 
	 */
	L.prototype.downloadAnchor = function (txt, name) {
		var a = document.createElement('a');
	  
	    txt = txt || 'download';
	    name = name || 'download';
		
		a.download = name + '\.svg';
		a.href = this.downloadHref();
		// a.addEventListener('click', function () {
		// 	this.download = name + '\.svg'
		// })
		a.innerHTML = txt;
		return a;
	};
	
	L.prototype.positionInspector = function () {
		var self = this,
			tag = this.tag,
			infoTag = document.createElement('div'),
			infoList = document.createElement('ul'),
			boundingBox = tag.getBoundingClientRect(),
			left = boundingBox.left,
			top = boundingBox.top,
			w = this.width,
			h = this.height,
			p = function(n, prec){ return parseFloat(n.toFixed(prec || 2), 10)},
			currentInfo,
			prev = { x: 0, y: 0},
			curr = { x: 0, y: 0},
			markers = [];
		infoTag.style.fontFamily = infoList.style.fontFamily = 'verdana';
		infoList.style.listStyleType = 'decimal';
		infoList.style.fontSize = '0.8em';
		
		tag.addEventListener('mousemove', function (e){
			var x = e.clientX,
				y = e.clientY,
				toPercX = function (n){return 100 * n / w; },
				toPercY = function (n){return 100 * n / h; };
			curr.x = x - left;
			curr.y = y - top;
	
			var px = 100 * curr.x / w,
				py = 100 * curr.y / h;
			currentInfo = '%(' +p(px) + ' ' + p(py) + ')' +
				' px(' + ~~curr.x + ' ' + ~~curr.y + ')' +
				' R%(' + p(toPercX(~~curr.x - prev.x)) + ' ' + p(toPercY(~~curr.y - prev.y)) + ')' +
				' Rpx(' + (~~curr.x - prev.x) + ' ' + (~~curr.y - prev.y) + ')';
			
			
			infoTag.innerHTML = currentInfo;
			
		});
	
		tag.parentNode.appendChild(infoTag);
		tag.parentNode.appendChild(infoList);
		tag.addEventListener('click', function () {
			var item = document.createElement('li'),
				r = 2,
				r2 = r / 2,
				rdub = r * 2,
				dot = self.circle(~~curr.x + r2, ~~curr.y + r2, r),
				rp = r + 1;
			dot.setAttributes({stroke: 'black', fill: 'white', 'stroke-width': 1, 'stroke-dasharray': rp + ',1'});
			dot.on('mouseover', function () {
				item.style.fontWeight = 'bold';
				dot.setAttributes({fill: 'red', r : rdub});
			});
			dot.on('mouseleave', function () {
				item.style.fontWeight = 'normal';
				dot.setAttributes({fill: 'white', r : r});
			});
			markers.push({ item: item, dot: dot });
			prev = {x: ~~curr.x, y: ~~curr.y};
	
			item.innerHTML = currentInfo;
			item.addEventListener('mouseover', function(){
				item.style.fontWeight = 'bold';
				dot.setAttributes({fill: 'red', r : rdub});
			});
			item.addEventListener('mouseout', function(){
				item.style.fontWeight = 'normal';
				dot.setAttributes({fill: 'white', r : r});
			});
			infoList.appendChild(item);
			self.append(dot);
		});
		return this;
	};
	L.prototype.downloadHref = function () {
		var serializer = new XMLSerializer(),
			source = '<?xml version="1.0" standalone="no"?>\r\n' + serializer.serializeToString(this.tag);
	
		if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
			source = source.replace(/^<svg/, '<svg xmlns="' + this.namespaces.svg + '"');
		}
		if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
			source = source.replace(/^<svg/, '<svg xmlns:xlink="' + this.namespaces.xlink + '"');
		}
		return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
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
		text.tag.innerHTML = cnt;
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
	L.prototype.linearGradient = function(steps, x1, y1, x2, y2) {
	    var defs = getDefs(this),
	        id = lid(),
	        linearGrad = new Element('linearGradient'),
	        tmp,
	        attrs = {
	            id: id,
	            x1: x1||'0%',
	            y1: y1||'0%',
	            x2: x2||'100%',
	            y2: y2||'0%'
	        };
	
	    // if (rotate) {
	    //     attrs.gradientTransform = 'rotate(' + rotate + ')'
	    // }
	    linearGrad.setAttributes(attrs);
	    steps.forEach(function(step) {
	        tmp = new Element('stop');
	        var att = {
	            offset: step.perc + '%',
	            // style : 'stop-opacity:1;stop-color:' + steps[i],
	            'stop-color': step.color
	        };
	        if ('style' in step) att.style = step.style;
	        tmp.setAttributes(att);
	        linearGrad.append(tmp)
	    })
	    defs.append(linearGrad);
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
	[Malta] lib/Lfilters.js
	*/
	
	L.prototype.filter = function(filters) {
	    getDefs(this)
	    var id = lid(),
	        filter = new Element('filter'),
	        availables = ['feGaussianBlur','feDropShadow','feMorphology','feDisplacementMap','feBlend','feColorMatrix','feConvolveMatrix','feComponentTransfer','feSpecularLighting','feDiffuseLighting','feFlood','feTurbulence','feImage','feTile','feOffset','feComposite','feMerge'];
	    filter.setAttributes({id: id});
	
	    for(
	        var i = 0, l = filters.length, f, inner = false;
	        i < l;
	        i++, inner = false
	    ) {
	        f = filters[i];
	        if (availables.includes(f.type)){
	            inner = new Element(f.type);
	            inner.setAttributes(f.attrs);
	        }
	
	        filter.append(inner);
	    }
	    
	    this.defs.append(filter);
	    return filters.length ? 'url(#' + id + ')' : '';
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
    	
    /*
    [Malta] lib/Lextra.js
    */
    /*
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
    */
    
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
    
    
    L.prototype.centeredText = function(w, h, text, attrs) {
        var ret = this.group(),
            id = lid(),
            path = new Element('path'),
            texte = new Element('text'),
            textPath = new Element('textPath');
        path.setAttributes({
            id: id,
            pathLength: w,
            d: 'M0 ' + h/2 + 'h' + w,
            height:0,
            "stroke-opacity" : 0,
        })
        attrs = attrs || {}
        attrs.href = '#' + id;
        attrs['text-anchor']="middle";
        attrs['dominant-baseline']="middle"
        attrs.startOffset= w/4;
    
        textPath.setAttributes(attrs)
        textPath.tag.innerHTML = text;
        texte.append(textPath);
        ret.append(path, texte);
        ret.updateText = function(t) {textPath.tag.innerHTML = t;}
        return ret;
    }
    
    L.prototype.arcCentered = function(cx, cy, r, from, to) {
        var p  = new Element('path');
        p.setAttributes({d: describeArc(cx, cy, r, from, to)});
        return p;
    }
    	
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
	        largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
	    return [
	        "M", x, y,
	        "L", start.x, start.y, 
	        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
	        "Z" 
	    ].join(" ");     
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
		sy = sy || sx || 0;
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
	
	var Leo = function (w, h, attrs) {
		if (!w || !h) 
			return {
				ERROR : 'width or height not given!'
			};
		return new L(w, h, attrs);
	};
	Leo.import = L.import;
	Leo.getqs = L.getqs;
    return Leo;
})();
(typeof exports === 'object') && (module.exports = Leonardo);