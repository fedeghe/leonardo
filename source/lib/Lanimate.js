/**
 * { function_description }
 *
 * @return     {Object}  { description_of_the_return_value }
 */
L.prototype.animate = (function () {
	function parametricCartesian(el, fx, fy, interval) {
        interval = interval || 20;
		var t = 0,
			x = 0,
			y = 0,
			lastTime = 0,
			rafId = null,
			step = function (time) {
				if (!lastTime || time - lastTime >= interval) {
					x = fx(x, t);
					y = fy(y, t);
					t += 0.1;
					el.move(x, y);
					lastTime = time;
				}
				rafId = requestAnimationFrame(step);
			};
		rafId = requestAnimationFrame(step);
        return function () {
            cancelAnimationFrame(rafId);
        }
	}
	function parametricPolar(el, fr, fO, interval) {
        interval = interval || 20;
		var t = 0,
			r = 0,
			O = 0,
			lastTime = 0,
			rafId = null,
			step = function (time) {
				if (!lastTime || time - lastTime >= interval) {
					r = fr(r, t);
					O = fO(O, t);
					t += 0.1;
					el.move(
						r * Math.cos(O),
						r * Math.sin(O)
					);
					lastTime = time;
				}
				rafId = requestAnimationFrame(step);
			};
		rafId = requestAnimationFrame(step);
        return function () {
            cancelAnimationFrame(rafId);
        }
	}

	function attr(params /* {attributeName, from, to, dur, repeatCount} */) {
		var animate = new Element('animate'),
			attrs = {
				attributeName: params.attributeName,
				dur: params.dur,
				begin: params.begin || '0s',
				repeatCount: params.repeatCount
			};
		'from' in params && (attrs.from = params.from);
		'to' in params && (attrs.to = params.to);
		'values' in params && (attrs.values = params.values);
		'type' in params && (attrs.type = params.type);
		animate.sas(attrs);
		return animate;
	};


	function motionPath(el, path, interval) {}

	return {
		cartesian : parametricCartesian,
		polar : parametricPolar,
		attr : attr
	};
})();
