## Gradients

_Leonardo_ comes with two basic gradient, _linear_ and _radial_:  

``` js
instance.linearGradient(gradient [, orientationAngle]) //  returns filling gradient
```

the `gradient` is meant to be specified as an array of objects containing a `perc` and a color fields; percentages from 0 to 100 and the color values are expected to be hex colors.  
The optional `orientationAngle` is a number in degrees which allows to rotate the linear gradient.

then it should be used on a tag simply setting it as the `fill` attribute:
```js
myTag.setAttributes({fill: myGradient})  
```
Small working example:  

``` html
<div id="root"></div>
<script>
(function (){
    var svg = Leonardo (300, 200, {
            target: document.getElementById('root')
        }),
        circle = L.circle(150, 100, 50)
            .setAttributes({
                fill: L.linearGradient([
                    {perc: "0", color: "#0a0"},
                    {perc: "5", color: "#00a"},
                    {perc: "95", color: "#aa0"},
                    {perc: "100", color: "#f00"},
                ], 90)
            });
    svg.append(circle).render();
})()
</script>
```

---

``` js 
var gradient = instance.radialGradient(gradient) // returns filling gradient 
```

The radial gradient is supposed to receive the same array as first parameter.