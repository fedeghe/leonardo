```
 __    _____ _____ _____ _____ _____ ____  _____ 
|  |  |   __|     |   | |  _  | __  |    \|     |
|  |__|   __|  |  | | | |     |    -|  |  |  |  |
|_____|_____|_____|_|___|__|__|__|__|____/|_____|
                                                    v. $PACKAGE.version$

```
$PACKAGE.description$


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

$$tags.md$$

---

$$elements.md$$

---

$$filters.md$$

---

$$transformations.md$$

---

$$animate.md$$

---

$$samples.md$$