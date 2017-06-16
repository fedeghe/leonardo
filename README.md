```
 __    _____ _____ _____ _____ _____ ____  _____ 
|  |  |   __|     |   | |  _  | __  |    \|     |
|  |__|   __|  |  | | | |     |    -|  |  |  |  |
|_____|_____|_____|_|___|__|__|__|__|____/|_____|
                                                    v. 1
```


## build it
- > `npm install`
- > `./node_modules/malta/src/bin.js build.json`
- open index.html


Create a new object simply calling the `Leonardo` function:  
```
var L = Leonardo (300, 200, {id : "trial"});
```
parameters:
- **width** : the width in pixels (required)
- **height** : the height in pixels (required)
- attrs : an hash of required attributes for the `<svg>` tag

for _svg namespaces_ is enough just to pass a `ns` element containing an array containing one or more from the following set :
```
['cc', 'dc', 'ev', 'rdf', 'svg', 'xlink']
```
if all are needed is enough to pass '*'.  

Now that we have `L` we can add the following

## tags
- `<desc>` : 
    ```
    L.desc('This is the description of my svg')
    ```

- `<line>` :
    ```
    L.line(x1,y1, x2,y2)
    ```

- `<polyline>` :
    ```
    L.polyline(x1,y1, x2,y2 [,x3,y3[, ...]])
    ```

- `<image>` :
    ```
    L.image(x, y, width, height, src);
    ```

- `<path>` :
    ```
    ```

- `<circle>` :
    ```
    ```

- `<ellipse>` :
    ```
    ```

- `<rect>` :
    ```
    ```

- `<polygon>` :
    ```
    ```

- `<text>` :
    ```
    ```

- `<title>` :
    ```
    ```

- `<testPath>` :
    ```
    ```

- `<group>` :
    ```
    ```

- `<script>` :
    ```
    ```


## transformations

## animate


## filters

L.filters.lGrad
L.filters.rGrad

## utilities  
- pathBuild






