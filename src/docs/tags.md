---
## tags  

### <desc> 
```
L.desc('This is the description of my svg')
```
Returns a `<desc>` tag containing the text passed to it


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