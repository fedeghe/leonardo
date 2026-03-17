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
		var trace = opts.trace || false;
        interval = interval || spf60;
		var t = 0,
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
		var trace = opts.trace || false;
        interval = interval || spf60;
		var t = 0,
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

	return {
		cartesian : parametricCartesian,
		polar : parametricPolar,
		motionPath: motionPath,
		attr : attr
	};
})();
