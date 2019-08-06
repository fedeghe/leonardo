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
// consider a way to use use.... but remember it need the original tag to have a id attribute
// https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use
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
		ret.add(this.childs[i].clone());
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
};

Element.prototype.getBbox = function () {
	return this.tag.getBBox();
};