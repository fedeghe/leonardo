
# APPENDIX A

### pathBuild

This is a tool to help us to compose the `d` attribute for the `<path />` tag calling functions.  

Let's assume we need to create a `path`, we need to know how the `d` attribute should be, and usually consist in a single string and it can become quickly challenging to maintain it (check some examples [here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Paths)).

For example instead of passing 
``` js
var d = "M 10 315
        L 110 215
        A 36 60 0 0 1 150.71 170.29
        L 172.55 152.45
        A 30 50 -45 0 1 215.1 109.9
        L 315 10";
```
we can
``` js
var d = ourInstance.pathBuild
    .M(10, 315)
    .L(110, 215)
    .A(36, 60, 0, 0, 1, 150.71, 170.29)
    .L(172.55, 152.45)
    .A(30, 50, -45, 0, 1, 215.1, 109.9)
    .L(315, 10)
```
making it easier. Additionally a method `maybe` is available to conditionally make a step or skip it:
``` js
var d = ourInstance.pathBuild.M(10, 315)
    .L(110, 215)
    .maybe(value > threshold, 'A', [36, 60, 0, 0, 1, 150.71, 170.29])
    .L(172.55, 152.45)
    .A(30, 50, -45, 0, 1, 215.1, 109.9)
    .L(315, 10)
```
it expects in order:  
- a condition (if evaluated false then the opertion will now affect the result). 
- an operation among the possbile ones `aAcChHlLmMqQrRsStTvVzZ` ([more](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/d))
- an array of parameters to be used in the operation