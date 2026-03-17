'use strict';
/*
 __    _____ _____ _____ _____ _____ ____  _____ 
|  |  |   __|     |   | |  _  | __  |    \|     |
|  |__|   __|  |  | | | |     |    -|  |  |  |  |
|_____|_____|_____|_|___|__|__|__|__|____/|_____|
                                                  V. 1.1.0

Federico Ghedina <federico.ghedina@gmail.com> 2026
~22.86KB
*/
const Leonardo=function(t){function e(t,e){return e=e||y.svg,document.createElementNS(e,t)}function n(t){return t*Math.PI/180}function r(t){return 180*t/Math.PI}function o(t){
return t.defs||(t.defs=new s("defs"),t.append(t.defs)),t.defs}function i(t,e,n,r){var o=(r-90)*Math.PI/180;return{x:(t+n*Math.cos(o)).toFixed(2),y:(e+n*Math.sin(o)).toFixed(2)}}function a(t,n,r){
w.positiveInt(t),w.positiveInt(n);var o,i,a=this;r=r||{},this.width=t,this.height=n,this.tag=e("svg"),this.sas({width:t,height:n,xmlns:y.svg,viewbox:"0 0 "+t+" "+n}),this.childs=[]
;for(o in r)"ns"!==o&&"target"!==o&&this.tag.setAttribute(o,r[o]);if(this.target="target"in r?r.target:null,"ns"in r)for("*"===r.ns&&(r.ns=Object.keys(y)),o=0,i=r.ns.length;o<i;o++)!function(t){
t in y&&a.tag.setAttribute("xmlns:"+t,y[t])}(r.ns[o])}function s(t,n){this.t=t,this._id="i_"+ ++v,this.ns=n,this.tag=e(t,n),this.tag.Element=this,this.parent=null,this.childs=[],this.events={},
this.scaleX=1,this.scaleXsign=1,this.scaleY=1,this.scaleYsign=1,this.transforms={rotate:"",move:"",scale:"",skewX:"",skewY:""},this.transformsString=""}function p(t){return t.syncTransformString(),
t.tag.setAttribute("transform",t.transformsString),t}function c(t){return"scale("+t.scaleX*t.scaleXsign+", "+t.scaleY*t.scaleYsign+")"}function u(t){return"string"==typeof t||t instanceof String}
function l(t,e,n){function r(a){i=i||a;var p=parseFloat((a-i)/e,10);t&&(p=1-p);var c=t?p>0:p<1;n.tag.style.opacity=p,c&&!s?o=requestAnimationFrame(r):(n.tag.style.opacity=t?0:1,
cancelAnimationFrame(o))}var o,i=null,a=this,s=!1;return setTimeout(function(){s=!0},e),n=n||a,n.tag.style.opacity=t?1:0,o=requestAnimationFrame(r),this}function f(t){return function(){
var e=this.prev===t?" ":t;return this.path+=[e].concat([[].slice.call(arguments,0).join(",")]).join(""),this.prev=t,this}}function h(){this.path="",this.prev=null}var d=function(){var t=0
;return function(){return"leo_id_"+ ++t}}(),g="http://",y={cc:g+"creativecommons.org/ns#",dc:g+"purl.org/dc/elements/1.1/",ev:g+"www.w3.org/2001/xml-events",
rdf:g+"www.w3.org/1999/02/22-rdf-syntax-ns#",svg:g+"www.w3.org/2000/svg",xlink:g+"www.w3.org/1999/xlink",math:g+"www.w3.org/1998/Math/MathML",xhtml:g+"www.w3.org/1999/xhtml",
xml:g+"www.w3.org/XML/1998/namespace"};a.prototype.autoScale=function(){return this.tag.setAttribute("preserveAspectRatio","xMidYMid meet"),this.tag.removeAttribute("width"),
this.tag.removeAttribute("height"),this},a.prototype.setAttributes=a.prototype.sas=function(t){for(var e in t)this.tag.setAttribute(e,t[e]);return this},a.prototype.getAttributes=function(){
var t,e,n=[].slice.call(arguments,0),r={};for(t=0,e=n.length;t<e;t++)r[n[t]]=this.tag.getAttribute(n[t]);return r},a.prototype.setStyles=function(t){var e;for(e in t)this.tag.style[e]=t[e];return this
},a.prototype.getStyles=function(){var t,e,n=[].slice.call(arguments,0),r={};for(t=0,e=n.length;t<e;t++)r[n[t]]=this.tag.style[n[t]];return r},a.prototype.append=function(){var t=this
;return[].slice.call(arguments,0).forEach(function(e){e instanceof Array?e.forEach(function(e){t.append(e)}):(t.childs.push(e),e.parent=t,t.tag.appendChild(e.tag))}),this},
a.prototype.render=function(t){var e=t&&"target"in t?t.target:this.target;if(!e)throw m.no_target;return e.innerHTML="",t&&t.fade&&(this.tag.style.opacity=0),e.appendChild(this.tag),
t&&t.cb&&t.cb.call(this),t&&t.fade&&this.fadeIn(parseInt(t.fade,10)),this},a.prototype.remove=function(){var t=[].slice.call(arguments,0);return 0===t.length&&t.push(this),t.forEach(function(t){
t.tag.parentNode.removeChild(t.tag),t.parent&&(t.parent.childs=t.parent.childs.filter(function(e){return e._id!==t._id}))}),this},a.prototype.addDefs=function(){var t=[].slice.call(arguments,0)
;return o(this).append(t),this};var v=0;s.prototype.sas=a.prototype.sas,s.prototype.setAttributes=a.prototype.setAttributes,s.prototype.getAttributes=a.prototype.getAttributes,
s.prototype.setStyles=a.prototype.setStyles,s.prototype.getStyles=a.prototype.getStyles,s.prototype.append=a.prototype.append,s.prototype.remove=a.prototype.remove,s.prototype.on=function(t,e){
return t in this.events?this.events[t].push(e):this.events[t]=[e],this.tag.addEventListener(t,e),this},s.prototype.off=function(t,e){var n=this
;return t in this.events&&(void 0===e?(this.events[t].forEach(function(e){n.tag.removeEventListener(t,e)}),this.events[t]=null):this.tag.removeEventListener(t,e)),this},s.prototype.once=function(t,e){
var n=this;return this.on(t,function r(o){n.off(t,r),e(o)}),this},s.prototype.trigger=function(t){var e=this.tag;e.dispatchEvent(new Event(t,{target:e}))},s.prototype.click=function(t,e){
var n=this.tag;n.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:t,clientY:e})),n.dispatchEvent(new MouseEvent("click",{bubbles:!0,clientX:t,clientY:e}))},s.prototype.clone=function(){
var t,e=new s(this.t),n=this.tag.attributes,r=0;for(e.transforms.rotate=this.transforms.rotate,e.transforms.move=this.transforms.move,e.transforms.scale=this.transforms.scale,
e.transforms.skewX=this.transforms.skewX,e.transforms.skewY=this.transforms.skewY,r=0,t=n.length;r<t;r++)e.tag.setAttribute(n[r].name,n[r].value);for(r=0,
t=this.childs.length;r<t;r++)e.append(this.childs[r].clone());return 0==t&&(e.tag.innerHTML=this.tag.innerHTML),e},s.prototype.use=function(){var t=this.tag.attributes.id,e=new s("use")
;if(!t)throw new Error("You can use use only on tags having an id attribute");return e.tag.setAttribute("href","#"+t.value),e},s.prototype.syncTransformString=function(){
return this.transformsString=[this.transforms.rotate,this.transforms.move,this.transforms.scale,this.transforms.skewX,this.transforms.skewY].filter(function(t){return""!==t}).join(" "),
this.transformsString},s.prototype.rotate=function(t,e,n){return e=e||0,n=n||0,this.transforms.rotate="rotate("+t+" "+e+" "+n+")",p(this)},s.prototype.scale=function(t,e){return this.scaleX=t||0,
this.scaleY=e||t||0,this.transforms.scale=c(this),p(this)},s.prototype.skewX=function(t){return this.skewX=t||0,this.transforms.skewX="skewX("+this.skewX+")",p(this)},s.prototype.skewY=function(t){
return this.skewY=t||0,this.transforms.skewY="skewY("+this.skewY+")",p(this)},s.prototype.mirrorH=function(){return this.scaleYsign=-this.scaleYsign,this.transforms.scale=c(this),p(this)},
s.prototype.mirrorV=function(){return this.scaleXsign=-this.scaleXsign,this.transforms.scale=c(this),p(this)},s.prototype.move=function(t,e){return t=t||0,e=e||0,
this.transforms.move="translate("+t+" "+e+")",p(this)},s.prototype.untrans=function(){return this.transforms={rotate:"",move:"",scale:"",skewX:"",skewY:""},p(this)},s.prototype.bringToTop=function(){
this.bringTo(1/0)},s.prototype.bringToBottom=function(){this.bringTo(-1/0)},s.prototype.timeout=function(t,e){var n=t.bind(this);return setTimeout(n,e),this},s.prototype.bringTo=function(t){
var e=this.tag.ownerSVGElement;switch(t){case 1/0:e.removeChild(this.tag),e.appendChild(this.tag);break;case-1/0:e.removeChild(this.tag),e.insertBefore(this.tag,e.firstChild);break;default:
var n=this.tag;if(t>=0){for(;t++>0&&n.nextSibling;)n=n.nextSibling;e.removeChild(this.tag),e.insertBefore(this.tag,n.nextSibling)}else{for(;t--<0&&n.previousSibling;)n=n.previousSibling
;e.removeChild(this.tag),e.insertBefore(this.tag,n)}}},s.prototype.clear=function(){this.tag.innerHTML="",this.childs=[],this.transforms={rotate:"",move:"",scale:""}},
s.prototype.replace=function(t,e){t.tag.parentNode.replaceChild(e.tag,t.tag),t.parent.childs=t.parent.childs.map(function(n){return n._id==t._id?e:n})},s.prototype.infoUrl=function(t){
var e=this.tag.tagName,n="https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/"+e;return t&&window.open(n,"_blank"),n};var m={no_target:new Error("Target not set"),
validation_failed:function(t){return new Error("Validation failed for "+t)},factory_invalid_params:new Error("Invalid parameters for factory function"),
dom_node_expected:new Error("Dom node expected"),undefined:new Error("undefined not expected"),null:new Error("null not expected"),array_expected:new Error("array expected"),
even_numbers_expected:new Error("even number of integers expected")};a.validators={int:function(t){if(isNaN(t))return!1;var e=parseFloat(t);return!isNaN(parseFloat(t))&&isFinite(t)&&e===t},
objShape:function(t,e){if("object"!=typeof t||"object"!=typeof e)return!1;for(var n in e){var r=!1,o=n;if("?"===n.slice(-1)&&(r=!0,o=o.slice(0,-1)),
(!r||r&&t.hasOwnProperty(o))&&typeof t[o]!==e[o])return!1}return!0},array:function(t){return Array.isArray(t)}};var w={int:function(t){if(!a.validators.int(t))throw m.validation_failed("int");return!0
},intp:function(t){var e=parseInt(t.replace(/(\%)$/,""),10);if(!a.validators.int(e))throw m.validation_failed("intp");return!0},positive:function(t){if(t<=0)throw m.validation_failed("pos");return!0},
positiveInt:function(t){var e=a.validators.int(t),n=t>0;if(!e||!n)throw m.validation_failed("posInt");return!0},objShape:function(t,e){
if(!a.validators.objShape(t,e))throw m.validation_failed("objShape");return!0},array:function(t){if(!a.validators.array(t))throw m.array_expected;return!0},evenNumbers:function(t){
var e=t.length,n=e%2==0,r=t.every(function(t){return w.int(t)});if(!n||!r)throw m.even_numbers_expected;return!0}},x=function(t,e,n){return w.positiveInt(t),w.positiveInt(e),new a(t,e,n)}
;x.import=a.import=a.prototype.import=function(t){"string"==typeof t&&(t=a.toDocument(t));var e=new a(1,1);return e.tag=t,e},x.getqs=a.getqs=a.prototype.getqs=function(){
var t,e,n=window.location.search.substring(1),r=n.split("&"),o={};for(t in r)e=r[t].split("="),o[e[0]]=e.length>1?decodeURIComponent(e[1]):null;return o},
x.toString=a.toString=a.prototype.toString=function(t){var e=document.createElement("div");return e.appendChild(t),e.innerHTML},x.toDocument=a.toDocument=a.prototype.toDocument=function(t){
return(new DOMParser).parseFromString(t,"image/svg+xml").children[0]},x.randomColor=a.randomColor=a.prototype.randomColor=function(t){
for(var e=t?6:3,n=t?16777215:4095,r=(~~(Math.random()*n)).toString(16);r.length<e;)r="0"+r;return r},x.getScaler=a.getScaler=a.prototype.getScaler=function(t,e,n,r){return e=void 0!==e?~~e:100,
n=void 0!==n?~~n:1,r=void 0!==r?~~r:1,function(o){return parseFloat((o*n*t/e).toFixed(r),10)}},x.img2base64png=a.img2base64png=a.prototype.img2base64png=function(t,e){var n=function(t){
return t.replace("data:","").replace(/^.+,/,"")};fetch(t).then(function(t){return t.blob()}).then(function(t){var r=new FileReader;r.onloadend=function(){var t=n(r.result)
;e("data:image/png;base64,"+t)},r.readAsDataURL(t)})},x.uniqueID=a.uniqueID=a.prototype.uniqueID=d,x.deg2rad=a.deg2rad=a.prototype.deg2rad=n,x.rad2deg=a.rad2deg=a.prototype.rad2deg=r,
a.prototype.fadeIn=function(t,e){return l.apply(this,[!1,t,e]),this},a.prototype.fadeOut=function(t,e){return l.apply(this,[!0,t,e]),this},a.prototype.downloadAnchor=function(t,e){
var n=document.createElement("a");return n.download=(e||"download")+".svg",n.href=this.dataEncoded(),n.innerHTML=t||"download",n.style.display="block",n},a.prototype.toImageTag=function(t,e){
var n=document.createElement("img");return t=t||"",e=e||"",n.setAttribute("title",t),n.setAttribute("alt",e),n.src=this.dataEncoded(),n},a.prototype.positionInspector=function(t){function e(){
I.clear(),I.append(_)}if(t=t||{},!this.tag.parentNode)throw new Error('"positionInspector" is meant to be invoked ONLY after render')
;var n=this,r=this.tag,o=t.svgCb||function(){},i=t.tpl||"%({%x} {%y})  rel-%({r%x} {r%y})  px({x} {y}) rel-px({rx} {ry})",a=t.cb||function(){},s=t.trace||!1,p=n.group(),c=t.overrideStylePath||{},u=document.createElement("div"),l=document.createElement("ul"),f=document.createElement("span"),h=[],d=0,g=r.getBoundingClientRect(),y=g.left,v=g.top,m=this.width,w=this.height,x=function(t,e){
return parseFloat(t.toFixed(e||2),10)},b=i,E={x:0,y:0},k={left:0,top:0},S={x:document.documentElement.scrollLeft,y:document.documentElement.scrollTop},M={x:0,y:0
},A={},T=[[]],C=[!1],L=0,_=[],j=0,F=function(){k.left=document.documentElement.scrollLeft,k.top=document.documentElement.scrollTop},I=n.group(),N=function(){if(a(T),s){
if("g"!==p.tag.tagName||!("_id"in p))throw new Error("positionInspector requires a Leo group as third parameter when passed");p.clear(),T.forEach(function(t,e){
p.append(n.bezierThroughPoints(t.map(function(t){return[t.x,t.y]}),Object.assign({stroke:"black","stroke-width":5,fill:"none"},c),o,C[e]))})}};return s&&n.append(p),f.innerText="📑",
f.style.cursor="pointer",f.addEventListener("click",function(t){navigator.clipboard.writeText(h.join(" "))&&alert("copied to the clipboard")}),this.append(I),
u.style.fontFamily=l.style.fontFamily="verdana",l.style.listStyleType="decimal",l.style.fontSize="0.8em",l.style.height="80px",l.style.maxWidth="400px",l.style.border="1px solid black",
l.style.overflow="scroll",r.addEventListener("mousemove",function(t){var e=t.clientX+k.left-S.x,n=t.clientY+k.top-S.y;M.x=e-y,M.y=n-v,b=i;var r=100*M.x/m,o=100*M.y/w,a={"%x":x(r),"%y":x(o),
"r%x":x(function(t){return 100*t/m}(~~M.x-E.x)),"r%y":x(function(t){return 100*t/w}(~~M.y-E.y)),x:~~M.x,y:~~M.y,rx:~~M.x-E.x,ry:~~M.y-E.y};for(var s in a)b=b.replace("{"+s+"}",a[s])
;A=Object.assign({},a),u.innerHTML=b}),r.parentNode.appendChild(u),r.parentNode.appendChild(l),r.parentNode.appendChild(f),r.addEventListener("click",function(){
var t=document.createElement("li"),r=n.circle(1+~~M.x,1+~~M.y,2);k.left=document.documentElement.scrollLeft,k.top=document.documentElement.scrollTop,r.sas({stroke:"black",fill:"white",
"stroke-width":1,"stroke-dasharray":"3,1"}),r.on("mouseover",function(){t.style.fontWeight="bold",r.sas({fill:"red",r:4})}),r.on("mouseleave",function(){t.style.fontWeight="normal",r.sas({
fill:"white",r:2})}),E={x:~~M.x,y:~~M.y},t.innerHTML=b,h[d++]=b,t.addEventListener("mouseover",function(){t.style.fontWeight="bold",r.sas({fill:"red",r:4})}),t.addEventListener("mouseout",function(){
t.style.fontWeight="normal",r.sas({fill:"white",r:2})}),l.appendChild(t),T[L].push(A),N(),_[j++]=r,e(),l.scrollTop=Number.MAX_SAFE_INTEGER}),window.addEventListener("keydown",function(t){
if(t.key.match(/N|E/)&&t.shiftKey){var n="E"===t.key;n&&(C[L]=!0),L++,C[L]=!1,T.push([]),h[d++]="null /* === curve separator == */",n&&N()}"Z"===t.key&&t.shiftKey&&(T[L]=T[L].slice(0,-1),
h=h.slice(0,-1),d--,_=_.slice(0,-1),j--,N(),e())}),window.addEventListener("scroll",F),this},a.prototype.dataEncoded=function(){
var t=new XMLSerializer,e='<?xml version="1.0" standalone="no"?>\r\n'+t.serializeToString(this.tag)
;return e.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)||(e=e.replace(/^<svg/,'<svg xmlns="'+y.svg+'"')),
e.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)||(e=e.replace(/^<svg/,'<svg xmlns:xlink="'+y.xlink+'"')),"data:image/svg+xml;charset=utf-8,"+encodeURIComponent(e)},
a.prototype.positionCruncher=function(t,e,n,r){function o(t,e){return t[s](p(e[0]),c(e[1]))}var i=this,s="l",p=a.getScaler(t),c=a.getScaler(e);return function(t){if(t=t||[],t.length){
var e=t.slice(1).reduce(o,i.pathBuild.M(p(t[0][0]),c(t[0][1])));return r&&e.Z(),i.path(e).sas(n)}}},a.prototype.bezierThroughPoints=function(t,e,n,r){if(n=n||function(){},!t||t.length<2)return[]
;var o,i=this,a=function(t){return parseFloat(t.toFixed(2),10)},s=function(t){var e=t.length-1,n=[]
;if(1===e)return n.push([t[0],[(2*t[0][0]+t[1][0])/3,(2*t[0][1]+t[1][1])/3],[(t[0][0]+2*t[1][0])/3,(t[0][1]+2*t[1][1])/3],t[1]]),n;for(o=0;o<e;o++){
var r=t[0===o?o:o-1],i=t[o],a=t[o+1],s=t[o+2<t.length?o+2:o+1],p=[i[0]+(a[0]-r[0])/6,i[1]+(a[1]-r[1])/6],c=[a[0]-(s[0]-i[0])/6,a[1]-(s[1]-i[1])/6];n.push([i,p,c,a])}return n
}(t),p="M"+a(s[0][0][0])+","+a(s[0][0][1]);return s.forEach(function(t){p+=" C"+a(t[1][0])+","+a(t[1][1])+" "+a(t[2][0])+","+a(t[2][1])+" "+a(t[3][0])+","+a(t[3][1])}),r&&(p+=" Z"),n(i.path(p).tag),
i.path(p).sas(e)},x.a=a.a=a.prototype.a=function(t){var e=new s("a");return e.sas(t),e},x.desc=a.desc=a.prototype.desc=function(t){var e=new s("desc");return e.tag.textContent=t,e},
x.circle=a.circle=a.prototype.circle=function(t,e,n){var r=new s("circle");return r.sas({cx:t,cy:e,r:n}),r},x.ellipse=a.ellipse=a.prototype.ellipse=function(t,e,n,r){var o=new s("ellipse")
;return o.sas({cx:t,cy:e,rx:n,ry:r}),o},x.group=a.group=a.prototype.group=function(t){var e=new s("g");return t&&e.append([].slice.call(arguments,0)),e},
x.image=a.image=a.prototype.image=function(t,e,n,r,o){var i=new s("image");return i.sas({x:t,y:e,width:n,height:r}),i.tag.setAttributeNS(y.xlink,"xlink:href",o),
i.tag.setAttribute("transform-origin","center"),i},x.line=a.line=a.prototype.line=function(t,e,n,r){var o=new s("line");return o.sas({x1:t,y1:e,x2:n,y2:r}),o},
x.path=a.path=a.prototype.path=function(t,e){var n=new s("path");return e=e||{},e.d=t,n.sas(e),n},x.polygon=a.polygon=a.prototype.polygon=function(){
var t=new s("polygon"),e=[].slice.call(arguments,0),n=[],r=0,o=e.length;for(w.evenNumbers(e),null;r<o;r+=2)n.push(e[r]+","+e[r+1]);return t.tag.setAttribute("points",n.join(" ")),t},
x.polyline=a.polyline=a.prototype.polyline=function(){var t=new s("polyline"),e=[].slice.call(arguments,0),n=[],r=0,o=e.length;for(null;r<o;r+=2)n.push(e[r]+","+e[r+1])
;return t.tag.setAttribute("points",n.join(" ")),t},x.rect=a.rect=a.prototype.rect=function(t,e,n,r){r=r||n;var o=new s("rect");return o.sas({x:t,y:e,width:n,height:r}),o},
x.text=a.text=a.prototype.text=function(t,e,n){var r=new s("text");return t=t||0,e=e||0,n=n||"",r.sas({x:t,y:e}),n&&(r.tag.textContent=n),r.updateText=function(t){r.tag.textContent=t},r},
x.title=a.title=a.prototype.title=function(t){var e=new s("title");return e.tag.textContent=t,e},x.script=a.script=a.prototype.script=function(t){var e=new s("script")
;return e.tag.setAttribute("type","application/ecmascript"),t&&(e.tag.innerHTML="//<![CDATA[\n"+t+"\n]]>"),e},x.foreignObject=a.foreignObject=a.prototype.foreignObject=function(t,e,n,r){
var o=new s("foreignObject");return o.sas({x:t,y:e,width:n,height:r}),o},x.symbol=a.symbol=a.prototype.symbol=function(t){var e=new s("symbol");return e.sas(Object.assign(t,{id:d()})),e},
x.use=a.use=a.prototype.use=function(t){var e=new s("use");return e.sas(t),e},x.Element=a.Element=a.prototype.Element=function(t,e){return new s(t,e)},
["m","z","l","h","v","c","q","s","t","a","r"].forEach(function(t,e){e=t.toUpperCase(),h.prototype[t]=f(t),h.prototype[e]=f(e)}),h.prototype.reset=function(){this.path="",this.prev=null},
h.prototype.maybe=function(t,e,n){if(t){var r=this.prev===e?" ":e;this.path+=[r].concat([n.join(",")]).join(""),this.prev=e}return this},x.pathBuild=a.pathBuild=a.prototype.pathBuild=function(){
var t=new h;return t.toString=function(){var t=this.path+"";return this.reset(),t},t}(),a.prototype.slice=function(t,e,n,r,o){var i=this,a=i.slicePath(t,e,n,r,o);return i.path(a)},
a.prototype.slicePath=function(t,e,r,o,i){var a=0;if(o>i){var s=o;o=i,i=s}return a=i-o<=180?0:1,o=n(o),i=n(i),
this.pathBuild.M(t,e).L(t+Math.cos(o)*r,e-Math.sin(o)*r).A(r,r,0,a,0,t+Math.cos(i)*r,e-Math.sin(i)*r).L(t,e)};var b=function(t){return function(e){var n=new s("stop"),r={offset:e.perc+"%",
"stop-color":e.color};"style"in e&&(r.style=e.style),n.sas(r),t.append(n)}},E=function(t){var e=100/(t.length-1);return t.map(function(t,n){return{perc:n*e,color:t}})}
;return a.prototype.linearGradient=function(t,e){e=e||{};var n=u(t[0])?E(t):t,r=o(this),i=d(),a=new s("linearGradient"),p={id:i,x1:e.x1||"0%",y1:e.y1||"0%",x2:e.x2||"100%",y2:e.y2||"0%",
spreadMethod:e.spreadMethod||"pad"},c=b(a);return a.sas(p),n.forEach(c),r.append(a),"url(#"+i+")"},a.prototype.radialGradient=function(t,e){e=e||{}
;var n=u(t[0])?E(t):t,r=o(this),i=d(),a=new s("radialGradient"),p=b(a);return a.sas({id:i,fx:e.fx||"50%",fy:e.fy||"50%",fr:e.fr||"0%",cx:e.cx||"50%",cy:e.cy||"50%",r:e.r||"50%",
spreadMethod:e.spreadMethod||"pad"}),n.forEach(p),r.append(a),"url(#"+i+")"},a.prototype.filter=function(){var t=[].slice.call(arguments,0);o(this)
;var e=d(),n=new s("filter"),r=["feGaussianBlur","feDropShadow","feMorphology","feDisplacementMap","feBlend","feColorMatrix","feConvolveMatrix","feComponentTransfer","feSpecularLighting","feDiffuseLighting","feFlood","feTurbulence","feImage","feTile","feOffset","feComposite","feMerge"]
;n.tag.setAttribute("id",e);for(var i,a=0,p=t.length,c=!1;a<p;a++,c=!1)i=t[a],r.includes(i.type)&&(c=new s(i.type),c.sas(i.attrs)),c&&n.append(c);return this.defs.append(n),"url(#"+e+")"},
a.prototype.animate=function(){function t(t,e,n,r,i){i=i||{};var a=i.trace||!1;r=r||o;var p=0,c=0,u=0,l=0,f=null,h=function(o){if(p+=r,(!l||o-l>=r)&&(c=e(c,p),u=n(u,p),t.move(c,u),l=o,a)){
var i=new s("circle"),d=t.getAttributes("cx","cy");i.sas(Object.assign({cx:~~d.cx+c,cy:~~d.cy+u,r:5,stroke:"gray",fill:"transparent"},a.style||{})),t.parent.append(i)}f=requestAnimationFrame(h)}
;return f=requestAnimationFrame(h),function(){cancelAnimationFrame(f)}}function e(t,e,n,r,i){i=i||{};var a=i.trace||!1;r=r||o;var p=0,c=0,u=0,l=0,f=null,h=function(o){if(p+=r,(!l||o-l>=r)&&(c=e(c,p),
u=n(u,p),t.move(c*Math.cos(u),c*Math.sin(u)),l=o,a)){var i=new s("circle"),d=t.getAttributes("cx","cy");i.sas(Object.assign({cx:~~d.cx+c*Math.cos(u),cy:~~d.cy+c*Math.sin(u),r:5,stroke:"gray",
fill:"transparent"},a.style||{})),t.parent.append(i)}f=requestAnimationFrame(h)};return f=requestAnimationFrame(h),function(){cancelAnimationFrame(f)}}function n(t){var e=new s("animate"),n={
attributeName:t.attributeName,dur:t.dur,begin:t.begin||"0s",repeatCount:t.repeatCount};return"from"in t&&(n.from=t.from),"to"in t&&(n.to=t.to),"values"in t&&(n.values=t.values),
"type"in t&&(n.type=t.type),e.sas(n),e}function r(t,e,n){n=n||{};var r=new s("animateMotion"),o={begin:n.begin||"0s",dur:n.dur||"1s",end:n.end||null,min:n.min||0,max:n.max||null,
restart:n.restart||"always",repeatCount:n.repeatCount||"indefinite",repeatDur:n.repeatDur||null,path:e};return r.sas(o),t.append(r),t}var o=1e3/60/1e3;return{cartesian:t,polar:e,motionPath:r,attr:n}
}(),x.textBox=a.prototype.textBox=function(t,e,n,r,o,i){var a=new s("svg"),p=new s("rect"),c=new s("text"),u={x:0,y:0,width:e,height:n,"stroke-width":0,stroke:"transparent",fill:"transparent"}
;return p.sas(Object.assign({},u,o)),a.sas({width:e,height:n,viewBox:[0,0,e,n].join(" ")}),c.sas({x:"50%",y:"50%","dominant-baseline":"middle","text-anchor":"middle"}),i&&c.rotate(i,e/2,n/2),
r&&c.sas(r),c.tag.innerHTML=t,a.append(p,c),a.updateText=function(t){c.tag.innerHTML=t},a},x.textPath=a.prototype.textPath=function(t,e){
var n=new s("text"),r=new s("defs"),o=a.path(t),i=new s("textPath"),p=d();return o.tag.setAttribute("id",p),i.tag.textContent=e,i.tag.setAttributeNS(y.xlink,"xlink:href","#"+p),r.append(o),
n.append(r,i),n.updateText=function(t){i.tag.textContent=t},n},x.arcSectionPath=a.prototype.arcSectionPath=function(t,e,n,r,o,s,p,c){p=void 0===p?1:p,c=void 0===c?0:c
;var u=i(t,e,r,o),l=i(t,e,r,s),f=i(t,e,n,s),h=i(t,e,n,o),d=Math.abs(s-o)>180?1:0
;return a.pathBuild.M(h.x,h.y).L(u.x,u.y).A(r,r,0,d,p,l.x,l.y).L(f.x,f.y).maybe(n>0,"A",[n,n,0,d,c,h.x,h.y]).Z().toString()},x.validate=w,x.ERRORS=m,x}()
;"object"==typeof exports&&(module.exports=Leonardo);