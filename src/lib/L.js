function L(width , height, opts) {
	var namespaces = {
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
    	if (opts.ns === '*')opts.ns = Object.keys(namespaces);
    	for (tmp = 0, l = opts.ns.length;tmp < l; tmp++){
    		addNs(opts.ns[tmp])
    	}
    }
}

L.prototype.attrs = function (attrs) {	
	var k;
	if (typeof attrs == 'string') return this.tag.getAttribute(attrs);
	for (k in attrs) this.tag.setAttribute(k, attrs[k]);
	return this;
};

L.prototype.styles = function (styles) {	
	var k;
	for (k in styles) this.tag.style[k] = styles[k];
	return this;
};

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

L.prototype.render = function (n, cb) {
	var trg = n || this.target;
	trg.innerHTML = '';
	trg.appendChild(this.tag);
	cb && cb.call(this);
	return this;
};