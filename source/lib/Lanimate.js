/**
 * { function_description }
 *
 * @return     {Object}  { description_of_the_return_value }
 */
L.prototype.animate = (function () {
	function parametricCartesian(el, fx, fy) {
		var t = 0,
			x = 0,
			y = 0,
			ti = setInterval(function () {
				x = fx(x, t);
				y = fy(y, t);
				t += 0.1;
				el.move(x, y);
            }, 20);
        return function () {
            clearInterval(ti)
        }
	}
	function parametricPolar(el, fr, fO) {
		var t = 0,
			r = 0,
			O = 0,
			ti = setInterval(function () {
				r = fr(r, t);
				O = fO(O, t);
				t += 0.1;
				el.move(
					r * Math.cos(O),
					r * Math.sin(O)
				);
            }, 20);
        return function () {
            clearInterval(ti)
        }
	}

	function attr(params /* {attributeName, from, to, dur, repeatCount} */) {
		var animate = new Element('animate');
		animate.setAttributes({
			attributeType: 'XML',
			attributeName: params.attributeName,
			from: params.from,
			to: params.to,
			dur: params.dur,
			repeatCount: params.repeatCount
		});
		return animate;
	};

	return {
		pCart : parametricCartesian,
		pPolar : parametricPolar,
		attr : attr
	};
})();
