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
L.prototype.downloadAnchor = function (txt, name) {
	var a = document.createElement('a');
	a.download = (name || 'download') + '\.svg';
	a.href = this.dataEncoded();
	a.innerHTML = txt || 'download';
	a.style.display = 'block';
	return a;
};

/**
 * 
 * @param {*} title 
 * @param {*} alt 
 * @returns 
 */
L.prototype.toImageTag = function (title, alt) {
	var i = document.createElement('img');
    title = title || '';
    alt = alt || '';
	i.setAttribute('title', title);
	i.setAttribute('alt', alt);
	i.src = this.dataEncoded();
	return i;
};

/**
 * 
 * @returns 
 */
/* istanbul ignore next */
L.prototype.positionInspector = function (tpl, cb) {
	tpl = tpl || '%({%x} {%y}) '+
			' rel-%({r%x} {r%y}) ' +
			' px({x} {y})' +
			' rel-px({rx} {ry})';
	cb = cb || function (){};
	var self = this,
		tag = this.tag,
		infoTag = document.createElement('div'),
		infoList = document.createElement('ul'),
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
		currentCurveIndex = 0,
		onScroll = function () {
			scroll.left = document.documentElement.scrollLeft;
			scroll.top = document.documentElement.scrollTop;
		};
	
	infoTag.style.fontFamily = infoList.style.fontFamily = 'verdana';
	infoList.style.listStyleType = 'decimal';
	infoList.style.fontSize = '0.8em';
	
	window.addEventListener('scroll', onScroll);
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

		for (var k in tplValues) {
			currentInfo = currentInfo.replace('{' + k + '}', tplValues[k]);
		}
		currTplized = Object.assign({}, tplValues);
		infoTag.innerHTML = currentInfo;
	});

	tag.parentNode.appendChild(infoTag);
	tag.parentNode.appendChild(infoList);
	window.addEventListener('keydown', function (e) {
		if (e.key === "N" && e.shiftKey) {
			currentCurveIndex++;
			curves.push([]);
		}
		if (e.key === "Z" && e.shiftKey) {
			curves[currentCurveIndex] = curves[currentCurveIndex].slice(0, -1);
			cb(curves);
		}
	});
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
		cb(curves);
		
		self.append(dot);
	});
	return this;
};

/**
 * 
 * @param {*} width 
 * @param {*} height 
 * @param {*} styles 
 * @param {*} ends 
 * @returns 
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
 */
L.prototype.bezierThroughPoints = function(points, styles, cb) {
	var self = this, i;
	cb = cb || function(){}
    if (!points || points.length < 2) return [];

    // Helper to compute control points for smooth cubic Bézier through points
    function getControlPoints(pts) {
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
    }
	var prec = 2,
		rou = function(v){return parseFloat(v.toFixed(prec), 10);},
		controlPoints =  getControlPoints(points),
		d = 'M' + rou(controlPoints[0][0][0]) + ',' + rou(controlPoints[0][0][1]);

    controlPoints.forEach(function(seg){
        d += ' C'+rou(seg[1][0])+','+rou(seg[1][1])+' '+rou(seg[2][0])+','+rou(seg[2][1])+' '+rou(seg[3][0])+','+rou(seg[3][1]);
    });
	cb(self.path(d).tag)
	return self.path(d).sas(styles);
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


