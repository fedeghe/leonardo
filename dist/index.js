'use strict';
/*
 __    _____ _____ _____ _____ _____ ____  _____ 
|  |  |   __|     |   | |  _  | __  |    \|     |
|  |__|   __|  |  | | | |     |    -|  |  |  |  |
|_____|_____|_____|_|___|__|__|__|__|____/|_____|
                                                  V. 1.1.0

Federico Ghedina <federico.ghedina@gmail.com> 2026
~33.3KB
*/
const Leonardo=function(t){function e(t,e){return e=e||v.svg,document.createElementNS(e,t)}function n(t){return t*Math.PI/180}function r(t){return 180*t/Math.PI}function o(t){
return t.defs||(t.defs=new s("defs"),t.append(t.defs)),t.defs}function i(t,e,n,r){var o=(r-90)*Math.PI/180;return{x:(t+n*Math.cos(o)).toFixed(2),y:(e+n*Math.sin(o)).toFixed(2)}}function a(t,n,r){
b.positiveInt(t),b.positiveInt(n);var o,i,a=this;r=r||{},this.width=t,this.height=n,this.tag=e("svg"),this.sas({width:t,height:n,xmlns:v.svg,viewbox:"0 0 "+t+" "+n}),this.childs=[]
;for(o in r)"ns"!==o&&"target"!==o&&this.tag.setAttribute(o,r[o]);if(this.target="target"in r?r.target:null,"ns"in r)for("*"===r.ns&&(r.ns=Object.keys(v)),o=0,i=r.ns.length;o<i;o++)!function(t){
t in v&&a.tag.setAttribute("xmlns:"+t,v[t])}(r.ns[o])}function s(t,n){this.t=t,this._id="i_"+ ++w,this.ns=n,this.tag=e(t,n),this.tag.Element=this,this.parent=null,this.childs=[],this.events={},
this.scaleX=1,this.scaleXsign=1,this.scaleY=1,this.scaleYsign=1,this.transforms={rotate:"",move:"",scale:"",skewX:"",skewY:""},this.transformsString=""}function u(t){return t.syncTransformString(),
t.tag.setAttribute("transform",t.transformsString),t}function p(t){return"scale("+t.scaleX*t.scaleXsign+", "+t.scaleY*t.scaleYsign+")"}function c(t){return"string"==typeof t||t instanceof String}
function l(t,e,n){function r(a){i=i||a;var u=parseFloat((a-i)/e,10);t&&(u=1-u);var p=t?u>0:u<1;n.tag.style.opacity=u,p&&!s?o=requestAnimationFrame(r):(n.tag.style.opacity=t?0:1,
cancelAnimationFrame(o))}var o,i=null,a=this,s=!1;return setTimeout(function(){s=!0},e),n=n||a,n.tag.style.opacity=t?1:0,o=requestAnimationFrame(r),this}function h(t,e){if(!t||!t.tagName)return!1
;if(/^[a-zA-Z]+$/.test(e))return t.tagName.toLowerCase()===e.toLowerCase();if(e.startsWith(".")){var n=e.slice(1),r=t.getAttribute("class");return r&&-1!==r.split(" ").indexOf(n)}
if(e.startsWith("#")){var o=e.slice(1);return t.getAttribute("id")===o}return!!t.matches&&t.matches(e)}function f(t){return function(){var e=this.prev===t?" ":t
;return this.path+=[e].concat([[].slice.call(arguments,0).join(",")]).join(""),this.prev=t,this}}function d(){this.path="",this.prev=null}function g(t){t=t||{},this.animations=[],this.isPlaying=!1,
this.currentIndex=0,this.startTime=null,this.autoPlay=t.autoPlay||!1,this.onComplete=t.onComplete||null}var y=function(){var t=0;return function(){return"leo_id_"+ ++t}}(),m="http://",v={
cc:m+"creativecommons.org/ns#",dc:m+"purl.org/dc/elements/1.1/",ev:m+"www.w3.org/2001/xml-events",rdf:m+"www.w3.org/1999/02/22-rdf-syntax-ns#",svg:m+"www.w3.org/2000/svg",
xlink:m+"www.w3.org/1999/xlink",math:m+"www.w3.org/1998/Math/MathML",xhtml:m+"www.w3.org/1999/xhtml",xml:m+"www.w3.org/XML/1998/namespace"};a.prototype.autoScale=function(){
return this.tag.setAttribute("preserveAspectRatio","xMidYMid meet"),this.tag.removeAttribute("width"),this.tag.removeAttribute("height"),this},a.prototype.setAttributes=a.prototype.sas=function(t){
for(var e in t)this.tag.setAttribute(e,t[e]);return this},a.prototype.getAttributes=function(){var t,e,n=[].slice.call(arguments,0),r={};for(t=0,e=n.length;t<e;t++)r[n[t]]=this.tag.getAttribute(n[t])
;return r},a.prototype.setStyles=function(t){var e;for(e in t)this.tag.style[e]=t[e];return this},a.prototype.getStyles=function(){var t,e,n=[].slice.call(arguments,0),r={};for(t=0,
e=n.length;t<e;t++)r[n[t]]=this.tag.style[n[t]];return r},a.prototype.append=function(){var t=this;return[].slice.call(arguments,0).forEach(function(e){e instanceof Array?e.forEach(function(e){
t.append(e)}):(t.childs.push(e),e.parent=t,t.tag.appendChild(e.tag))}),this},a.prototype.render=function(t){var e=t&&"target"in t?t.target:this.target;if(!e)throw x.no_target;return e.innerHTML="",
t&&t.fade&&(this.tag.style.opacity=0),e.appendChild(this.tag),t&&t.cb&&t.cb.call(this),t&&t.fade&&this.fadeIn(parseInt(t.fade,10)),this},a.prototype.remove=function(){var t=[].slice.call(arguments,0)
;return 0===t.length&&t.push(this),t.forEach(function(t){t.tag.parentNode.removeChild(t.tag),t.parent&&(t.parent.childs=t.parent.childs.filter(function(e){return e._id!==t._id}))}),this},
a.prototype.addDefs=function(){var t=[].slice.call(arguments,0);return o(this).append(t),this};var w=0;s.prototype.sas=a.prototype.sas,s.prototype.setAttributes=a.prototype.setAttributes,
s.prototype.getAttributes=a.prototype.getAttributes,s.prototype.setStyles=a.prototype.setStyles,s.prototype.getStyles=a.prototype.getStyles,s.prototype.append=a.prototype.append,
s.prototype.remove=a.prototype.remove,s.prototype.on=function(t,e){return t in this.events?this.events[t].push(e):this.events[t]=[e],this.tag.addEventListener(t,e),this},s.prototype.off=function(t,e){
var n=this;return t in this.events&&(void 0===e?(this.events[t].forEach(function(e){n.tag.removeEventListener(t,e)}),this.events[t]=null):this.tag.removeEventListener(t,e)),this},
s.prototype.once=function(t,e){var n=this;return this.on(t,function r(o){n.off(t,r),e(o)}),this},s.prototype.trigger=function(t){var e=this.tag;e.dispatchEvent(new Event(t,{target:e}))},
s.prototype.click=function(t,e){var n=this.tag;n.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:t,clientY:e})),n.dispatchEvent(new MouseEvent("click",{bubbles:!0,clientX:t,clientY:e}))},
s.prototype.clone=function(){var t,e=new s(this.t),n=this.tag.attributes,r=0;for(e.transforms.rotate=this.transforms.rotate,e.transforms.move=this.transforms.move,
e.transforms.scale=this.transforms.scale,e.transforms.skewX=this.transforms.skewX,e.transforms.skewY=this.transforms.skewY,r=0,t=n.length;r<t;r++)e.tag.setAttribute(n[r].name,n[r].value);for(r=0,
t=this.childs.length;r<t;r++)e.append(this.childs[r].clone());return 0==t&&(e.tag.innerHTML=this.tag.innerHTML),e},s.prototype.use=function(){var t=this.tag.attributes.id,e=new s("use")
;if(!t)throw new Error("You can use use only on tags having an id attribute");return e.tag.setAttribute("href","#"+t.value),e},s.prototype.syncTransformString=function(){
return this.transformsString=[this.transforms.rotate,this.transforms.move,this.transforms.scale,this.transforms.skewX,this.transforms.skewY].filter(function(t){return""!==t}).join(" "),
this.transformsString},s.prototype.rotate=function(t,e,n){return e=e||0,n=n||0,this.transforms.rotate="rotate("+t+" "+e+" "+n+")",u(this)},s.prototype.scale=function(t,e){return this.scaleX=t||0,
this.scaleY=e||t||0,this.transforms.scale=p(this),u(this)},s.prototype.skewX=function(t){return this.skewX=t||0,this.transforms.skewX="skewX("+this.skewX+")",u(this)},s.prototype.skewY=function(t){
return this.skewY=t||0,this.transforms.skewY="skewY("+this.skewY+")",u(this)},s.prototype.mirrorH=function(){return this.scaleYsign=-this.scaleYsign,this.transforms.scale=p(this),u(this)},
s.prototype.mirrorV=function(){return this.scaleXsign=-this.scaleXsign,this.transforms.scale=p(this),u(this)},s.prototype.move=function(t,e){return t=t||0,e=e||0,
this.transforms.move="translate("+t+" "+e+")",u(this)},s.prototype.untrans=function(){return this.transforms={rotate:"",move:"",scale:"",skewX:"",skewY:""},u(this)},s.prototype.bringToTop=function(){
this.bringTo(1/0)},s.prototype.bringToBottom=function(){this.bringTo(-1/0)},s.prototype.timeout=function(t,e){var n=t.bind(this);return setTimeout(n,e),this},s.prototype.bringTo=function(t){
var e=this.tag.ownerSVGElement;switch(t){case 1/0:e.removeChild(this.tag),e.appendChild(this.tag);break;case-1/0:e.removeChild(this.tag),e.insertBefore(this.tag,e.firstChild);break;default:
var n=this.tag;if(t>=0){for(;t++>0&&n.nextSibling;)n=n.nextSibling;e.removeChild(this.tag),e.insertBefore(this.tag,n.nextSibling)}else{for(;t--<0&&n.previousSibling;)n=n.previousSibling
;e.removeChild(this.tag),e.insertBefore(this.tag,n)}}},s.prototype.clear=function(){this.tag.innerHTML="",this.childs=[],this.transforms={rotate:"",move:"",scale:""}},
s.prototype.replace=function(t,e){t.tag.parentNode.replaceChild(e.tag,t.tag),t.parent.childs=t.parent.childs.map(function(n){return n._id==t._id?e:n})},s.prototype.infoUrl=function(t){
var e=this.tag.tagName,n="https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/"+e;return t&&window.open(n,"_blank"),n};var x={no_target:new Error("Target not set"),
validation_failed:function(t){return new Error("Validation failed for "+t)},factory_invalid_params:new Error("Invalid parameters for factory function"),
dom_node_expected:new Error("Dom node expected"),undefined:new Error("undefined not expected"),null:new Error("null not expected"),array_expected:new Error("array expected"),
even_numbers_expected:new Error("even number of integers expected")};a.validators={int:function(t){if(isNaN(t))return!1;var e=parseFloat(t);return!isNaN(parseFloat(t))&&isFinite(t)&&e===t},
objShape:function(t,e){if("object"!=typeof t||"object"!=typeof e)return!1;for(var n in e){var r=!1,o=n;if("?"===n.slice(-1)&&(r=!0,o=o.slice(0,-1)),
(!r||r&&t.hasOwnProperty(o))&&typeof t[o]!==e[o])return!1}return!0},array:function(t){return Array.isArray(t)}};var b={int:function(t){if(!a.validators.int(t))throw x.validation_failed("int");return!0
},intp:function(t){var e=parseInt(t.replace(/(\%)$/,""),10);if(!a.validators.int(e))throw x.validation_failed("intp");return!0},positive:function(t){if(t<=0)throw x.validation_failed("pos");return!0},
positiveInt:function(t){var e=a.validators.int(t),n=t>0;if(!e||!n)throw x.validation_failed("posInt");return!0},objShape:function(t,e){
if(!a.validators.objShape(t,e))throw x.validation_failed("objShape");return!0},array:function(t){if(!a.validators.array(t))throw x.array_expected;return!0},evenNumbers:function(t){
var e=t.length,n=e%2==0,r=t.every(function(t){return b.int(t)});if(!n||!r)throw x.even_numbers_expected;return!0}},E=function(t,e,n){return b.positiveInt(t),b.positiveInt(e),new a(t,e,n)}
;E.import=a.import=a.prototype.import=function(t){"string"==typeof t&&(t=a.toDocument(t));var e=new a(1,1);return e.tag=t,e},E.getqs=a.getqs=a.prototype.getqs=function(){
var t,e,n=window.location.search.substring(1),r=n.split("&"),o={};for(t in r)e=r[t].split("="),o[e[0]]=e.length>1?decodeURIComponent(e[1]):null;return o},
E.toString=a.toString=a.prototype.toString=function(t){var e=document.createElement("div");return e.appendChild(t),e.innerHTML},E.toDocument=a.toDocument=a.prototype.toDocument=function(t){
return(new DOMParser).parseFromString(t,"image/svg+xml").children[0]},E.randomColor=a.randomColor=a.prototype.randomColor=function(t){
for(var e=t?6:3,n=t?16777215:4095,r=(~~(Math.random()*n)).toString(16);r.length<e;)r="0"+r;return r},E.getScaler=a.getScaler=a.prototype.getScaler=function(t,e,n,r){return e=void 0!==e?~~e:100,
n=void 0!==n?~~n:1,r=void 0!==r?~~r:1,function(o){return parseFloat((o*n*t/e).toFixed(r),10)}},E.img2base64png=a.img2base64png=a.prototype.img2base64png=function(t,e){var n=function(t){
return t.replace("data:","").replace(/^.+,/,"")};fetch(t).then(function(t){return t.blob()}).then(function(t){var r=new FileReader;r.onloadend=function(){var t=n(r.result)
;e("data:image/png;base64,"+t)},r.readAsDataURL(t)})},E.uniqueID=a.uniqueID=a.prototype.uniqueID=y,E.deg2rad=a.deg2rad=a.prototype.deg2rad=n,E.rad2deg=a.rad2deg=a.prototype.rad2deg=r,
a.prototype.fadeIn=function(t,e){return l.apply(this,[!1,t,e]),this},a.prototype.fadeOut=function(t,e){return l.apply(this,[!0,t,e]),this},a.prototype.svgDownloadAnchor=function(t){t=t||{}
;var e=t.txt||"download",n=t.name||"download",r=document.createElement("a");return r.download=n+".svg",r.href=this.dataEncoded(),r.innerHTML=e,r.style.display="block",r},
a.prototype.pngDownloadAnchor=function(t){t=t||{};var e=t.name||"download",n=t.txt||"download",r=new Image,o=document.createElement("a"),i=document.createElement("canvas"),a=i.getContext("2d")
;return o.href="javascript:;",o.innerHTML=n,r.src=this.dataEncoded(),o.download=e+".png",o.style.display="block",r.onload=function(){i.width=r.width,i.height=r.height,a.drawImage(r,0,0),
o.href=i.toDataURL("image/png")},o},a.prototype.toImageTag=function(t){t=t||{};var e=document.createElement("img"),n=t.title||"",r=t.alt||"";return e.setAttribute("title",n),e.setAttribute("alt",r),
e.src=this.dataEncoded(),e},a.prototype.positionInspector=function(t){function e(){F.clear(),F.append(P)}if(t=t||{},
!this.tag.parentNode)throw new Error('"positionInspector" is meant to be invoked ONLY after render')
;var n=this,r=this.tag,o=t.svgCb||function(){},i=t.tpl||"%({%x} {%y})  rel-%({r%x} {r%y})  px({x} {y}) rel-px({rx} {ry})",a=t.cb||function(){},s=t.trace||!1,u=n.group(),p=t.overrideStylePath||{},c=document.createElement("div"),l=document.createElement("ul"),h=document.createElement("span"),f=[],d=0,g=r.getBoundingClientRect(),y=g.left,m=g.top,v=this.width,w=this.height,x=function(t,e){
return parseFloat(t.toFixed(e||2),10)},b=i,E={x:0,y:0},A={left:0,top:0},T={x:document.documentElement.scrollLeft,y:document.documentElement.scrollTop},M={x:0,y:0
},k={},S=[[]],C=[!1],L=0,P=[],_=0,B=function(){A.left=document.documentElement.scrollLeft,A.top=document.documentElement.scrollTop},F=n.group(),I=function(){if(a(S),s){
if("g"!==u.tag.tagName||!("_id"in u))throw new Error("positionInspector requires a Leo group as third parameter when passed");u.clear(),S.forEach(function(t,e){
u.append(n.bezierThroughPoints(t.map(function(t){return[t.x,t.y]}),Object.assign({stroke:"black","stroke-width":5,fill:"none"},p),o,C[e]))})}};return s&&n.append(u),h.innerText="📑",
h.style.cursor="pointer",h.addEventListener("click",function(t){navigator.clipboard.writeText(f.join(" "))&&alert("copied to the clipboard")}),this.append(F),
c.style.fontFamily=l.style.fontFamily="verdana",l.style.listStyleType="decimal",l.style.fontSize="0.8em",l.style.height="80px",l.style.maxWidth="400px",l.style.border="1px solid black",
l.style.overflow="scroll",r.parentNode.appendChild(c),r.parentNode.appendChild(l),r.parentNode.appendChild(h),r.addEventListener("mousemove",function(t){
var e=t.clientX+A.left-T.x,n=t.clientY+A.top-T.y;M.x=e-y,M.y=n-m,b=i;var r=100*M.x/v,o=100*M.y/w,a={"%x":x(r),"%y":x(o),"r%x":x(function(t){return 100*t/v}(~~M.x-E.x)),"r%y":x(function(t){
return 100*t/w}(~~M.y-E.y)),x:~~M.x,y:~~M.y,rx:~~M.x-E.x,ry:~~M.y-E.y};for(var s in a)b=b.replace("{"+s+"}",a[s]);k=Object.assign({},a),c.innerHTML=b}),r.addEventListener("click",function(){
var t=document.createElement("li"),r=n.circle(1+~~M.x,1+~~M.y,2);A.left=document.documentElement.scrollLeft,A.top=document.documentElement.scrollTop,r.sas({stroke:"black",fill:"white",
"stroke-width":1,"stroke-dasharray":"3,1"}),r.on("mouseover",function(){t.style.fontWeight="bold",r.sas({fill:"red",r:4})}),r.on("mouseleave",function(){t.style.fontWeight="normal",r.sas({
fill:"white",r:2})}),E={x:~~M.x,y:~~M.y},t.innerHTML=b,f[d++]=b,t.addEventListener("mouseover",function(){t.style.fontWeight="bold",r.sas({fill:"red",r:4})}),t.addEventListener("mouseout",function(){
t.style.fontWeight="normal",r.sas({fill:"white",r:2})}),l.appendChild(t),S[L].push(k),I(),P[_++]=r,e(),l.scrollTop=Number.MAX_SAFE_INTEGER}),window.addEventListener("keydown",function(t){
if(t.key.match(/N|E/)&&t.shiftKey){var n="E"===t.key;n&&(C[L]=!0),L++,C[L]=!1,S.push([]),f[d++]="null /* === curve separator == */",n&&I()}"Z"===t.key&&t.shiftKey&&(S[L]=S[L].slice(0,-1),
f=f.slice(0,-1),d--,P=P.slice(0,-1),_--,I(),e())}),window.addEventListener("scroll",B),this},a.prototype.dataEncoded=function(){
var t=new XMLSerializer,e='<?xml version="1.0" standalone="no"?>\r\n'+t.serializeToString(this.tag)
;return e.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)||(e=e.replace(/^<svg/,'<svg xmlns="'+v.svg+'"')),
e.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)||(e=e.replace(/^<svg/,'<svg xmlns:xlink="'+v.xlink+'"')),"data:image/svg+xml;charset=utf-8,"+encodeURIComponent(e)},
a.prototype.positionCruncher=function(t,e,n,r){function o(t,e){return t[s](u(e[0]),p(e[1]))}var i=this,s="l",u=a.getScaler(t),p=a.getScaler(e);return function(t){if(t=t||[],t.length){
var e=t.slice(1).reduce(o,i.pathBuild.M(u(t[0][0]),p(t[0][1])));return r&&e.Z(),i.path(e).sas(n)}}},a.prototype.bezierThroughPoints=function(t,e,n,r){if(n=n||function(){},!t||t.length<2)return[]
;var o,i=this,a=function(t){return parseFloat(t.toFixed(2),10)},s=function(t){var e=t.length-1,n=[]
;if(1===e)return n.push([t[0],[(2*t[0][0]+t[1][0])/3,(2*t[0][1]+t[1][1])/3],[(t[0][0]+2*t[1][0])/3,(t[0][1]+2*t[1][1])/3],t[1]]),n;for(o=0;o<e;o++){
var r=t[0===o?o:o-1],i=t[o],a=t[o+1],s=t[o+2<t.length?o+2:o+1],u=[i[0]+(a[0]-r[0])/6,i[1]+(a[1]-r[1])/6],p=[a[0]-(s[0]-i[0])/6,a[1]-(s[1]-i[1])/6];n.push([i,u,p,a])}return n
}(t),u="M"+a(s[0][0][0])+","+a(s[0][0][1]);return s.forEach(function(t){u+=" C"+a(t[1][0])+","+a(t[1][1])+" "+a(t[2][0])+","+a(t[2][1])+" "+a(t[3][0])+","+a(t[3][1])}),r&&(u+=" Z"),n(i.path(u).tag),
i.path(u).sas(e)},E.a=a.a=a.prototype.a=function(t){var e=new s("a");return e.sas(t),e},E.desc=a.desc=a.prototype.desc=function(t){var e=new s("desc");return e.tag.textContent=t,e},
E.circle=a.circle=a.prototype.circle=function(t,e,n){var r=new s("circle");return r.sas({cx:t,cy:e,r:n}),r},E.ellipse=a.ellipse=a.prototype.ellipse=function(t,e,n,r){var o=new s("ellipse")
;return o.sas({cx:t,cy:e,rx:n,ry:r}),o},E.group=a.group=a.prototype.group=function(t){var e=new s("g");return t&&e.append([].slice.call(arguments,0)),e},
E.image=a.image=a.prototype.image=function(t,e,n,r,o){var i=new s("image");return i.sas({x:t,y:e,width:n,height:r}),i.tag.setAttributeNS(v.xlink,"xlink:href",o),
i.tag.setAttribute("transform-origin","center"),i},E.line=a.line=a.prototype.line=function(t,e,n,r){var o=new s("line");return o.sas({x1:t,y1:e,x2:n,y2:r}),o},
E.path=a.path=a.prototype.path=function(t,e){var n=new s("path");return e=e||{},e.d=t,n.sas(e),n},E.polygon=a.polygon=a.prototype.polygon=function(){
var t=new s("polygon"),e=[].slice.call(arguments,0),n=[],r=0,o=e.length;for(b.evenNumbers(e),null;r<o;r+=2)n.push(e[r]+","+e[r+1]);return t.tag.setAttribute("points",n.join(" ")),t},
E.polyline=a.polyline=a.prototype.polyline=function(){var t=new s("polyline"),e=[].slice.call(arguments,0),n=[],r=0,o=e.length;for(null;r<o;r+=2)n.push(e[r]+","+e[r+1])
;return t.tag.setAttribute("points",n.join(" ")),t},E.rect=a.rect=a.prototype.rect=function(t,e,n,r){r=r||n;var o=new s("rect");return o.sas({x:t,y:e,width:n,height:r}),o},
E.text=a.text=a.prototype.text=function(t,e,n){var r=new s("text");return t=t||0,e=e||0,n=n||"",r.sas({x:t,y:e}),n&&(r.tag.textContent=n),r.updateText=function(t){r.tag.textContent=t},r},
E.title=a.title=a.prototype.title=function(t){var e=new s("title");return e.tag.textContent=t,e},E.script=a.script=a.prototype.script=function(t){var e=new s("script")
;return e.tag.setAttribute("type","application/ecmascript"),t&&(e.tag.innerHTML="//<![CDATA[\n"+t+"\n]]>"),e},E.foreignObject=a.foreignObject=a.prototype.foreignObject=function(t,e,n,r){
var o=new s("foreignObject");return o.sas({x:t,y:e,width:n,height:r}),o},E.symbol=a.symbol=a.prototype.symbol=function(t){var e=new s("symbol");return e.sas(Object.assign(t,{id:y()})),e},
E.use=a.use=a.prototype.use=function(t){var e=new s("use");return e.sas(t),e},E.Element=a.Element=a.prototype.Element=function(t,e){return new s(t,e)},a.prototype.delegate=function(t,e,n){
return this.tag.addEventListener(t,function(t){var r=t.target;h(r,e)&&n.call(r,t,r)}),this},s.prototype.delegate=function(t,e,n){var r=this;return this.tag.addEventListener(t,function(t){
for(var o=t.target;o&&o!==r.tag;){if(h(o,e)){n.call(o,t,o);break}o=o.parentNode}}),this},E.delegate=a.delegate=a.prototype.delegate,["m","z","l","h","v","c","q","s","t","a","r"].forEach(function(t,e){
e=t.toUpperCase(),d.prototype[t]=f(t),d.prototype[e]=f(e)}),d.prototype.reset=function(){this.path="",this.prev=null},d.prototype.maybe=function(t,e,n){if(t){var r=this.prev===e?" ":e
;this.path+=[r].concat([n.join(",")]).join(""),this.prev=e}return this},E.pathBuild=a.pathBuild=a.prototype.pathBuild=function(){var t=new d;return t.toString=function(){var t=this.path+""
;return this.reset(),t},t}(),a.prototype.slice=function(t,e,n,r,o){var i=this,a=i.slicePath(t,e,n,r,o);return i.path(a)},a.prototype.slicePath=function(t,e,r,o,i){var a=0;if(o>i){var s=o;o=i,i=s}
return a=i-o<=180?0:1,o=n(o),i=n(i),this.pathBuild.M(t,e).L(t+Math.cos(o)*r,e-Math.sin(o)*r).A(r,r,0,a,0,t+Math.cos(i)*r,e-Math.sin(i)*r).L(t,e)},a.prototype.arc=function(t,e,n,r,o,i,a){
return i=void 0===i?0:i,a=void 0===a?1:a,"M "+t+","+e+" A "+o+","+o+" 0 "+i+","+a+" "+n+","+r},a.prototype.smoothCurveThroughPoints=function(t,e){if(!t||t.length<2)return""
;if(2===t.length)return"M "+t[0][0]+","+t[0][1]+" L "+t[1][0]+","+t[1][1];for(var n="M "+t[0][0]+","+t[0][1],r=0;r<t.length-1;r++){var o=t[0===r?0:r-1],i=t[r],a=t[r+1],s=t[r+2]||a
;n+=" C "+(i[0]+(a[0]-o[0])/6)+","+(i[1]+(a[1]-o[1])/6)+" "+(a[0]-(s[0]-i[0])/6)+","+(a[1]-(s[1]-i[1])/6)+" "+a[0]+","+a[1]}return e&&(n+=" Z"),n},a.prototype.getTotalLength=function(t){
return t&&t.tag&&t.tag.getTotalLength?t.tag.getTotalLength():0},a.prototype.getPointAtLength=function(t,e){if(!t||!t.tag||!t.tag.getPointAtLength)return null;var n=t.tag.getPointAtLength(e);return{
x:n.x,y:n.y}},E.arc=a.arc=a.prototype.arc,E.smoothCurveThroughPoints=a.smoothCurveThroughPoints=a.prototype.smoothCurveThroughPoints,E.getTotalLength=a.getTotalLength=a.prototype.getTotalLength,
E.getPointAtLength=a.getPointAtLength=a.prototype.getPointAtLength;var A=function(t){return function(e){var n=new s("stop"),r={offset:e.perc+"%","stop-color":e.color};"style"in e&&(r.style=e.style),
n.sas(r),t.append(n)}},T=function(t){var e=100/(t.length-1);return t.map(function(t,n){return{perc:n*e,color:t}})};return a.prototype.linearGradient=function(t,e){e=e||{}
;var n=c(t[0])?T(t):t,r=o(this),i=y(),a=new s("linearGradient"),u={id:i,x1:e.x1||"0%",y1:e.y1||"0%",x2:e.x2||"100%",y2:e.y2||"0%",spreadMethod:e.spreadMethod||"pad"},p=A(a);return a.sas(u),
n.forEach(p),r.append(a),"url(#"+i+")"},a.prototype.radialGradient=function(t,e){e=e||{};var n=c(t[0])?T(t):t,r=o(this),i=y(),a=new s("radialGradient"),u=A(a);return a.sas({id:i,fx:e.fx||"50%",
fy:e.fy||"50%",fr:e.fr||"0%",cx:e.cx||"50%",cy:e.cy||"50%",r:e.r||"50%",spreadMethod:e.spreadMethod||"pad"}),n.forEach(u),r.append(a),"url(#"+i+")"},a.prototype.filter=function(){
var t=[].slice.call(arguments,0);o(this)
;var e=y(),n=new s("filter"),r=["feGaussianBlur","feDropShadow","feMorphology","feDisplacementMap","feBlend","feColorMatrix","feConvolveMatrix","feComponentTransfer","feSpecularLighting","feDiffuseLighting","feFlood","feTurbulence","feImage","feTile","feOffset","feComposite","feMerge"]
;n.tag.setAttribute("id",e);for(var i,a=0,u=t.length,p=!1;a<u;a++,p=!1)i=t[a],r.includes(i.type)&&(p=new s(i.type),p.sas(i.attrs)),p&&n.append(p);return this.defs.append(n),"url(#"+e+")"},
a.prototype.mask=function(t){var e,n,r=[].slice.call(arguments,0),i=o(this),a=new s("mask");return t&&"string"==typeof t&&!t._id?(e=t,n=r.slice(1)):(e=y(),n=r),a.sas({id:e}),n.forEach(function(t){
t&&t._id&&a.append(t)}),i.append(a),"url(#"+e+")"},a.prototype.clipPath=function(t){var e,n,r=[].slice.call(arguments,0),i=o(this),a=new s("clipPath");return t&&"string"==typeof t&&!t._id?(e=t,
n=r.slice(1)):(e=y(),n=r),a.sas({id:e}),n.forEach(function(t){t&&t._id&&a.append(t)}),i.append(a),"url(#"+e+")"},E.mask=a.mask=a.prototype.mask,E.clipPath=a.clipPath=a.prototype.clipPath,
a.prototype.pattern=function(t,e,n,r){r=r||{};var i=o(this),a=new s("pattern"),u=r.id||y();return a.sas({id:u,width:t,height:e,x:r.x||0,y:r.y||0,patternUnits:r.patternUnits||"userSpaceOnUse"}),
r.patternTransform&&a.sas({patternTransform:r.patternTransform}),n instanceof Array?n.forEach(function(t){a.append(t)}):n&&a.append(n),i.append(a),"url(#"+u+")"},
E.pattern=a.pattern=a.prototype.pattern,s.prototype.draggable=function(t){function e(){var t=s.tag.getAttribute("transform");if(t){var e=t.match(/translate\(([^,]+),\s*([^)]+)\)/);if(e)return{
x:parseFloat(e[1])||0,y:parseFloat(e[2])||0}}var n=s.tag.getAttribute("cx"),r=s.tag.getAttribute("cy"),o=s.tag.getAttribute("x"),i=s.tag.getAttribute("y");return{x:parseFloat(n||o||0),
y:parseFloat(r||i||0)}}function n(t,e){if(!w)return{x:t,y:e};var n=w.createSVGPoint();n.x=t,n.y=e;var r=w.getScreenCTM();return r?n.matrixTransform(r.inverse()):{x:t,y:e}}function r(t,e){if(!v)return{
x:t,y:e};var n;if("parent"===v){var r=s.tag.parentNode;if(r&&r.getBBox){var o=r.getBBox();n=[o.x,o.y,o.width,o.height]}}else v instanceof Array&&4===v.length&&(n=v);if(n){
var i=s.tag.getBBox?s.tag.getBBox():{width:0,height:0};t=Math.max(n[0],Math.min(t,n[0]+n[2]-i.width)),e=Math.max(n[1],Math.min(e,n[1]+n[3]-i.height))}return{x:t,y:e}}function o(t){if(0===t.button){
u=!0;var r=e(),o=n(t.clientX,t.clientY);l=r.x,h=r.y,p=o.x,c=o.y,f=l,d=h,y.call(s,l,h),t.preventDefault()}}function i(t){if(u){var e=n(t.clientX,t.clientY),o=e.x-p,i=e.y-c;f=l+o,d=h+i;var a=r(f,d)
;f=a.x,d=a.y,s.move(f,d),g.call(s,o,i,f,d)}}function a(t){u&&(u=!1,m.call(s,f,d))}t=t||{}
;var s=this,u=!1,p=0,c=0,l=0,h=0,f=0,d=0,g=t.onDrag||function(){},y=t.onStart||function(){},m=t.onEnd||function(){},v=t.constrainTo,w=this.tag.ownerSVGElement
;return this.tag.addEventListener("mousedown",o),document.addEventListener("mousemove",i),document.addEventListener("mouseup",a),this.tag.addEventListener("touchstart",function(t){
1===t.touches.length&&o(t.touches[0])}),document.addEventListener("touchmove",function(t){1===t.touches.length&&i(t.touches[0])}),document.addEventListener("touchend",a),this},
a.prototype.batch=function(t){var e=this.append,n=this,r=[];this.append=function(){var t=[].slice.call(arguments,0);return r.push(t),n};try{t.call(this)}finally{if(this.append=e,r.length>0){
var o=document.createDocumentFragment();r.forEach(function(t){t.forEach(function(t){t instanceof s&&(n.childs.push(t),t.parent=n,o.appendChild(t.tag))})}),this.tag.appendChild(o)}}return this},
s.prototype.batchAppend=function(t){var e=this,n=document.createDocumentFragment();return t.forEach(function(t){t instanceof s&&(e.childs.push(t),t.parent=e,n.appendChild(t.tag))}),
this.tag.appendChild(n),this},E.batch=a.batch=a.prototype.batch,a.prototype.setViewBox=function(t,e,n,r){return this.tag.setAttribute("viewBox",[t,e,n,r].join(" ")),this},
a.prototype.preserveAspectRatio=function(t){return this.tag.setAttribute("preserveAspectRatio",t),this},a.prototype.screenToSVG=function(t,e){if(!this.tag.createSVGPoint)return{x:t,y:e}
;var n=this.tag.createSVGPoint();n.x=t,n.y=e;var r=this.tag.getScreenCTM();if(!r)return{x:t,y:e};var o=n.matrixTransform(r.inverse());return{x:o.x,y:o.y}},a.prototype.svgToScreen=function(t,e){
var n=this.tag.createSVGPoint();n.x=t,n.y=e;var r=n.matrixTransform(this.tag.getScreenCTM());return{x:r.x,y:r.y}},a.prototype.getViewBox=function(){var t=this.tag.getAttribute("viewBox")
;if(!t)return null;var e=t.split(/\s+/).map(parseFloat);return{x:e[0],y:e[1],width:e[2],height:e[3]}},E.setViewBox=a.setViewBox=a.prototype.setViewBox,
E.preserveAspectRatio=a.preserveAspectRatio=a.prototype.preserveAspectRatio,E.screenToSVG=a.screenToSVG=a.prototype.screenToSVG,E.svgToScreen=a.svgToScreen=a.prototype.svgToScreen,
E.getViewBox=a.getViewBox=a.prototype.getViewBox,a.prototype.debug=function(t){t=t||{}
;var e=this,n=!1!==t.showBoundingBoxes,r=!1!==t.showCenterPoints,o=t.showGrid||!1,i=t.gridSize||50,a=!1!==t.showCoordinates,s=this.group();if(s.sas({class:"leo-debug-layer"}),o){
for(var u=this.group(),p=this.width,c=this.height,l=0;l<=p;l+=i){var h=this.line(l,0,l,c).setAttributes({stroke:"#ddd","stroke-width":.5});u.append(h)}for(var f=0;f<=c;f+=i){
var h=this.line(0,f,p,f).setAttributes({stroke:"#ddd","stroke-width":.5});u.append(h)}s.append(u)}if(a){var d=this.text(10,20,"x: 0, y: 0").setAttributes({fill:"#666","font-family":"monospace",
"font-size":"12px",class:"leo-debug-coords"});s.append(d),this.tag.addEventListener("mousemove",function(t){var n=e.tag.createSVGPoint();n.x=t.clientX,n.y=t.clientY
;var r=n.matrixTransform(e.tag.getScreenCTM().inverse());d.updateText("x: "+Math.round(r.x)+", y: "+Math.round(r.y))})}return this._debugGroup=s,this.append(s),(n||r)&&(this._debugElements=[],
this._enableElementDebug(n,r)),this},a.prototype._enableElementDebug=function(t,e){var n=this,r=this.append;this.append=function(){for(var o=r.apply(this,arguments),i=0;i<arguments.length;i++){
var a=arguments[i];a instanceof s&&a.tag.getBBox&&a._addDebugInfo(n,t,e)}return o}},s.prototype._addDebugInfo=function(t,e,n){if(this.tag.getBBox){var r=this.tag.getBBox(),o=[];if(e){
var i=t.rect(r.x,r.y,r.width,r.height).setAttributes({fill:"none",stroke:"rgba(255, 0, 0, 0.5)","stroke-width":1,"stroke-dasharray":"4,2",class:"leo-debug-bbox"});o.push(i)}if(n){
var a=r.x+r.width/2,s=r.y+r.height/2,u=t.circle(a,s,3).setAttributes({fill:"rgba(0, 255, 0, 0.5)",stroke:"none",class:"leo-debug-center"});o.push(u)}t._debugGroup&&o.length>0&&o.forEach(function(e){
t._debugGroup.append(e)}),this._debugElements=o}},a.prototype.undebug=function(){return this._debugGroup&&(this._debugGroup.remove(),this._debugGroup=null),this},E.debug=a.debug=a.prototype.debug,
E.undebug=a.undebug=a.prototype.undebug,a.prototype.animate=function(){function t(t,e,n,r,o){o=o||{},r=r||i;var a=o.trace||!1,u=0,p=0,c=0,l=0,h=null,f=function(o){if(u+=r,(!l||o-l>=r)&&(p=e(p,u),
c=n(c,u),t.move(p,c),l=o,a)){var i=new s("circle"),d=t.getAttributes("cx","cy");i.sas(Object.assign({cx:~~d.cx+p,cy:~~d.cy+c,r:5,stroke:"gray",fill:"transparent"},a.style||{})),t.parent.append(i)}
h=requestAnimationFrame(f)};return h=requestAnimationFrame(f),function(){cancelAnimationFrame(h)}}function e(t,e,n,r,o){o=o||{},r=r||i;var a=o.trace||!1,u=0,p=0,c=0,l=0,h=null,f=function(o){if(u+=r,
(!l||o-l>=r)&&(p=e(p,u),c=n(c,u),t.move(p*Math.cos(c),p*Math.sin(c)),l=o,a)){var i=new s("circle"),d=t.getAttributes("cx","cy");i.sas(Object.assign({cx:~~d.cx+p*Math.cos(c),cy:~~d.cy+p*Math.sin(c),
r:5,stroke:"gray",fill:"transparent"},a.style||{})),t.parent.append(i)}h=requestAnimationFrame(f)};return h=requestAnimationFrame(f),function(){cancelAnimationFrame(h)}}function n(t){
var e=new s("animate"),n={attributeName:t.attributeName,dur:t.dur,begin:t.begin||"0s",repeatCount:t.repeatCount};return"from"in t&&(n.from=t.from),"to"in t&&(n.to=t.to),
"values"in t&&(n.values=t.values),"type"in t&&(n.type=t.type),e.sas(n),e}function r(t,e,n){n=n||{};var r=new s("animateMotion"),o={begin:n.begin||"0s",dur:n.dur||"1s",end:n.end||null,min:n.min||0,
max:n.max||null,restart:n.restart||"always",repeatCount:n.repeatCount||"indefinite",repeatDur:n.repeatDur||null,path:e};return r.sas(o),t.append(r),t}function o(t,e){function n(a){u||(u=a)
;var l=a-u,h=Math.min(l/s,1),f=r(h),d=o+(i-o)*f;t.tag.setAttribute(p,d),h<1?c=requestAnimationFrame(n):e.onComplete&&e.onComplete()}
var r=e.easing||a.linear,o=e.from||0,i=e.to||1,s=1e3*parseFloat(e.dur)||1e3,u=null,p=e.attributeName,c=null;return c=requestAnimationFrame(n),function(){cancelAnimationFrame(c)}}var i=1e3/60/1e3,a={
linear:function(t){return t},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return 1-(1-t)*(1-t)},easeInOutQuad:function(t){return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2},
easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return 1-Math.pow(1-t,3)},easeInOutCubic:function(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2},easeInQuart:function(t){return t*t*t*t},
easeOutQuart:function(t){return 1-Math.pow(1-t,4)},easeInOutQuart:function(t){return t<.5?8*t*t*t*t:1-Math.pow(-2*t+2,4)/2},spring:function(t){var e=2*Math.PI/3
;return 0===t?0:1===t?1:Math.pow(2,-10*t)*Math.sin((10*t-.75)*e)+1},bounce:function(t){var e=7.5625,n=2.75
;return t<1/n?e*t*t:t<2/n?e*(t-=1.5/n)*t+.75:t<2.5/n?e*(t-=2.25/n)*t+.9375:e*(t-=2.625/n)*t+.984375}};return{cartesian:t,polar:e,motionPath:r,attr:n,Easing:a,withEasing:o}}(),
g.prototype.add=function(t,e){return this.animations.push({animation:t,offset:e||0,started:!1,stopper:null}),this},g.prototype.play=function(){return this.isPlaying?this:(this.isPlaying=!0,
this.startTime=Date.now(),this.tick(),this)},g.prototype.pause=function(){return this.isPlaying=!1,this.animations.forEach(function(t){t.stopper&&t.stopper()}),this},g.prototype.stop=function(){
return this.pause(),this.currentIndex=0,this.animations.forEach(function(t){t.started=!1,t.stopper=null}),this},g.prototype.tick=function(){if(this.isPlaying){
var t=this,e=(Date.now()-this.startTime)/1e3,n=!0;this.animations.forEach(function(t,r){!t.started&&e>=t.offset&&(t.started=!0,t.stopper=t.animation()),t.started||(n=!1)}),
n&&this.onComplete?this.onComplete():this.isPlaying&&requestAnimationFrame(function(){t.tick()})}},a.prototype.timeline=function(t){return new g(t)},E.timeline=a.timeline=a.prototype.timeline,
E.textBox=a.prototype.textBox=function(t,e,n,r,o,i){var a=new s("svg"),u=new s("rect"),p=new s("text"),c={x:0,y:0,width:e,height:n,"stroke-width":0,stroke:"transparent",fill:"transparent"}
;return u.sas(Object.assign({},c,o)),a.sas({width:e,height:n,viewBox:[0,0,e,n].join(" ")}),p.sas({x:"50%",y:"50%","dominant-baseline":"middle","text-anchor":"middle"}),i&&p.rotate(i,e/2,n/2),
r&&p.sas(r),p.tag.innerHTML=t,a.append(u,p),a.updateText=function(t){p.tag.innerHTML=t},a},E.textPath=a.prototype.textPath=function(t,e){
var n=new s("text"),r=new s("defs"),o=a.path(t),i=new s("textPath"),u=y();return o.tag.setAttribute("id",u),i.tag.textContent=e,i.tag.setAttributeNS(v.xlink,"xlink:href","#"+u),r.append(o),
n.append(r,i),n.updateText=function(t){i.tag.textContent=t},n},E.arcSectionPath=a.prototype.arcSectionPath=function(t,e,n,r,o,s,u,p){u=void 0===u?1:u,p=void 0===p?0:p
;var c=i(t,e,r,o),l=i(t,e,r,s),h=i(t,e,n,s),f=i(t,e,n,o),d=Math.abs(s-o)>180?1:0
;return a.pathBuild.M(f.x,f.y).L(c.x,c.y).A(r,r,0,d,u,l.x,l.y).L(h.x,h.y).maybe(n>0,"A",[n,n,0,d,p,f.x,f.y]).Z().toString()},E.validate=b,E.ERRORS=x,E}()
;"object"==typeof exports&&(module.exports=Leonardo);