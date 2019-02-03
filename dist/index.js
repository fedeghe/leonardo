/*
 __    _____ _____ _____ _____ _____ ____  _____ 
|  |  |   __|     |   | |  _  | __  |    \|     |
|  |__|   __|  |  | | | |     |    -|  |  |  |  |
|_____|_____|_____|_|___|__|__|__|__|____/|_____|
                                                  V. 0.2

Federico Ghedina <federico.ghedina@gmail.com> 2019
~8KB
*/
!function(t){function r(t,r,e){var n,s,i=this.namespaces={cc:"http://creativecommons.org/ns#",dc:"http://purl.org/dc/elements/1.1/",ev:"http://www.w3.org/2001/xml-events",
rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",svg:"http://www.w3.org/2000/svg",xlink:"http://www.w3.org/1999/xlink"},a=this;e=e||{},this.tag=o("svg"),this.tag.setAttribute("width",t),
this.tag.setAttribute("height",r),this.tag.setAttribute("xmlns","http://www.w3.org/2000/svg"),this.tag.setAttribute("viewbox","0 0 "+t+" "+r),this.childs=[]
;for(n in e)"ns"!==n&&"target"!==n&&this.tag.setAttribute(n,e[n]);if(this.target="target"in e?e.target:null,"ns"in e)for("*"===e.ns&&(e.ns=Object.keys(i)),n=0,s=e.ns.length;n<s;n++)!function(t){
t in i&&a.tag.setAttribute("xmlns:"+t,i[t])}(e.ns[n])}function e(){this.path="",this.previous=null}function n(t){return function(){var r=this.previous===t?" ":t
;return this.path+=[r].concat([[].slice.call(arguments,0).join(",")]).join(" ")+" ",this.previous=t,this}}function o(t,r){return r=r||"http://www.w3.org/2000/svg",document.createElementNS(r,t)}
function s(t){return t*Math.PI/180}function i(t,r){this.t=t,this.tag=o(t,r),this.childs=[],this.events={},this.transforms={rotate:"",move:"",scale:""}}r.import=function(t){
"string"==typeof t&&(t=r.toDocument(t));var e=new r(1,1);return e.tag=t.children[0],e},r.getqs=function(){var t,r,e=document.location.search.substr(1),n=e.split("&"),o={};for(t in n)r=n[t].split("="),
o[r[0]]=r.length>1?decodeURIComponent(r[1]):null;return o},r.toString=function(t){var r=document.createElement("div");return r.appendChild(t),r.innerHTML},r.toDocument=function(t){
return(new DOMParser).parseFromString(t,"image/svg+xml")},r.prototype.attrs=function(t){var r;if("string"==typeof t)return this.tag.getAttribute(t);for(r in t)this.tag.setAttribute(r,t[r]);return this
},r.prototype.styles=function(t){var r;for(r in t)this.tag.style[r]=t[r];return this},r.prototype.add=function(){var t=this;return[].slice.call(arguments,0).forEach(function(r){
r instanceof Array?r.forEach(function(r){t.childs.push(r),t.add(r)}):(t.childs.push(r),t.tag.appendChild(r.tag))}),this},r.prototype.render=function(t,r){var e=t||this.target;return e.innerHTML="",
e.appendChild(this.tag),r&&r.call(this),this},r.prototype.downloadAnchor=function(){var t=new XMLSerializer,r='<?xml version="1.0" standalone="no"?>\r\n'+t.serializeToString(this.tag),e=null
;r.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)||(r=r.replace(/^<svg/,'<svg xmlns="'+this.namespaces.svg+'"')),
r.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)||(r=r.replace(/^<svg/,'<svg xmlns:xlink="'+this.namespaces.xlink+'"')),e="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(r)
;var n=document.createElement("a");return n.download="download"+ +new Date+".svg",n.href=e,n.addEventListener("click",function(){this.download="download"+ +new Date+".svg"}),n.innerHTML="download",n},
r.prototype.circle=function(t,r,e){var n=new i("circle");return n.attrs({cx:t,cy:r,r:e}),n},r.prototype.desc=function(t){var r=new i("desc");return r.tag.innerHTML=t,r},
r.prototype.ellipse=function(t,r,e,n){var o=new i("ellipse");return o.attrs({cx:t,cy:r,rx:e,ry:n}),o},r.prototype.group=function(){return new i("g")},r.prototype.image=function(t,r,e,n,o){
var s=new i("image");return s.attrs({x:t,y:r,width:e,height:n}),s.tag.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",o),s},r.prototype.line=function(t,r,e,n){var o=new i("line")
;return o.attrs({x1:t,y1:r,x2:e,y2:n}),o},r.prototype.path=function(t){var r=new i("path");return r.attrs({d:t}),r},r.prototype.polygon=function(){
var t=new i("polygon"),r=[].slice.call(arguments,0),e=[],n=0,o=r.length;for(null;n<o;n+=2)e.push(r[n]+","+r[n+1]);return t.attrs({points:e.join(" ")}),t},r.prototype.polyline=function(){
var t=new i("polyline"),r=[].slice.call(arguments,0),e=[],n=0,o=r.length;for(null;n<o;n+=2)e.push(r[n]+","+r[n+1]);return t.attrs({points:e.join(" ")}),t},r.prototype.rect=function(t,r,e,n){n=n||e
;var o=new i("rect");return o.attrs({x:t,y:r,width:e,height:n}),o},r.prototype.text=function(t,r,e){var n=new i("text");return n.attrs({x:t,y:r}),n.tag.innerHTML=e,n},
r.prototype.textPath=function(t,r,e){var n=this,o=new i("text"),s=new i("defs"),a=n.path(r),p=new i("textPath");return a.attrs({id:t}),p.tag.innerHTML=e,
p.tag.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","#"+t),o.add(s),o.add(p),s.add(a),o},r.prototype.title=function(t){var r=new i("title");return r.tag.innerHTML=t,r},
r.prototype.script=function(t){var r=new i("script");return r.attrs({type:"application/ecmascript"}),t&&(r.tag.innerHTML="//<![CDATA[\n"+t+"\n]]>"),r},e.prototype.M=n("M"),e.prototype.m=n("m"),
e.prototype.Z=n("Z"),e.prototype.L=n("L"),e.prototype.l=n("l"),e.prototype.H=n("H"),e.prototype.h=n("h"),e.prototype.V=n("V"),e.prototype.v=n("v"),e.prototype.C=n("C"),e.prototype.c=n("c"),
e.prototype.Q=n("Q"),e.prototype.q=n("q"),e.prototype.S=n("S"),e.prototype.s=n("s"),e.prototype.T=n("T"),e.prototype.t=n("t"),e.prototype.A=n("A"),e.prototype.a=n("a"),e.prototype.R=n("R"),
r.prototype.pathBuild=function(){var t=new e;return t.toString=function(){var t=this.path+"";return this.path="",t},t}(),r.prototype.slice=function(t,r,e,n,o){var s=this,i=s.slicePath(t,r,e,n,o)
;return s.path(i)},r.prototype.slicePath=function(t,r,e,n,o){var i=this,a=0;if(n>o){var p=n;n=o,o=p}return a=o-n<=180?0:1,n=s(n),o=s(o),
i.pathBuild.M(t,r).L(t+Math.cos(n)*e,r-Math.sin(n)*e).A(e,e,0,a,0,t+Math.cos(o)*e,r-Math.sin(o)*e).L(t,r)};var a=0;r.prototype.filters=function(){function t(){return"leo_id_"+ ++a}function r(r){
var e,n,s=t(),a=new i("linearGradient");a.attrs({id:s,x1:"0%",y1:"0%",x2:"100%",y2:"0%"});for(e in r)n=new i("stop"),n.attrs({offset:e+"%",style:"stop-opacity:1;stop-color:"+r[e]}),a.add(n)
;return o.add(a),"url(#"+s+")"}function e(r){var e,n,s=t(),a=new i("radialGradient");a.attrs({id:s});for(e in r)n=new i("stop"),n.attrs({offset:e+"%",style:"stop-opacity:1;stop-color:"+r[e]}),a.add(n)
;return o.add(a),"url(#"+s+")"}var n=this,o=null;return this.defs?o=this.defs:(o=this.defs=new i("defs"),n.add(this.defs)),{lGrad:r,rGrad:e}},r.prototype.animate=function(){function t(t,r,e){
var n=0,o=0,s=0;setInterval(function(){o=r(o,n),s=e(s,n),n+=.1,t.move(o,s)},20)}function r(t,r,e){var n=0,o=0,s=0;setInterval(function(){o=r(o,n),s=e(s,n),n+=.1,t.move(o*Math.cos(s),o*Math.sin(s))
},20)}function e(t,r,e,n,o){var s=new i("animate");return s.attrs({attributeType:"XML",attributeName:t,from:r,to:e,dur:n,repeatCount:o}),s}return{pCart:t,pPolar:r,attr:e}}(),
i.prototype.attrs=r.prototype.attrs,i.prototype.styles=r.prototype.styles,i.prototype.add=r.prototype.add,i.prototype.on=function(t,r){
return t in this.events?this.events[t].push(r):this.events[t]=[r],this.tag.addEventListener(t,r),this},i.prototype.off=function(t,r){var e=this
;return t in this.events&&(void 0===r?(this.events[t].forEach(function(r){e.tag.removeEventListener(t,r)}),this.events[t]=null):e.tag.removeEventListener(t,r)),this},i.prototype.clone=function(){
var t,r=new i(this.t),e=this.tag.attributes,n=(this.tag.children,0);for(r.transforms.rotate=this.transforms.rotate,r.transforms.move=this.transforms.move,r.transforms.scale=this.transforms.scale,n=0,
t=e.length;n<t;n++)r.tag.setAttribute(e[n].name,e[n].value);for(n=0,t=this.childs.length;n<t;n++)r.add(this.childs[n].clone());return r},i.prototype.trans=function(){return this.attrs({
transform:this.transforms.rotate+" "+this.transforms.move+" "+this.transforms.scale}),this},i.prototype.rotate=function(t,r,e){return r=r||0,e=e||0,this.transforms.rotate=" rotate("+t+" "+r+" "+e+")",
this.trans()},i.prototype.scale=function(t,r){return t=t||0,r=r||0,this.transforms.scale=" scale("+t+", "+r+")",this.trans()},i.prototype.mirrorO=function(){
return this.transforms.scale=" scale(1, -1)",this.trans()},i.prototype.mirrorV=function(){return this.transforms.scale=" scale(-1, 1)",this.trans()},i.prototype.move=function(t,r){return t=t||0,
r=r||0,this.transforms.move=" translate("+t+" "+r+")",this.trans()},i.prototype.clear=function(){this.tag.parentNode.removeChild(this.tag)},i.prototype.replace=function(t,r){
t.tag.parentNode.replaceChild(r.tag,t.tag)};var p=function(t,e,n){return t&&e?new r(t,e,n):{ERROR:"width or height not given!"}};p.import=r.import,p.getqs=r.getqs,t.Leonardo=p}(window);