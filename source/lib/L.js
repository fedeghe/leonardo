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
