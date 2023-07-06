## Animate

``` js 
instance.animate.attrs(config) // animate tag  
```

This method is useful when we need to animate an attribute of a tag. Svg allows to do that creating an `<animate>` tag containing the righ parameters and append it inside the tag that needs to be animated:  

``` js
var circle = instance.circle(100, 100, 20),
    animateTag = instance.animate.attrs({
        attributeName: 'r',
        from: 20,
        to: 1E3,
        dur: '10s',
        repeatCount: 'indefinite'
    });
circle.append(animateTag);
```

It's also possible to move a tag, changing the `x` and `y` position attributes, but this acts directly on the tag:

``` js 
instance.animate.cartesian(tag, funcX, funcY, t) // returns stopper function  
```
...still need to be documented, there's anyway a clear sample

``` js 
instance.animate.polar(tag, funcR, funcPHI, t) // returns stopper function  
```
...still need to be documented, there's anyway a clear sample



