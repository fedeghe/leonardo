window.onload = function () {

	var target = document.getElementById('trg'),
		size = 1400,
		width = size/2,
		height = size,
		center = {
			x : width / 2,
			y : height / 2
		},
		L = Leonardo(width, height, {id : 'hero'}),
		title = L.title('hero'),
		container = L.group(),
		// w = function (i) {return i * width/800;},
		// h = function (i) {return i * height/1600;},
		w = L.getScaler(width, 800),
        h = L.getScaler(height, 1600),

		vest = L.path(L.pathBuild
			.M(w(300), h(605))
			.L(w(185), h(75))
			.L(w(35), h(125))
			.L(w(210), h(780))
			.L(w(220), h(1000))
			.L(w(70), h(1480))
			.L(w(235), h(1500))
			.L(w(355), h(1010))

			.L(w(445), h(1010))
			.L(w(565), h(1500))
			.L(w(730), h(1480))
			.L(w(580), h(1000))
			.L(w(590), h(780))
			.L(w(765), h(125))
			.L(w(615), h(75))
			.L(w(500), h(605))
			.Z()
		),
		head = L.path(L.pathBuild
			.M(w(360), h(630))
			.L(w(270), h(530))
			.L(w(320), h(340))
			.L(w(480), h(340))
			.L(w(530), h(530))
			.L(w(440), h(630))
			.Z()
		),
		nose = L.path(L.pathBuild
			.M(w(380), h(525))
			.L(w(385), h(540))
			.L(w(415), h(540))
			.L(w(420), h(525))
		),
		hair = L.path(L.pathBuild
			.M(w(295), h(440))
			.L(w(270), h(260))
			.L(w(310), h(300))
			.L(w(305), h(325)) //

			.L(w(345), h(190))
			.L(w(400), h(305)) //
			.L(w(385), h(275))

			.L(w(450), h(180))
			.L(w(438), h(305))//
			.L(w(440), h(290))

			.L(w(480), h(220))
			.L(w(490), h(300))
			.L(w(480), h(315))//
			.L(w(530), h(250))
			.L(w(505), h(440))
			.L(w(480), h(340))

			.L(w(470), h(390))
			.L(w(440), h(350))
			.L(w(450), h(380))  //ciuff
			.L(w(360), h(345))
			.L(w(370), h(335))
			.L(w(330), h(370))
 
			.L(w(320), h(340))
			.Z()
		),
		strap = L.path(L.pathBuild
			.M(w(210), h(900))
			.S(w(400), h(925) , w(590), h(900))
			.L(w(585), h(970))
			.S(w(400), h(995), w(215), h(970))
			.Z()
		),
		eyeStrap = L.path(L.pathBuild
			.M(w(290), h(450))
			.S(w(400), h(480) , w(510), h(450))
			.L(w(518), h(480))
			.S(w(400), h(555), w(282), h(480))
			.Z()
		),
		H = L.path(L.pathBuild
			.M(w(295), h(680))
			.L(w(305), h(880))
			.L(w(355), h(890))
			.L(w(355), h(850))
			.L(w(445), h(850))
			.L(w(445), h(890))
			.L(w(495), h(880))
			.L(w(505), h(680))
			.L(w(445), h(670))
			.L(w(445), h(810))
			.L(w(355), h(810))
			.L(w(355), h(670))
			.Z()
		),
		
		rightEye = L.text(0,0,','),
		leftEye = L.text(0,0,','),
		pulpilLeft = L.group(),
		pulpilRight,
		smile = L.text(0,0,')'),

		leftGlove = L.path(
			L.pathBuild
			.M(0, 0)
			.L(w(-22), h(-30))
			.L(w(-22), h(-55))
			.L(w(28), h(-110))
			.L(w(63), h(-105))
			.L(w(78), h(-80))
			.L(w(80), h(-100))
			.L(w(100), h(-95))
			.L(w(105), h(-65))
			.L(w(85), h(-28))
			.Z()
		), rightGlove,
		leftFoot = L.path(L.pathBuild
			.M(0,0)
			.L(w(-10), h(40))
			.L(w(0), h(70))
			.L(w(45), h(110))
			.L(w(70), h(115))
			.L(w(90), h(105))
			.L(w(105), h(65))
			.L(w(100), h(12))
			.Z()
		),rightFoot,

		justLine = {
			"stroke-width" : h(8),
			"stroke" : 'black',
			"stroke-opacity" : 1,
			"fill-opacity" : 1,
			"stroke-linejoin" : "round",
			fill : 'none'
		};

	(function () {
		var p1 = L.circle(0,0,w(15)),
			p2 = L.circle(0,0,w(3)),
			coverUp = L.line(w(-20), h(5),w(20),h(18)),
			coverDown = L.line(w(-20),h(-20),w(20),h(-10));
		p1.setAttributes({
			"stroke-width" : h(4),
			"stroke" : 'black',
			fill:'DodgerBlue'
		});
		p2.setAttributes({fill:'black'});

		coverUp.setAttributes({
			"stroke-width" : h(9),
			"stroke" : 'black'
		});
		coverDown.setAttributes({
			"stroke-width" : h(9),
			"stroke" : 'black'
		});
		
		pulpilLeft.append(p1, p2, coverDown, coverUp);
		
		pulpilRight = pulpilLeft.clone().mirrorV();
		pulpilLeft.move(w(355),h(490));
		pulpilRight.move(w(445),h(490));
	})();

	container.setAttributes({viewBox : "0 0 " + size + " " + size});

	leftEye.setAttributes({
		'font-size' : h(160),
		'font-family' : 'Verdana',
		color:'black'
	}).rotate(85, w(350), h(460)).move(w(350), h(460));
	
	rightEye.setAttributes({
		'font-size' : h(160),
		'font-family' : 'Verdana',
		color:'black'
	}).mirrorH().rotate(95, w(450), h(460)).move(w(450), h(460));

	smile.setAttributes({
		'font-size' : h(100),
		color:'black'
	// }).rotate(90, 0, 0).move(w(10), h(10));
	}).move(w(373), h(540)).rotate(90, w(373), h(540));

	vest.setAttributes(justLine);
	vest.setAttributes({fill : 'red'});
	
	nose.setAttributes(justLine);
	head.setAttributes(justLine);
	head.setAttributes({fill : 'pink'});

	hair.setAttributes(justLine);
	hair.setAttributes({fill:'yellow'});

	strap.setAttributes(justLine);
	strap.setAttributes({fill : 'chocolate'});

	eyeStrap.setAttributes(justLine);
	eyeStrap.setAttributes({fill :"black"});

	rightEye.setAttributes({'fill' : 'white'});
	leftEye.setAttributes({'fill' : 'white'});

	H.setAttributes(justLine);
	H.setAttributes({fill:'white'});

	leftGlove.setAttributes(justLine);
	leftFoot.setAttributes(justLine);

	leftGlove.setAttributes({fill:'#444'});
	leftFoot.setAttributes({fill:'#444'});

	rightGlove = leftGlove.clone().mirrorV().move(w(740), h(115));
	leftGlove.move(w(60), h(115));

	rightFoot = leftFoot.clone().mirrorV().move(w(705), h(1483));
	leftFoot.move(w(95), h(1483));

	container.append(
		vest, head, hair, strap, eyeStrap,
		leftEye, rightEye,
		smile, leftGlove, rightGlove,
		leftFoot, rightFoot,
		H, nose
		,pulpilLeft,pulpilRight
	);

	L.append(title, container);

	L.render({target: target, cb : function () {
		var p = document.getElementById('point'),
			svg = this.tag;
		svg.style.width = width + 'px';
		svg.style.height = height + 'px';
		svg.addEventListener('mousemove', function (e) {
			p.innerHTML = '[' + e.clientX + ', ' + e.clientY + ']<br/>{' + (e.clientX/width).toFixed(3) + ', ' + (e.clientY/height).toFixed(3) + '}';
		},false);
	}});

};