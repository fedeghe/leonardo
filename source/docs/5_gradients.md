## gradients

Leonardo comes with two basic gradient, linear and radial:  

    <Leonardo_instance>.linearGradient(gradient [, orinetationAngle]) -> gradient  

then can be used on a tag simply setting it as the `fill` attribute:

    myTag.setAttributes({fill: myGradient})  

As full small example:  

```
<div id="root"></div>
<script>
    var svg = Leonardo (300, 200, {target: document.getElementById('root')}),
        gradient = L.linearGradient({ // linear
			"0" : "#0a0",
			"5" : "#00a",
			"95" : "#aa0",
			"100" : "#f00"
		}, 90),
        circle = L.circle(150, 100, 50).setAttributes({fill; gradient});
    svg.render();
</script>
```


