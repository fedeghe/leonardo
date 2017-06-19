```
 __    _____ _____ _____ _____ _____ ____  _____ 
|  |  |   __|     |   | |  _  | __  |    \|     |
|  |__|   __|  |  | | | |     |    -|  |  |  |  |
|_____|_____|_____|_|___|__|__|__|__|____/|_____|
                                                    v. 0.1
```


## build it

`> npm install`

`> ./node_modules/malta/src/bin.js build.json`

open index.html


Create a new object simply calling the `Leonardo` function:  
```
var L = Leonardo (300, 200, {id : "trial"});
```
parameters:  
**width** : the width in pixels (required)
**height** : the height in pixels (required)
attrs : an hash of required attributes for the `<svg>` tag

for _svg namespaces_ is enough just to pass a `ns` element containing an array containing one or more from the following set :
```
['cc', 'dc', 'ev', 'rdf', 'svg', 'xlink']
```
if all are needed is enough to pass '*'.  

Now we can create new elements using the L element.

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





