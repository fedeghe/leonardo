window.onload = function () {

	var target = document.getElementById('trg'),
		size = 250,
		width = size,
		height = size,
		gridNum = 10,
		tileSize = size / gridNum,
		L = Leonardo(width, height, {ns : '*', target : target});

	var rect = L.rect(0, 0, tileSize),
		circle = L.circle(tileSize / 2, tileSize / 2, tileSize / 2);

	for (var i = 0; i < gridNum; i++) {
		for (var j = 0; j < gridNum; j++) {
			L.add(
				(Math.random() > 0.5 ? circle : rect)
				.clone()
				.move(
					i * tileSize,
					(j % gridNum) * tileSize
				)
			);
		}
	}

	L.render(document.getElementById('trg'));
	document.body.appendChild(L.downloadAnchor());
};