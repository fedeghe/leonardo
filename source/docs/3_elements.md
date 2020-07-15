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

