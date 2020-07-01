```
 __    _____ _____ _____ _____ _____ ____  _____ 
|  |  |   __|     |   | |  _  | __  |    \|     |
|  |__|   __|  |  | | | |     |    -|  |  |  |  |
|_____|_____|_____|_|___|__|__|__|__|____/|_____|
                                                    v. 1.0.10

```
A simple library to draw sgv


## install leonardo

`> yarn add @fedeghe/leonardo`


## use it

First of all in your html include _Leonardo.js_ in the `<head>` tag:  

    <script src="path/to/Leonardo.js"></script>

Now create another `<script>` tag to use _Leonardo.js_:  

```
<script>+function(){
    var L = Leonardo (300, 200, {id : "target"});
}()
</script>
```

parameters:  

`width (*)` : the width in pixels (required)  

`height (*)` : the height in pixels (required) 

`attrs` : an hash of required attributes for the `<svg>` tag 


for _svg namespaces_ is enough just to pass a `ns` element containing an array containing one or more from the following set :
```
['cc', 'dc', 'ev', 'rdf', 'svg', 'xlink']
```
if all are needed is enough to pass '*'.  

To draw something we need to add svg tags. Leonardo let you create the following tags: `desc`, `circle`, `ellipse`, `group`, `image`, `line`, `path`, `polygon`, `polyline`, `rect`, `text`, `textPath`, `title`, `script`, `textBox`

---


# tags  

Every function listed below creates a `Element` instance, and thus benefits the following instance methods: `attrs`, `styles`, `add`, `on` ,`off`, `clone`, `trans`, `rotate`, `scale`, `mirrorO`, `mirrorV` and `move`. I will describe all them soon.

Once these elements are created at some point they must be added either directly to the root `<svg>` tag either to a `<g>` group element.
```
L.add(as, many, elements, as, needed)
```

### \<desc\>
```
var desc = L.desc('This is the description of my svg')
```
Returns a `<desc>` tag containing the text passed to it

### \<circle\>
```
var circle = L.circle(cx, cy, r)
```
Returns a `<circle>` tag centered at `P{cx, cy}` with radius `r`.

### \<ellipse\>
```
var ellipse = L.ellipse(cx, cy, rx, ry)
```
Returns a `<ellipse>` tag centered at `P{cx, cy}` with radiuses `rx` and `ry`.

### \<g\>
```
var group = L.group()
```
Returns a group `<g>` tag.

### \<image\>
```
var image = L.image(x, y, w, h, src)
```
Returns a `<image>` tag positioned at `P{x,y}` about `w` and `h` are meant to be the clearly the sizes but  real image size will win on it, in the end the ratio cannot be modified.

### \<line\>  
```
var line = L.line(x1, y1, x2, y2)
```
Returns a `<line>` tag representing a segment starting from `P1{x1,y1}` and ending in `P2{x2, y2}`.

### \<path\>  
```
var path = L.path(d)
```
Returns a `<path>` tag with data corresponding to the `d` parameter passed; for example for a simple triangle could be something like `M150 0 L75 200 L225 200 Z` as [here](https://www.w3schools.com/graphics/svg_path.asp). Leonardo makes it easy to create that for you.


### \<polygon\>  
```
var polygon = L.polygon(x1, y1, ...xn, yn)
```
Returns a `<polygon>` tag with _points_ attribute corresponding to those passed; for example for a simple triangle could be something like `200,10 250,190 160,210` as [here](https://www.w3schools.com/graphics/svg_polygon.asp). Leonardo makes it easy to create that for you.

### \<polyline\>
```
var polyline = L.polyline(x1, y1, ...xn, yn)
```
creates a polyline which can even be opened (it does not close automatically). 

### \<rect\>  
```
var rect = L.rect(x, y, w, h)
```
Returns a `<rect>` tag with the upper left corner positioned at `P{x, y}` then `w` is for the width and `h for the height.

### \<text\>  
```
var text = L.text(x, y, content)
```
Returns a `<text>` tag with positioned at the upper left corner positioned at `P{x, y}` containing the text passed as `content`.

### \<title\>  
```
var title = L.title(txt)
```
Returns a `<title>` tag containing the text passed as `content`.

### \<script\>  
```
var script = L.script(content)
```
Returns a `<script>` tag containing the text passed as `content`.


## extras

### \<textBox\>  
```
var textBox = L.textBox(text, h, w, textAttrs)
```
to be documented

### \<textPath\>  
```
var textPath = L.textPath(id, d, content)
```
If we want a text to follow a path then a single tag is not [enough](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/textPath)
This function returns an element which contains all is needed given an `id`, a `d` data for the path and a `content` string. 






