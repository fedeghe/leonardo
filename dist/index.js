'use strict';
/*
 __    _____ _____ _____ _____ _____ ____  _____ 
|  |  |   __|     |   | |  _  | __  |    \|     |
|  |__|   __|  |  | | | |     |    -|  |  |  |  |
|_____|_____|_____|_|___|__|__|__|__|____/|_____|
                                                  V. 1.0.25

Federico Ghedina <federico.ghedina@gmail.com> 2023
~12.82KB
*/
const Leonardo=function(t){function e(t,e,n){this.namespaces=h;var r,i,s=this;n=n||{},this.width=t,this.height=e,this.tag=o("svg"),this.tag.setAttribute("width",t),this.tag.setAttribute("height",e),
this.tag.setAttribute("xmlns",h.svg),this.tag.setAttribute("viewbox","0 0 "+t+" "+e),this.childs=[];for(r in n)"ns"!==r&&"target"!==r&&this.tag.setAttribute(r,n[r])
;if(this.target="target"in n?n.target:null,"ns"in n)for("*"===n.ns&&(n.ns=Object.keys(h)),r=0,i=n.ns.length;r<i;r++)!function(t){t in h&&s.tag.setAttribute("xmlns:"+t,h[t])}(n.ns[r])}function n(){
this.path="",this.previous=null}function r(t){return function(){var e=this.previous===t?" ":t;return this.path+=[e].concat([[].slice.call(arguments,0).join(",")]).join(" ")+" ",this.previous=t,this}}
function o(t,e){return e=e||h.svg,document.createElementNS(e,t)}function i(t){return t*Math.PI/180}function s(t){return t.defs||(t.defs=new u("defs"),t.append(t.defs)),t.defs}function a(t,e,n,r){
var o=(r-90)*Math.PI/180;return{x:t+n*Math.cos(o),y:e+n*Math.sin(o)}}function p(t,e,n,r,o){var i=a(t,e,n,o),s=a(t,e,n,r),p=o-r<=180?"0":"1"
;return["M",t,e,"L",i.x,i.y,"A",n,n,0,p,0,s.x,s.y,"Z"].join(" ")}function u(t,e){this.t=t,this.tag=o(t,e),this.childs=[],this.events={},this.transforms={rotate:"",move:"",scale:""}}function c(t){
return t.setAttributes({transform:t.transforms.rotate+" "+t.transforms.move+" "+t.transforms.scale}),t}var h={cc:"http://creativecommons.org/ns#",dc:"http://purl.org/dc/elements/1.1/",
ev:"http://www.w3.org/2001/xml-events",rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",svg:"http://www.w3.org/2000/svg",xlink:"http://www.w3.org/1999/xlink"};e.import=function(t){
"string"==typeof t&&(t=e.toDocument(t));var n=new e(1,1);return n.tag=t.children[0],n},e.getqs=function(){var t,e,n=document.location.search.substr(1),r=n.split("&"),o={};for(t in r)e=r[t].split("="),
o[e[0]]=e.length>1?decodeURIComponent(e[1]):null;return o},e.toString=function(t){var e=document.createElement("div");return e.appendChild(t),e.innerHTML},e.toDocument=function(t){
return(new DOMParser).parseFromString(t,"image/svg+xml")},e.prototype.setAttributes=function(t){var e;if("string"==typeof t)return this.tag.getAttribute(t);for(e in t)this.tag.setAttribute(e,t[e])
;return this},e.prototype.styles=function(t){var e;for(e in t)this.tag.style[e]=t[e];return this},e.prototype.append=function(){var t=this;return[].slice.call(arguments,0).forEach(function(e){
e instanceof Array?e.forEach(function(e){t.childs.push(e),t.append(e)}):(t.childs.push(e),t.tag.appendChild(e.tag))}),this},e.prototype.render=function(t){var e=t&&"target"in t?t.target:this.target
;if(!e)throw"Target not set";return e.innerHTML="",t&&t.fade&&(this.tag.style.opacity=0),e.appendChild(this.tag),t&&(t.cb&&t.cb.call(this),t.fade&&this.fadeIn(parseInt(t.fade,10))),this},
e.prototype.fadeIn=function(t,e){function n(i){o=o||i;var s=(i-o)/t;e.tag.style.opacity=s,s<1?r=requestAnimationFrame(n):(e.tag.style.opacity=1,cancelAnimationFrame(r))}var r,o=null,i=this;e=e||i,
e.tag.style.opacity=0,r=requestAnimationFrame(n)},e.prototype.fadeOut=function(t,e){function n(i){o=o||i;var s=1-parseFloat((i-o)/t,10);e.tag.style.opacity=s,
s>0?r=requestAnimationFrame(n):(cancelAnimationFrame(r),e.tag.style.opacity=0)}var r,o=null,i=this;e=e||i,e.tag.style.opacity=1,r=requestAnimationFrame(n)},e.prototype.downloadAnchor=function(t,e){
var n=document.createElement("a");return t=t||"download",e=e||"download",n.download=e+".svg",n.href=this.downloadHref(),n.innerHTML=t,n},e.prototype.inspectPosition=function(t){
var e,n,r,o=this.tag,i=t?document.createElement("div"):null,s=t?document.createElement("ul"):null,a=o.getBoundingClientRect(),p=a.left,u=a.top,c=this.width,h=this.height,l=function(t,e){
return parseFloat(t.toFixed(e||2),10)},f={x:0,y:0};return i.style.fontFamily="verdana",s.style.fontFamily="verdana",o.addEventListener("mousemove",function(o){var s=o.clientX,a=o.clientY;n=s-p,r=a-u
;var g=100*n/c,d=100*r/h;e="%("+l(g)+" "+l(d)+")A("+~~n+" "+~~r+")R("+(~~n-f.x)+" "+(~~r-f.y)+")",t?(i.style.left=s+"px",i.style.top=a+"px",i.innerHTML=e):console.log(e)}),
t&&(o.parentNode.appendChild(i),o.parentNode.appendChild(s),o.addEventListener("click",function(){var t=document.createElement("li");f={x:~~n,y:~~r},t.innerHTML=e,s.appendChild(t)})),this},
e.prototype.downloadHref=function(){var t=new XMLSerializer,e='<?xml version="1.0" standalone="no"?>\r\n'+t.serializeToString(this.tag)
;return e.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)||(e=e.replace(/^<svg/,'<svg xmlns="'+this.namespaces.svg+'"')),
e.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)||(e=e.replace(/^<svg/,'<svg xmlns:xlink="'+this.namespaces.xlink+'"')),"data:image/svg+xml;charset=utf-8,"+encodeURIComponent(e)},
e.prototype.desc=function(t){var e=new u("desc");return e.tag.innerHTML=t,e},e.prototype.circle=function(t,e,n){var r=new u("circle");return r.setAttributes({cx:t,cy:e,r:n}),r},
e.prototype.ellipse=function(t,e,n,r){var o=new u("ellipse");return o.setAttributes({cx:t,cy:e,rx:n,ry:r}),o},e.prototype.group=function(){return new u("g")},e.prototype.image=function(t,e,n,r,o){
var i=new u("image");return i.setAttributes({x:t,y:e,width:n,height:r}),i.tag.setAttributeNS(h.xlink,"xlink:href",o),i},e.prototype.line=function(t,e,n,r){var o=new u("line");return o.setAttributes({
x1:t,y1:e,x2:n,y2:r}),o},e.prototype.path=function(t,e){var n=new u("path");return e=e||{},e.d=t,n.setAttributes(e),n},e.prototype.polygon=function(){
var t=new u("polygon"),e=[].slice.call(arguments,0),n=[],r=0,o=e.length;for(null;r<o;r+=2)n.push(e[r]+","+e[r+1]);return t.setAttributes({points:n.join(" ")}),t},e.prototype.polyline=function(){
var t=new u("polyline"),e=[].slice.call(arguments,0),n=[],r=0,o=e.length;for(null;r<o;r+=2)n.push(e[r]+","+e[r+1]);return t.setAttributes({points:n.join(" ")}),t},e.prototype.rect=function(t,e,n,r){
r=r||n;var o=new u("rect");return o.setAttributes({x:t,y:e,width:n,height:r}),o},e.prototype.text=function(t,e,n){var r=new u("text");return r.setAttributes({x:t,y:e}),r.tag.innerHTML=n,r},
e.prototype.title=function(t){var e=new u("title");return e.tag.innerHTML=t,e},e.prototype.script=function(t){var e=new u("script");return e.setAttributes({type:"application/ecmascript"}),
t&&(e.tag.innerHTML="//<![CDATA[\n"+t+"\n]]>"),e},e.prototype.Element=function(t){return new u(t)},n.prototype.M=r("M"),n.prototype.m=r("m"),n.prototype.Z=r("Z"),n.prototype.L=r("L"),
n.prototype.l=r("l"),n.prototype.H=r("H"),n.prototype.h=r("h"),n.prototype.V=r("V"),n.prototype.v=r("v"),n.prototype.C=r("C"),n.prototype.c=r("c"),n.prototype.Q=r("Q"),n.prototype.q=r("q"),
n.prototype.S=r("S"),n.prototype.s=r("s"),n.prototype.T=r("T"),n.prototype.t=r("t"),n.prototype.A=r("A"),n.prototype.a=r("a"),n.prototype.R=r("R"),e.prototype.pathBuild=function(){var t=new n
;return t.toString=function(){var t=this.path+"";return this.path="",t},t}(),e.prototype.slice=function(t,e,n,r,o){var i=this,s=i.slicePath(t,e,n,r,o);return i.path(s)},
e.prototype.slicePath=function(t,e,n,r,o){var s=0;if(r>o){var a=r;r=o,o=a}return s=o-r<=180?0:1,r=i(r),o=i(o),
this.pathBuild.M(t,e).L(t+Math.cos(r)*n,e-Math.sin(r)*n).A(n,n,0,s,0,t+Math.cos(o)*n,e-Math.sin(o)*n).L(t,e)},e.prototype.linearGradient=function(t,e,n,r,o){
var i,a=s(this),p=l(),c=new u("linearGradient"),h={id:p,x1:e||"0%",y1:n||"0%",x2:r||"100%",y2:o||"0%"};return c.setAttributes(h),t.forEach(function(t){i=new u("stop");var e={offset:t.perc+"%",
"stop-color":t.color};"style"in t&&(e.style=t.style),i.setAttributes(e),c.append(i)}),a.append(c),"url(#"+p+")"},e.prototype.radialGradient=function(t){var e,n=(s(this),l()),r=new u("radialGradient")
;return r.setAttributes({id:n}),t.forEach(function(t){e=new u("stop");var n={offset:t.perc+"%","stop-color":t.color};"style"in t&&(n.style=t.style),e.setAttributes(n),r.append(e)}),
this.defs.append(r),"url(#"+n+")"},e.prototype.filter=function(t){s(this)
;var e=l(),n=new u("filter"),r=["feGaussianBlur","feDropShadow","feMorphology","feDisplacementMap","feBlend","feColorMatrix","feConvolveMatrix","feComponentTransfer","feSpecularLighting","feDiffuseLighting","feFlood","feTurbulence","feImage","feTile","feOffset","feComposite","feMerge"]
;n.setAttributes({id:e});for(var o,i=0,a=t.length,p=!1;i<a;i++,p=!1)o=t[i],r.includes(o.type)&&(p=new u(o.type),p.setAttributes(o.attrs)),n.append(p);return this.defs.append(n),
t.length?"url(#"+e+")":""},e.prototype.animate=function(){function t(t,e,n,r){r=r||20;var o=0,i=0,s=0,a=setInterval(function(){i=e(i,o),s=n(s,o),o+=.1,t.move(i,s)},r);return function(){
clearInterval(a)}}function e(t,e,n,r){r=r||20;var o=0,i=0,s=0,a=setInterval(function(){i=e(i,o),s=n(s,o),o+=.1,t.move(i*Math.cos(s),i*Math.sin(s))},r);return function(){clearInterval(a)}}
function n(t){var e=new u("animate");return e.setAttributes({attributeType:"XML",attributeName:t.attributeName,from:t.from,to:t.to,dur:t.dur,begin:t.begin||"0s",repeatCount:t.repeatCount}),e}return{
cartesian:t,polar:e,attr:n}}(),e.prototype.textPath=function(t,e,n){var r=this,o=new u("text"),i=new u("defs"),s=r.path(e),a=new u("textPath");return s.setAttributes({id:t}),a.tag.innerHTML=n,
a.tag.setAttributeNS(h.xlink,"xlink:href","#"+t),o.append(i),o.append(a),i.append(s),o},e.prototype.centeredText=function(t,e,n,r){
var o=this.group(),i=l(),s=new u("path"),a=new u("text"),p=new u("textPath");return s.setAttributes({id:i,pathLength:t,d:"M0 "+e/2+"h"+t,height:0,"stroke-opacity":0}),r=r||{},r.href="#"+i,
r["text-anchor"]="middle",r["dominant-baseline"]="middle",r.startOffset=t/4,p.setAttributes(r),p.tag.innerHTML=n,a.append(p),o.append(s,a),o.updateText=function(t){p.tag.innerHTML=t},o},
e.prototype.arcCentered=function(t,e,n,r,o){var i=new u("path");return i.setAttributes({d:p(t,e,n,r,o)}),i};var l=function(){var t=0;return function(){return"leo_id_"+ ++t}}()
;u.prototype.setAttributes=e.prototype.setAttributes,u.prototype.styles=e.prototype.styles,u.prototype.append=e.prototype.append,u.prototype.on=function(t,e){
return t in this.events?this.events[t].push(e):this.events[t]=[e],this.tag.addEventListener(t,e),this},u.prototype.off=function(t,e){var n=this
;return t in this.events&&(void 0===e?(this.events[t].forEach(function(e){n.tag.removeEventListener(t,e)}),this.events[t]=null):n.tag.removeEventListener(t,e)),this},u.prototype.once=function(t,e){
var n=this;return t in this.events?this.events[t].push(e):this.events[t]=[e],this.tag.addEventListener(t,function r(o){e(o),n.off(t,r)}),this},u.prototype.clone=function(){
var t,e=new u(this.t),n=this.tag.attributes,r=0;for(e.transforms.rotate=this.transforms.rotate,e.transforms.move=this.transforms.move,e.transforms.scale=this.transforms.scale,r=0,
t=n.length;r<t;r++)e.tag.setAttribute(n[r].name,n[r].value);for(r=0,t=this.childs.length;r<t;r++)e.append(this.childs[r].clone());return 0==t&&(e.tag.innerHTML=this.tag.innerHTML),e},
u.prototype.use=function(){var t=this.tag.attributes.id,e=new u("use");if(!t)throw new Error("You can use use only on tags having an id attribute");return e.tag.setAttribute("href","#"+t.value),e},
u.prototype.rotate=function(t,e,n){return e=e||0,n=n||0,this.transforms.rotate=" rotate("+t+" "+e+" "+n+")",c(this)},u.prototype.scale=function(t,e){return t=t||0,e=e||t||0,
this.transforms.scale=" scale("+t+", "+e+")",c(this)},u.prototype.mirrorH=function(){return this.transforms.scale=" scale(1, -1)",c(this)},u.prototype.mirrorV=function(){
return this.transforms.scale=" scale(-1, 1)",c(this)},u.prototype.move=function(t,e){return t=t||0,e=e||0,this.transforms.move=" translate("+t+" "+e+")",c(this)},u.prototype.remove=function(){
this.tag.parentNode.removeChild(this.tag)},u.prototype.bringToTop=function(){this.bringTo(1/0)},u.prototype.bringToBottom=function(){this.bringTo(-1/0)},u.prototype.timeout=function(t,e){
var n=t.bind(this);return setTimeout(n,e),this},u.prototype.bringTo=function(t){var e=this.tag.ownerSVGElement;switch(t){case 1/0:e.removeChild(this.tag),e.appendChild(this.tag);break;case-1/0:
e.removeChild(this.tag),e.insertBefore(this.tag,e.firstChild);break;default:var n=this.tag;if(t>0){for(;t++>0&&n.nextSibling;)n=n.nextSibling;e.removeChild(this.tag),
e.insertBefore(this.tag,n.nextSibling)}else if(t<0){for(;t--<0&&n.previousSibling;)n=n.previousSibling;e.removeChild(this.tag),e.insertBefore(this.tag,n)}}},u.prototype.bringToTop=function(){
var t=this.tag.ownerSVGElement;t.removeChild(this.tag),t.appendChild(this.tag)},u.prototype.clear=function(){this.tag.innerHTML=""},u.prototype.replace=function(t,e){
t.tag.parentNode.replaceChild(e.tag,t.tag)},u.prototype.getBbox=function(){return this.tag.getBBox()};var f=function(t,n,r){return t&&n?new e(t,n,r):{ERROR:"width or height not given!"}}
;return f.import=e.import,f.getqs=e.getqs,f}();"object"==typeof exports&&(module.exports=Leonardo);