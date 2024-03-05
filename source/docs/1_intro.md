
... no, neither this libray neither the svg above have nothing to deal with [Leonardo da Vinci](https://en.wikipedia.org/wiki/Leonardo_da_Vinci), it is takes from "La creazione di Adamo" painted by [Michelangelo Buonarroti](https://en.wikipedia.org/wiki/Michelangelo) (Cappella Sistina, Rome, 1508–1512 A.C.)

## Install Leonardo

`> yarn add @fedeghe/leonardo`


## use Leonardo

First of all in your html include _Leonardo.js_ in the `<head>` tag:  
``` html
<script src="path/to/Leonardo.js"></script>
```
Now create another `<script>` tag to use _Leonardo.js_, and here create an instance for each svg you need to create using the _Leonardo_ factory:  

``` html
<script>+function(){ // do not pollute glob
    var L = Leonardo(300, 200, {id: 'theRootSvg', target: theTargetNode});
    // ...
}()
</script>
```

- `width`: mandatory **Integer**  
- `height`: mandatory **Integer**  
- `options`: an optional **object literal** which allows to  set some attributes that will be added to the root svg tag:  
    - `ns`: set the namespaces that are needed, one or more from `['cc', 'dc', 'ev', 'rdf', 'svg', 'xlink']` if all are needed is enough to pass `*`.  
    - `target`: define the target node for rendering  

anyway it will be possible to set (or override if given already in the instance constructor) the _target_ even when invoking the `render` method on the instance.


