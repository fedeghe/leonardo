/*
 __    _____ _____ _____ _____ _____ ____  _____ 
|  |  |   __|     |   | |  _  | __  |    \|     |
|  |__|   __|  |  | | | |     |    -|  |  |  |  |
|_____|_____|_____|_|___|__|__|__|__|____/|_____|
                                                  V. 0.2

Federico Ghedina <federico.ghedina@gmail.com> 2020
~9KB
*/
!function(t){function e(t,e,r){var n,i,s=this.namespaces={cc:"http://creativecommons.org/ns#",dc:"http://purl.org/dc/elements/1.1/",ev:"http://www.w3.org/2001/xml-events",
rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",svg:"http://www.w3.org/2000/svg",xlink:"http://www.w3.org/1999/xlink"},a=this;r=r||{},this.tag=o("svg"),this.tag.setAttribute("width",t),
this.tag.setAttribute("height",e),this.tag.setAttribute("xmlns","http://www.w3.org/2000/svg"),this.tag.setAttribute("viewbox","0 0 "+t+" "+e),this.childs=[]
;for(n in r)"ns"!==n&&"target"!==n&&this.tag.setAttribute(n,r[n]);if(this.target="target"in r?r.target:null,"ns"in r)for("*"===r.ns&&(r.ns=Object.keys(s)),n=0,i=r.ns.length;n<i;n++)!function(t){
t in s&&a.tag.setAttribute("xmlns:"+t,s[t])}(r.ns[n])}function r(){this.path="",this.previous=null}function n(t){return function(){var e=this.previous===t?" ":t
;return this.path+=[e].concat([[].slice.call(arguments,0).join(",")]).join(" ")+" ",this.previous=t,this}}function o(t,e){return e=e||"http://www.w3.org/2000/svg",document.createElementNS(e,t)}
function i(t){return t*Math.PI/180}function s(t,e){this.t=t,this.tag=o(t,e),this.childs=[],this.events={},this.transforms={rotate:"",move:"",scale:""}}function a(t){return t.attrs({
transform:t.transforms.rotate+" "+t.transforms.move+" "+t.transforms.scale}),t}e.import=function(t){"string"==typeof t&&(t=e.toDocument(t));var r=new e(1,1);return r.tag=t.children[0],r},
e.getqs=function(){var t,e,r=document.location.search.substr(1),n=r.split("&"),o={};for(t in n)e=n[t].split("="),o[e[0]]=e.length>1?decodeURIComponent(e[1]):null;return o},e.toString=function(t){
var e=document.createElement("div");return e.appendChild(t),e.innerHTML},e.toDocument=function(t){return(new DOMParser).parseFromString(t,"image/svg+xml")},e.prototype.attrs=function(t){var e
;if("string"==typeof t)return this.tag.getAttribute(t);for(e in t)this.tag.setAttribute(e,t[e]);return this},e.prototype.styles=function(t){var e;for(e in t)this.tag.style[e]=t[e];return this},
e.prototype.add=function(){var t=this;return[].slice.call(arguments,0).forEach(function(e){e instanceof Array?e.forEach(function(e){t.childs.push(e),t.add(e)}):(t.childs.push(e),
t.tag.appendChild(e.tag))}),this},e.prototype.render=function(t,e){var r=t||this.target;return r.innerHTML="",r.appendChild(this.tag),e&&e.call(this),this},e.prototype.downloadAnchor=function(t,e){
var r=new XMLSerializer,n='<?xml version="1.0" standalone="no"?>\r\n'+r.serializeToString(this.tag),o=null;t=t||"download",e=e||"download",
n.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)||(n=n.replace(/^<svg/,'<svg xmlns="'+this.namespaces.svg+'"')),
n.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)||(n=n.replace(/^<svg/,'<svg xmlns:xlink="'+this.namespaces.xlink+'"')),o="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(n)
;var i=document.createElement("a");return i.download=e+ +new Date+".svg",i.href=o,i.addEventListener("click",function(){this.download=e+ +new Date+".svg"}),i.innerHTML=t,i},
e.prototype.desc=function(t){var e=new s("desc");return e.tag.innerHTML=t,e},e.prototype.circle=function(t,e,r){var n=new s("circle");return n.attrs({cx:t,cy:e,r:r}),n},
e.prototype.ellipse=function(t,e,r,n){var o=new s("ellipse");return o.attrs({cx:t,cy:e,rx:r,ry:n}),o},e.prototype.group=function(){return new s("g")},e.prototype.image=function(t,e,r,n,o){
var i=new s("image");return i.attrs({x:t,y:e,width:r,height:n}),i.tag.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",o),i},e.prototype.line=function(t,e,r,n){var o=new s("line")
;return o.attrs({x1:t,y1:e,x2:r,y2:n}),o},e.prototype.path=function(t){var e=new s("path");return e.attrs({d:t}),e},e.prototype.polygon=function(){
var t=new s("polygon"),e=[].slice.call(arguments,0),r=[],n=0,o=e.length;for(null;n<o;n+=2)r.push(e[n]+","+e[n+1]);return t.attrs({points:r.join(" ")}),t},e.prototype.polyline=function(){
var t=new s("polyline"),e=[].slice.call(arguments,0),r=[],n=0,o=e.length;for(null;n<o;n+=2)r.push(e[n]+","+e[n+1]);return t.attrs({points:r.join(" ")}),t},e.prototype.rect=function(t,e,r,n){n=n||r
;var o=new s("rect");return o.attrs({x:t,y:e,width:r,height:n}),o},e.prototype.text=function(t,e,r){var n=new s("text");return n.attrs({x:t,y:e}),n.tag.innerHTML=r,n},
e.prototype.textPath=function(t,e,r){var n=this,o=new s("text"),i=new s("defs"),a=n.path(e),p=new s("textPath");return a.attrs({id:t}),p.tag.innerHTML=r,
p.tag.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","#"+t),o.add(i),o.add(p),i.add(a),o},e.prototype.title=function(t){var e=new s("title");return e.tag.innerHTML=t,e},
e.prototype.script=function(t){var e=new s("script");return e.attrs({type:"application/ecmascript"}),t&&(e.tag.innerHTML="//<![CDATA[\n"+t+"\n]]>"),e},e.prototype.textBox=function(t,e,r,n){
var o=new s("svg"),i=new s("rect"),a=new s("text");return i.attrs({x:0,y:0,width:e,height:r,"stroke-width":0,stroke:"transparent"}),o.attrs({width:e,height:r}),a.attrs({x:"50%",y:"50%",
"dominant-baseline":"middle","text-anchor":"middle"}),n&&a.attrs(n),a.tag.innerHTML=t,o.add(i,a),o},r.prototype.M=n("M"),r.prototype.m=n("m"),r.prototype.Z=n("Z"),r.prototype.L=n("L"),
r.prototype.l=n("l"),r.prototype.H=n("H"),r.prototype.h=n("h"),r.prototype.V=n("V"),r.prototype.v=n("v"),r.prototype.C=n("C"),r.prototype.c=n("c"),r.prototype.Q=n("Q"),r.prototype.q=n("q"),
r.prototype.S=n("S"),r.prototype.s=n("s"),r.prototype.T=n("T"),r.prototype.t=n("t"),r.prototype.A=n("A"),r.prototype.a=n("a"),r.prototype.R=n("R"),e.prototype.pathBuild=function(){var t=new r
;return t.toString=function(){var t=this.path+"";return this.path="",t},t}(),e.prototype.slice=function(t,e,r,n,o){var i=this,s=i.slicePath(t,e,r,n,o);return i.path(s)},
e.prototype.slicePath=function(t,e,r,n,o){var s=this,a=0;if(n>o){var p=n;n=o,o=p}return a=o-n<=180?0:1,n=i(n),o=i(o),
s.pathBuild.M(t,e).L(t+Math.cos(n)*r,e-Math.sin(n)*r).A(r,r,0,a,0,t+Math.cos(o)*r,e-Math.sin(o)*r).L(t,e)};var p=0;e.prototype.filters=function(){function t(){return"leo_id_"+ ++p}function e(e){
var r,n,i=t(),a=new s("linearGradient");a.attrs({id:i,x1:"0%",y1:"0%",x2:"100%",y2:"0%"});for(r in e)n=new s("stop"),n.attrs({offset:r+"%",style:"stop-opacity:1;stop-color:"+e[r]}),a.add(n)
;return o.add(a),"url(#"+i+")"}function r(e){var r,n,i=t(),a=new s("radialGradient");a.attrs({id:i});for(r in e)n=new s("stop"),n.attrs({offset:r+"%",style:"stop-opacity:1;stop-color:"+e[r]}),a.add(n)
;return o.add(a),"url(#"+i+")"}var n=this,o=null;return this.defs?o=this.defs:(o=this.defs=new s("defs"),n.add(this.defs)),{lGrad:e,rGrad:r}},e.prototype.animate=function(){function t(t,e,r){
var n=0,o=0,i=0;setInterval(function(){o=e(o,n),i=r(i,n),n+=.1,t.move(o,i)},20)}function e(t,e,r){var n=0,o=0,i=0;setInterval(function(){o=e(o,n),i=r(i,n),n+=.1,t.move(o*Math.cos(i),o*Math.sin(i))
},20)}function r(t,e,r,n,o){var i=new s("animate");return i.attrs({attributeType:"XML",attributeName:t,from:e,to:r,dur:n,repeatCount:o}),i}return{pCart:t,pPolar:e,attr:r}}(),
s.prototype.attrs=e.prototype.attrs,s.prototype.styles=e.prototype.styles,s.prototype.add=e.prototype.add,s.prototype.on=function(t,e){
return t in this.events?this.events[t].push(e):this.events[t]=[e],this.tag.addEventListener(t,e),this},s.prototype.off=function(t,e){var r=this
;return t in this.events&&(void 0===e?(this.events[t].forEach(function(e){r.tag.removeEventListener(t,e)}),this.events[t]=null):r.tag.removeEventListener(t,e)),this},s.prototype.once=function(t,e){
return t in this.events?this.events[t].push(e):this.events[t]=[e],this.tag.addEventListener(t,function(r){e(r),this.off(t,e)}),this},s.prototype.clone=function(){
var t,e=new s(this.t),r=this.tag.attributes,n=0;for(e.transforms.rotate=this.transforms.rotate,e.transforms.move=this.transforms.move,e.transforms.scale=this.transforms.scale,n=0,
t=r.length;n<t;n++)e.tag.setAttribute(r[n].name,r[n].value);for(n=0,t=this.childs.length;n<t;n++)e.add(this.childs[n].clone());return 0==t&&(e.tag.innerHTML=this.tag.innerHTML),e},
s.prototype.use=function(){var t=this.tag.attributes.id,e=new s("use");if(!t)throw new Error("You can use use only on tags having an id attribute");return e.tag.setAttribute("href","#"+t.value),e},
s.prototype.rotate=function(t,e,r){return e=e||0,r=r||0,this.transforms.rotate=" rotate("+t+" "+e+" "+r+")",a(this)},s.prototype.scale=function(t,e){return t=t||0,e=e||0,
this.transforms.scale=" scale("+t+", "+e+")",a(this)},s.prototype.mirrorH=function(){return this.transforms.scale=" scale(1, -1)",a(this)},s.prototype.mirrorV=function(){
return this.transforms.scale=" scale(-1, 1)",a(this)},s.prototype.move=function(t,e){return t=t||0,e=e||0,this.transforms.move=" translate("+t+" "+e+")",a(this)},s.prototype.clear=function(){
this.tag.parentNode.removeChild(this.tag)},s.prototype.replace=function(t,e){t.tag.parentNode.replaceChild(e.tag,t.tag)},s.prototype.getBbox=function(){return this.tag.getBBox()}
;var h=function(t,r,n){return t&&r?new e(t,r,n):{ERROR:"width or height not given!"}};h.import=e.import,h.getqs=e.getqs,t.Leonardo=h}(window);