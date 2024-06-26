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
	this.tag = create(tag, ns);
	this.tag.Element = this;
	this.parent = null;
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
