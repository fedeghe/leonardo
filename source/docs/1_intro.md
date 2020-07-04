## install leonardo

`> yarn add @fedeghe/leonardo`


## use it

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


