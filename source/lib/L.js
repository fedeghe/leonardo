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