```
 __    _____ _____ _____ _____ _____ ____  _____ 
|  |  |   __|     |   | |  _  | __  |    \|     |
|  |__|   __|  |  | | | |     |    -|  |  |  |  |
|_____|_____|_____|_|___|__|__|__|__|____/|_____|
                                                    v. 1.0.13
```
A simple library to draw sgv

## Install Leonardo

`> yarn add @fedeghe/leonardo`


## use Leonardo

First of all in your html include _Leonardo.js_ in the `<head>` tag:  

    <script src="path/to/Leonardo.js"></script>

Now create another `<script>` tag to use _Leonardo.js_, and here create an instance using  the _Leonardo_ factory:  

```
<script>+function(){
    var L = Leonardo(300, 200, {id: 'theRootSvg', target: theTargetNode});
    // ...
}()
</script>
```
- `width`: mandatory Integer  
- `height`: mandatory Integer  
- `options`: an optional object literal which allows to  set some attributes that will be added to the root svg:  
    - `ns`: set the namespaces that are needed, one or more from `['cc', 'dc', 'ev', 'rdf', 'svg', 'xlink']` if all are needed is enough to pass '*'.  
    - `target`: define the target node for rendering  

anyway it will be possible to specify the _target_ even when invoking the `render` method on the instance.




---


# Tags  

To draw something we need to add svg tags. Leonardo let you create the following tags: `desc`, `circle`, `ellipse`, `group`, `image`, `line`, `path`, `polygon`, `polyline`, `rect`, `text`, `textPath`, `title`, `script`, `textBox`.

Every tag is a `Element` instance, and thus benefits the following instance methods: `attrs`, `styles`, `add`, `on` ,`off`, `clone`, `trans`, `rotate`, `scale`, `mirrorO`, `mirrorV` and `move`. I will describe all them [soon](#elements).

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



---

<a name="elements"></a>
## Elements 

Now that we know how to create a root `<svg>` and sub-elements we need some methods to append them so to create the right hierarchy, to style them, give attributes, ... and more.

---  
    <Leonardo_Instance>.render({target: DOMNode, cb: function (instance) {}}) -> Leonardo_Instance

renders the instance into the target.

In case when invoking the `Leonardo` factory method the `target` parameter has been passed then here it is optional, otherwise must be passed, otherwise an exception will be thrown.  
```
var root = Leonardo(300, 200, {target: myDomNode})
root.render(); // now is optional
// 
var rootOrphan = Leonardo(300, 200)
root.render(); // now is not, need to pass `{target: aDomNode}`
               // otherwise will throw an exception

```  

---
### `setAttrbutes`

    <Element>.setAttributes(attributes) -> instance

Here _attributes_ is an _object literal_ that can contain all the attributes we may need to add to the tag. For example for a `<line>` tag we could write:
```
myLine.setAttributes({'stroke-width': 12, stroke: 'black'});
```
---
### instance.styles(styles) -> instance  

Here _styles_ is an _object literal_ that can contain all the styles we may need to add to the tag. For example for a `<recat>` tag we could write:
```
myRect.styles({cursor: 'pointer'})
```
---
### instance.append(tag1 [, tag2 [, ...]]) -> instance  

This adds all tags passed to it into the instance tag. For example let's say we have a `<g>` of objects and we would like to rotate (see tranformation section) all the elements contained into it; optionally also an array of elements can be passed:
```
myGroup.append(line, circle)
// now we can rotate all elements just rotating the group
```
---
### instance.on(eventName, callback) -> instance  

This method allows to register an event listener for a tag:
```
myRect.on('click', function (e) {
    console.log(e)
})
```
---
### instance.off(eventName, callback) -> instance  

This method allows to unregister an event listener for a tag:
```
myRect.off('click', function (e) {
    console.log(e)
})
```
As expected if You plan to register and unregister an handler function You must use the same referenced handler function in both calls.

---

### instance.once(eventName, callback) -> instance  

Should be clear what this does.

---

### instance.clone() -> clone instance  

Creates a clone of the instance

---

### instance.use() -> <use> Element instance  

Creates something similar to a clone of the instance, the limitation/power of a `<use>` tag is that one cannot override the properties defined in the original instance. More [here](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use).

---

### instance.clear() -> void

Removes the subtree of a tag.

---

### instance.remove() -> void

Removes a tag.

---

### instance.replace(oldTag, newTag) -> void

Replaces `oldTag` with `newTag`.

---

### instance.getBbox() -> void

Gets the bounding box of the instance {x, y, w, h}. More infos can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/SVGGraphicsElement/getBBox)



---

## Transform a tag  

    .rotate(deg, x, y) -> instance  

Rotates a tag of `deg` degrees around the point `{x, y}`.

---

    .scale(sx, sy) -> instance  

Scales a tag using `sx` to scale along _x_ axis and `sy` to scale along _y_ axis.  

---

    .instance.mirrorH() -> instance  

Mirrors a tag horizontally.

---

    instance.mirrorV() -> instance  

Mirrors a tag vertically.

---

    instance.move(x, y) -> instance  

Moves a tag of `x` pixels along _x_ axis and `y` pixels along _y_ axis. 

---

---

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

---

## Animate

### `<Leonardo instance>.animate.attrs(config)` -> <animate ... /> tag  

This method is useful when we need to animate an attribute of a tag. Svg allows to do that creating an `<animate>` tag containing the righ parameters and append it inside the tag that needs to be animated:  

``` js
    var circle = LeoInstance.circle(100, 100, 20),
        animateTag = LeoInstance.animate.attrs({
            attributeName: 'r',
            from: 20,
            to: 1E3,
            dur: '10s',
            repeatCont: 'indefinite'
        });
    circle.append(animateTag);
```

It's also possible to move a tag, changing the `x` and `y` position attributes, but this acts directly on the tag:

### `<Leonardo instance>.animate.cartesian(tag, funcX, funcY)` -> stopper function  

...still need to be documented, there's anyway a clear sample

### `<Leonardo instance>.animate.polar(tag, funcR, funcPHI)` -> stopper function  

...still need to be documented, there's anyway a clear sample





---

## utilities  
Still need to document


---

## Some samples

In the `source` folder there are some examples I use for development purposes.  
If You run `yarn buildev` (and let it go since it is watching for changes in the `source` folder) and the visit [http://127.0.0.1:3001](http://127.0.0.1:3001) You can see all of them.