
... no, neither this libray neither the svg above have nothing to deal with the unparalleled towering [Leonardo da Vinci](https://en.wikipedia.org/wiki/Leonardo_da_Vinci) ... neither with actors or turtles obviously.  
Tha one is inspired by "La creazione di Adamo" painted by [Michelangelo Buonarroti](https://en.wikipedia.org/wiki/Michelangelo) (Cappella Sistina, Rome, 1508–1512 A.C.).  
I choosed that name cause of the immense admiration and silent astonishing deep mixed sense of hope and ignorance I'm wasted on when I think about the most incredible mind ever lived so close to us. Unarguably [Leonardo da Vinci](https://en.wikipedia.org/wiki/Leonardo_da_Vinci)

## Install Leonardo

`> yarn add @fedeghe/leonardo`


## use Leonardo

First of all in your html include it in the `<head>` tag:  
``` html
<script src="path/to/Leonardo/dist/index.js"></script>
```
Now create another `<script>`; here the _Leonardo_ factory for each svg you need:  

``` html
<script>+function(){
    var L = Leonardo(300, 200, {id: 'theRootSvg', target: theTargetNode});
    // ...
}()
</script>
```

- `width`: mandatory **Integer**  
- `height`: mandatory **Integer**  
- `options`: an optional **object literal** which allows to  set some attributes that will be added to the root svg tag:  
    - `ns`: set the namespaces that are needed, one or more from `['cc', 'dc', 'ev', 'rdf', 'svg', 'xlink', 'math', 'xhtml', 'xml']` if all are needed is enough to pass `*`.  
    - `target`: define the target node for rendering  

anyway it will be possible to set (or override if given already in the instance constructor) the _target_ even when invoking the `render` method on the instance.  

Here the list of the references: [rdf](https://www.w3.org/TR/rdf-schema/)


