## Gradients

_Leonardo_ comes with two basic gradient, _linear_ and _radial_:  

``` js
instance.linearGradient(
    gradient,
    {fromX, fromY, toX, toY}
) //  returns filling gradient
```

the `gradient` is meant to be specified as an array of objects containing a `perc` and a `color` fields as `{perc:10, color: '#f00'}`; percentages from 0 to 100 and the color values are expected to be hex colors.  
If the distribution of the colors is uniform then it is enough to just pass an array of colors.  
The optional object containing `fromX, fromY, toX, toY` are the percentage starting and ending coords which allows to rotate the linear gradient (default is 0% 0% 100% 0%, thus from left to right).

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
        grad1 = L.linearGradient([
            {perc: "0", color: "#0a0"},
            {perc: "5", color: "#00a"},
            {perc: "95", color: "#aa0"},
            {perc: "100", color: "#f00"},
        ], {
            x1: '0%', y1: '0%',    // askew
            x2: '100%', y2: '100%'
        }),
        // or distributed equally, and left to right
        grad2 = L.linearGradient([
            "#f00", "#0a0", "#00a"
        ]),
        circle = L.circle(150, 100, 50)
            .setAttributes({ fill: grad1});
    svg.append(circle).render();
})()
</script>
```

---
#### Radial version

``` js 
var gradient = instance.radialGradient(
    gradient,
    { fx, fy, fr, cx, cy, r }   
) // returns filling gradient 
```
[Here](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/radialGradient) you can see the details about the parameters.  
Shortly:   
`{fx, fy}` the starting circle (default: `(50%, 50%)`)  
`fr` the radius of the start circle (default: `0%`)  
`{cx, cy}` the ending circle (default: `(50%, 50%)`)  
`r` the radius of the end circle (default: `50%`)  

The radial gradient is supposed to receive the same array as first parameter.