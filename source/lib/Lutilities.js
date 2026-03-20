function fade (out, t, target) {
	var start = null,
        self = this,
        r,
		done = false;
	setTimeout(function () { done = true; }, t);
	target = target ||  self;
	target.tag.style.opacity = out ? 1 : 0;

	function fade(now) {
        start = start || now;
        var p = parseFloat((now - start) / t, 10);
		if (out) p = 1 - p;
		var cnd = out ? p > 0 : p < 1;
        target.tag.style.opacity = p;
        if (cnd && !done) {
            r = requestAnimationFrame(fade);
        } else {
            target.tag.style.opacity = out ? 0 : 1;
            cancelAnimationFrame(r);
        }
    }
    r = requestAnimationFrame(fade);
	return this;
}

/**
 * 
 * @param {*} t 
 * @param {*} target 
 * @returns 
 */
L.prototype.fadeIn = function (t, target) {
    fade.apply(this, [false, t, target])
	return this;
}

/**
 * 
 * @param {*} t 
 * @param {*} target 
 * @returns 
 */
L.prototype.fadeOut = function (t, target) {
    fade.apply(this, [true, t, target])
	return this;
}

/**
 * 
 * @param {*} txt 
 * @param {*} name 
 * @returns 
 */
L.prototype.svgDownloadAnchor = function (opts) {
	opts = opts || {};
	var str = 'download',
		txt = opts.txt || str,
		name = opts.name || str,
		a = document.createElement('a');
	a.download = name + '\.svg';
	a.href = this.dataEncoded();
	a.innerHTML = txt;
	a.style.display = 'block';
	return a;
};

/**
 * 
 * @param {*} opts 
 * @returns 
 */
L.prototype.pngDownloadAnchor = function(opts) {
	opts = opts || {};
	var str = 'download',
		name = opts.name || str,
		txt = opts.txt || str,
		image = new Image(),
		a = document.createElement('a'),
		canvas = document.createElement('canvas'),
		context = canvas.getContext('2d');
	a.href = 'javascript:;';
	a.innerHTML = txt;
	image.src = this.dataEncoded();
	a.download = name+'.png';
	a.style.display = 'block';
	/* istanbul ignore next */
	image.onload = function() {
		canvas.width = image.width;
		canvas.height = image.height;
		context.drawImage(image, 0, 0);
		a.href = canvas.toDataURL('image/png');
	};
	return a;
};

/**
 * 
 * @param {*} title 
 * @param {*} alt 
 * @returns 
 */
L.prototype.toImageTag = function (opts) {
	opts = opts || {};
	var i = document.createElement('img'),
		title = opts.title || '',
		alt = opts.alt || '';
	i.setAttribute('title', title);
	i.setAttribute('alt', alt);
	i.src = this.dataEncoded();
	return i;
};

/**
 * tpl
 * cb
 * tracerGroup
 * sgvCb
 * overrideStylePath
 * @returns 
 */
/* istanbul ignore next */
L.prototype.positionInspector = function (opts) {
	opts = opts || {};
	if (!this.tag.parentNode) {
		throw new Error('"positionInspector" is meant to be invoked ONLY after render')
	}
	var self = this,
		tag = this.tag,
		svgCb = opts.svgCb || function() {},
		tpl = opts.tpl || '%({%x} {%y}) '+
			' rel-%({r%x} {r%y}) ' +
			' px({x} {y})' +
			' rel-px({rx} {ry})',
		cb = opts.cb || function() {},
		trace = opts.trace || false,
		tracerGroup = self.group(),
		overrideStylePath = opts.overrideStylePath || {},
		infoTag = document.createElement('div'),
		infoList = document.createElement('ul'),
		copy = document.createElement('span'),
		hiddenList = [],
		hiddenListIndex = 0,
		boundingBox = tag.getBoundingClientRect(),
		left = boundingBox.left,
		top = boundingBox.top,
		w = this.width,
		h = this.height,
		p = function(n, prec){ return parseFloat(n.toFixed(prec || 2), 10)},
		currentInfo = tpl,
		prev = { x: 0, y: 0},
		scroll = { left: 0, top: 0},
		init = {x: document.documentElement.scrollLeft, y: document.documentElement.scrollTop},
		curr = { x: 0, y: 0},
		currTplized = {},
		curves = [[]],
		curveEnds = [false],
		currentCurveIndex = 0,

		dots = [],
		dotsIndex = 0,
		
		onScroll = function () {
			scroll.left = document.documentElement.scrollLeft;
			scroll.top = document.documentElement.scrollTop;
		},
		dotsGroup = self.group(),
		innerCb = function() {
			cb(curves);
			if(trace) {
				if (tracerGroup.tag.tagName !== 'g' || !('_id' in tracerGroup)) {
					throw new Error('positionInspector requires a Leo group as third parameter when passed');
				}
				tracerGroup.clear();
				curves.forEach(function(points, i) {
					tracerGroup.append(
						self.bezierThroughPoints(
							points.map(
								function(point){
									return [point['x'], point['y']]
								}
							), 
							Object.assign(
								{
									stroke: 'black',
									'stroke-width': 5,
									fill: 'none'
								},
								overrideStylePath
							),
							svgCb,
							curveEnds[i]
						)
					);
				});
			}
		};
	if (trace) self.append(tracerGroup);
	copy.innerText = '📑';
	copy.style.cursor = 'pointer';
	copy.addEventListener('click', function(e){
		if(navigator.clipboard.writeText(hiddenList.join(' '))){
			alert('copied to the clipboard');
		}
	});
	this.append(dotsGroup);
	infoTag.style.fontFamily = infoList.style.fontFamily = 'verdana';
	infoList.style.listStyleType = 'decimal';
	infoList.style.fontSize = '0.8em';
	infoList.style.height = '80px';
	infoList.style.maxWidth = '400px';
	infoList.style.border = '1px solid black';
	infoList.style.overflow = 'scroll';

	tag.addEventListener('mousemove', function (e) {
		var x = e.clientX + scroll.left - init.x,
			y = e.clientY + scroll.top - init.y,
			toPercX = function (n) { return 100 * n / w; },
			toPercY = function (n) { return 100 * n / h; };
		curr.x = x - left;
		curr.y = y - top;
		currentInfo = tpl;
		var px = 100 * curr.x / w,
			py = 100 * curr.y / h,
			tplValues = {
				'%x': p(px), '%y': p(py),
				'r%x': p(toPercX(~~curr.x - prev.x)), 'r%y': p(toPercY(~~curr.y - prev.y)),
				x: ~~curr.x, y: ~~curr.y,
				rx: ~~curr.x - prev.x, ry: ~~curr.y - prev.y
			};
		for (var k in tplValues) 
			currentInfo = currentInfo.replace('{' + k + '}', tplValues[k]);
		currTplized = Object.assign({}, tplValues);
		infoTag.innerHTML = currentInfo;
	});

	function doDots() {
		dotsGroup.clear();
		dotsGroup.append(dots);
	}

	tag.parentNode.appendChild(infoTag);
	tag.parentNode.appendChild(infoList);
	tag.parentNode.appendChild(copy);
	
	tag.addEventListener('click', function () {
		var item = document.createElement('li'),
			r = 2,
			r2 = r / 2,
			rdub = r * 2,
			dot = self.circle(~~curr.x + r2 , ~~curr.y + r2, r),
			rp = r + 1;
		scroll.left = document.documentElement.scrollLeft;
		scroll.top = document.documentElement.scrollTop;

		dot.sas({
			stroke: 'black',
			fill: 'white',
			'stroke-width': 1,
			'stroke-dasharray': rp + ',1'
		});
		dot.on('mouseover', function () {
			item.style.fontWeight = 'bold';
			dot.sas({fill: 'red', r : rdub});
		});
		dot.on('mouseleave', function () {
			item.style.fontWeight = 'normal';
			dot.sas({fill: 'white', r : r});
		});
		prev = {x: ~~curr.x, y: ~~curr.y};

		item.innerHTML = currentInfo;
		hiddenList[hiddenListIndex++] = currentInfo;
		item.addEventListener('mouseover', function () {
			item.style.fontWeight = 'bold';
			dot.sas({fill: 'red', r : rdub});
		});
		item.addEventListener('mouseout', function () {
			item.style.fontWeight = 'normal';
			dot.sas({fill: 'white', r : r});
		});

		infoList.appendChild(item);
		curves[currentCurveIndex].push(currTplized);
		innerCb();
		dots[dotsIndex++] = dot;

		doDots();
		infoList.scrollTop = Number.MAX_SAFE_INTEGER;
	});
	window.addEventListener('keydown', function (e) {
		if (e.key.match(/N|E/) && e.shiftKey) {
			var endIt = e.key === "E"
			if(endIt) {
				curveEnds[currentCurveIndex] = true;
			}
			currentCurveIndex++;
			curveEnds[currentCurveIndex] = false;
			curves.push([]);

			hiddenList[hiddenListIndex++] = 'null /* === curve separator == */'
			if(endIt) {
				innerCb();
				// doDots();
			}
		}
		if (e.key === "Z" && e.shiftKey) {
			curves[currentCurveIndex] = curves[currentCurveIndex].slice(0, -1);
			
			hiddenList = hiddenList.slice(0, -1);
			hiddenListIndex--;

			dots = dots.slice(0, -1);
			dotsIndex--;
			innerCb();
			doDots();
		}
	});
	window.addEventListener('scroll', onScroll);
	return this;
};

/**
 * 
 * @returns 
 */
L.prototype.dataEncoded = function () {
	var serializer = new XMLSerializer(),
		source = '<?xml version="1.0" standalone="no"?>\r\n' + serializer.serializeToString(this.tag);
	/* istanbul ignore else */
	if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
		source = source.replace(/^<svg/, '<svg xmlns="' + namespaces.svg + '"');
	}
	/* istanbul ignore else */
	if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
		source = source.replace(/^<svg/, '<svg xmlns:xlink="' + namespaces.xlink + '"');
	}
	return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
};

/**
 * 
 * @param {*} width 
 * @param {*} height 
 * @param {*} styles 
 * @param {*} ends 
 * @returns 
 * 
 * note it could be static
 */
L.prototype.positionCruncher = function (width, height, styles, ends) {
	var self = this,
		startFn = 'M',
		midFn = 'l',
		w = L.getScaler(width),
		h = L.getScaler(height);

	function builder(acc, e) {
		return acc[midFn](w(e[0]), h(e[1]));
	}
	return function (dots) {
		dots = dots || [];
		if (!dots.length) return;
		var build = dots.slice(1).reduce(	
			builder,
			self.pathBuild[startFn](w(dots[0][0]), h(dots[0][1]))
		);
		if (ends) build.Z();
		return self.path(build).sas(styles);
	};
}
 
/**
 * 
 * @param {*} points 
 * @param {*} styles 
 * @returns 
 * 
 * note it could be static
 */
L.prototype.bezierThroughPoints = function(points, styles, cb, ends) {

	cb = cb || function(){}
    if (!points || points.length < 2) return [];
	var self = this, i,
		// Helper to compute control points for smooth cubic Bézier through points
		getControlPoints = function (pts) {
			var n = pts.length - 1,
				cps = [];
			// Special case for 2 points: straight line
			if (n === 1) {
				cps.push([
					pts[0],
					[ (2*pts[0][0] + pts[1][0])/3, (2*pts[0][1] + pts[1][1])/3 ],
					[ (pts[0][0] + 2*pts[1][0])/3, (pts[0][1] + 2*pts[1][1])/3 ],
					pts[1]
				]);
				return cps;
			}
			// Calculate control points for each segment
			for (i = 0; i < n; i++) {
				var p0 = pts[i === 0 ? i : i-1],
					p1 = pts[i],
					p2 = pts[i+1],
					p3 = pts[i+2 < pts.length ? i+2 : i+1],

				// Catmull-Rom to Bezier conversion
					c1 = [
						p1[0] + (p2[0] - p0[0]) / 6,
						p1[1] + (p2[1] - p0[1]) / 6
					],
					c2 = [
						p2[0] - (p3[0] - p1[0]) / 6,
						p2[1] - (p3[1] - p1[1]) / 6
					];
				cps.push([p1, c1, c2, p2]);
			}
			return cps;
		},
		prec = 2,
		rou = function(v){return parseFloat(v.toFixed(prec), 10);},
		controlPoints =  getControlPoints(points),
		d = 'M' + rou(controlPoints[0][0][0]) + ',' + rou(controlPoints[0][0][1]);

    controlPoints.forEach(function(seg){
        d += ' C'+rou(seg[1][0])+','+rou(seg[1][1])+' '+rou(seg[2][0])+','+rou(seg[2][1])+' '+rou(seg[3][0])+','+rou(seg[3][1]);
    });
	if (ends) d += ' Z';
	cb(self.path(d).tag)
	return self.path(d).sas(styles);
};




