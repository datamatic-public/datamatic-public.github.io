Function.prototype.bind=Function.prototype.bind||function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var e=Array.prototype.slice,n=e.call(arguments,1),r=this,o=function(){},a=function(){return r.apply(this instanceof o?this:t||window,n.concat(e.call(arguments)))};return o.prototype=this.prototype,a.prototype=new o,a},[].map||(Array.prototype.map=function(t,e){for(var n=this,r=n.length,o=[],a=0;r>a;)a in n&&(o[a]=t.call(e,n[a],a++,n));return o.length=r,o}),[].indexOf||(Array.prototype.indexOf=function(t,e){for(var n=this.length,r=-1,o=e>>>0;~(n-o);r=this[--n]===t?n:r);return r}),"function"!=typeof Array.prototype.forEach&&(Array.prototype.forEach=function(t,e){if("number"==typeof this.length&&"function"==typeof t&&"object"==typeof this)for(var n=0;n<this.length;n++){if(!(n in this))return;t.call(e||this,this[n],n,this)}}),Object.keys||(Object.keys=function(){var t=Object.prototype.hasOwnProperty,e=!{toString:null}.propertyIsEnumerable("toString"),n=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],r=n.length;return function(o){if("object"!=typeof o&&"function"!=typeof o||null===o)throw new TypeError("Object.keys called on non-object");var a=[];for(var i in o)t.call(o,i)&&a.push(i);if(e)for(var s=0;r>s;s++)t.call(o,n[s])&&a.push(n[s]);return a}}()),function(t,e,n){if((!t.addEventListener||!t.removeEventListener)&&t.attachEvent&&t.detachEvent){var r=function(t){return"function"==typeof t},o=function(t,e){var r=e[n];if(r)for(var o,a=r.length;a--;)if(o=r[a],o[0]===t)return o[1]},a=function(t,e,r){var a=e[n]||(e[n]=[]);return o(t,e)||(a[a.length]=[t,r],r)},i=function(t){var n=e[t];e[t]=function(t){return u(n(t))}},s=function(n,o){if(r(o)){var i=this;i.attachEvent("on"+n,a(i,o,function(n){n=n||t.event,n.preventDefault=n.preventDefault||function(){n.returnValue=!1},n.stopPropagation=n.stopPropagation||function(){n.cancelBubble=!0},n.target=n.target||n.srcElement||e.documentElement,n.currentTarget=n.currentTarget||i,n.timeStamp=n.timeStamp||(new Date).getTime(),o.call(i,n)}))}},c=function(t,e){if(r(e)){var n=this,a=o(n,e);a&&n.detachEvent("on"+t,a)}},u=function(t){if(t){var e=t.length;if(e)for(;e--;)t[e].addEventListener=s,t[e].removeEventListener=c;else t.addEventListener=s,t.removeEventListener=c;return t}};if(u([e,t]),"Element"in t){var f=t.Element;f.prototype.addEventListener=s,f.prototype.removeEventListener=c}else e.attachEvent("onreadystatechange",function(){u(e.all)}),i("getElementsByTagName"),i("getElementById"),i("createElement"),u(e.all)}}(window,document,"x-ms-event-listeners"),function(){function t(t){this.message=t}var e="undefined"!=typeof exports?exports:this,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";t.prototype=new Error,t.prototype.name="InvalidCharacterError",e.btoa||(e.btoa=function(e){for(var r,o,a=String(e),i=0,s=n,c="";a.charAt(0|i)||(s="=",i%1);c+=s.charAt(63&r>>8-i%1*8)){if(o=a.charCodeAt(i+=.75),o>255)throw new t("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");r=r<<8|o}return c}),e.atob||(e.atob=function(e){var r=String(e).replace(/=+$/,"");if(r.length%4==1)throw new t("'atob' failed: The string to be decoded is not correctly encoded.");for(var o,a,i=0,s=0,c="";a=r.charAt(s++);~a&&(o=i%4?64*o+a:a,i++%4)?c+=String.fromCharCode(255&o>>(-2*i&6)):0)a=n.indexOf(a);return c})}();var IEXMLHttpRequest=window.XDomainRequest&&function(){var t=new XDomainRequest;if(!t)return null;var e,n=function(t){t!==e.readyState&&(e.readyState=t,e.onreadystatechange&&e.onreadystatechange())};return t.onerror=function(){e.status=500,e.statusText="ERROR",n(4)},t.ontimeout=function(){e.status=408,e.statusText="TIMEOUT",n(4)},t.onprogress=function(){n(3)},t.onload=function(){e.status=200,e.statusText="OK",e.responseText=t.responseText,e.responseXML=new ActiveXObject("Microsoft.XMLDOM"),e.responseXML.async="false",e.responseXML.loadXML(t.responseText),n(4)},e={open:function(e,r){t.open(e,r),n(1)},setRequestHeader:function(){},send:function(e){t.send(e),n(2)},abort:function(){t.abort()},status:"",statusText:"",getResponseHeader:function(){},getAllResponseHeaders:function(){},responseText:"",responseXML:"",readyState:0,onreadystatechange:null}};