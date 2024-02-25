'use strict';
/*
 __    _____ _____ _____ _____ _____ ____  _____ 
|  |  |   __|     |   | |  _  | __  |    \|     |
|  |__|   __|  |  | | | |     |    -|  |  |  |  |
|_____|_____|_____|_|___|__|__|__|__|____/|_____|
                                                  V. 1.0.32

Federico Ghedina <federico.ghedina@gmail.com> 2024
~14.86KB
*/
const Leonardo=function(t){function e(t,e,n){this.namespaces=h;var r,o,s=this;n=n||{},this.width=t,this.height=e,this.tag=i("svg"),this.tag.setAttribute("width",t),this.tag.setAttribute("height",e),
this.tag.setAttribute("xmlns",h.svg),this.tag.setAttribute("viewbox","0 0 "+t+" "+e),this.childs=[];for(r in n)"ns"!==r&&"target"!==r&&this.tag.setAttribute(r,n[r])
;if(this.target="target"in n?n.target:null,"ns"in n)for("*"===n.ns&&(n.ns=Object.keys(h)),r=0,o=n.ns.length;r<o;r++)!function(t){t in h&&s.tag.setAttribute("xmlns:"+t,h[t])}(n.ns[r])}
function n(t,e,n){function r(s){i=i||s;var p=parseFloat((s-i)/e,10);t&&(p=1-p);var u=t?p>0:p<1;n.tag.style.opacity=p,u&&!a?o=requestAnimationFrame(r):(n.tag.style.opacity=t?0:1,
cancelAnimationFrame(o))}var o,i=null,s=this,a=!1;return setTimeout(function(){a=!0},e),n=n||s,n.tag.style.opacity=t?1:0,o=requestAnimationFrame(r),this}function r(){this.path="",this.prev=null}
function o(t){return function(){var e=this.prev===t?" ":t;return this.path+=[e].concat([[].slice.call(arguments,0).join(",")]).join(""),this.prev=t,this}}function i(t,e){return e=e||h.svg,
document.createElementNS(e,t)}function s(t){return t*Math.PI/180}function a(t){return t.defs||(t.defs=new l("defs"),t.append(t.defs)),t.defs}function p(t,e,n,r){var o=(r-90)*Math.PI/180;return{
x:t+n*Math.cos(o),y:e+n*Math.sin(o)}}function u(t,e,n,r,o){var i=p(t,e,n,o),s=p(t,e,n,r),a=o-r<=180?"0":"1";return["M",t,e,"L",i.x,i.y,"A",n,n,0,a,0,s.x,s.y,"Z"].join(" ")}function l(t,e){this.t=t,
this._id="i_"+ ++y,this.tag=i(t,e),this.parent=null,this.childs=[],this.events={},this.transforms={rotate:"",move:"",scale:""}}function c(t){return t.setAttributes({
transform:t.transforms.rotate+" "+t.transforms.move+" "+t.transforms.scale}),t}var h={cc:"http://creativecommons.org/ns#",dc:"http://purl.org/dc/elements/1.1/",ev:"http://www.w3.org/2001/xml-events",
rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",svg:"http://www.w3.org/2000/svg",xlink:"http://www.w3.org/1999/xlink"};e.prototype.setAttributes=function(t){
for(var e in t)this.tag.setAttribute(e,t[e]);return this},e.prototype.getAttributes=function(){var t,e,n=[].slice.call(arguments,0),r={};for(t=0,e=n.length;t<e;t++)r[n[t]]=this.tag.getAttribute(n[t])
;return r},e.prototype.setStyles=function(t){var e;for(e in t)this.tag.style[e]=t[e];return this},e.prototype.getStyles=function(){var t,e,n=[].slice.call(arguments,0),r={};for(t=0,
e=n.length;t<e;t++)r[n[t]]=this.tag.style[n[t]];return r},e.prototype.append=function(){var t=this;return[].slice.call(arguments,0).forEach(function(e){e instanceof Array?e.forEach(function(e){
t.append(e)}):(t.childs.push(e),e.parent=t,t.tag.appendChild(e.tag))}),this},e.prototype.render=function(t){var e=t&&"target"in t?t.target:this.target;if(!e)throw new Error("Target not set")
;return e.innerHTML="",t&&t.fade&&(this.tag.style.opacity=0),e.appendChild(this.tag),t&&t.cb&&t.cb.call(this),t&&t.fade&&this.fadeIn(parseInt(t.fade,10)),this},e.prototype.remove=function(){
var t=[].slice.call(arguments,0);return 0===t.length&&t.push(this),t.forEach(function(t){t.tag.parentNode.removeChild(t.tag),t.parent&&(t.parent.childs=t.parent.childs.filter(function(e){
return e._id!==t._id}))}),this},e.import=function(t){"string"==typeof t&&(t=e.toDocument(t));var n=new e(1,1);return n.tag=t,n},e.getqs=function(){
var t,e,n=window.location.search.substring(1),r=n.split("&"),o={};for(t in r)e=r[t].split("="),o[e[0]]=e.length>1?decodeURIComponent(e[1]):null;return o},e.toString=function(t){
var e=document.createElement("div");return e.appendChild(t),e.innerHTML},e.toDocument=function(t){return(new DOMParser).parseFromString(t,"image/svg+xml").children[0]},e.randomColor=function(t){
for(var e=t?6:3,n=t?16777215:4095,r=(~~(Math.random()*n)).toString(16);r.length<e;)r="0"+r;return r},e.prototype.fadeIn=function(t,e){return n.apply(this,[!1,t,e]),this},
e.prototype.fadeOut=function(t,e){return n.apply(this,[!0,t,e]),this},e.prototype.downloadAnchor=function(t,e){var n=document.createElement("a");return t=t||"download",e=e||"download",
n.download=e+".svg",n.href=this.downloadHref(),n.innerHTML=t,n},e.prototype.positionInspector=function(t){t=t||"%({%x} {%y})  rel-%({r%x} {r%y})  px({x} {y}) rel-px({rx} {ry})"
;var e=this,n=this.tag,r=document.createElement("div"),o=document.createElement("ul"),i=n.getBoundingClientRect(),s=i.left,a=i.top,p=this.width,u=this.height,l=function(t,e){
return parseFloat(t.toFixed(e||2),10)},c=t,h={x:0,y:0},f={left:0,top:0},d={x:0,y:0},y=function(){f.left=document.documentElement.scrollLeft,f.top=document.documentElement.scrollTop}
;return r.style.fontFamily=o.style.fontFamily="verdana",o.style.listStyleType="decimal",o.style.fontSize="0.8em",window.addEventListener("scroll",y),n.addEventListener("mousemove",function(e){
var n=e.clientX+f.left,o=e.clientY+f.top;d.x=n-s,d.y=o-a,c=t;var i=100*d.x/p,y=100*d.y/u,g={"%x":l(i),"%y":l(y),"r%x":l(function(t){return 100*t/p}(~~d.x-h.x)),"r%y":l(function(t){return 100*t/u
}(~~d.y-h.y)),x:~~d.x,y:~~d.y,rx:~~d.x-h.x,ry:~~d.y-h.y};for(var v in g)c=c.replace("{"+v+"}",g[v]);r.innerHTML=c}),n.parentNode.appendChild(r),n.parentNode.appendChild(o),
n.addEventListener("click",function(){var t=document.createElement("li"),n=e.circle(1+~~d.x,1+~~d.y,2);f.left=document.documentElement.scrollLeft,f.top=document.documentElement.scrollTop,
n.setAttributes({stroke:"black",fill:"white","stroke-width":1,"stroke-dasharray":"3,1"}),n.on("mouseover",function(){t.style.fontWeight="bold",n.setAttributes({fill:"red",r:4})}),
n.on("mouseleave",function(){t.style.fontWeight="normal",n.setAttributes({fill:"white",r:2})}),h={x:~~d.x,y:~~d.y},t.innerHTML=c,t.addEventListener("mouseover",function(){t.style.fontWeight="bold",
n.setAttributes({fill:"red",r:4})}),t.addEventListener("mouseout",function(){t.style.fontWeight="normal",n.setAttributes({fill:"white",r:2})}),o.appendChild(t),e.append(n)}),this},
e.prototype.positionCruncher=function(t,e,n,r){function o(t,e){return t[s](p(e[0]),u(e[1]))}var i=this,s="l",a=function(t){return function(e){return parseFloat((t*e/100).toFixed(1),10)}},p=a(t),u=a(e)
;return function(t){if(t=t||[],t.length){var e=t.slice(1).reduce(o,i.pathBuild.M(p(t[0][0]),u(t[0][1])));return r&&e.Z(),i.path(e).setAttributes(n)}}},e.prototype.downloadHref=function(){
var t=new XMLSerializer,e='<?xml version="1.0" standalone="no"?>\r\n'+t.serializeToString(this.tag)
;return e.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)||(e=e.replace(/^<svg/,'<svg xmlns="'+this.namespaces.svg+'"')),
e.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)||(e=e.replace(/^<svg/,'<svg xmlns:xlink="'+this.namespaces.xlink+'"')),"data:image/svg+xml;charset=utf-8,"+encodeURIComponent(e)},
e.prototype.desc=function(t){var e=new l("desc");return e.tag.innerHTML=t,e},e.prototype.circle=function(t,e,n){var r=new l("circle");return r.setAttributes({cx:t,cy:e,r:n}),r},
e.prototype.ellipse=function(t,e,n,r){var o=new l("ellipse");return o.setAttributes({cx:t,cy:e,rx:n,ry:r}),o},e.prototype.group=function(t){var e=new l("g")
;return t&&e.append([].slice.call(arguments,0)),e},e.prototype.image=function(t,e,n,r,o){var i=new l("image");return i.setAttributes({x:t,y:e,width:n,height:r}),
i.tag.setAttributeNS(h.xlink,"xlink:href",o),i},e.prototype.line=function(t,e,n,r){var o=new l("line");return o.setAttributes({x1:t,y1:e,x2:n,y2:r}),o},e.prototype.path=function(t,e){
var n=new l("path");return e=e||{},e.d=t,n.setAttributes(e),n},e.prototype.polygon=function(){var t=new l("polygon"),e=[].slice.call(arguments,0),n=[],r=0,o=e.length
;for(null;r<o;r+=2)n.push(e[r]+","+e[r+1]);return t.setAttributes({points:n.join(" ")}),t},e.prototype.polyline=function(){var t=new l("polyline"),e=[].slice.call(arguments,0),n=[],r=0,o=e.length
;for(null;r<o;r+=2)n.push(e[r]+","+e[r+1]);return t.setAttributes({points:n.join(" ")}),t},e.prototype.rect=function(t,e,n,r){r=r||n;var o=new l("rect");return o.setAttributes({x:t,y:e,width:n,
height:r}),o},e.prototype.text=function(t,e,n){var r=new l("text");return r.setAttributes({x:t,y:e}),r.tag.textContent=n,r},e.prototype.title=function(t){var e=new l("title");return e.tag.innerHTML=t,
e},e.prototype.script=function(t){var e=new l("script");return e.setAttributes({type:"application/ecmascript"}),t&&(e.tag.innerHTML="//<![CDATA[\n"+t+"\n]]>"),e},e.prototype.Element=function(t){
return new l(t)},r.prototype.M=o("M"),r.prototype.m=o("m"),r.prototype.Z=o("Z"),r.prototype.L=o("L"),r.prototype.l=o("l"),r.prototype.H=o("H"),r.prototype.h=o("h"),r.prototype.V=o("V"),
r.prototype.v=o("v"),r.prototype.C=o("C"),r.prototype.c=o("c"),r.prototype.Q=o("Q"),r.prototype.q=o("q"),r.prototype.S=o("S"),r.prototype.s=o("s"),r.prototype.T=o("T"),r.prototype.t=o("t"),
r.prototype.A=o("A"),r.prototype.a=o("a"),r.prototype.R=o("R"),e.prototype.pathBuild=function(){var t=new r;return t.toString=function(){var t=this.path+"";return this.path="",t},t}(),
e.prototype.slice=function(t,e,n,r,o){var i=this,s=i.slicePath(t,e,n,r,o);return i.path(s)},e.prototype.slicePath=function(t,e,n,r,o){var i=0;if(r>o){var a=r;r=o,o=a}return i=o-r<=180?0:1,r=s(r),
o=s(o),this.pathBuild.M(t,e).L(t+Math.cos(r)*n,e-Math.sin(r)*n).A(n,n,0,i,0,t+Math.cos(o)*n,e-Math.sin(o)*n).L(t,e)};var f=function(t){return function(e){var n=new l("stop"),r={offset:e.perc+"%",
"stop-color":e.color};"style"in e&&(r.style=e.style),n.setAttributes(r),t.append(n)}};e.prototype.linearGradient=function(t,e,n,r,o){var i=a(this),s=d(),p=new l("linearGradient"),u={id:s,x1:e||"0%",
y1:n||"0%",x2:r||"100%",y2:o||"0%"},c=f(p);return p.setAttributes(u),t.forEach(c),i.append(p),"url(#"+s+")"},e.prototype.radialGradient=function(t){var e=a(this),n=d(),r=new l("radialGradient"),o=f(r)
;return r.setAttributes({id:n}),t.forEach(o),e.append(r),"url(#"+n+")"},e.prototype.filter=function(t){a(this)
;var e=d(),n=new l("filter"),r=["feGaussianBlur","feDropShadow","feMorphology","feDisplacementMap","feBlend","feColorMatrix","feConvolveMatrix","feComponentTransfer","feSpecularLighting","feDiffuseLighting","feFlood","feTurbulence","feImage","feTile","feOffset","feComposite","feMerge"]
;n.setAttributes({id:e});for(var o,i=0,s=t.length,p=!1;i<s;i++,p=!1)o=t[i],r.includes(o.type)&&(p=new l(o.type),p.setAttributes(o.attrs)),p&&n.append(p);return this.defs.append(n),"url(#"+e+")"},
e.prototype.animate=function(){function t(t,e,n,r){r=r||20;var o=0,i=0,s=0,a=setInterval(function(){i=e(i,o),s=n(s,o),o+=.1,t.move(i,s)},r);return function(){clearInterval(a)}}function e(t,e,n,r){
r=r||20;var o=0,i=0,s=0,a=setInterval(function(){i=e(i,o),s=n(s,o),o+=.1,t.move(i*Math.cos(s),i*Math.sin(s))},r);return function(){clearInterval(a)}}function n(t){var e=new l("animate"),n={
attributeName:t.attributeName,dur:t.dur,begin:t.begin||"0s",repeatCount:t.repeatCount};return"from"in t&&(n.from=t.from),"to"in t&&(n.to=t.to),"values"in t&&(n.values=t.values),
"type"in t&&(n.type=t.type),e.setAttributes(n),e}return{cartesian:t,polar:e,attr:n}}(),e.prototype.textPath=function(t,e,n){var r=this,o=new l("text"),i=new l("defs"),s=r.path(e),a=new l("textPath")
;return s.setAttributes({id:t}),a.tag.innerHTML=n,a.tag.setAttributeNS(h.xlink,"xlink:href","#"+t),o.append(i),o.append(a),i.append(s),o},e.prototype.centeredText=function(t,e,n,r){
var o=this.group(),i=d(),s=new l("path"),a=new l("text"),p=new l("textPath");return s.setAttributes({id:i,pathLength:t,d:"M0 "+e/2+"h"+t,height:0,"stroke-opacity":0}),r=r||{},r.href="#"+i,
r["text-anchor"]="middle",r["dominant-baseline"]="middle",r.startOffset=t/4,p.setAttributes(r),p.tag.innerHTML=n,a.append(p),o.append(s,a),o.updateText=function(t){p.tag.innerHTML=t},o},
e.prototype.arcCentered=function(t,e,n,r,o){var i=new l("path");return i.setAttributes({d:u(t,e,n,r,o)}),i};var d=function(){var t=0;return function(){return"leo_id_"+ ++t}}(),y=0
;l.prototype.setAttributes=e.prototype.setAttributes,l.prototype.getAttributes=e.prototype.getAttributes,l.prototype.setStyles=e.prototype.setStyles,l.prototype.getStyles=e.prototype.getStyles,
l.prototype.append=e.prototype.append,l.prototype.remove=e.prototype.remove,l.prototype.on=function(t,e){return t in this.events?this.events[t].push(e):this.events[t]=[e],
this.tag.addEventListener(t,e),this},l.prototype.off=function(t,e){var n=this;return t in this.events&&(void 0===e?(this.events[t].forEach(function(e){n.tag.removeEventListener(t,e)}),
this.events[t]=null):n.tag.removeEventListener(t,e)),this},l.prototype.once=function(t,e){var n=this;return this.on(t,function r(o){n.off(t,r),e(o)}),this},l.prototype.trigger=function(t){
var e=this.tag;e.dispatchEvent(new Event(t,{target:e}))},l.prototype.clone=function(){var t,e=new l(this.t),n=this.tag.attributes,r=0;for(e.transforms.rotate=this.transforms.rotate,
e.transforms.move=this.transforms.move,e.transforms.scale=this.transforms.scale,r=0,t=n.length;r<t;r++)e.tag.setAttribute(n[r].name,n[r].value);for(r=0,
t=this.childs.length;r<t;r++)e.append(this.childs[r].clone());return 0==t&&(e.tag.innerHTML=this.tag.innerHTML),e},l.prototype.use=function(){var t=this.tag.attributes.id,e=new l("use")
;if(!t)throw new Error("You can use use only on tags having an id attribute");return e.tag.setAttribute("href","#"+t.value),e},l.prototype.rotate=function(t,e,n){return e=e||0,n=n||0,
this.transforms.rotate=" rotate("+t+" "+e+" "+n+")",c(this)},l.prototype.scale=function(t,e){return t=t||0,e=e||t||0,this.transforms.scale=" scale("+t+", "+e+")",c(this)},
l.prototype.mirrorH=function(){return this.transforms.scale=" scale(1, -1)",c(this)},l.prototype.mirrorV=function(){return this.transforms.scale=" scale(-1, 1)",c(this)},
l.prototype.move=function(t,e){return t=t||0,e=e||0,this.transforms.move=" translate("+t+" "+e+")",c(this)},l.prototype.bringToTop=function(){this.bringTo(1/0)},l.prototype.bringToBottom=function(){
this.bringTo(-1/0)},l.prototype.timeout=function(t,e){var n=t.bind(this);return setTimeout(n,e),this},l.prototype.bringTo=function(t){var e=this.tag.ownerSVGElement;switch(t){case 1/0:
e.removeChild(this.tag),e.appendChild(this.tag);break;case-1/0:e.removeChild(this.tag),e.insertBefore(this.tag,e.firstChild);break;default:var n=this.tag;if(t>=0){
for(;t++>0&&n.nextSibling;)n=n.nextSibling;e.removeChild(this.tag),e.insertBefore(this.tag,n.nextSibling)}else{for(;t--<0&&n.previousSibling;)n=n.previousSibling;e.removeChild(this.tag),
e.insertBefore(this.tag,n)}}},l.prototype.clear=function(){this.tag.innerHTML="",this.childs=[],this.transforms={rotate:"",move:"",scale:""}},l.prototype.replace=function(t,e){
t.tag.parentNode.replaceChild(e.tag,t.tag),t.parent.childs=t.parent.childs.map(function(n){return n._id==t._id?e:n})};var g=function(t,n,r){
if(!t||!n||t<0||n<0)throw new Error("width or height not given!");return new e(t,n,r)};return g.import=e.import,g.getqs=e.getqs,g.toString=e.toString,g.toDocument=e.toDocument,
g.randomColor=e.randomColor,g}();"object"==typeof exports&&(module.exports=Leonardo);