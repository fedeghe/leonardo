## Gradients

_Leonardo_ let you used both the [svg gradients](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Gradients): _linear_ and _radial_.

``` js
var myGradient = instance.linearGradient(
    gradientData,
    {fromX = '0%', fromY = '0%', toX = '100%', toY = '0%', spreadMethod = 'pad'}
) //  returns filling gradient
```

the `gradientData` can be specified as an array of objects containing a `perc` and a `color` fields as `{perc:10, color: '#f00'}`.  
If the distribution of the colors is uniform then it is enough to just pass an array of colors.  
The optional object containing `fromX, fromY, toX, toY` are the percentage starting and ending coords which allows to decide a starting and ending point (default is start at 0% 0% end at 100% 0%, thus from left to right).

Then it's enough to use it on a tag simply as value for the `fill` attribute:
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
var myGradient = instance.radialGradient(
    gradientData,
    {
        fx = '50%', fy = '50%', fr = '0%',
        cx = '50%', cy = '50%', r = '50%',
        spreadMethod = 'pad'
    }   
) // returns filling gradient 
```
[Here](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/radialGradient) you can see the details about the parameters.  
Shortly:   
`{fx, fy}` the starting circle (default: `(50%, 50%)`)  
`fr` the radius of the start circle (default: `0%`)  
`{cx, cy}` the ending circle (default: `(50%, 50%)`)  
`r` the radius of the end circle (default: `50%`)  

For the _radial_ case the `radialData` is expected to be exactly the same as in the _linear_ case.