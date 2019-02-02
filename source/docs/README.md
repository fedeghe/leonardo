```
 __    _____ _____ _____ _____ _____ ____  _____ 
|  |  |   __|     |   | |  _  | __  |    \|     |
|  |__|   __|  |  | | | |     |    -|  |  |  |  |
|_____|_____|_____|_|___|__|__|__|__|____/|_____|
                                                    v. $VERSION$
```


## install dependencies and build it

`> npm install`

`> npm run build`

## try it  

`> npm run serve`

open [http://localhost:4567](http://localhost:4567) (or at the port set on _src/vars.json_ in the `SERVER.PORT`)

## test

while the `npm run serve` is running is possible to run `npm test` that will run some tests on some of the pages served (using puppeteer)

## use it

First of all in your html include _Leonardo.js_ in the `<head>` tag:  

    <script src="path/to/Leonardo.js"></script>

Now create another `<script>` tag to use _Leonardo.js_:  

```
<script>
    var L = Leonardo (300, 200, {id : "target"});
</script>
```

parameters:  
**width** : the width in pixels (required)
**height** : the height in pixels (required)
attrs : an hash of required attributes for the `<svg>` tag

for _svg namespaces_ is enough just to pass a `ns` element containing an array containing one or more from the following set :
```
['cc', 'dc', 'ev', 'rdf', 'svg', 'xlink']
```
if all are needed is enough to pass '*'.  




Now we can create new `Elements` through L.


$$tags.md$$





