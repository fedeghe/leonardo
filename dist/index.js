'use strict';
/*
 __    _____ _____ _____ _____ _____ ____  _____ 
|  |  |   __|     |   | |  _  | __  |    \|     |
|  |__|   __|  |  | | | |     |    -|  |  |  |  |
|_____|_____|_____|_|___|__|__|__|__|____/|_____|
                                                  V. 1.0.15

Federico Ghedina <federico.ghedina@gmail.com> 2021
~10.45KB
*/
!function(t){function e(t,e,r){this.namespaces=h;var n,o,i=this;r=r||{},this.tag=s("svg"),this.tag.setAttribute("width",t),this.tag.setAttribute("height",e),this.tag.setAttribute("xmlns",h.svg),
this.tag.setAttribute("viewbox","0 0 "+t+" "+e),this.childs=[];for(n in r)"ns"!==n&&"target"!==n&&this.tag.setAttribute(n,r[n]);if(this.target="target"in r?r.target:null,
"ns"in r)for("*"===r.ns&&(r.ns=Object.keys(h)),n=0,o=r.ns.length;n<o;n++)!function(t){t in h&&i.tag.setAttribute("xmlns:"+t,h[t])}(r.ns[n])}function r(){this.path="",this.previous=null}function n(t){
return function(){var e=this.previous===t?" ":t;return this.path+=[e].concat([[].slice.call(arguments,0).join(",")]).join(" ")+" ",this.previous=t,this}}function o(){return"leo_id_"+ ++c}
function i(t){return t.defs||(t.defs=new p("defs"),t.append(t.defs)),t.defs}function s(t,e){return e=e||h.svg,document.createElementNS(e,t)}function a(t){return t*Math.PI/180}function p(t,e){this.t=t,
this.tag=s(t,e),this.childs=[],this.events={},this.transforms={rotate:"",move:"",scale:""}}function u(t){return t.setAttributes({
transform:t.transforms.rotate+" "+t.transforms.move+" "+t.transforms.scale}),t}var h={cc:"http://creativecommons.org/ns#",dc:"http://purl.org/dc/elements/1.1/",ev:"http://www.w3.org/2001/xml-events",
rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",svg:"http://www.w3.org/2000/svg",xlink:"http://www.w3.org/1999/xlink"};e.import=function(t){"string"==typeof t&&(t=e.toDocument(t));var r=new e(1,1)
;return r.tag=t.children[0],r},e.getqs=function(){var t,e,r=document.location.search.substr(1),n=r.split("&"),o={};for(t in n)e=n[t].split("="),o[e[0]]=e.length>1?decodeURIComponent(e[1]):null
;return o},e.toString=function(t){var e=document.createElement("div");return e.appendChild(t),e.innerHTML},e.toDocument=function(t){return(new DOMParser).parseFromString(t,"image/svg+xml")},
e.prototype.setAttributes=function(t){var e;if("string"==typeof t)return this.tag.getAttribute(t);for(e in t)this.tag.setAttribute(e,t[e]);return this},e.prototype.styles=function(t){var e
;for(e in t)this.tag.style[e]=t[e];return this},e.prototype.append=function(){var t=this;return[].slice.call(arguments,0).forEach(function(e){e instanceof Array?e.forEach(function(e){t.childs.push(e),
t.append(e)}):(t.childs.push(e),t.tag.appendChild(e.tag))}),this},e.prototype.render=function(t){var e=t&&"target"in t?t.target:this.target;if(!e)throw"Target not set";return e.innerHTML="",
e.appendChild(this.tag),t&&t.cb&&t.cb.call(this),this},e.prototype.downloadAnchor=function(t,e){
var r=new XMLSerializer,n='<?xml version="1.0" standalone="no"?>\r\n'+r.serializeToString(this.tag),o=null,i=document.createElement("a");return t=t||"download",e=e||"download",
n.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)||(n=n.replace(/^<svg/,'<svg xmlns="'+this.namespaces.svg+'"')),
n.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)||(n=n.replace(/^<svg/,'<svg xmlns:xlink="'+this.namespaces.xlink+'"')),o="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(n),
i.download=e+ +new Date+".svg",i.href=o,i.addEventListener("click",function(){this.download=e+ +new Date+".svg"}),i.innerHTML=t,i},e.prototype.desc=function(t){var e=new p("desc")
;return e.tag.innerHTML=t,e},e.prototype.circle=function(t,e,r){var n=new p("circle");return n.setAttributes({cx:t,cy:e,r:r}),n},e.prototype.ellipse=function(t,e,r,n){var o=new p("ellipse")
;return o.setAttributes({cx:t,cy:e,rx:r,ry:n}),o},e.prototype.group=function(){return new p("g")},e.prototype.image=function(t,e,r,n,o){var i=new p("image");return i.setAttributes({x:t,y:e,width:r,
height:n}),i.tag.setAttributeNS(h.xlink,"xlink:href",o),i},e.prototype.line=function(t,e,r,n){var o=new p("line");return o.setAttributes({x1:t,y1:e,x2:r,y2:n}),o},e.prototype.path=function(t){
var e=new p("path");return e.setAttributes({d:t}),e},e.prototype.polygon=function(){var t=new p("polygon"),e=[].slice.call(arguments,0),r=[],n=0,o=e.length;for(null;n<o;n+=2)r.push(e[n]+","+e[n+1])
;return t.setAttributes({points:r.join(" ")}),t},e.prototype.polyline=function(){var t=new p("polyline"),e=[].slice.call(arguments,0),r=[],n=0,o=e.length;for(null;n<o;n+=2)r.push(e[n]+","+e[n+1])
;return t.setAttributes({points:r.join(" ")}),t},e.prototype.rect=function(t,e,r,n){n=n||r;var o=new p("rect");return o.setAttributes({x:t,y:e,width:r,height:n}),o},e.prototype.text=function(t,e,r){
var n=new p("text");return n.setAttributes({x:t,y:e}),n.tag.innerHTML=r,n},e.prototype.textPath=function(t,e,r){var n=this,o=new p("text"),i=new p("defs"),s=n.path(e),a=new p("textPath")
;return s.setAttributes({id:t}),a.tag.innerHTML=r,a.tag.setAttributeNS(h.xlink,"xlink:href","#"+t),o.append(i),o.append(a),i.append(s),o},e.prototype.title=function(t){var e=new p("title")
;return e.tag.innerHTML=t,e},e.prototype.script=function(t){var e=new p("script");return e.setAttributes({type:"application/ecmascript"}),t&&(e.tag.innerHTML="//<![CDATA[\n"+t+"\n]]>"),e},
e.prototype.textBox=function(t,e,r,n){var o=new p("svg"),i=new p("rect"),s=new p("text");return i.setAttributes({x:0,y:0,width:e,height:r,"stroke-width":0,stroke:"transparent"}),o.setAttributes({
width:e,height:r}),s.setAttributes({x:"50%",y:"50%","dominant-baseline":"middle","text-anchor":"middle"}),n&&s.setAttributes(n),s.tag.innerHTML=t,o.append(i,s),o},r.prototype.M=n("M"),
r.prototype.m=n("m"),r.prototype.Z=n("Z"),r.prototype.L=n("L"),r.prototype.l=n("l"),r.prototype.H=n("H"),r.prototype.h=n("h"),r.prototype.V=n("V"),r.prototype.v=n("v"),r.prototype.C=n("C"),
r.prototype.c=n("c"),r.prototype.Q=n("Q"),r.prototype.q=n("q"),r.prototype.S=n("S"),r.prototype.s=n("s"),r.prototype.T=n("T"),r.prototype.t=n("t"),r.prototype.A=n("A"),r.prototype.a=n("a"),
r.prototype.R=n("R"),e.prototype.pathBuild=function(){var t=new r;return t.toString=function(){var t=this.path+"";return this.path="",t},t}(),e.prototype.slice=function(t,e,r,n,o){
var i=this,s=i.slicePath(t,e,r,n,o);return i.path(s)},e.prototype.slicePath=function(t,e,r,n,o){var i=0;if(n>o){var s=n;n=o,o=s}return i=o-n<=180?0:1,n=a(n),o=a(o),
this.pathBuild.M(t,e).L(t+Math.cos(n)*r,e-Math.sin(n)*r).A(r,r,0,i,0,t+Math.cos(o)*r,e-Math.sin(o)*r).L(t,e)};var c=0;e.prototype.linearGradient=function(t,e){var r,n=(i(this),
o()),s=new p("linearGradient"),a={id:n,x1:"0%",y1:"0%",x2:"100%",y2:"0%"};return e&&(a.gradientTransform="rotate("+e+")"),s.setAttributes(a),t.forEach(function(t){r=new p("stop");var e={
offset:t.perc+"%","stop-color":t.color};"style"in t&&(e.style=t.style),r.setAttributes(e),s.append(r)}),this.defs.append(s),"url(#"+n+")"},e.prototype.radialGradient=function(t){var e,r=(i(this),
o()),n=new p("radialGradient");return n.setAttributes({id:r}),t.forEach(function(t){e=new p("stop");var r={offset:t.perc+"%","stop-color":t.color};"style"in t&&(r.style=t.style),e.setAttributes(r),
n.append(e)}),this.defs.append(n),"url(#"+r+")"},e.prototype.animate=function(){function t(t,e,r,n){n=n||20;var o=0,i=0,s=0,a=setInterval(function(){i=e(i,o),s=r(s,o),o+=.1,t.move(i,s)},n)
;return function(){clearInterval(a)}}function e(t,e,r,n){n=n||20;var o=0,i=0,s=0,a=setInterval(function(){i=e(i,o),s=r(s,o),o+=.1,t.move(i*Math.cos(s),i*Math.sin(s))},n);return function(){
clearInterval(a)}}function r(t){var e=new p("animate");return e.setAttributes({attributeType:"XML",attributeName:t.attributeName,from:t.from,to:t.to,dur:t.dur,begin:t.begin||"0s",
repeatCount:t.repeatCount}),e}return{cartesian:t,polar:e,attr:r}}(),p.prototype.setAttributes=e.prototype.setAttributes,p.prototype.styles=e.prototype.styles,p.prototype.append=e.prototype.append,
p.prototype.on=function(t,e){return t in this.events?this.events[t].push(e):this.events[t]=[e],this.tag.addEventListener(t,e),this},p.prototype.off=function(t,e){var r=this
;return t in this.events&&(void 0===e?(this.events[t].forEach(function(e){r.tag.removeEventListener(t,e)}),this.events[t]=null):r.tag.removeEventListener(t,e)),this},p.prototype.once=function(t,e){
var r=this;return t in this.events?this.events[t].push(e):this.events[t]=[e],this.tag.addEventListener(t,function n(o){e(o),r.off(t,n)}),this},p.prototype.clone=function(){
var t,e=new p(this.t),r=this.tag.attributes,n=0;for(e.transforms.rotate=this.transforms.rotate,e.transforms.move=this.transforms.move,e.transforms.scale=this.transforms.scale,n=0,
t=r.length;n<t;n++)e.tag.setAttribute(r[n].name,r[n].value);for(n=0,t=this.childs.length;n<t;n++)e.append(this.childs[n].clone());return 0==t&&(e.tag.innerHTML=this.tag.innerHTML),e},
p.prototype.use=function(){var t=this.tag.attributes.id,e=new p("use");if(!t)throw new Error("You can use use only on tags having an id attribute");return e.tag.setAttribute("href","#"+t.value),e},
p.prototype.rotate=function(t,e,r){return e=e||0,r=r||0,this.transforms.rotate=" rotate("+t+" "+e+" "+r+")",u(this)},p.prototype.scale=function(t,e){return t=t||0,e=e||0,
this.transforms.scale=" scale("+t+", "+e+")",u(this)},p.prototype.mirrorH=function(){return this.transforms.scale=" scale(1, -1)",u(this)},p.prototype.mirrorV=function(){
return this.transforms.scale=" scale(-1, 1)",u(this)},p.prototype.move=function(t,e){return t=t||0,e=e||0,this.transforms.move=" translate("+t+" "+e+")",u(this)},p.prototype.remove=function(){
this.tag.parentNode.removeChild(this.tag)},p.prototype.bringToTop=function(){this.bringTo(1/0)},p.prototype.bringToBottom=function(){this.bringTo(-1/0)},p.prototype.timeout=function(t,e){
var r=t.bind(this);return setTimeout(r,e),this},p.prototype.bringTo=function(t){var e=this.tag.ownerSVGElement;switch(t){case 1/0:e.removeChild(this.tag),e.appendChild(this.tag);break;case-1/0:
e.removeChild(this.tag),e.insertBefore(this.tag,e.firstChild);break;default:var r=this.tag;if(t>0){for(;t++>0&&r.nextSibling;)r=r.nextSibling;e.removeChild(this.tag),
e.insertBefore(this.tag,r.nextSibling)}else if(t<0){for(;t--<0&&r.previousSibling;)r=r.previousSibling;e.removeChild(this.tag),e.insertBefore(this.tag,r)}}},p.prototype.bringToTop=function(){
var t=this.tag.ownerSVGElement;t.removeChild(this.tag),t.appendChild(this.tag)},p.prototype.clear=function(){this.tag.innerHTML=""},p.prototype.replace=function(t,e){
t.tag.parentNode.replaceChild(e.tag,t.tag)},p.prototype.getBbox=function(){return this.tag.getBBox()};var l=function(t,r,n){return t&&r?new e(t,r,n):{ERROR:"width or height not given!"}}
;l.import=e.import,l.getqs=e.getqs,t.Leonardo=l}(window);