L.prototype.fadeIn = function (t, target) {
    var start = null,
        self = this,
        r;
    target = target ||  self;
    target.tag.style.opacity = 0;
    function fade(now) {
        start = start || now;
        var p = (now - start) / t;
        target.tag.style.opacity = p;
        if (p < 1) {
            r = requestAnimationFrame(fade)
        } else {
            target.tag.style.opacity = 1;
            cancelAnimationFrame(r)
        }
    }
    r = requestAnimationFrame(fade)
}

/**
 * 
 * @param {*} t 
 * @param {*} target 
 */
L.prototype.fadeOut = function (t , target) {
    var start = null,
        self = this,r;
    
    target = target ||  self;
    target.tag.style.opacity = 1;
    function fade(now) {
        start = start || now
        
        var p = 1 - parseFloat((now - start) / t, 10);
        target.tag.style.opacity = p;
        if (p > 0) {
            r = requestAnimationFrame(fade)
        } else {
            cancelAnimationFrame(r);
            target.tag.style.opacity = 0;
        }
    }
    r = requestAnimationFrame(fade);
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
L.prototype.positionInspector = function () {
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
		currentInfo,
		prev = { x: 0, y: 0},
		curr = { x: 0, y: 0};
	
	infoTag.style.fontFamily = infoList.style.fontFamily = 'verdana';
	infoList.style.listStyleType = 'decimal';
	infoList.style.fontSize = '0.8em';
	
	tag.addEventListener('mousemove', function (e){
		var x = e.clientX,
			y = e.clientY,
			toPercX = function (n){return 100 * n / w; },
			toPercY = function (n){return 100 * n / h; };
		curr.x = x - left;
		curr.y = y - top;

		var px = 100 * curr.x / w,
			py = 100 * curr.y / h;
		currentInfo = '%(' +p(px) + ' ' + p(py) + ')' +
			' px(' + ~~curr.x + ' ' + ~~curr.y + ')' +
			' R%(' + p(toPercX(~~curr.x - prev.x)) + ' ' + p(toPercY(~~curr.y - prev.y)) + ')' +
			' Rpx(' + (~~curr.x - prev.x) + ' ' + (~~curr.y - prev.y) + ')';
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
		item.setAttribute('title', 'double click to remove');
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
		item.addEventListener('dblclick', function(){
			dot.tag.parentNode.removeChild(dot.tag);
			item.parentNode.removeChild(item);
		});
		infoList.appendChild(item);
		self.append(dot);
	});
	return this;
};

L.prototype.downloadHref = function () {
	var serializer = new XMLSerializer(),
		source = '<?xml version="1.0" standalone="no"?>\r\n' + serializer.serializeToString(this.tag);

	if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
		source = source.replace(/^<svg/, '<svg xmlns="' + this.namespaces.svg + '"');
	}
	if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
		source = source.replace(/^<svg/, '<svg xmlns:xlink="' + this.namespaces.xlink + '"');
	}
	return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
};