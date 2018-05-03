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
			'cc': "http://creativecommons.org/ns#",
			'dc': "http://purl.org/dc/elements/1.1/",
			'ev' : "http://www.w3.org/2001/xml-events",
			'rdf': "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
			'svg': "http://www.w3.org/2000/svg",
			'xlink': "http://www.w3.org/1999/xlink"
		},
		self = this,
		tmp, l;
	opts = opts || {};

    this.tag = create("svg");
    this.tag.setAttribute('width', width);
    this.tag.setAttribute('height', height);
    this.tag.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    this.tag.setAttribute('viewbox', '0 0 ' + width + ' ' + height);
    this.childs = [];
    
    for (tmp in opts)
    	tmp !== 'ns'
    	&& this.tag.setAttribute(tmp, opts[tmp]);

    this.target = 'target' in opts ? opts.target : null;

    function addNs(l){
    	l in namespaces 
    	&& self.tag.setAttribute("xmlns:" + l, namespaces[l]);
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
		el = [].slice.call(arguments, 0);
	el.forEach(function (el) {
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
	url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);


	var a = document.createElement('a');
	a.download = `download${(+new Date)}.svg`;
	a.href = url;
	a.addEventListener('click', function () {
		this.download = `download${(+new Date)}.svg`;
	})
	a.innerHTML = 'download';
	return a;
};