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
    	opts.ns === '*' && (opts.ns = Object.keys(namespaces));
    	for (tmp = 0, l = opts.ns.length; tmp < l; tmp++)
    		addNs(opts.ns[tmp]);
	}
}

/**
 * set tag attributes
 *
 * @param      {<type>}  attrs   The attributes
 * @return     {Object}  { description_of_the_return_value }
 */
L.prototype.setAttributes = function (attrs) {
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
    if (!trg) throw new Error('Target not set');
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
