<a name="elements"></a>
## Elements 

Now that we know how to create a root `<svg>` and sub-elements we need some methods to append them so to create the right hierarchy, to style them, give attributes, ... and more.

---  
    <Leonardo_Instance>.render({target: DOMNode, cb: function (instance) {}}) -> Leonardo_Instance

renders the instance into the target.

In case when invoking the `Leonardo` factory method the `target` parameter has been passed then here it is optional, otherwise must be passed, otherwise an exception will be thrown.  
``` js
var root = Leonardo(300, 200, {target: myDomNode})
root.render(); // now is optional
// 
var rootOrphan = Leonardo(300, 200)
root.render(); // now is not, need to pass `{target: aDomNode}`
               // otherwise will throw an exception

```  

---
### tagInstance.setAttributes(attributes) -> tagInstance

Here _attributes_ is an _object literal_ that can contain all the attributes we may need to add to the tag. For example for a `<line>` tag we could write:
``` js  
myLine.setAttributes({'stroke-width': 12, stroke: 'black'});
```
---
### tagInstance.styles(styles) -> tagInstance  

Here _styles_ is an _object literal_ that can contain all the styles we may need to add to the tag. For example for a `<recat>` tag we could write:
``` js
myRect.styles({cursor: 'pointer'})
```
---
### tagInstance.append(tag1 [, tag2 [, ...]]) -> tagInstance  

This adds all tags passed to it into the instance tag. For example let's say we have a `<g>` of objects and we would like to rotate (see tranformation section) all the elements contained into it; optionally also an array of elements can be passed:
``` js
myGroup.append(line, circle)
// now we can rotate all elements just rotating the group
```
---
### tagInstance.on(eventName, callback) -> tagInstance  

This method allows to register an event listener for a tag:
``` js
myRect.on('click', function (e) {
    console.log(e)
})
```
---
### tagInstance.off(eventName, callback) -> tagInstance  

This method allows to unregister an event listener for a tag:
``` js
myRect.off('click', function (e) {
    console.log(e)
})
```
As expected if You plan to register and unregister an handler function You must use the same referenced handler function in both calls.

---

### tagInstance.once(eventName, callback) -> tagInstance  

Should be clear what this does.

---

### tagInstance.clone() -> clone tagInstance  

Creates a clone of the instance

---

### tagInstance.use() -> <use> Element tagInstance  

Creates something similar to a clone of the instance, the limitation/power of a `<use>` tag is that one cannot override the properties defined in the original instance. More [here](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use).

---

### tagInstance.clear() -> void

Removes the subtree of a tag.

---

### tagInstance.remove() -> void

Removes a tag.

---

### tagInstance.replace(oldTag, newTag) -> void

Replaces `oldTag` with `newTag`.

---

### tagInstance.getBbox() -> void

Gets the bounding box of the instance {x, y, w, h}. More infos can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/SVGGraphicsElement/getBBox)

