'use strict';
/*
 __    _____ _____ _____ _____ _____ ____  _____ 
|  |  |   __|     |   | |  _  | __  |    \|     |
|  |__|   __|  |  | | | |     |    -|  |  |  |  |
|_____|_____|_____|_|___|__|__|__|__|____/|_____|
                                                  V. 1.0.38

Federico Ghedina <federico.ghedina@gmail.com> 2024
~15.66KB
*/
const Leonardo=function(t){function e(t,e,r){this.namespaces=h;var n,o,s=this;r=r||{},this.width=t,this.height=e,this.tag=i("svg"),this.tag.setAttribute("width",t),this.tag.setAttribute("height",e),
this.tag.setAttribute("xmlns",h.svg),this.tag.setAttribute("viewbox","0 0 "+t+" "+e),this.childs=[];for(n in r)"ns"!==n&&"target"!==n&&this.tag.setAttribute(n,r[n])
;if(this.target="target"in r?r.target:null,"ns"in r)for("*"===r.ns&&(r.ns=Object.keys(h)),n=0,o=r.ns.length;n<o;n++)!function(t){t in h&&s.tag.setAttribute("xmlns:"+t,h[t])}(r.ns[n])}
function r(t,e,r){function n(s){i=i||s;var p=parseFloat((s-i)/e,10);t&&(p=1-p);var u=t?p>0:p<1;r.tag.style.opacity=p,u&&!a?o=requestAnimationFrame(n):(r.tag.style.opacity=t?0:1,
cancelAnimationFrame(o))}var o,i=null,s=this,a=!1;return setTimeout(function(){a=!0},e),r=r||s,r.tag.style.opacity=t?1:0,o=requestAnimationFrame(n),this}function n(){this.path="",this.prev=null}
function o(t){return function(){var e=this.prev===t?" ":t;return this.path+=[e].concat([[].slice.call(arguments,0).join(",")]).join(""),this.prev=t,this}}function i(t,e){return e=e||h.svg,
document.createElementNS(e,t)}function s(t){return t*Math.PI/180}function a(t){return t.defs||(t.defs=new l("defs"),t.append(t.defs)),t.defs}function p(t,e,r,n){var o=(n-90)*Math.PI/180;return{
x:t+r*Math.cos(o),y:e+r*Math.sin(o)}}function u(t,e,r,n,o){var i=p(t,e,r,o),s=p(t,e,r,n),a=o-n<=180?"0":"1";return["M",t,e,"L",i.x,i.y,"A",r,r,0,a,0,s.x,s.y,"Z"].join(" ")}function l(t,e){this.t=t,
this._id="i_"+ ++g,this.tag=i(t,e),this.parent=null,this.childs=[],this.events={},this.transforms={rotate:"",move:"",scale:""}}function c(t){return t.setAttributes({
transform:t.transforms.rotate+" "+t.transforms.move+" "+t.transforms.scale}),t}var h={cc:"http://creativecommons.org/ns#",dc:"http://purl.org/dc/elements/1.1/",ev:"http://www.w3.org/2001/xml-events",
rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",svg:"http://www.w3.org/2000/svg",xlink:"http://www.w3.org/1999/xlink"};e.prototype.setAttributes=function(t){
for(var e in t)this.tag.setAttribute(e,t[e]);return this},e.prototype.getAttributes=function(){var t,e,r=[].slice.call(arguments,0),n={};for(t=0,e=r.length;t<e;t++)n[r[t]]=this.tag.getAttribute(r[t])
;return n},e.prototype.setStyles=function(t){var e;for(e in t)this.tag.style[e]=t[e];return this},e.prototype.getStyles=function(){var t,e,r=[].slice.call(arguments,0),n={};for(t=0,
e=r.length;t<e;t++)n[r[t]]=this.tag.style[r[t]];return n},e.prototype.append=function(){var t=this;return[].slice.call(arguments,0).forEach(function(e){e instanceof Array?e.forEach(function(e){
t.append(e)}):(t.childs.push(e),e.parent=t,t.tag.appendChild(e.tag))}),this},e.prototype.render=function(t){var e=t&&"target"in t?t.target:this.target;if(!e)throw new Error("Target not set")
;return e.innerHTML="",t&&t.fade&&(this.tag.style.opacity=0),e.appendChild(this.tag),t&&t.cb&&t.cb.call(this),t&&t.fade&&this.fadeIn(parseInt(t.fade,10)),this},e.prototype.remove=function(){
var t=[].slice.call(arguments,0);return 0===t.length&&t.push(this),t.forEach(function(t){t.tag.parentNode.removeChild(t.tag),t.parent&&(t.parent.childs=t.parent.childs.filter(function(e){
return e._id!==t._id}))}),this};var f=function(t,r,n){if(!t||!r||t<0||r<0)throw new Error("width or height not given!");return new e(t,r,n)};f.import=e.import=e.prototype.import=function(t){
"string"==typeof t&&(t=e.toDocument(t));var r=new e(1,1);return r.tag=t,r},f.getqs=e.getqs=e.prototype.getqs=function(){var t,e,r=window.location.search.substring(1),n=r.split("&"),o={}
;for(t in n)e=n[t].split("="),o[e[0]]=e.length>1?decodeURIComponent(e[1]):null;return o},f.toString=e.toString=e.prototype.toString=function(t){var e=document.createElement("div")
;return e.appendChild(t),e.innerHTML},f.toDocument=e.toDocument=e.prototype.toDocument=function(t){return(new DOMParser).parseFromString(t,"image/svg+xml").children[0]},
f.randomColor=e.randomColor=e.prototype.randomColor=function(t){for(var e=t?6:3,r=t?16777215:4095,n=(~~(Math.random()*r)).toString(16);n.length<e;)n="0"+n;return n},
f.getScaler=e.getScaler=e.prototype.getScaler=function(t,e,r,n){return e=void 0!==e?~~e:100,r=void 0!==r?~~r:1,n=void 0!==n?~~n:1,function(o){return parseFloat((o*r*t/e).toFixed(n),10)}},
e.prototype.fadeIn=function(t,e){return r.apply(this,[!1,t,e]),this},e.prototype.fadeOut=function(t,e){return r.apply(this,[!0,t,e]),this},e.prototype.downloadAnchor=function(t,e,r){
var n=document.createElement("a"),o=r&&"leo---append-anchor-id";if(n.download=(e||"download")+".svg",n.href=this.dataEncoded(),n.innerHTML=t||"download",o){if(n.id=o,
document.getElementById(o))return null;r.appendChild(n)}return n},e.prototype.toImageTag=function(t,e){var r=document.createElement("img");return t=t||"",e=e||"",r.setAttribute("title",t),
r.setAttribute("alt",e),r.src=this.dataEncoded(),r},e.prototype.positionInspector=function(t){t=t||"%({%x} {%y})  rel-%({r%x} {r%y})  px({x} {y}) rel-px({rx} {ry})"
;var e=this,r=this.tag,n=document.createElement("div"),o=document.createElement("ul"),i=r.getBoundingClientRect(),s=i.left,a=i.top,p=this.width,u=this.height,l=function(t,e){
return parseFloat(t.toFixed(e||2),10)},c=t,h={x:0,y:0},f={left:0,top:0},d={x:0,y:0},y=function(){f.left=document.documentElement.scrollLeft,f.top=document.documentElement.scrollTop}
;return n.style.fontFamily=o.style.fontFamily="verdana",o.style.listStyleType="decimal",o.style.fontSize="0.8em",window.addEventListener("scroll",y),r.addEventListener("mousemove",function(e){
var r=e.clientX+f.left,o=e.clientY+f.top;d.x=r-s,d.y=o-a,c=t;var i=100*d.x/p,y=100*d.y/u,g={"%x":l(i),"%y":l(y),"r%x":l(function(t){return 100*t/p}(~~d.x-h.x)),"r%y":l(function(t){return 100*t/u
}(~~d.y-h.y)),x:~~d.x,y:~~d.y,rx:~~d.x-h.x,ry:~~d.y-h.y};for(var v in g)c=c.replace("{"+v+"}",g[v]);n.innerHTML=c}),r.parentNode.appendChild(n),r.parentNode.appendChild(o),
r.addEventListener("click",function(){var t=document.createElement("li"),r=e.circle(1+~~d.x,1+~~d.y,2);f.left=document.documentElement.scrollLeft,f.top=document.documentElement.scrollTop,
r.setAttributes({stroke:"black",fill:"white","stroke-width":1,"stroke-dasharray":"3,1"}),r.on("mouseover",function(){t.style.fontWeight="bold",r.setAttributes({fill:"red",r:4})}),
r.on("mouseleave",function(){t.style.fontWeight="normal",r.setAttributes({fill:"white",r:2})}),h={x:~~d.x,y:~~d.y},t.innerHTML=c,t.addEventListener("mouseover",function(){t.style.fontWeight="bold",
r.setAttributes({fill:"red",r:4})}),t.addEventListener("mouseout",function(){t.style.fontWeight="normal",r.setAttributes({fill:"white",r:2})}),o.appendChild(t),e.append(r)}),this},
e.prototype.positionCruncher=function(t,r,n,o){function i(t,e){return t[a](p(e[0]),u(e[1]))}var s=this,a="l",p=e.getScaler(t),u=e.getScaler(r);return function(t){if(t=t||[],t.length){
var e=t.slice(1).reduce(i,s.pathBuild.M(p(t[0][0]),u(t[0][1])));return o&&e.Z(),s.path(e).setAttributes(n)}}},e.prototype.dataEncoded=function(){
var t=new XMLSerializer,e='<?xml version="1.0" standalone="no"?>\r\n'+t.serializeToString(this.tag)
;return e.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)||(e=e.replace(/^<svg/,'<svg xmlns="'+this.namespaces.svg+'"')),
e.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)||(e=e.replace(/^<svg/,'<svg xmlns:xlink="'+this.namespaces.xlink+'"')),"data:image/svg+xml;charset=utf-8,"+encodeURIComponent(e)},
e.prototype.desc=function(t){var e=new l("desc");return e.tag.innerHTML=t,e},e.prototype.circle=function(t,e,r){var n=new l("circle");return n.setAttributes({cx:t,cy:e,r:r}),n},
e.prototype.ellipse=function(t,e,r,n){var o=new l("ellipse");return o.setAttributes({cx:t,cy:e,rx:r,ry:n}),o},e.prototype.group=function(t){var e=new l("g")
;return t&&e.append([].slice.call(arguments,0)),e},e.prototype.image=function(t,e,r,n,o){var i=new l("image");return i.setAttributes({x:t,y:e,width:r,height:n}),
i.tag.setAttributeNS(h.xlink,"xlink:href",o),i},e.prototype.line=function(t,e,r,n){var o=new l("line");return o.setAttributes({x1:t,y1:e,x2:r,y2:n}),o},e.prototype.path=function(t,e){
var r=new l("path");return e=e||{},e.d=t,r.setAttributes(e),r},e.prototype.polygon=function(){var t=new l("polygon"),e=[].slice.call(arguments,0),r=[],n=0,o=e.length
;for(null;n<o;n+=2)r.push(e[n]+","+e[n+1]);return t.setAttributes({points:r.join(" ")}),t},e.prototype.polyline=function(){var t=new l("polyline"),e=[].slice.call(arguments,0),r=[],n=0,o=e.length
;for(null;n<o;n+=2)r.push(e[n]+","+e[n+1]);return t.setAttributes({points:r.join(" ")}),t},e.prototype.rect=function(t,e,r,n){n=n||r;var o=new l("rect");return o.setAttributes({x:t,y:e,width:r,
height:n}),o},e.prototype.text=function(t,e,r){var n=new l("text");return n.setAttributes({x:t,y:e}),n.tag.textContent=r,n},e.prototype.title=function(t){var e=new l("title");return e.tag.innerHTML=t,
e},e.prototype.script=function(t){var e=new l("script");return e.setAttributes({type:"application/ecmascript"}),t&&(e.tag.innerHTML="//<![CDATA[\n"+t+"\n]]>"),e},e.prototype.Element=function(t){
return new l(t)},n.prototype.M=o("M"),n.prototype.m=o("m"),n.prototype.Z=o("Z"),n.prototype.L=o("L"),n.prototype.l=o("l"),n.prototype.H=o("H"),n.prototype.h=o("h"),n.prototype.V=o("V"),
n.prototype.v=o("v"),n.prototype.C=o("C"),n.prototype.c=o("c"),n.prototype.Q=o("Q"),n.prototype.q=o("q"),n.prototype.S=o("S"),n.prototype.s=o("s"),n.prototype.T=o("T"),n.prototype.t=o("t"),
n.prototype.A=o("A"),n.prototype.a=o("a"),n.prototype.R=o("R"),e.prototype.pathBuild=function(){var t=new n;return t.toString=function(){var t=this.path+"";return this.path="",t},t}(),
e.prototype.slice=function(t,e,r,n,o){var i=this,s=i.slicePath(t,e,r,n,o);return i.path(s)},e.prototype.slicePath=function(t,e,r,n,o){var i=0;if(n>o){var a=n;n=o,o=a}return i=o-n<=180?0:1,n=s(n),
o=s(o),this.pathBuild.M(t,e).L(t+Math.cos(n)*r,e-Math.sin(n)*r).A(r,r,0,i,0,t+Math.cos(o)*r,e-Math.sin(o)*r).L(t,e)};var d=function(t){return function(e){var r=new l("stop"),n={offset:e.perc+"%",
"stop-color":e.color};"style"in e&&(n.style=e.style),r.setAttributes(n),t.append(r)}};e.prototype.linearGradient=function(t,e,r,n,o){var i=a(this),s=y(),p=new l("linearGradient"),u={id:s,x1:e||"0%",
y1:r||"0%",x2:n||"100%",y2:o||"0%"},c=d(p);return p.setAttributes(u),t.forEach(c),i.append(p),"url(#"+s+")"},e.prototype.radialGradient=function(t){var e=a(this),r=y(),n=new l("radialGradient"),o=d(n)
;return n.setAttributes({id:r}),t.forEach(o),e.append(n),"url(#"+r+")"},e.prototype.filter=function(t){a(this)
;var e=y(),r=new l("filter"),n=["feGaussianBlur","feDropShadow","feMorphology","feDisplacementMap","feBlend","feColorMatrix","feConvolveMatrix","feComponentTransfer","feSpecularLighting","feDiffuseLighting","feFlood","feTurbulence","feImage","feTile","feOffset","feComposite","feMerge"]
;r.setAttributes({id:e});for(var o,i=0,s=t.length,p=!1;i<s;i++,p=!1)o=t[i],n.includes(o.type)&&(p=new l(o.type),p.setAttributes(o.attrs)),p&&r.append(p);return this.defs.append(r),"url(#"+e+")"},
e.prototype.animate=function(){function t(t,e,r,n){n=n||20;var o=0,i=0,s=0,a=setInterval(function(){i=e(i,o),s=r(s,o),o+=.1,t.move(i,s)},n);return function(){clearInterval(a)}}function e(t,e,r,n){
n=n||20;var o=0,i=0,s=0,a=setInterval(function(){i=e(i,o),s=r(s,o),o+=.1,t.move(i*Math.cos(s),i*Math.sin(s))},n);return function(){clearInterval(a)}}function r(t){var e=new l("animate"),r={
attributeName:t.attributeName,dur:t.dur,begin:t.begin||"0s",repeatCount:t.repeatCount};return"from"in t&&(r.from=t.from),"to"in t&&(r.to=t.to),"values"in t&&(r.values=t.values),
"type"in t&&(r.type=t.type),e.setAttributes(r),e}return{cartesian:t,polar:e,attr:r}}(),e.prototype.textPath=function(t,e,r){var n=this,o=new l("text"),i=new l("defs"),s=n.path(e),a=new l("textPath")
;return s.setAttributes({id:t}),a.tag.innerHTML=r,a.tag.setAttributeNS(h.xlink,"xlink:href","#"+t),o.append(i),o.append(a),i.append(s),o},e.prototype.centeredText=function(t,e,r,n){
var o=this.group(),i=y(),s=new l("path"),a=new l("text"),p=new l("textPath");return s.setAttributes({id:i,pathLength:t,d:"M0 "+e/2+"h"+t,height:0,"stroke-opacity":0}),n=n||{},n.href="#"+i,
n["text-anchor"]="middle",n["dominant-baseline"]="middle",n.startOffset=t/4,p.setAttributes(n),p.tag.innerHTML=r,a.append(p),o.append(s,a),o.updateText=function(t){p.tag.innerHTML=t},o},
e.prototype.arcCentered=function(t,e,r,n,o){var i=new l("path");return i.setAttributes({d:u(t,e,r,n,o)}),i},e.prototype.arcSection=function(t,e,r,n,o,i,s,a){s=void 0===s?1:s,a=void 0===a?0:a
;var u=p(t,e,n,o),l=p(t,e,n,i),c=p(t,e,r,i),h=p(t,e,r,o);return this.path(this.pathBuild.M(h.x,h.y).L(u.x,u.y).A(n,n,0,0,s,l.x,l.y).L(c.x,c.y).A(r,r,0,0,a,h.x,h.y).Z())};var y=function(){var t=0
;return function(){return"leo_id_"+ ++t}}(),g=0;return l.prototype.setAttributes=e.prototype.setAttributes,l.prototype.getAttributes=e.prototype.getAttributes,
l.prototype.setStyles=e.prototype.setStyles,l.prototype.getStyles=e.prototype.getStyles,l.prototype.append=e.prototype.append,l.prototype.remove=e.prototype.remove,l.prototype.on=function(t,e){
return t in this.events?this.events[t].push(e):this.events[t]=[e],this.tag.addEventListener(t,e),this},l.prototype.off=function(t,e){var r=this
;return t in this.events&&(void 0===e?(this.events[t].forEach(function(e){r.tag.removeEventListener(t,e)}),this.events[t]=null):r.tag.removeEventListener(t,e)),this},l.prototype.once=function(t,e){
var r=this;return this.on(t,function n(o){r.off(t,n),e(o)}),this},l.prototype.trigger=function(t){var e=this.tag;e.dispatchEvent(new Event(t,{target:e}))},l.prototype.clone=function(){
var t,e=new l(this.t),r=this.tag.attributes,n=0;for(e.transforms.rotate=this.transforms.rotate,e.transforms.move=this.transforms.move,e.transforms.scale=this.transforms.scale,n=0,
t=r.length;n<t;n++)e.tag.setAttribute(r[n].name,r[n].value);for(n=0,t=this.childs.length;n<t;n++)e.append(this.childs[n].clone());return 0==t&&(e.tag.innerHTML=this.tag.innerHTML),e},
l.prototype.use=function(){var t=this.tag.attributes.id,e=new l("use");if(!t)throw new Error("You can use use only on tags having an id attribute");return e.tag.setAttribute("href","#"+t.value),e},
l.prototype.rotate=function(t,e,r){return e=e||0,r=r||0,this.transforms.rotate=" rotate("+t+" "+e+" "+r+")",c(this)},l.prototype.scale=function(t,e){return t=t||0,e=e||t||0,
this.transforms.scale=" scale("+t+", "+e+")",c(this)},l.prototype.mirrorH=function(){return this.transforms.scale=" scale(1, -1)",c(this)},l.prototype.mirrorV=function(){
return this.transforms.scale=" scale(-1, 1)",c(this)},l.prototype.move=function(t,e){return t=t||0,e=e||0,this.transforms.move=" translate("+t+" "+e+")",c(this)},l.prototype.bringToTop=function(){
this.bringTo(1/0)},l.prototype.bringToBottom=function(){this.bringTo(-1/0)},l.prototype.timeout=function(t,e){var r=t.bind(this);return setTimeout(r,e),this},l.prototype.bringTo=function(t){
var e=this.tag.ownerSVGElement;switch(t){case 1/0:e.removeChild(this.tag),e.appendChild(this.tag);break;case-1/0:e.removeChild(this.tag),e.insertBefore(this.tag,e.firstChild);break;default:
var r=this.tag;if(t>=0){for(;t++>0&&r.nextSibling;)r=r.nextSibling;e.removeChild(this.tag),e.insertBefore(this.tag,r.nextSibling)}else{for(;t--<0&&r.previousSibling;)r=r.previousSibling
;e.removeChild(this.tag),e.insertBefore(this.tag,r)}}},l.prototype.clear=function(){this.tag.innerHTML="",this.childs=[],this.transforms={rotate:"",move:"",scale:""}},
l.prototype.replace=function(t,e){t.tag.parentNode.replaceChild(e.tag,t.tag),t.parent.childs=t.parent.childs.map(function(r){return r._id==t._id?e:r})},f.import=e.import,f.getqs=e.getqs,
f.toString=e.toString,f.toDocument=e.toDocument,f.randomColor=e.randomColor,f}();"object"==typeof exports&&(module.exports=Leonardo);