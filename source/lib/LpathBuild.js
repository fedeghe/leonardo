
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
