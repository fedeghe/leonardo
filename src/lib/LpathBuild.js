/*
 * 	M	moveto	(x y)+
 *	Z	closepath	(none)
 *	L	lineto	(x y)+
 *	H	horizontal lineto	x+
 *	V	vertical lineto	y+
 *	C	curveto	(x1 y1 x2 y2 x y)+
 *	Q	quadratic Bézier curveto	(x1 y1 x y)+
 *	S	smooth curveto	(x2 y2 x y)+
 *	T	smooth quadratic Bézier curveto	(x y)+
 *	A	elliptical arc	(rx ry x-axis-rotation large-arc-flag sweep-flag x y)+
 *	R	Catmull-Rom curveto*	x1 y1 (x y)+
 */
L.prototype.pathBuild = (function () {
	function pathbuild(){
		var self = this;
		this.path = '';
		this.previous = null;
	}
	function createFun(letter){
		return function () {
			var l = this.previous === letter ? ' ' : letter;
			this.path += [l].concat([[].slice.call(arguments, 0).join(',')]).join(' ') + ' ';
			this.previous = letter;
			return this;
		};
	}

	pathbuild.prototype.M = createFun("M");
	pathbuild.prototype.m = createFun("m");
	pathbuild.prototype.Z = createFun("Z");
	pathbuild.prototype.L = createFun("L");
	pathbuild.prototype.l = createFun("l");
	pathbuild.prototype.H = createFun("H");
	pathbuild.prototype.h = createFun("h");
	pathbuild.prototype.V = createFun("V");
	pathbuild.prototype.v = createFun("v");
	pathbuild.prototype.C = createFun("C");
	pathbuild.prototype.c = createFun("c");
	pathbuild.prototype.Q = createFun("Q");
	pathbuild.prototype.q = createFun("q");
	pathbuild.prototype.S = createFun("S");
	pathbuild.prototype.s = createFun("s");
	pathbuild.prototype.T = createFun("T");
	pathbuild.prototype.t = createFun("t");
	pathbuild.prototype.A = createFun("A");
	pathbuild.prototype.a = createFun("a");
	pathbuild.prototype.R = createFun("R");

	var pb = new pathbuild();
	
	pb.toString = function (){
		var p = this.path + '';
		this.path = "";
		return p;
	};
	return pb;
})();
