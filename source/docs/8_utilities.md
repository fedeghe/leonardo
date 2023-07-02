## utilities  

``` js 
instance.positionInspector(config)
```

To me happened many times to draw by hand something and then having the need to move that into an `<svg>`.  
If you ever tried you are perfectly aware of how much time this can take (I'm clearly considering the programmatinc way). The `positionInspector` utility aim to offer a tool to come and help in such cases.

Let's say we target a random image 🥰, and we would have a raw silouhette version of it : 

![image](media/god.jpg)

we can start a simple file: 
```js
window.onload = function () {
    var target = document.getElementById('trg'),
        width = 987,
        height = 652,
        w = function (p) {return width * p/100;},
        h = function (p) {return height * p/100;},
        Leo = Leonardo(width, height, { ns: '*', target: target }),
        img = Leo.image(0,0,width, height, './god.jpg').setAttributes({opacity: 0.6}),
        main = Leo.group(),
        fillStyle = {
			"stroke-width": 2,
			"stroke": '#ef88d8',
			"stroke-opacity": 1,
			"fill-opacity": 10,
			"stroke-linejoin": "round",
			fill: 'transparent'
		},
        builder = function (acc, e) {
            return acc.l(w(e[0]), h(e[1]))
        };
    
    main.append(img);
    Leo.append(main);
    Leo.render();
    Leo.positionInspector(); // this is the one !!!
}
```
