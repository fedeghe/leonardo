/*
 __    _____ _____ _____ _____ _____ ____  _____ 
|  |  |   __|     |   | |  _  | __  |    \|     |
|  |__|   __|  |  | | | |     |    -|  |  |  |  |
|_____|_____|_____|_|___|__|__|__|__|____/|_____|
                                                  V. 1.0.11

Federico Ghedina <federico.ghedina@gmail.com> 2020
~9KB
*/
!function(t){function e(t,e,n){this.namespaces=p;var r,i,s=this;n=n||{},this.tag=o("svg"),this.tag.setAttribute("width",t),this.tag.setAttribute("height",e),this.tag.setAttribute("xmlns",p.svg),
this.tag.setAttribute("viewbox","0 0 "+t+" "+e),this.childs=[];for(r in n)"ns"!==r&&"target"!==r&&this.tag.setAttribute(r,n[r]);if(this.target="target"in n?n.target:null,
"ns"in n)for("*"===n.ns&&(n.ns=Object.keys(p)),r=0,i=n.ns.length;r<i;r++)!function(t){t in p&&s.tag.setAttribute("xmlns:"+t,p[t])}(n.ns[r])}function n(){this.path="",this.previous=null}function r(t){
return function(){var e=this.previous===t?" ":t;return this.path+=[e].concat([[].slice.call(arguments,0).join(",")]).join(" ")+" ",this.previous=t,this}}function o(t,e){return e=e||p.svg,
document.createElementNS(e,t)}function i(t){return t*Math.PI/180}function s(t,e){this.t=t,this.tag=o(t,e),this.childs=[],this.events={},this.transforms={rotate:"",move:"",scale:""}}function a(t){
return t.setAttributes({transform:t.transforms.rotate+" "+t.transforms.move+" "+t.transforms.scale}),t}var p={cc:"http://creativecommons.org/ns#",dc:"http://purl.org/dc/elements/1.1/",
ev:"http://www.w3.org/2001/xml-events",rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",svg:"http://www.w3.org/2000/svg",xlink:"http://www.w3.org/1999/xlink"};e.import=function(t){
"string"==typeof t&&(t=e.toDocument(t));var n=new e(1,1);return n.tag=t.children[0],n},e.getqs=function(){var t,e,n=document.location.search.substr(1),r=n.split("&"),o={};for(t in r)e=r[t].split("="),
o[e[0]]=e.length>1?decodeURIComponent(e[1]):null;return o},e.toString=function(t){var e=document.createElement("div");return e.appendChild(t),e.innerHTML},e.toDocument=function(t){
return(new DOMParser).parseFromString(t,"image/svg+xml")},e.prototype.setAttributes=function(t){var e;if("string"==typeof t)return this.tag.getAttribute(t);for(e in t)this.tag.setAttribute(e,t[e])
;return this},e.prototype.styles=function(t){var e;for(e in t)this.tag.style[e]=t[e];return this},e.prototype.append=function(){var t=this;return[].slice.call(arguments,0).forEach(function(e){
e instanceof Array?e.forEach(function(e){t.childs.push(e),t.append(e)}):(t.childs.push(e),t.tag.appendChild(e.tag))}),this},e.prototype.render=function(t){var e=t&&"target"in t?t.target:this.target
;if(!e)throw"Target not set";return e.innerHTML="",e.appendChild(this.tag),t&&t.cb&&t.cb.call(this),this},e.prototype.downloadAnchor=function(t,e){
var n=new XMLSerializer,r='<?xml version="1.0" standalone="no"?>\r\n'+n.serializeToString(this.tag),o=null;t=t||"download",e=e||"download",
r.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)||(r=r.replace(/^<svg/,'<svg xmlns="'+this.namespaces.svg+'"')),
r.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)||(r=r.replace(/^<svg/,'<svg xmlns:xlink="'+this.namespaces.xlink+'"')),o="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(r)
;var i=document.createElement("a");return i.download=e+ +new Date+".svg",i.href=o,i.addEventListener("click",function(){this.download=e+ +new Date+".svg"}),i.innerHTML=t,i},
e.prototype.desc=function(t){var e=new s("desc");return e.tag.innerHTML=t,e},e.prototype.circle=function(t,e,n){var r=new s("circle");return r.setAttributes({cx:t,cy:e,r:n}),r},
e.prototype.ellipse=function(t,e,n,r){var o=new s("ellipse");return o.setAttributes({cx:t,cy:e,rx:n,ry:r}),o},e.prototype.group=function(){return new s("g")},e.prototype.image=function(t,e,n,r,o){
var i=new s("image");return i.setAttributes({x:t,y:e,width:n,height:r}),i.tag.setAttributeNS(p.xlink,"xlink:href",o),i},e.prototype.line=function(t,e,n,r){var o=new s("line");return o.setAttributes({
x1:t,y1:e,x2:n,y2:r}),o},e.prototype.path=function(t){var e=new s("path");return e.setAttributes({d:t}),e},e.prototype.polygon=function(){
var t=new s("polygon"),e=[].slice.call(arguments,0),n=[],r=0,o=e.length;for(null;r<o;r+=2)n.push(e[r]+","+e[r+1]);return t.setAttributes({points:n.join(" ")}),t},e.prototype.polyline=function(){
var t=new s("polyline"),e=[].slice.call(arguments,0),n=[],r=0,o=e.length;for(null;r<o;r+=2)n.push(e[r]+","+e[r+1]);return t.setAttributes({points:n.join(" ")}),t},e.prototype.rect=function(t,e,n,r){
r=r||n;var o=new s("rect");return o.setAttributes({x:t,y:e,width:n,height:r}),o},e.prototype.text=function(t,e,n){var r=new s("text");return r.setAttributes({x:t,y:e}),r.tag.innerHTML=n,r},
e.prototype.textPath=function(t,e,n){var r=this,o=new s("text"),i=new s("defs"),a=r.path(e),u=new s("textPath");return a.setAttributes({id:t}),u.tag.innerHTML=n,
u.tag.setAttributeNS(p.xlink,"xlink:href","#"+t),o.append(i),o.append(u),i.append(a),o},e.prototype.title=function(t){var e=new s("title");return e.tag.innerHTML=t,e},e.prototype.script=function(t){
var e=new s("script");return e.setAttributes({type:"application/ecmascript"}),t&&(e.tag.innerHTML="//<![CDATA[\n"+t+"\n]]>"),e},e.prototype.textBox=function(t,e,n,r){
var o=new s("svg"),i=new s("rect"),a=new s("text");return i.setAttributes({x:0,y:0,width:e,height:n,"stroke-width":0,stroke:"transparent"}),o.setAttributes({width:e,height:n}),a.setAttributes({
x:"50%",y:"50%","dominant-baseline":"middle","text-anchor":"middle"}),r&&a.setAttributes(r),a.tag.innerHTML=t,o.append(i,a),o},n.prototype.M=r("M"),n.prototype.m=r("m"),n.prototype.Z=r("Z"),
n.prototype.L=r("L"),n.prototype.l=r("l"),n.prototype.H=r("H"),n.prototype.h=r("h"),n.prototype.V=r("V"),n.prototype.v=r("v"),n.prototype.C=r("C"),n.prototype.c=r("c"),n.prototype.Q=r("Q"),
n.prototype.q=r("q"),n.prototype.S=r("S"),n.prototype.s=r("s"),n.prototype.T=r("T"),n.prototype.t=r("t"),n.prototype.A=r("A"),n.prototype.a=r("a"),n.prototype.R=r("R"),
e.prototype.pathBuild=function(){var t=new n;return t.toString=function(){var t=this.path+"";return this.path="",t},t}(),e.prototype.slice=function(t,e,n,r,o){var i=this,s=i.slicePath(t,e,n,r,o)
;return i.path(s)},e.prototype.slicePath=function(t,e,n,r,o){var s=this,a=0;if(r>o){var p=r;r=o,o=p}return a=o-r<=180?0:1,r=i(r),o=i(o),
s.pathBuild.M(t,e).L(t+Math.cos(r)*n,e-Math.sin(r)*n).A(n,n,0,a,0,t+Math.cos(o)*n,e-Math.sin(o)*n).L(t,e)};var u=0;e.prototype.filters=function(){function t(){return"leo_id_"+ ++u}function e(e){
var n,r,i=t(),a=new s("linearGradient");a.setAttributes({id:i,x1:"0%",y1:"0%",x2:"100%",y2:"0%"});for(n in e)r=new s("stop"),r.setAttributes({offset:n+"%",style:"stop-opacity:1;stop-color:"+e[n]}),
a.append(r);return o.append(a),"url(#"+i+")"}function n(e){var n,r,i=t(),a=new s("radialGradient");a.setAttributes({id:i});for(n in e)r=new s("stop"),r.setAttributes({offset:n+"%",
style:"stop-opacity:1;stop-color:"+e[n]}),a.append(r);return o.append(a),"url(#"+i+")"}var r=this,o=null;return this.defs?o=this.defs:(o=this.defs=new s("defs"),r.append(this.defs)),{lGrad:e,rGrad:n}
},e.prototype.animate=function(){function t(t,e,n){var r=0,o=0,i=0;setInterval(function(){o=e(o,r),i=n(i,r),r+=.1,t.move(o,i)},20)}function e(t,e,n){var r=0,o=0,i=0;setInterval(function(){o=e(o,r),
i=n(i,r),r+=.1,t.move(o*Math.cos(i),o*Math.sin(i))},20)}function n(t,e,n,r,o){var i=new s("animate");return i.setAttributes({attributeType:"XML",attributeName:t,from:e,to:n,dur:r,repeatCount:o}),i}
return{pCart:t,pPolar:e,attr:n}}(),s.prototype.setAttributes=e.prototype.setAttributes,s.prototype.styles=e.prototype.styles,s.prototype.append=e.prototype.append,s.prototype.on=function(t,e){
return t in this.events?this.events[t].push(e):this.events[t]=[e],this.tag.addEventListener(t,e),this},s.prototype.off=function(t,e){var n=this
;return t in this.events&&(void 0===e?(this.events[t].forEach(function(e){n.tag.removeEventListener(t,e)}),this.events[t]=null):n.tag.removeEventListener(t,e)),this},s.prototype.once=function(t,e){
return t in this.events?this.events[t].push(e):this.events[t]=[e],this.tag.addEventListener(t,function(n){e(n),this.off(t,e)}),this},s.prototype.clone=function(){
var t,e=new s(this.t),n=this.tag.attributes,r=0;for(e.transforms.rotate=this.transforms.rotate,e.transforms.move=this.transforms.move,e.transforms.scale=this.transforms.scale,r=0,
t=n.length;r<t;r++)e.tag.setAttribute(n[r].name,n[r].value);for(r=0,t=this.childs.length;r<t;r++)e.append(this.childs[r].clone());return 0==t&&(e.tag.innerHTML=this.tag.innerHTML),e},
s.prototype.use=function(){var t=this.tag.attributes.id,e=new s("use");if(!t)throw new Error("You can use use only on tags having an id attribute");return e.tag.setAttribute("href","#"+t.value),e},
s.prototype.rotate=function(t,e,n){return e=e||0,n=n||0,this.transforms.rotate=" rotate("+t+" "+e+" "+n+")",a(this)},s.prototype.scale=function(t,e){return t=t||0,e=e||0,
this.transforms.scale=" scale("+t+", "+e+")",a(this)},s.prototype.mirrorH=function(){return this.transforms.scale=" scale(1, -1)",a(this)},s.prototype.mirrorV=function(){
return this.transforms.scale=" scale(-1, 1)",a(this)},s.prototype.move=function(t,e){return t=t||0,e=e||0,this.transforms.move=" translate("+t+" "+e+")",a(this)},s.prototype.remove=function(){
this.tag.parentNode.removeChild(this.tag)},s.prototype.clear=function(){this.tag.innerHTML=""},s.prototype.replace=function(t,e){t.tag.parentNode.replaceChild(e.tag,t.tag)},
s.prototype.getBbox=function(){return this.tag.getBBox()};var h=function(t,n,r){return t&&n?new e(t,n,r):{ERROR:"width or height not given!"}};h.import=e.import,h.getqs=e.getqs,t.Leonardo=h}(window);