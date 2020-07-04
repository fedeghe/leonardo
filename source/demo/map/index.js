window.onload = function () {

	var target = document.getElementById('trg'),
		size = 250,
		width = size,
		height = size,
		gridNum = 10,
		tileSize = size / gridNum,
		L = Leonardo(width, height, {ns : '*', target : target}),
		id = 0;

	var rect = L.rect(0, 0, tileSize),
		g = L.group();

	for (var i = 0; i < gridNum; i++) {
		for (var j = 0, attrs = {}, t; j < gridNum; j++) {
			fixed = Math.random() > 0.8;
			attrs = {'fill': fixed ? '#000' : 'transparent'};
			if (!fixed) {
				t = ['circle', 'dot', 'link'][~~(Math.random() * 3)];
				attrs['data-element-id']= 'ID' + id++;
				attrs['data-element-type'] = t;
				attrs['data-element-data'] = t + '_data';
			}

			L.append(g.clone().setAttributes(attrs).append(
				rect.clone().move(
					i * tileSize,
					(j % gridNum) * tileSize
				)
			));
		}
	}

	L.render({target: document.getElementById('trg')});
	document.body.appendChild(L.downloadAnchor());
};