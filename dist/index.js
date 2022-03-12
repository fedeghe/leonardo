'use strict';
/*
 __    _____ _____ _____ _____ _____ ____  _____ 
|  |  |   __|     |   | |  _  | __  |    \|     |
|  |__|   __|  |  | | | |     |    -|  |  |  |  |
|_____|_____|_____|_|___|__|__|__|__|____/|_____|
                                                  V. 1.0.15

Federico Ghedina <federico.ghedina@gmail.com> 2022
~10.69KB
*/
!function(t){function e(t,e,n){this.namespaces=h;var r,o,i=this;n=n||{},this.tag=s("svg"),this.tag.setAttribute("width",t),this.tag.setAttribute("height",e),this.tag.setAttribute("xmlns",h.svg),
this.tag.setAttribute("viewbox","0 0 "+t+" "+e),this.childs=[];for(r in n)"ns"!==r&&"target"!==r&&this.tag.setAttribute(r,n[r]);if(this.target="target"in n?n.target:null,
"ns"in n)for("*"===n.ns&&(n.ns=Object.keys(h)),r=0,o=n.ns.length;r<o;r++)!function(t){t in h&&i.tag.setAttribute("xmlns:"+t,h[t])}(n.ns[r])}function n(){this.path="",this.previous=null}function r(t){
return function(){var e=this.previous===t?" ":t;return this.path+=[e].concat([[].slice.call(arguments,0).join(",")]).join(" ")+" ",this.previous=t,this}}function o(){return"leo_id_"+ ++c}
function i(t){return t.defs||(t.defs=new p("defs"),t.append(t.defs)),t.defs}function s(t,e){return e=e||h.svg,document.createElementNS(e,t)}function a(t){return t*Math.PI/180}function p(t,e){this.t=t,
this.tag=s(t,e),this.childs=[],this.events={},this.transforms={rotate:"",move:"",scale:""}}function u(t){return t.setAttributes({
transform:t.transforms.rotate+" "+t.transforms.move+" "+t.transforms.scale}),t}var h={cc:"http://creativecommons.org/ns#",dc:"http://purl.org/dc/elements/1.1/",ev:"http://www.w3.org/2001/xml-events",
rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",svg:"http://www.w3.org/2000/svg",xlink:"http://www.w3.org/1999/xlink"};e.import=function(t){"string"==typeof t&&(t=e.toDocument(t));var n=new e(1,1)
;return n.tag=t.children[0],n},e.getqs=function(){var t,e,n=document.location.search.substr(1),r=n.split("&"),o={};for(t in r)e=r[t].split("="),o[e[0]]=e.length>1?decodeURIComponent(e[1]):null
;return o},e.toString=function(t){var e=document.createElement("div");return e.appendChild(t),e.innerHTML},e.toDocument=function(t){return(new DOMParser).parseFromString(t,"image/svg+xml")},
e.prototype.setAttributes=function(t){var e;if("string"==typeof t)return this.tag.getAttribute(t);for(e in t)this.tag.setAttribute(e,t[e]);return this},e.prototype.styles=function(t){var e
;for(e in t)this.tag.style[e]=t[e];return this},e.prototype.append=function(){var t=this;return[].slice.call(arguments,0).forEach(function(e){e instanceof Array?e.forEach(function(e){t.childs.push(e),
t.append(e)}):(t.childs.push(e),t.tag.appendChild(e.tag))}),this},e.prototype.render=function(t){var e=t&&"target"in t?t.target:this.target;if(!e)throw"Target not set";return e.innerHTML="",
t.fade&&(this.tag.style.opacity=0),e.appendChild(this.tag),t&&t.cb&&t.cb.call(this),t.fade&&this.fadeIn(parseInt(t.fade,10)),this},e.prototype.fadeIn=function(t){function e(o){console.log(o)
;var i=(o-n)/t;r.tag.style.opacity=i,i<1?requestAnimationFrame(e):r.tag.style.opacity=1}var n=0,r=this;requestAnimationFrame(e)},e.prototype.downloadAnchor=function(t,e){
var n=new XMLSerializer,r='<?xml version="1.0" standalone="no"?>\r\n'+n.serializeToString(this.tag),o=null,i=document.createElement("a");return t=t||"download",e=e||"download",
r.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)||(r=r.replace(/^<svg/,'<svg xmlns="'+this.namespaces.svg+'"')),
r.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)||(r=r.replace(/^<svg/,'<svg xmlns:xlink="'+this.namespaces.xlink+'"')),o="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(r),
i.download=e+".svg",i.href=o,i.addEventListener("click",function(){this.download=e+".svg"}),i.innerHTML=t,i},e.prototype.desc=function(t){var e=new p("desc");return e.tag.innerHTML=t,e},
e.prototype.circle=function(t,e,n){var r=new p("circle");return r.setAttributes({cx:t,cy:e,r:n}),r},e.prototype.ellipse=function(t,e,n,r){var o=new p("ellipse");return o.setAttributes({cx:t,cy:e,rx:n,
ry:r}),o},e.prototype.group=function(){return new p("g")},e.prototype.image=function(t,e,n,r,o){var i=new p("image");return i.setAttributes({x:t,y:e,width:n,height:r}),
i.tag.setAttributeNS(h.xlink,"xlink:href",o),i},e.prototype.line=function(t,e,n,r){var o=new p("line");return o.setAttributes({x1:t,y1:e,x2:n,y2:r}),o},e.prototype.path=function(t){var e=new p("path")
;return e.setAttributes({d:t}),e},e.prototype.polygon=function(){var t=new p("polygon"),e=[].slice.call(arguments,0),n=[],r=0,o=e.length;for(null;r<o;r+=2)n.push(e[r]+","+e[r+1])
;return t.setAttributes({points:n.join(" ")}),t},e.prototype.polyline=function(){var t=new p("polyline"),e=[].slice.call(arguments,0),n=[],r=0,o=e.length;for(null;r<o;r+=2)n.push(e[r]+","+e[r+1])
;return t.setAttributes({points:n.join(" ")}),t},e.prototype.rect=function(t,e,n,r){r=r||n;var o=new p("rect");return o.setAttributes({x:t,y:e,width:n,height:r}),o},e.prototype.text=function(t,e,n){
var r=new p("text");return r.setAttributes({x:t,y:e}),r.tag.innerHTML=n,r},e.prototype.textPath=function(t,e,n){var r=this,o=new p("text"),i=new p("defs"),s=r.path(e),a=new p("textPath")
;return s.setAttributes({id:t}),a.tag.innerHTML=n,a.tag.setAttributeNS(h.xlink,"xlink:href","#"+t),o.append(i),o.append(a),i.append(s),o},e.prototype.title=function(t){var e=new p("title")
;return e.tag.innerHTML=t,e},e.prototype.script=function(t){var e=new p("script");return e.setAttributes({type:"application/ecmascript"}),t&&(e.tag.innerHTML="//<![CDATA[\n"+t+"\n]]>"),e},
e.prototype.textBox=function(t,e,n,r){var o=new p("svg"),i=new p("rect"),s=new p("text");return i.setAttributes({x:0,y:0,width:e,height:n,"stroke-width":0,stroke:"transparent"}),o.setAttributes({
width:e,height:n}),s.setAttributes({x:"50%",y:"50%","dominant-baseline":"middle","text-anchor":"middle"}),r&&s.setAttributes(r),s.tag.innerHTML=t,o.append(i,s),o},n.prototype.M=r("M"),
n.prototype.m=r("m"),n.prototype.Z=r("Z"),n.prototype.L=r("L"),n.prototype.l=r("l"),n.prototype.H=r("H"),n.prototype.h=r("h"),n.prototype.V=r("V"),n.prototype.v=r("v"),n.prototype.C=r("C"),
n.prototype.c=r("c"),n.prototype.Q=r("Q"),n.prototype.q=r("q"),n.prototype.S=r("S"),n.prototype.s=r("s"),n.prototype.T=r("T"),n.prototype.t=r("t"),n.prototype.A=r("A"),n.prototype.a=r("a"),
n.prototype.R=r("R"),e.prototype.pathBuild=function(){var t=new n;return t.toString=function(){var t=this.path+"";return this.path="",t},t}(),e.prototype.slice=function(t,e,n,r,o){
var i=this,s=i.slicePath(t,e,n,r,o);return i.path(s)},e.prototype.slicePath=function(t,e,n,r,o){var i=0;if(r>o){var s=r;r=o,o=s}return i=o-r<=180?0:1,r=a(r),o=a(o),
this.pathBuild.M(t,e).L(t+Math.cos(r)*n,e-Math.sin(r)*n).A(n,n,0,i,0,t+Math.cos(o)*n,e-Math.sin(o)*n).L(t,e)};var c=0;e.prototype.linearGradient=function(t,e){var n,r=(i(this),
o()),s=new p("linearGradient"),a={id:r,x1:"0%",y1:"0%",x2:"100%",y2:"0%"};return e&&(a.gradientTransform="rotate("+e+")"),s.setAttributes(a),t.forEach(function(t){n=new p("stop");var e={
offset:t.perc+"%","stop-color":t.color};"style"in t&&(e.style=t.style),n.setAttributes(e),s.append(n)}),this.defs.append(s),"url(#"+r+")"},e.prototype.radialGradient=function(t){var e,n=(i(this),
o()),r=new p("radialGradient");return r.setAttributes({id:n}),t.forEach(function(t){e=new p("stop");var n={offset:t.perc+"%","stop-color":t.color};"style"in t&&(n.style=t.style),e.setAttributes(n),
r.append(e)}),this.defs.append(r),"url(#"+n+")"},e.prototype.animate=function(){function t(t,e,n,r){r=r||20;var o=0,i=0,s=0,a=setInterval(function(){i=e(i,o),s=n(s,o),o+=.1,t.move(i,s)},r)
;return function(){clearInterval(a)}}function e(t,e,n,r){r=r||20;var o=0,i=0,s=0,a=setInterval(function(){i=e(i,o),s=n(s,o),o+=.1,t.move(i*Math.cos(s),i*Math.sin(s))},r);return function(){
clearInterval(a)}}function n(t){var e=new p("animate");return e.setAttributes({attributeType:"XML",attributeName:t.attributeName,from:t.from,to:t.to,dur:t.dur,begin:t.begin||"0s",
repeatCount:t.repeatCount}),e}return{cartesian:t,polar:e,attr:n}}(),p.prototype.setAttributes=e.prototype.setAttributes,p.prototype.styles=e.prototype.styles,p.prototype.append=e.prototype.append,
p.prototype.on=function(t,e){return t in this.events?this.events[t].push(e):this.events[t]=[e],this.tag.addEventListener(t,e),this},p.prototype.off=function(t,e){var n=this
;return t in this.events&&(void 0===e?(this.events[t].forEach(function(e){n.tag.removeEventListener(t,e)}),this.events[t]=null):n.tag.removeEventListener(t,e)),this},p.prototype.once=function(t,e){
var n=this;return t in this.events?this.events[t].push(e):this.events[t]=[e],this.tag.addEventListener(t,function r(o){e(o),n.off(t,r)}),this},p.prototype.clone=function(){
var t,e=new p(this.t),n=this.tag.attributes,r=0;for(e.transforms.rotate=this.transforms.rotate,e.transforms.move=this.transforms.move,e.transforms.scale=this.transforms.scale,r=0,
t=n.length;r<t;r++)e.tag.setAttribute(n[r].name,n[r].value);for(r=0,t=this.childs.length;r<t;r++)e.append(this.childs[r].clone());return 0==t&&(e.tag.innerHTML=this.tag.innerHTML),e},
p.prototype.use=function(){var t=this.tag.attributes.id,e=new p("use");if(!t)throw new Error("You can use use only on tags having an id attribute");return e.tag.setAttribute("href","#"+t.value),e},
p.prototype.rotate=function(t,e,n){return e=e||0,n=n||0,this.transforms.rotate=" rotate("+t+" "+e+" "+n+")",u(this)},p.prototype.scale=function(t,e){return t=t||0,e=e||t||0,
this.transforms.scale=" scale("+t+", "+e+")",u(this)},p.prototype.mirrorH=function(){return this.transforms.scale=" scale(1, -1)",u(this)},p.prototype.mirrorV=function(){
return this.transforms.scale=" scale(-1, 1)",u(this)},p.prototype.move=function(t,e){return t=t||0,e=e||0,this.transforms.move=" translate("+t+" "+e+")",u(this)},p.prototype.remove=function(){
this.tag.parentNode.removeChild(this.tag)},p.prototype.bringToTop=function(){this.bringTo(1/0)},p.prototype.bringToBottom=function(){this.bringTo(-1/0)},p.prototype.timeout=function(t,e){
var n=t.bind(this);return setTimeout(n,e),this},p.prototype.bringTo=function(t){var e=this.tag.ownerSVGElement;switch(t){case 1/0:e.removeChild(this.tag),e.appendChild(this.tag);break;case-1/0:
e.removeChild(this.tag),e.insertBefore(this.tag,e.firstChild);break;default:var n=this.tag;if(t>0){for(;t++>0&&n.nextSibling;)n=n.nextSibling;e.removeChild(this.tag),
e.insertBefore(this.tag,n.nextSibling)}else if(t<0){for(;t--<0&&n.previousSibling;)n=n.previousSibling;e.removeChild(this.tag),e.insertBefore(this.tag,n)}}},p.prototype.bringToTop=function(){
var t=this.tag.ownerSVGElement;t.removeChild(this.tag),t.appendChild(this.tag)},p.prototype.clear=function(){this.tag.innerHTML=""},p.prototype.replace=function(t,e){
t.tag.parentNode.replaceChild(e.tag,t.tag)},p.prototype.getBbox=function(){return this.tag.getBBox()};var l=function(t,n,r){return t&&n?new e(t,n,r):{ERROR:"width or height not given!"}}
;l.import=e.import,l.getqs=e.getqs,t.Leonardo=l}(window);