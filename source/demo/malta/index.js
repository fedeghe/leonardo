window.onload = function () {

	var target = document.getElementById('trg'),
		
		width = 225,
		height = 80,
		bricks = [],

		L = Leonardo(width, height, {ns : '*', target : target}),
		bricksGroup = L.group(),
		malta = L.path(
			L.pathBuild.m(60,35)
			.q(-60,-2, -50, 10)
			.l(95,30)
			.q(0,2, 5, 2)
			.q(5,2, 5, -2)
			.l(100,-10)
			.q(5, 0, 5, -20)
			.q(0, -12, -60, -10)
		).setAttributes({
			fill : '#777',
			"stroke-width" : 2.5,
			stroke : 'black'
		}),
		brick = L.rect(0, 0, 100, 30).setAttributes({
			"stroke-width" : 2.5,
			"stroke-linejoin" : 'round',
			"stroke" : 'black',
			fill : 'brown'
		});

	bricks.push(brick.clone().move(55,0))
	bricks.push(brick.clone().move(0,40))
	bricks.push(brick.clone().move(110,40))

	bricksGroup.append(bricks).move(5, 5);

	L.append(malta, bricksGroup);

	L.render();
};