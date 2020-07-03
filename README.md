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
    var L = Leonardo (300, 200, {id: 'theRootSvg', target: theTargetNode});
    /**
    ...
    */
    L.render();
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

## Element instance  

First thing we need to create an instance, use `Leonardo` factory function:

```
Leonardo(width, height, options)
```
- `width`: mandatory Integer  
- `height`: mandatory Integer  
- `options`: an optional object literal which allows to  set some attributes that will be added to the root svg:  
    - `ns`: set the namespaces that are needed  
    - `target`: define the target node for rendering  

anyway it will be possible to specify the target even when invoking the `render` method on the instance.

Leonardo creates for each of them an instance of an `Element`. This instance offers the following methods to tune the aspect of those tag and something more:  

---  
### instance.render({target: DOMNode, cb: function (instance) {}}) -> instance

renders the instance into the target :
```
myLine.render();
```
---

### instance.attrs(attrs) -> instance

Here _attrs_ is an _object literal_ that can contain all the attributes we may need to add to the tag. For example for a `<line>` tag we could write:
```
myLine.attrs({'stroke-width': 12, stroke: 'black'});
```
---
### instance.styles(styles) -> instance  

Here _styles_ is an _object literal_ that can contain all the styles we may need to add to the tag. For example for a `<reat>` tag we could write:
```
myReact.styles({cursor: 'pointer'})
```
---
### instance.add(tag1 [, tag2 [, ...]]) -> instance  

This adds all tags passed to it into the instance tag. For example let's say we have a `<g>` of objects and we would like to rotate (see below) all the elements contained into it :
```
mygroup.add(line, circle)
// now we can rotate all elements just rotating the group
```
---
### instance.on(eventName, callback) -> instance  

This method allows to register an event listener for a tag:
```
myReact.on('click', function (e) {
    console.log(e)
})
```
---
### instance.off(eventName, callback) -> instance  

This method allows to unregister an event listener for a tag:
```
myReact.off('click', function (e) {
    console.log(e)
})
```
As expected if You plan to register and unregister an handler function You must use the same referenced handler function in both calls.

---

### instance.once(eventName, callback) -> instance  

Should be clear what this does right?

---

### instance.clone() -> clone instance  

Creates a clone of the instance


---

### instance.use() -> <use> Element instance  

Creates something similar to a clone of the instance, the limitation/power of a `<use>` tag is that one cannot override the properties defined in the original instance. More [here](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use).


---

### instance.rotate(deg, x, y) -> instance  

Rotates a tag of `deg` degrees around the point `P : {x, y}`.

---

### instance.scale(sx, sy) -> instance  

Scales a tag using `sx` to scale along _x_ axis and `sy` to scale along _y_ axis.

---

### instance.mirrorH() -> instance  

Mirrors a tag horizontally.

---

### instance.mirrorV() -> instance  

Mirrors a tag vertically.

---

### instance.move(x, y) -> instance  

Moves a tag of `x` along _x_ axis and `y` alogn _y_ axis. 


---

### instance.clear() -> void

Removes a tag.

---

### instance.replace(oldTag, newTag) -> void

Replaces `oldTag` with `newTag`.

---

### instance.getBbox() -> void

Gets the bounding box of the instance {x, y, w, h}. More infos can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/SVGGraphicsElement/getBBox)






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
Returns a `<circle>` tag centered at `P : {cx, cy}` with radius `r`.

### \<ellipse\>
```
var ellipse = L.ellipse(cx, cy, rx, ry)
```
Returns a `<ellipse>` tag centered at `P : {cx, cy}` with radiuses `rx` and `ry`.

### \<g\>
```
var group = L.group()
```
Returns a group `<g>` tag.

### \<image\>
```
var image = L.image(x, y, w, h, src)
```
Returns a `<image>` tag positioned at `P : {x,y}` about `w` and `h` are meant to be the clearly the sizes but  real image size will win on it, in the end the ratio cannot be modified.

### \<line\>  
```
var line = L.line(x1, y1, x2, y2)
```
Returns a `<line>` tag representing a segment starting from `P1 : {x1,y1}` and ending in `P2 : {x2, y2}`.

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
Returns a `<rect>` tag with the upper left corner positioned at `P : {x, y}` then `w` is for the width and `h for the height.

### \<text\>  
```
var text = L.text(x, y, content)
```
Returns a `<text>` tag with positioned at the upper left corner positioned at `P : {x, y}` containing the text passed as `content`.

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



---

## filters

Still need to document

---

## transformations  
Still need to document

---

## animate

Still need to document

---

## Some samples

In the `source` folder there are some examples I use for developement purposes.  
If You run `yarn buildev` (and let it go since it is watching for changes in the `source` folder) and the visit [http://127.0.0.1:3001](http://127.0.0.1:3001) You can see all of them.