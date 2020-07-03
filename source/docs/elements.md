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




