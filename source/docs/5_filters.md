## Filters  

``` js
instance.filter(filter, ...) // -> filter id  
```
With _Leonardo_ you can use [all svg possible filters](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/filter) easily. 

Let's suppose, for example, you want to use `feTurbolence` and a `feConvolveMatrix`, then it is enough to set the right attributes:

``` js
tagToFilter.setAttributes({
    filter: instance.filter(
        {
            type: 'feTurbulence',
            attrs: {
                type: "turbulence",
                baseFrequency: ".02",
                numOctaves: "2",
                result: "turbulence"
            }
        },
        {
            type:'feConvolveMatrix',
            attrs:{
                kernelMatrix:"0 1 0  1 0 1  0 -5 0"
            }
        }
    )
})
```

---
