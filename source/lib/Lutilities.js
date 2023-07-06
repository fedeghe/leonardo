function fade (out, t, target) {
	var start = null,
        self = this,
        r,
		done = false;
	setTimeout(function () {
		done = true;
	}, t)
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


L.prototype.fadeIn = function (t, target) {
    fade.apply(this, [false, t, target])
	return this;
}

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
  
    txt = txt || 'download';
    name = name || 'download';
	
	a.download = name + '\.svg';
	a.href = this.downloadHref();
	// a.addEventListener('click', function () {
	// 	this.download = name + '\.svg'
	// })
	a.innerHTML = txt;
	return a;
};

/**
 * 
 * @returns 
 */
/* istanbul ignore next */
L.prototype.positionInspector = function (tpl) {
	tpl = tpl || '%({Px} {Py}) '+
			' R%({RPx} {RPy}) ' +
			' PX({x} {y})' +
			' RPX({rx} {ry})';
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
		curr = { x: 0, y: 0};
	
	infoTag.style.fontFamily = infoList.style.fontFamily = 'verdana';
	infoList.style.listStyleType = 'decimal';
	infoList.style.fontSize = '0.8em';
	
	tag.addEventListener('mousemove', function (e){
		var x = e.clientX,
			y = e.clientY,
			toPercX = function (n){ return 100 * n / w; },
			toPercY = function (n){ return 100 * n / h; };
		curr.x = x - left;
		curr.y = y - top;
		currentInfo = tpl;
		var px = 100 * curr.x / w,
			py = 100 * curr.y / h,
			tplValues = {
				Px: p(px), Py: p(py),
				RPx: p(toPercX(~~curr.x - prev.x)), RPy: p(toPercY(~~curr.y - prev.y)),
				x: ~~curr.x, y: ~~curr.y,
				rx: ~~curr.x - prev.x, ry: ~~curr.y - prev.y
			};

		for (var k in tplValues) currentInfo = currentInfo.replace('{' + k + '}', tplValues[k]);
		infoTag.innerHTML = currentInfo;
	});

	tag.parentNode.appendChild(infoTag);
	tag.parentNode.appendChild(infoList);
	tag.addEventListener('click', function () {
		var item = document.createElement('li'),
			r = 2,
			r2 = r / 2,
			rdub = r * 2,
			dot = self.circle(~~curr.x + r2, ~~curr.y + r2, r),
			rp = r + 1;

		dot.setAttributes({stroke: 'black', fill: 'white', 'stroke-width': 1, 'stroke-dasharray': rp + ',1'});
		dot.on('mouseover', function () {
			item.style.fontWeight = 'bold';
			dot.setAttributes({fill: 'red', r : rdub});
		});
		dot.on('mouseleave', function () {
			item.style.fontWeight = 'normal';
			dot.setAttributes({fill: 'white', r : r});
		});
		prev = {x: ~~curr.x, y: ~~curr.y};

		item.innerHTML = currentInfo;
		item.addEventListener('mouseover', function(){
			item.style.fontWeight = 'bold';
			dot.setAttributes({fill: 'red', r : rdub});
		});
		item.addEventListener('mouseout', function(){
			item.style.fontWeight = 'normal';
			dot.setAttributes({fill: 'white', r : r});
		});

		infoList.appendChild(item);
		self.append(dot);
	});
	return this;
};

L.prototype.downloadHref = function () {
	var serializer = new XMLSerializer(),
		source = '<?xml version="1.0" standalone="no"?>\r\n' + serializer.serializeToString(this.tag);
	/* istanbul ignore else */
	if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
		source = source.replace(/^<svg/, '<svg xmlns="' + this.namespaces.svg + '"');
	}
	/* istanbul ignore else */
	if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
		source = source.replace(/^<svg/, '<svg xmlns:xlink="' + this.namespaces.xlink + '"');
	}
	return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
};