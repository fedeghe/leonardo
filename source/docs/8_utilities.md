## utilities  

``` js 
instance.positionInspector(config)
```

To me happened many times to draw by hand something or target a specific image and then having the need to move that into an `<svg>` path.  
If you ever tried you are perfectly aware of how much time this can take (I'm clearly considering the programmatinc way). The `positionInspector` utility aims to offer a tool to come and help in such cases.

Let's say we target a random image 🥰, and we want a raw silouhette path (`<path/>`) of it : 

![alt text](https://raw.githubusercontent.com/fedeghe/leonardo/master/media/god.jpg "... do not dare scum human!")

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
		};
    
    main.append(img);
    Leo.append(main);

    // here it is
    Leo.positionInspector();
    //

    Leo.render();
}
```
to get 

![out bro](https://raw.githubusercontent.com/fedeghe/leonardo/master/media/readme1.png "")

now, we would want to have a quick way to get the right `d` attribute content to be used in a `<path/>` tag so to draw what we want, all we need to do is invoke `Leo.positionInspector()`:

<video src="https://raw.githubusercontent.com/fedeghe/leonardo/master/media/readme1.mov"/>
