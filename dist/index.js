'use strict';
/*
 __    _____ _____ _____ _____ _____ ____  _____ 
|  |  |   __|     |   | |  _  | __  |    \|     |
|  |__|   __|  |  | | | |     |    -|  |  |  |  |
|_____|_____|_____|_|___|__|__|__|__|____/|_____|
                                                  V. 1.1.0

Federico Ghedina <federico.ghedina@gmail.com> 2026
~45.89KB
*/
const Leonardo = (function(w) {

	/*
	[Malta] lib/L.js
	*/
	var ht = 'http://',
	
		// https://www.w3.org/TR/
		namespaces = {
			/**
			 * Creative Commons (Metadata)
			 * https://creativecommons.org/ns/
			 */
			cc: ht + 'creativecommons.org/ns#',
	
			/**
			 * Dublin Core (Metadata - Standard)
			 * https://purl.org/dc/elements/1.1/
			 */
			dc: ht + 'purl.org/dc/elements/1.1/',
	
			/**
			 * XML Events
			 * https://www.w3.org/TR/xml-events/
			 */
			ev: ht + 'www.w3.org/2001/xml-events',				// https://www.w3.org/TR/xml-events/
	
			/**
			 * RDF (Resource Description Framework - Semantic Web)
			 * https://www.w3.org/1999/02/22-rdf-syntax-ns/
			 */
			rdf: ht + 'www.w3.org/1999/02/22-rdf-syntax-ns#',
	
			/**
			 * SVG (Scalable Vector Graphics)
			 * https://www.w3.org/TR/SVG2/
			 * https://www.w3.org/TR/SVG/
			 */
			svg: ht + 'www.w3.org/2000/svg',
	
			/**
			 * XLink (Linking in XML)
			 * https://www.w3.org/TR/xlink/
			 */
			xlink: ht + 'www.w3.org/1999/xlink',
	
			/**
			 * MathML
			 * https://www.w3.org/Math/
			 */
			math: ht + 'www.w3.org/1998/Math/MathML',
	
			/**
			 * XHTML (HTML in XML)
			 * https://www.w3.org/TR/xhtml1/
			 */
			xhtml: ht + 'www.w3.org/1999/xhtml', //<foreignObject> https://www.w3.org/TR/SVG2/embedded.html#ForeignObjectElement
	
			/**
			 * XML Namespace (Standard XML)
			 * https://www.w3.org/XML/1998/namespace
			 */
			xml: ht + 'www.w3.org/XML/1998/namespace' 
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
		validate.positiveInt(width);
		validate.positiveInt(height);
		var self = this,
			tmp, l;
		opts = opts || {};
		this.width = width;
		this.height = height;
	
	    this.tag = create('svg');
	    this.sas({
			width: width,
			height: height,
			xmlns: namespaces.svg,
			viewbox: '0 0 ' + width + ' ' + height
		});
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
			// only ns within namespaces var can be added there
			// so the only thing to validate is the fact that
			// opts.ns is actually an array
			// validate.array(opts.ns);
	    	opts.ns === '*' && (opts.ns = Object.keys(namespaces));
	    	for (tmp = 0, l = opts.ns.length; tmp < l; tmp++)
	    		addNs(opts.ns[tmp]);
		}
	}
	
	L.prototype.autoScale = function () {
		this.tag.setAttribute('preserveAspectRatio', 'xMidYMid meet');
		this.tag.removeAttribute('width');
		this.tag.removeAttribute('height');
		return this;
	};
	/**
	 * set tag attributes
	 *
	 * @param      {<type>}  attrs   The attributes
	 * @return     {Object}  { description_of_the_return_value }
	 */
	L.prototype.setAttributes = L.prototype.sas = function (attrs) {
		for (var k in attrs) this.tag.setAttribute(k, attrs[k]);
		return this;
	};
	
	L.prototype.getAttributes = function () {	
		var attrs = [].slice.call(arguments, 0),
			r = {}, k, l;
		for (k = 0, l = attrs.length; k < l; k++) {
			r[attrs[k]] = this.tag.getAttribute(attrs[k]);
		}
		return r;
	};
	
	/**
	 * { function_description }
	 *	`
	 * @param      {<type>}  styles  The styles
	 * @return     {Object}  { description_of_the_return_value }
	 */
	L.prototype.setStyles = function (styles) {	
		var k;
		for (k in styles) this.tag.style[k] = styles[k];
		return this;
	};
	
	L.prototype.getStyles = function () {	
		var styles = [].slice.call(arguments, 0),
			r = {}, k, l;
		for (k = 0, l = styles.length; k < l; k++) {
			r[styles[k]] = this.tag.style[styles[k]];
		}
		return r;
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
					self.append(k);
				});
			} else {
				self.childs.push(el);
				el.parent = self;
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
		// console.log({trg})
	    if (!trg) throw ERRORS.no_target;
		// validate.isNode(trg);
		trg.innerHTML = '';
	    if (o && o.fade) {
	        this.tag.style.opacity = 0;
	    }
		trg.appendChild(this.tag);
	    o && o.cb && o.cb.call(this);
	    o && o.fade && this.fadeIn(parseInt(o.fade, 10))
		return this;
	};
	
	/**
	 * { function_description }
	 *
	 * @param      {Function}  cb      { parameter_description }
	 * @return     {Object}    { description_of_the_return_value }
	 */
	L.prototype.remove = function () {
	    var els = [].slice.call(arguments, 0);
		if (els.length === 0) els.push(this);
		els.forEach(function (el) {
			el.tag.parentNode.removeChild(el.tag);
			/* istanbul ignore else */
			if (el.parent) {
				el.parent.childs = el.parent.childs.filter(function (c) {
					return c._id !== el._id
				})
			}
		})
		return this;
	};
	
	/*
	[Malta] lib/errs.js
	*/
	var ERRORS = {
	    no_target: new Error('Target not set'),
	    validation_failed : function(type) {return new Error('Validation failed for ' + type);},
	    factory_invalid_params : new Error('Invalid parameters for factory function'),
	    dom_node_expected: new Error('Dom node expected'),
	    undefined : new Error('undefined not expected'),
	    'null' : new Error('null not expected'),
	    array_expected: new Error('array expected'),
	    even_numbers_expected: new Error('even number of integers expected')
	}
	/*
	[Malta] lib/validators.js
	*/
	L.validators = {
	    int : function (v) {
	        if(isNaN(v)) return false;
	        var n = parseFloat(v);
	        return !isNaN(parseFloat(v)) && isFinite(v) && n === v;
	    },
	
	    // v can contain something that is not in the shape
	    // anyway all the fields in shape must be present in v
	    // and the types must match
	    objShape: function (v, shape) {
	        if (typeof v !== 'object' || typeof shape !== 'object') return false;
	        for (var key in shape) {
	            // if key ends with ? then it is optional to have that on v
	            var isOptional = false,
	                k = key;
	            if (key.slice(-1) === '?') {
	                isOptional = true;
	                k = k.slice(0, -1);
	            }
	            if (!isOptional || (isOptional && v.hasOwnProperty(k))) {
	                if (typeof v[k] !== shape[k]) return false;
	            }
	        }
	        return true;        
	    },
	    array: function (v){ return Array.isArray(v); }
	};
	var validate = {
	    // defined : function (e) {
	    //     if(typeof e === 'undefined') throw ERRORS.undefined;
	    //     return true;
	    // },
	    // notNull : function (e) {
	    //     if(e === null) throw ERRORS.null;
	    //     return true;
	    // },
	    // isNode : function (node) {
	    //     if (!(node instanceof Element)) throw ERRORS.dom_node_expected;
	    //     return true;
	    // },
	    int : function (n) {
	        var isValid = L.validators.int(n);
	        if (!isValid) throw ERRORS.validation_failed('int');
	        return true;
	    },
	    intp : function (n) {
	        var np = parseInt(n.replace(/(\%)$/, ''), 10),
	            isValid = L.validators.int(np);
	        if (!isValid) throw ERRORS.validation_failed('intp');
	        return true;
	    },
	    positive : function (n) {
	        if (n <= 0) throw ERRORS.validation_failed('pos');
	        return true;
	    },
	    positiveInt: function (n){
	        var isInt = L.validators.int(n),
	            isPositive = n > 0;
	        if(!isInt || !isPositive) throw ERRORS.validation_failed('posInt')
	        return true;
	    },
	    objShape : function (v, shape) {
	        var isValid = L.validators.objShape(v, shape);
	        if (!isValid) throw ERRORS.validation_failed('objShape');
	        return true;
	    },
	    array: function(v) {
	        if(!L.validators.array(v)) throw ERRORS.array_expected
	        return true;
	    },
	    evenNumbers: function (a){
	        var l = a.length,
	            lengthOk = l % 2 === 0,
	            allNumbers = a.every(function (n){return validate.int(n)})
	        if(!lengthOk || !allNumbers) throw ERRORS.even_numbers_expected;
	        return true;
	    }
	}
	
	/*
	[Malta] lib/factory.js
	*/
	var Leo = function (w, h, attrs) {
	    // if (!w || !h || w < 0 || h < 0) 
	    //     throw ERRORS.factory_invalid_params;
	    validate.positiveInt(w);
	    validate.positiveInt(h);
	    return new L(w, h, attrs);
	};
	/*
	[Malta] lib/Lstatic.js
	*/
	/**
	 * static function to import a documentor a string
	 * @param {*} d 
	 */
	// external use with Leo
	// internal use with L
	// proto
	Leo.import = L.import = L.prototype.import =function (d) {
		// document of string ?
		if (typeof d === 'string') {
			d = L.toDocument(d);
		}
		var newL = new L(1, 1);
		newL.tag = d;
		return newL;
	};
	
	/**
	 * 
	 */
	// external use with Leo
	// internal use with L
	// proto
	Leo.getqs = L.getqs= L.prototype.getqs = function () {
		var q = window.location.search.substring(1),
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
	Leo.toString = L.toString= L.prototype.toString = function (SVGDocument) {
		var tmpParent = document.createElement('div');
		tmpParent.appendChild(SVGDocument);
		return tmpParent.innerHTML;
	};
	
	/**
	 * 
	 * @param {*} SVGString 
	 * @returns 
	 */
	Leo.toDocument = L.toDocument = L.prototype.toDocument = function (SVGString) {
		const parser = new DOMParser();
		return parser.parseFromString(SVGString, 'image/svg+xml').children[0];
	};
	
	/**
	 * 
	 * @param {\} full 
	 * @returns 
	 */
	Leo.randomColor = L.randomColor = L.prototype.randomColor = function (full) {
		var len = full ? 6 : 3,
			base = full ? 16777215 : 4095,
			r = (~~(Math.random() * base)).toString(16);
		while (r.length < len) r = '0' + r;
		return r;
	};
	
	/**
	 * @param top input top range value needed
	 * @param scale defaulted to 100
	 * @param zoom
	 * @param precision
	 * 
	 * @returns function
	 * scaler function accepting a number in [0,scale] and
	 * returning the mapped value in [0, top]
	 * 
	 */
	Leo.getScaler = L.getScaler = L.prototype.getScaler = function (top, scale, zoom, precision) {
		scale = 'undefined' !== typeof scale ? ~~scale : 100;
		zoom = 'undefined' !== typeof zoom ? ~~zoom : 1;
		precision = 'undefined' !== typeof precision ? ~~precision : 1;
		return function (p) {
			return parseFloat((p * zoom * top / scale).toFixed(precision), 10);
		}
	};
	
	
	Leo.img2base64png = L.img2base64png = L.prototype.img2base64png = function (src, cb) {
		const getBase64StringFromDataURL = (dataURL) =>
	    	dataURL.replace('data:', '').replace(/^.+,/, '');
		
		fetch(src)
	        .then((res) => res.blob())
	        .then((blob) => {
	            const reader = new FileReader();
	            reader.onloadend = () => {
	                const base64 = getBase64StringFromDataURL(reader.result);
	                cb('data:image/png;base64,'+base64)
	            };
	            reader.readAsDataURL(blob);
	        });
	};
	
	/*
	[Malta] lib/Lutilities.js
	*/
	function fade (out, t, target) {
		var start = null,
	        self = this,
	        r,
			done = false;
		setTimeout(function () { done = true; }, t);
		target = target ||  self;
		target.tag.style.opacity = out ? 1 : 0;
	
		function fade(now) {
	        start = start || now;
	        var p = parseFloat((now - start) / t, 10);
			if (out) p = 1 - p;
			var cnd = out ? p > 0 : p < 1;
	        target.tag.style.opacity = p;
	        if (cnd && !done) {
	            r = requestAnimationFrame(fade);
	        } else {
	            target.tag.style.opacity = out ? 0 : 1;
	            cancelAnimationFrame(r);
	        }
	    }
	    r = requestAnimationFrame(fade);
		return this;
	}
	
	/**
	 * 
	 * @param {*} t 
	 * @param {*} target 
	 * @returns 
	 */
	L.prototype.fadeIn = function (t, target) {
	    fade.apply(this, [false, t, target])
		return this;
	}
	
	/**
	 * 
	 * @param {*} t 
	 * @param {*} target 
	 * @returns 
	 */
	L.prototype.fadeOut = function (t, target) {
	    fade.apply(this, [true, t, target])
		return this;
	}
	
	
	/**
	 * 
	 * @param {*} txt 
	 * @param {*} name 
	 * @returns 
	 */
	L.prototype.downloadAnchor = function (txt, name) {
		var a = document.createElement('a');
		a.download = (name || 'download') + '\.svg';
		a.href = this.dataEncoded();
		a.innerHTML = txt || 'download';
		a.style.display = 'block';
		return a;
	};
	
	/**
	 * 
	 * @param {*} title 
	 * @param {*} alt 
	 * @returns 
	 */
	L.prototype.toImageTag = function (title, alt) {
		var i = document.createElement('img');
	    title = title || '';
	    alt = alt || '';
		i.setAttribute('title', title);
		i.setAttribute('alt', alt);
		i.src = this.dataEncoded();
		return i;
	};
	
	/**
	 * 
	 * @returns 
	 */
	/* istanbul ignore next */
	L.prototype.positionInspector = function (tpl, cb) {
		tpl = tpl || '%({%x} {%y}) '+
				' rel-%({r%x} {r%y}) ' +
				' px({x} {y})' +
				' rel-px({rx} {ry})';
		cb = cb || function (){};
		var self = this,
			tag = this.tag,
			infoTag = document.createElement('div'),
			infoList = document.createElement('ul'),
			copy = document.createElement('span'),
			hiddenList = [],
			hiddenListIndex = 0,
			boundingBox = tag.getBoundingClientRect(),
			left = boundingBox.left,
			top = boundingBox.top,
			w = this.width,
			h = this.height,
			p = function(n, prec){ return parseFloat(n.toFixed(prec || 2), 10)},
			currentInfo = tpl,
			prev = { x: 0, y: 0},
			scroll = { left: 0, top: 0},
			init = {x: document.documentElement.scrollLeft, y: document.documentElement.scrollTop},
			curr = { x: 0, y: 0},
			currTplized = {},
			curves = [[]],
			currentCurveIndex = 0,
			dots = [],
			dotsIndex = 0,
			onScroll = function () {
				scroll.left = document.documentElement.scrollLeft;
				scroll.top = document.documentElement.scrollTop;
			},
			dotsGroup = self.group();
		copy.innerText = '📑';
		copy.addEventListener('click', function(e){
			if(navigator.clipboard.writeText(hiddenList.join(' '))){
				alert('copied to the clipboard');
			}
		})
		this.append(dotsGroup);
		infoTag.style.fontFamily = infoList.style.fontFamily = 'verdana';
		
		infoList.style.listStyleType = 'decimal';
		infoList.style.fontSize = '0.8em';
		infoList.style.height = '80px';
		infoList.style.maxWidth = '400px';
		infoList.style.border = '1px solid black';
		infoList.style.overflow = 'scroll';
	
		
		window.addEventListener('scroll', onScroll);
		tag.addEventListener('mousemove', function (e) {
			var x = e.clientX + scroll.left - init.x,
				y = e.clientY + scroll.top - init.y,
				toPercX = function (n) { return 100 * n / w; },
				toPercY = function (n) { return 100 * n / h; };
			curr.x = x - left;
			curr.y = y - top;
			currentInfo = tpl;
			var px = 100 * curr.x / w,
				py = 100 * curr.y / h,
				tplValues = {
					'%x': p(px), '%y': p(py),
					'r%x': p(toPercX(~~curr.x - prev.x)), 'r%y': p(toPercY(~~curr.y - prev.y)),
					x: ~~curr.x, y: ~~curr.y,
					rx: ~~curr.x - prev.x, ry: ~~curr.y - prev.y
				};
	
			for (var k in tplValues) {
				currentInfo = currentInfo.replace('{' + k + '}', tplValues[k]);
			}
			currTplized = Object.assign({}, tplValues);
			infoTag.innerHTML = currentInfo;
		});
	
		function doDots() {
			dotsGroup.clear();
			dotsGroup.append(dots);
		}
	
		tag.parentNode.appendChild(infoTag);
		tag.parentNode.appendChild(infoList);
		tag.parentNode.appendChild(copy);
		window.addEventListener('keydown', function (e) {
			if (e.key === "N" && e.shiftKey) {
				currentCurveIndex++;
				curves.push([]);
	
				hiddenList[hiddenListIndex++] = 'null /* === curve separator == */'
			}
			if (e.key === "Z" && e.shiftKey) {
				curves[currentCurveIndex] = curves[currentCurveIndex].slice(0, -1);
				
				hiddenList = hiddenList.slice(0, -1);
				hiddenListIndex--;
	
				dots = dots.slice(0, -1);
				dotsIndex--;
				cb(curves);
				doDots();
			}
		});
		tag.addEventListener('click', function () {
			var item = document.createElement('li'),
				r = 2,
				r2 = r / 2,
				rdub = r * 2,
				dot = self.circle(~~curr.x + r2 , ~~curr.y + r2, r),
				rp = r + 1;
			scroll.left = document.documentElement.scrollLeft;
			scroll.top = document.documentElement.scrollTop;
	
			dot.sas({
				stroke: 'black',
				fill: 'white',
				'stroke-width': 1,
				'stroke-dasharray': rp + ',1'
			});
			dot.on('mouseover', function () {
				item.style.fontWeight = 'bold';
				dot.sas({fill: 'red', r : rdub});
			});
			dot.on('mouseleave', function () {
				item.style.fontWeight = 'normal';
				dot.sas({fill: 'white', r : r});
			});
			prev = {x: ~~curr.x, y: ~~curr.y};
	
			item.innerHTML = currentInfo;
			hiddenList[hiddenListIndex++] = currentInfo;
			item.addEventListener('mouseover', function () {
				item.style.fontWeight = 'bold';
				dot.sas({fill: 'red', r : rdub});
			});
			item.addEventListener('mouseout', function () {
				item.style.fontWeight = 'normal';
				dot.sas({fill: 'white', r : r});
			});
	
			infoList.appendChild(item);
			curves[currentCurveIndex].push(currTplized);
			cb(curves);
			dots[dotsIndex++] = dot;
	
			doDots();
			infoList.scrollTop = Number.MAX_SAFE_INTEGER;
		});
		return this;
	};
	
	/**
	 * 
	 * @param {*} width 
	 * @param {*} height 
	 * @param {*} styles 
	 * @param {*} ends 
	 * @returns 
	 */
	L.prototype.positionCruncher = function (width, height, styles, ends) {
		var self = this,
			startFn = 'M',
			midFn = 'l',
			w = L.getScaler(width),
			h = L.getScaler(height);
	
		function builder(acc, e) {
			return acc[midFn](w(e[0]), h(e[1]));
		}
		return function (dots) {
			dots = dots || [];
			if (!dots.length) return;
			var build = dots.slice(1).reduce(	
				builder,
				self.pathBuild[startFn](w(dots[0][0]), h(dots[0][1]))
			);
			if (ends) build.Z();
			return self.path(build).sas(styles);
		};
	}
	 
	/**
	 * 
	 * @param {*} points 
	 * @param {*} styles 
	 * @returns 
	 */
	L.prototype.bezierThroughPoints = function(points, styles, cb) {
		var self = this, i;
		cb = cb || function(){}
	    if (!points || points.length < 2) return [];
	
	    // Helper to compute control points for smooth cubic Bézier through points
	    function getControlPoints(pts) {
	        var n = pts.length - 1,
				cps = [];
	        // Special case for 2 points: straight line
	        if (n === 1) {
	            cps.push([
	                pts[0],
	                [ (2*pts[0][0] + pts[1][0])/3, (2*pts[0][1] + pts[1][1])/3 ],
	                [ (pts[0][0] + 2*pts[1][0])/3, (pts[0][1] + 2*pts[1][1])/3 ],
	                pts[1]
	            ]);
	            return cps;
	        }
	        // Calculate control points for each segment
	        for (i = 0; i < n; i++) {
	            var p0 = pts[i === 0 ? i : i-1],
					p1 = pts[i],
					p2 = pts[i+1],
					p3 = pts[i+2 < pts.length ? i+2 : i+1],
	
	            // Catmull-Rom to Bezier conversion
					c1 = [
						p1[0] + (p2[0] - p0[0]) / 6,
						p1[1] + (p2[1] - p0[1]) / 6
					],
					c2 = [
						p2[0] - (p3[0] - p1[0]) / 6,
						p2[1] - (p3[1] - p1[1]) / 6
					];
	            cps.push([p1, c1, c2, p2]);
	        }
	        return cps;
	    }
		var prec = 2,
			rou = function(v){return parseFloat(v.toFixed(prec), 10);},
			controlPoints =  getControlPoints(points),
			d = 'M' + rou(controlPoints[0][0][0]) + ',' + rou(controlPoints[0][0][1]);
	
	    controlPoints.forEach(function(seg){
	        d += ' C'+rou(seg[1][0])+','+rou(seg[1][1])+' '+rou(seg[2][0])+','+rou(seg[2][1])+' '+rou(seg[3][0])+','+rou(seg[3][1]);
	    });
		cb(self.path(d).tag)
		return self.path(d).sas(styles);
	};
	
	/**
	 * 
	 * @returns 
	 */
	L.prototype.dataEncoded = function () {
		var serializer = new XMLSerializer(),
			source = '<?xml version="1.0" standalone="no"?>\r\n' + serializer.serializeToString(this.tag);
		/* istanbul ignore else */
		if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
			source = source.replace(/^<svg/, '<svg xmlns="' + namespaces.svg + '"');
		}
		/* istanbul ignore else */
		if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
			source = source.replace(/^<svg/, '<svg xmlns:xlink="' + namespaces.xlink + '"');
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
		circle.sas({cx : cx, cy : cy, r : r});
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
		ellipse.sas({cx : cx, cy : cy, rx : rx, ry : ry});
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
		image.sas({x : x, y : y, width : w, height : h});
		image.tag.setAttributeNS(namespaces.xlink, 'xlink:href', src);
		image.tag.setAttribute('transform-origin', "center");
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
		line.sas({x1 : x1, y1 : y1, x2 : x2, y2 : y2});
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
		path.sas(attrs);
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
		validate.evenNumbers(points);
		for (null; i < l; i+=2) {
			pp.push(points[i] + ',' + points[i+1])
		}
		polygon.tag.setAttribute('points', pp.join(' '));
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
		polyline.tag.setAttribute('points', pp.join(' '));
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
		rect.sas({x : x, y : y, width : w, height : h});
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
		var text = new Element('text');
		text.sas({x : x, y : y});
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
		script.tag.setAttribute('type', 'application/ecmascript');
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
	
	function createFun(l /*letter*/) {
		return function () {
			var lp = this.prev === l ? ' ' : l;
			this.path += [lp].concat([[].slice.call(arguments, 0).join(',')]).join('');
			this.prev = l;
			return this;
		};
	}
	
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
		this.prev = null;
	}
	
	['m', 'z', 'l', 'h', 'v', 'c', 'q', 's', 't', 'a', 'r'].forEach(function (f, up) {
		up = f.toUpperCase();
		Pathbuild.prototype[f]= createFun(f);
		Pathbuild.prototype[up]= createFun(up);
	})
	
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
	
	/**
	 * 
	 * @param {*} cx 
	 * @param {*} cy 
	 * @param {*} r 
	 * @param {*} sa 
	 * @param {*} ea 
	 * @returns 
	 */
	L.prototype.slice = function (cx, cy, r /* radius */, sa /* startAngle */, ea /* endAngle */) {
		var self = this,
			p = self.slicePath(cx, cy, r, sa, ea);
		return self.path(p);
	};
	
	/**
	 * 
	 * @param {*} cx 
	 * @param {*} cy 
	 * @param {*} r 
	 * @param {*} sa 
	 * @param {*} ea 
	 * @returns 
	 */
	L.prototype.slicePath = function (cx, cy, r /* radius */, sa /* startAngle */, ea /* endAngle */) {
		var la /*largeArc*/ = 0;
	
		if (sa > ea) {
			var s = sa;
			sa = ea;
			ea = s;
		}
		/*if (Math.abs(ea - sa) > 360) {
			ea = 359.999;
		}*/
		la = ea - sa <= 180 ? 0 : 1;
		sa = deg2rad(sa);
		ea = deg2rad(ea);
		return this.pathBuild
			.M(cx, cy)
			.L(
				cx + Math.cos(sa) * r,
				cy - Math.sin(sa) * r
			)
			.A(
				r,
				r,
				0,
				la,
				0,
				cx + Math.cos(ea) * r,
				cy - Math.sin(ea) * r
			)
			.L(cx, cy);
	};
		
	/*
	[Malta] lib/Lgradients.js
	*/
	
	var getgradStepper = function (g) {
	    return function(st) {
	        var tmp = new Element('stop'),
	            att = {
	                offset: st.perc + '%',
	                'stop-color': st.color
	            };
	        if ('style' in st) att.style = st.style;
	        tmp.sas(att);
	        g.append(tmp)
	    }
	}
	
	/**
	 * 
	 * @param {*} sts 
	 * @param {*} x1 
	 * @param {*} y1 
	 * @param {*} x2 
	 * @param {*} y2 
	 * @returns 
	 */
	L.prototype.linearGradient = function(sts /* steps */, x1, y1, x2, y2) {
	    var defs = getDefs(this),
	        id = lid(),
	        linearGrad = new Element('linearGradient'),
	        attrs = {
	            id: id,
	            x1: x1||'0%',
	            y1: y1||'0%',
	            x2: x2||'100%',
	            y2: y2||'0%'
	        },
	        stepper = getgradStepper(linearGrad);
	
	    linearGrad.sas(attrs);
	    sts.forEach(stepper);
	    defs.append(linearGrad);
	    return 'url(#' + id + ')';
	}
	
	/**
	 * 
	 * @param {*} sts 
	 * @returns 
	 */
	L.prototype.radialGradient = function radial(sts) {
	    var defs = getDefs(this),
	        id = lid(),
	        radialGrad = new Element('radialGradient'),
	        stepper = getgradStepper(radialGrad);
	    radialGrad.tag.setAttribute('id', id );
	
	    sts.forEach(stepper);
	    defs.append(radialGrad);
	    return 'url(#' + id + ')';
	}	
	/*
	[Malta] lib/Lfilters.js
	*/
	
	/**
	 * 
	 * @param {*} filters 
	 * @returns 
	 */
	L.prototype.filter = function(filters) {
	    getDefs(this)
	    var id = lid(),
	        filter = new Element('filter'),
	        availables = [
	            'feGaussianBlur', 'feDropShadow', 'feMorphology',
	            'feDisplacementMap', 'feBlend', 'feColorMatrix',
	            'feConvolveMatrix', 'feComponentTransfer', 'feSpecularLighting',
	            'feDiffuseLighting', 'feFlood', 'feTurbulence',
	            'feImage', 'feTile', 'feOffset',
	            'feComposite','feMerge'
	        ];
	    filter.tag.setAttribute('id', id);
	
	    for(
	        var i = 0, l = filters.length, f, inner = false;
	        i < l;
	        i++, inner = false
	    ) {
	        f = filters[i];
	        if (availables.includes(f.type)){
	            inner = new Element(f.type);
	            inner.sas(f.attrs);
	        }
	
	        inner && filter.append(inner);
	    }
	    
	    this.defs.append(filter);
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
    		var animate = new Element('animate'),
    			attrs = {
    				attributeName: params.attributeName,
    				dur: params.dur,
    				begin: params.begin || '0s',
    				repeatCount: params.repeatCount
    			};
    		'from' in params && (attrs.from = params.from);
    		'to' in params && (attrs.to = params.to);
    		'values' in params && (attrs.values = params.values);
    		'type' in params && (attrs.type = params.type);
    		animate.sas(attrs);
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
    /**
     * 
     * @param {*} txt 
     * @param {*} w 
     * @param {*} h 
     * @param {*} textAttrs 
     * @param {*} boxFill 
     * @returns 
     */
    L.prototype.textBox = function (txt, w, h, textAttrs, boxFill) {
        var cnt = new Element('svg'),
            rect = new Element('rect'),
            text = new Element('text');
        rect.sas({
            x : 0, y : 0,
            width: w, height: h,
            "stroke-width" : 0,
            stroke : 'transparent',
            fill: boxFill || 'transparent'
        });
        
        cnt.sas({width : w, height : h});
        text.sas({
            x: '50%',
            y: '50%',
            'dominant-baseline': 'middle',
            'text-anchor': 'middle'
        });
        textAttrs && text.sas(textAttrs);
        text.tag.innerHTML = txt;
        cnt.append(rect, text);
        return cnt;
    }
    
    
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
        path.tag.setAttribute('id', id );
        textpath.tag.innerHTML = cnt;
        textpath.tag.setAttributeNS(namespaces.xlink, 'xlink:href', '#' + id);
        text.append(defs);
        text.append(textpath);
        defs.append(path);
        return text;
    };
    
    /**
     * 
     * @param {*} w 
     * @param {*} h 
     * @param {*} text 
     * @param {*} attrs 
     * @returns 
     */
    L.prototype.centeredText = function (w, h, text, attrs) {
        var ret = this.group(),
            id = lid(),
            path = new Element('path'),
            texte = new Element('text'),
            textPath = new Element('textPath');
        path.sas({
            id: id,
            pathLength: w,
            d: 'M0 ' + h / 2 + 'h' + w,
            height: 0,
            "stroke-opacity": 0,
        })
        attrs = attrs || {}
        attrs.href = '#' + id;
        attrs['text-anchor'] = "middle";
        attrs['dominant-baseline'] = "middle"
        attrs.startOffset = w / 4;
    
        textPath.sas(attrs)
        textPath.tag.innerHTML = text;
        texte.append(textPath);
        ret.append(path, texte);
        ret.updateText = function (t) { textPath.tag.innerHTML = t; }
        return ret;
    }
    
    /**
     * 
     * @param {*} cx 
     * @param {*} cy 
     * @param {*} r 
     * @param {*} from 
     * @param {*} to 
     * @returns 
     */
    L.prototype.arcCentered = function (cx, cy, r, from, to) {
        var p = new Element('path');
        p.tag.setAttribute('d', describeArc(cx, cy, r, from, to));
        return p;
    }
    
    /**
     * 
     * @param {*} cx 
     * @param {*} cy 
     * @param {*} r1 
     * @param {*} r2 
     * @param {*} from 
     * @param {*} to 
     * @param {*} vrs1 
     * @param {*} vrs2 
     * @returns 
     */
    L.prototype.arcSection = function (cx, cy, r1, r2, from, to, vrs1, vrs2) {
        vrs1 = typeof vrs1 === 'undefined' ? 1 : vrs1;
        vrs2 = typeof vrs2 === 'undefined' ? 0 : vrs2;
        var startOut = polarToCartesian(cx, cy, r2, from),
            endOut = polarToCartesian(cx, cy, r2, to),
            startIn = polarToCartesian(cx, cy, r1, to),
            endIn = polarToCartesian(cx, cy, r1, from);
        return this.path(
            this.pathBuild
                .M(endIn.x, endIn.y)
                .L(startOut.x, startOut.y)
                .A(
                    r2, r2,
                    0, 0, vrs1,
                    endOut.x, endOut.y
                )
                .L(startIn.x, startIn.y)
                .A(
                    r1, r1,
                    0, 0, vrs2,
                    endIn.x, endIn.y
                )
                .Z()
        );
    };
    	
    // ---
	/*
	[Malta] lib/functions.js
	*/
	
	
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
	/*
	[Malta] lib/Element.js
	*/
	var iii = 0;
	/**
	 * { function_description }
	 *
	 * @class      Element (name)
	 * @param      {Function}  tag     The tag
	 * @param      {<type>}    ns      { parameter_description }
	 */
	function Element(tag, ns) {
		this.t = tag;
		this._id = 'i_'+(++iii);
		this.ns = ns;
		this.tag = create(tag, ns);
		this.tag.Element = this;
		this.parent = null;
		this.childs = [];
		this.events = {};
		this.scaleX = 1;
		this.scaleXsign = 1;
		this.scaleY = 1;
		this.scaleYsign = 1;
		this.transforms = {
			rotate : '',
			move : '',
			scale : ''
		};
	}
	
	/**
	 * { item_description }
	 */
	Element.prototype.sas = L.prototype.sas;
	Element.prototype.setAttributes = L.prototype.setAttributes;
	Element.prototype.getAttributes = L.prototype.getAttributes;
	
	/**
	 * { item_description }
	 */
	Element.prototype.setStyles = L.prototype.setStyles;
	Element.prototype.getStyles = L.prototype.getStyles;
	
	
	/**
	 * { item_description }
	 */
	Element.prototype.append = L.prototype.append;
	
	Element.prototype.remove = L.prototype.remove;
	
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
		/* istanbul ignore else */
		if (eventName in this.events) {
			if (typeof cb === 'undefined') {
				this.events[eventName].forEach(function (fn) {
					self.tag.removeEventListener(eventName, fn);
				});
				this.events[eventName] = null;
			} else {
				this.tag.removeEventListener(eventName, cb);
			}
		}
		return this;
	};
	
	/**
	 * 
	 * @param {*} eventName 
	 * @param {*} cb 
	 * @returns 
	 */
	Element.prototype.once = function (eventName, cb) {
	    var self = this;
		this.on(eventName, function _(e){
			self.off(eventName, _);
			cb(e);
		});
		return this;
	};
	
	Element.prototype.trigger = function (event) { 
		var self = this.tag;
		self.dispatchEvent(new Event(event, {target: self}));
	}
	
	
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
	    instance.tag.setAttribute('transform', instance.transforms.rotate + ' ' + instance.transforms.move + ' ' + instance.transforms.scale);
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
	
	function getScale(i){
		return ' scale('
			+(i.scaleX * i.scaleXsign)+', '
			+(i.scaleY * i.scaleYsign)+')';
	};
	
	/**
	 * { function_description }
	 *
	 * @param      {string}  sx      { parameter_description }
	 * @param      {string}  sy      { parameter_description }
	 * @return     {<type>}  { description_of_the_return_value }
	 */
	Element.prototype.scale = function (sx, sy) {
		this.scaleX = sx || 0;
		this.scaleY = sy || sx || 0;
		this.transforms.scale = getScale(this);
		return trans(this);
	};
	
	/**
	 * { function_description }
	 *
	 * @return     {<type>}  { description_of_the_return_value }
	 */
	Element.prototype.mirrorH = function () {
		this.scaleYsign = -this.scaleYsign;
		this.transforms.scale = getScale(this);
		return trans(this);
	};
	
	/**
	 * { function_description }
	 *
	 * @return     {<type>}  { description_of_the_return_value }
	 */
	Element.prototype.mirrorV = function () {
		this.scaleXsign = -this.scaleXsign;
		this.transforms.scale = getScale(this);
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
	
	Element.prototype.bringToTop = function (){
	    this.bringTo(Infinity);
	};
	
	Element.prototype.bringToBottom = function (){
	    this.bringTo(-Infinity);
	};
	
	Element.prototype.timeout = function (fn, ms) {
	    var fnto = fn.bind(this)
		setTimeout(fnto, ms)
		return this;
	};
	
	/**
	 * 
	 * @param {*} where 
	 */
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
	            if (where >= 0) {
	                while (where++ > 0 && n.nextSibling) {
	                    n = n.nextSibling
	                }
	                parent.removeChild(this.tag);
	                parent.insertBefore(this.tag, n.nextSibling);
	            } else {
	                while (where-- < 0 && n.previousSibling) {
	                    n = n.previousSibling
	                }
	                parent.removeChild(this.tag);
	                parent.insertBefore(this.tag, n);
	            }
	            break;
	    }
	}
	
	
	Element.prototype.clear = function () {
		this.tag.innerHTML = '';
		this.childs = [];
		this.transforms = {
			rotate : '',
			move : '',
			scale : ''
		};
	};
	
	/**
	 * 
	 * @param {*} currentOne 
	 * @param {*} newOne 
	 */
	Element.prototype.replace = function (currentOne, newOne) {
		currentOne.tag.parentNode.replaceChild(newOne.tag, currentOne.tag);
		currentOne.parent.childs = currentOne.parent.childs.map(function (c) {
			return c._id == currentOne._id ? newOne : c;
		});
	};
	
	Element.prototype.setText = function (txt){
		this.tag.textContent = txt;
		return this;
	}
	

	Leo.validate = validate;
	Leo.ERRORS = ERRORS;
    return Leo;
})();
(typeof exports === 'object') && (module.exports = Leonardo);