/**
 * { function_description }
 *
 * @return     {Object}  { description_of_the_return_value }
 */
L.prototype.animate = (function () {
	// seconds per frame = 1/(frame per seconds)
	var spf60 = (1E3/60)/1000;
	function parametricCartesian(el, fx, fy, interval, opts) {
		opts = opts || {};	
        interval = interval || spf60;
		var trace = opts.trace || false,
			t = 0,
			x = 0,
			y = 0,
			lastTime = 0,
			rafId = null,
			step = function (time) {
				t += interval;
				if (!lastTime || time - lastTime >= interval) {
					x = fx(x, t);
					y = fy(y, t);
					el.move(x, y);
					lastTime = time;
					if(trace) {
						var c = new Element('circle'),
							attrs = el.getAttributes('cx', 'cy');
						c.sas(Object.assign({
							cx: ~~attrs.cx + x,
							cy: ~~attrs.cy + y,
							r :5,
							stroke:'gray',
							fill: 'transparent'
						}, trace.style || {}));
						el.parent.append(c);
					}
				}
				rafId = requestAnimationFrame(step);
			};
		rafId = requestAnimationFrame(step);
        return function () {
            cancelAnimationFrame(rafId);
        }
	}
	
	function parametricPolar(el, fr, fO, interval, opts) {
		opts = opts || {};
        interval = interval || spf60;
		var trace = opts.trace || false,
			t = 0,
			r = 0,
			O = 0,
			lastTime = 0,
			rafId = null,
			step = function (time) {
				t += interval;
				if (!lastTime || time - lastTime >= interval) {
					r = fr(r, t);
					O = fO(O, t);
					el.move(
						r * Math.cos(O),
						r * Math.sin(O)
					);
					lastTime = time;
					if(trace) {
						var c = new Element('circle'),
							attrs = el.getAttributes('cx', 'cy');
						c.sas(Object.assign({
							cx: ~~attrs.cx + r * Math.cos(O),
							cy: ~~attrs.cy + r * Math.sin(O),
							r :5,
							stroke:'gray',
							fill: 'transparent'
						}, trace.style || {}));
						el.parent.append(c);
					}
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

	/* istanbul ignore next */
	function motionPath(el, pathStr, ats) {
		ats = ats || {};
		var animateMotion = new Element('animateMotion'),
			attrs = {
				begin: ats.begin || '0s',
				dur: ats.dur || '1s',
				end: ats.end || null,
				min: ats.min || 0,
				max: ats.max || null,
				restart: ats.restart || 'always',
				repeatCount: ats.repeatCount || 'indefinite',

				repeatDur: ats.repeatDur || null,
				// fill
				path: pathStr
			}
		animateMotion.sas(attrs);
		el.append(animateMotion);
		return el;
	}

	// Easing functions
	/* istanbul ignore next */
	var Easing = {
		linear: function(t) { return t; },
		easeInQuad: function(t) { return t * t; },
		easeOutQuad: function(t) { return 1 - (1 - t) * (1 - t); },
		easeInOutQuad: function(t) {
			return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
		},
		easeInCubic: function(t) { return t * t * t; },
		easeOutCubic: function(t) { return 1 - Math.pow(1 - t, 3); },
		easeInOutCubic: function(t) {
			return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
		},
		easeInQuart: function(t) { return t * t * t * t; },
		easeOutQuart: function(t) { return 1 - Math.pow(1 - t, 4); },
		easeInOutQuart: function(t) {
			return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
		},
		spring: function(t) {
			var c4 = (2 * Math.PI) / 3;
			return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
		},
		bounce: function(t) {
			var n1 = 7.5625, d1 = 2.75;
			/* istanbul ignore next */
			if (t < 1 / d1) {
				return n1 * t * t;
			/* istanbul ignore next */
			} else if (t < 2 / d1) {
				return n1 * (t -= 1.5 / d1) * t + 0.75;
			/* istanbul ignore next */
			} else if (t < 2.5 / d1) {
				return n1 * (t -= 2.25 / d1) * t + 0.9375;
			} else {
				return n1 * (t -= 2.625 / d1) * t + 0.984375;
			}
		}
	};

	// Animate with easing
	/* istanbul ignore next */
	function animateWithEasing(el, params) {
		var easing = params.easing || Easing.linear,
			from = params.from || 0,
			to = params.to || 1,
			dur = parseFloat(params.dur) * 1000 || 1000,
			startTime = null,
			attributeName = params.attributeName,
			rafId = null;

		function step(timestamp) {
			if (!startTime) startTime = timestamp;
			var elapsed = timestamp - startTime,
				progress = Math.min(elapsed / dur, 1),
				easedProgress = easing(progress),
				value = from + (to - from) * easedProgress;

			el.tag.setAttribute(attributeName, value);

			if (progress < 1) {
				rafId = requestAnimationFrame(step);
			} else if (params.onComplete) {
				params.onComplete();
			}
		
		}
		rafId = requestAnimationFrame(step);
		return function() {
			cancelAnimationFrame(rafId);
		};
	}

	return {
		cartesian : parametricCartesian,
		polar : parametricPolar,
		motionPath: motionPath,
		attr : attr,
		Easing: Easing,
		withEasing: animateWithEasing
	};

})();
