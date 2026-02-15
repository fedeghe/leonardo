## Some extra

This section exposes some extra functions available on `Leonardo` as instance and static methods to ease some common needs. 
It consists in:  
- composing functions 🧱
- utility functions 🛠️

The first set is composed by function allowing in a single shot create a set of tags concurring to a specific result. The second set are basically helpers function siving csome useful composing informations.

### Composing functions

#### `> instance.textPath(d, text)`

A very common thing is rendering a text along a path. As in the following example

<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 200 200" ><text fill="yellow"><defs><path d="M10,10A100,100,0,0,0,200,100" id="leo_id_1"></path></defs><textPath xlink:href="#leo_id_1">T e x t P a t h - I s - T h e r e - F o r - Y o u</textPath></text></svg>

This requires basically defining the path, a text and lastly linking the two

``` svg
<text fill="yellow">
    <defs>
        <path d="M10,10A100,100,0,0,0,200,100" id="leo_id_1"></path>
    </defs>
    <textPath xlink:href="#leo_id_1">
        T e x t P a t h - I s - T h e r e - F o r - Y o u
    </textPath>
</text>
```

nothing forbids you to compose all pieces and append (4 elements, 2 append)  
**but** you can use `.textPath` method:
``` js
var curvedText = myInstance.textPath(
    "M10,10A100,100,0,0,0,200,100", // see pathBuild utility
    'T e x t P a t h - I s - T h e r e - F o r - Y o u'
).sas({
    fill: 'yellow'
});
/**
 * you can also use pathBuild to create more maintainable `d` parameter
 * see AppendixA for more information about `pathBuild`
 
 L.pathBuild
    .M(10, 10)
    .A(100, 100, 0,0,0, 200, 100)
*/
```

the returned element is the `text` _Element_ enhanced with:  
- `updateText(newText)` to update the contained text



---

#### `> instance.textBox(text, w, h, textAttrs, boxAttrs, rotation)`

Sometimes we need to center orizontally and vertically some text in a predefined sized box:

<svg width="500" height="80" viewBox="0 0 500 80"><rect x="0" y="0" width="500" height="80" stroke-width="0" stroke="transparent" fill="green"></rect><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="red" stroke="white" font-size="2em" font-family="verdana" font-weight="bold">Some text here</text></svg>

to achieve it we need basically a sub `svg` node containing a `rect` tag and a `text` tag.  
``` svg
<svg width="500" height="80" viewBox="0 0 500 80">
    <rect
        x="0" y="0"
        width="500" height="80"
        stroke-width="0" stroke="transparent"
        fill="green"
    ></rect>
    <text x="50%" y="50%"
        dominant-baseline="middle" text-anchor="middle"
        fill="red" stroke="white" font-size="2em"
        font-family="verdana" font-weight="bold"
    >Some text here</text>
</svg>
```

The text has always the same positioning parameters so Leonardo exploits that small thing in a method allowing you to do it just in one call:  

``` js
var textBox = myInstance.textBox(
    'Some text here', 500, 80, {
        fill: 'red',
        stroke:'white',
        'font-size': '2em',
        'font-family': 'verdana',
        'font-weight': 'bold'
    }, {
        fill: 'green'
    }
);
```
the returned element is the `svg` _Element_ enhanced with:  
- `updateText(newText)` to update the contained text

--- 

#### `> instance.arcSectionPath(cx, cy, r1, r2, from, to, vrs1, vrs2)`

Similary to what happens for a text along a curve, drawing a circular slice section requires some work composing the `d` parameter to be used in the `<path/>` tag.

<svg width="200" height="120" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 200 120">
    <path d="M128.19,60.26L156.38,70.52A60,60,0,0,1,42.04,34.47L71.02,42.24A30,30,0,0,0,128.19,60.26Z" stroke="red" stroke-width="5" fill="gray"></path>
</svg>

 Leonardo offers a handy method: 

 ``` js
 var arcSection = .arcSection(
    centerX, centerY,
    radiusInner, radiusOuter,
    fromAngle, toAnglew,
    innerVersus=1, outerVersus=0
);
```
parameters should be clear apart from the last two which allow to decide in case to invert the side where the arc is drawn.  
Passing `0` for the inner one fr example allows to get the following result.

<svg width="200" height="120" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 200 120">
    <path d="M128.19,60.26L156.38,70.52A60,60,0,0,1,42.04,34.47L71.02,42.24A30,30,0,0,1,128.19,60.26Z" stroke="red" stroke-width="5" fill="gray"></path>
</svg>
