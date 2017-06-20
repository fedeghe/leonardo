---
## tags  

Every function listed below creates a `Element` instance, and thus benefits the following instance methods: attrs, styles, add, on ,off, clone, trans, rotate, scale, mirrorO, mirrorV and move. I will describe all them soon.


### <desc> 
```
L.desc('This is the description of my svg')
```
Returns a `<desc>` tag containing the text passed to it


### <image>
```
L.image(x, y, w, h, src)
```
Returns a `<image>` tag positioned at P{x,y}; about _w_ and _h_ are meant to be the clearly the sizes but  real image size will win on it, in the end the ratio cannot be modified.

### <line> 
```
L.line(x1,y1, x2,y2)
```
Returns a `<line>` tag representing a segment starting from P1(x1,y1) and ending in P2(x2,y2).
Here could be useful to use the `attrs` function to, for example, style the line:  
```
L.line(...).attrs({"stroke-width" : 1.5,"stroke" : 'green'});
```

### <polyline>
```
L.polyline(x1,y1, x2,y2 [,x3,y3[...]])
```
creates a polyline which can even be opened (does not close it automatically). 


... to be continued
