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
	this.previous = null;
}

function createFun(letter) {
	return function () {
		var l = this.previous === letter ? ' ' : letter;
		this.path += [l].concat([[].slice.call(arguments, 0).join(',')]).join(' ') + ' ';
		this.previous = letter;
		return this;
	};
}

Pathbuild.prototype.M = createFun('M');
Pathbuild.prototype.m = createFun('m');
Pathbuild.prototype.Z = createFun('Z');
Pathbuild.prototype.L = createFun('L');
Pathbuild.prototype.l = createFun('l');
Pathbuild.prototype.H = createFun('H');
Pathbuild.prototype.h = createFun('h');
Pathbuild.prototype.V = createFun('V');
Pathbuild.prototype.v = createFun('v');
Pathbuild.prototype.C = createFun('C');
Pathbuild.prototype.c = createFun('c');
Pathbuild.prototype.Q = createFun('Q');
Pathbuild.prototype.q = createFun('q');
Pathbuild.prototype.S = createFun('S');
Pathbuild.prototype.s = createFun('s');
Pathbuild.prototype.T = createFun('T');
Pathbuild.prototype.t = createFun('t');
Pathbuild.prototype.A = createFun('A');
Pathbuild.prototype.a = createFun('a');
Pathbuild.prototype.R = createFun('R');

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

L.prototype.slice = function (cx, cy, radius, startAngle, endAngle) {
	var self = this,
		p = self.slicePath(cx, cy, radius, startAngle, endAngle);
	return self.path(p);
};

L.prototype.slicePath = function (cx, cy, radius, startAngle, endAngle) {
	var largeArc = 0;

	if (startAngle > endAngle) {
		var s = startAngle;
		startAngle = endAngle;
		endAngle = s;
	}
	/*if (Math.abs(endAngle - startAngle) > 360) {
		endAngle = 359.999;
	}*/
	largeArc = endAngle - startAngle <= 180 ? 0 : 1;
	startAngle = deg2rad(startAngle);
	endAngle = deg2rad(endAngle);
	return thi.pathBuild
		.M(cx, cy)
		.L(
			cx + Math.cos(startAngle) * radius,
			cy - Math.sin(startAngle) * radius
		)
		.A(
			radius,
			radius,
			0,
			largeArc,
			0,
			cx + Math.cos(endAngle) * radius,
			cy - Math.sin(endAngle) * radius
		)
		.L(cx, cy);
};


