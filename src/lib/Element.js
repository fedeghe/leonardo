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

Element.prototype.attrs = L.prototype.attrs;

Element.prototype.styles = L.prototype.styles;

Element.prototype.add = L.prototype.add;

Element.prototype.on = function (eventName, cb) {
	if (eventName in this.events) {
		this.events[eventName].push(cb);
	} else {
		this.events[eventName] = [cb];
	}
	this.tag.addEventListener(eventName, cb);
	return this;
}
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
}

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
		ret.add(this.childs[i].clone())
	}
	return ret;
};

Element.prototype.trans = function (r, rx, ry) {
	this.attrs({transform : this.transforms.rotate + ' ' + this.transforms.move + ' ' + this.transforms.scale});
	// this.attrs({transform : this.transforms.move + ' ' + this.transforms.rotate + ' ' + this.transforms.scale});
	return this;
}

Element.prototype.rotate = function (r, rx, ry) {
	rx = rx || 0;
	ry = ry || 0;

	this.transforms.rotate = ' rotate(' + r + ' ' + rx + ' ' + ry + ')';
	return this.trans();
}

Element.prototype.scale = function (sx, sy) {
	sx = sx || 0;
	sy = sy || 0;
	this.transforms.scale = ' scale(' + sx + ', ' + sy + ')';
	return this.trans();
}

Element.prototype.mirrorO = function () {
	this.transforms.scale = ' scale(1, -1)';
	return this.trans();
}

Element.prototype.mirrorV = function () {
	this.transforms.scale = ' scale(-1, 1)';
	return this.trans();
}

Element.prototype.move = function (rx, ry) {
	rx = rx || 0;
	ry = ry || 0;
	this.transforms.move = ' translate(' + rx + ' ' + ry + ')';
	return this.trans();
}