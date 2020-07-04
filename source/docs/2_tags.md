
# tags  

To draw something we need to add svg tags. Leonardo let you create the following tags: `desc`, `circle`, `ellipse`, `group`, `image`, `line`, `path`, `polygon`, `polyline`, `rect`, `text`, `textPath`, `title`, `script`, `textBox`.

Every tag is a `Element` instance, and thus benefits the following instance methods: `attrs`, `styles`, `add`, `on` ,`off`, `clone`, `trans`, `rotate`, `scale`, `mirrorO`, `mirrorV` and `move`. I will describe all them soon.

there is the list of the methods available to create tags:

### \<desc\>
```
var myDesc = L.desc('This is the description of my svg')
```
Returns a `<desc>` tag containing the text passed to it

### \<circle\>
```
var myCircle = L.circle(cx, cy, r)
```
Returns a `<circle>` tag centered at `{cx, cy}` with radius `r`.

### \<ellipse\>
```
var myEllipse = L.ellipse(cx, cy, rx, ry)
```
Returns a `<ellipse>` tag centered at `{cx, cy}` with radiuses `rx` and `ry`.

### \<g\>
```
var myGroup = L.group()
```
Returns a group `<g>` tag.

### \<image\>
```
var myImage = L.image(x, y, w, h, src)
```
Returns a `<image>` tag positioned at `{x,y}` about `w` and `h` are meant to be the clearly the sizes but  real image size will win on it, in the end the ratio cannot be modified.

### \<line\>  
```
var myLine = L.line(x1, y1, x2, y2)
```
Returns a `<line>` tag representing a segment starting from `{x1,y1}` and ending in `{x2, y2}`.

### \<path\>  
```
var myPath = L.path(d)
```
Returns a `<path>` tag with data corresponding to the `d` parameter passed; for example for a simple triangle could be something like `M150 0 L75 200 L225 200 Z` as [here](https://www.w3schools.com/graphics/svg_path.asp). Leonardo makes it easy to create that for you.


### \<polygon\>  
```
var myPolygon = L.polygon(x1, y1, ...xn, yn)
```
Returns a `<polygon>` tag with _points_ attribute corresponding to those passed; for example for a simple triangle could be something like `200,10 250,190 160,210` as [here](https://www.w3schools.com/graphics/svg_polygon.asp). Leonardo makes it easy to create that for you.

### \<polyline\>
```
var myPolyline = L.polyline(x1, y1, ...xn, yn)
```
creates a polyline which can even be opened (it does not close automatically). 

### \<rect\>  
```
var myRect = L.rect(x, y, w, h)
```
Returns a `<rect>` tag with the upper left corner positioned at `{x, y}` then `w` is for the width and `h for the height.

### \<text\>  
```
var myText = L.text(x, y, content)
```
Returns a `<text>` tag with positioned at the upper left corner positioned at `{x, y}` containing the text passed as `content`.

### \<title\>  
```
var myTitle = L.title(txt)
```
Returns a `<title>` tag containing the text passed as `content`.

### \<script\>  
```
var myScript = L.script(content)
```
Returns a `<script>` tag containing the text passed as `content`.


## extras

### \<textBox\>  
```
var myTextBox = L.textBox(text, h, w, textAttrs)
```
to be documented

### \<textPath\>  
```
var myTextPath = L.textPath(id, d, content)
```
If we want a text to follow a path then a single tag is not [enough](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/textPath)
This function returns an element which contains all is needed given an `id`, a `d` data for the path and a `content` string. 

