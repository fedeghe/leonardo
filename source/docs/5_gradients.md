## Gradients

Leonardo comes with two basic gradient, linear and radial:  

### `.linearGradient`

    <Leonardo_instance>.linearGradient(gradient [, orinetationAngle]) -> gradient  

the `gradient` is meant to be specified as an object literal where the keys are supposed to be the percentages from 0 to 100 and the values are expected to be hex colors.  
The optional `orientationAngle` is a number in degrees which allows to rotate the linear gradient.

then it should be used on a tag simply setting it as the `fill` attribute:

    myTag.setAttributes({fill: myGradient})  

As full small example:  

```
<div id="root"></div>
<script>
    (function (){
        var svg = Leonardo (300, 200, {
                target: document.getElementById('root')
            }),
            gradient = L.linearGradient({ // linear
                "0" : "#0a0",
                "5" : "#00a",
                "95" : "#aa0",
                "100" : "#f00"
            }, 90),
            circle = L.circle(150, 100, 50)
                .setAttributes({
                    fill: gradient
                });
        svg.render();
    })()
</script>
```

---

### `.radialGradient`

    <Leonardo_instance>.radialGradient(gradient) -> gradient  

The radial gradient is supposed to receive the same literal as first parameter, here the orientation does not apply, the usage then is even simpler.