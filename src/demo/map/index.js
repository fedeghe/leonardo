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
		circle = L.circle(tileSize / 2, tileSize / 2, tileSize / 2);

	for (var i = 0; i < gridNum; i++) {
		for (var j = 0, t; j < gridNum; j++) {
			isCircle = Math.random() > 0.5;
			L.add(
				(isCircle ? circle : rect)
				.clone()
				.move(
					i * tileSize,
					(j % gridNum) * tileSize
				).attrs({
					'data-element-id': 'ID'+id++,
					'fill': isCircle ? '#f77' : '#47f'
				})
			);
		}
	}

	L.render(document.getElementById('trg'));
	document.body.appendChild(L.downloadAnchor());
};