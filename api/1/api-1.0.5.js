Datamatic=function(t){this._userID=t},Datamatic.prototype={chart:function(t,e){return t&&-1==t.indexOf("/")?new Datamatic.Chart(this._userID+"/"+t,e):new Datamatic.Chart(t,e)}},Datamatic.utils={},Datamatic.utils.delayTask=function(t,e){var n=null,i=function(){n=null,t()},a=function(t){null==n&&(n=setTimeout(i,t||e))};return a.delay=function(t){n&&clearTimeout(n),n=setTimeout(i,t||e)},a.schedule=a,a.call=function(){this.cancel(),t()},a.cancel=function(){n&&clearTimeout(n),n=null},a.isPending=function(){return n},a},Datamatic.ajax={},Datamatic.ajax.x=function(){if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;for(var t,e=["MSXML2.XmlHttp.5.0","MSXML2.XmlHttp.4.0","MSXML2.XmlHttp.3.0","MSXML2.XmlHttp.2.0","Microsoft.XmlHttp"],n=0;n<e.length;n++)try{t=new ActiveXObject(e[n]);break}catch(i){}return t},Datamatic.ajax.send=function(t,e,n){return new Datamatic.Promise(function(i){var a=Datamatic.ajax.x();a.open(e,t,!1),a.onreadystatechange=function(){4==a.readyState&&i(a.responseText)},"POST"==e&&a.setRequestHeader("Content-type","application/x-www-form-urlencoded"),a.send(n)}.bind(this))},Datamatic.ajax.get=function(t){var e=[];for(var n in data)e.push(encodeURIComponent(n)+"="+encodeURIComponent(data[n]));var i="";return e.length&&(i=-1==t.indexOf("?")?"?"+e.join("&"):e.join("&")),Datamatic.ajax.send(t+i,"GET")},Datamatic.ajax.json=function(t,e){return Datamatic.ajax.get(t,e).then(function(t){return JSON.parse(t)})},Datamatic.ajax.post=function(t,e){var n=[];for(var i in e)n.push(encodeURIComponent(i)+"="+encodeURIComponent(e[i]));return Datamatic.ajax.send(t,"POST",n.join("&"))},function(t){function e(t,e){return function(){t.apply(e,arguments)}}function n(t){var e=this;return null===this._state?void this._deferreds.push(t):void c(function(){var n=e._state?t.onFulfilled:t.onRejected;if(null===n)return void(e._state?t.resolve:t.reject)(e._value);var i;try{i=n(e._value)}catch(a){return void t.reject(a)}t.resolve(i)})}function i(t){try{if(t===this)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if("function"==typeof n)return void s(e(n,t),e(i,this),e(a,this))}this._state=!0,this._value=t,o.call(this)}catch(r){a.call(this,r)}}function a(t){this._state=!1,this._value=t,o.call(this)}function o(){for(var t=0,e=this._deferreds.length;e>t;t++)n.call(this,this._deferreds[t]);this._deferreds=null}function r(t,e,n,i){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.resolve=n,this.reject=i}function s(t,e,n){var i=!1;try{t(function(t){i||(i=!0,e(t))},function(t){i||(i=!0,n(t))})}catch(a){if(i)return;i=!0,n(a)}}var c="function"==typeof setImmediate&&setImmediate||function(t){setTimeout(t,1)},u=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)};Datamatic.Promise=function(t){if("object"!=typeof this)throw new TypeError("Datamatic.Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=null,this._value=null,this._deferreds=[],s(t,e(i,this),e(a,this))},Datamatic.Promise.prototype["catch"]=function(t){return this.then(null,t)},Datamatic.Promise.prototype.then=function(t,e){var i=this;return new Datamatic.Promise(function(a,o){n.call(i,new r(t,e,a,o))})},Datamatic.Promise.all=function(){var t=Array.prototype.slice.call(1===arguments.length&&u(arguments[0])?arguments[0]:arguments);return new Datamatic.Promise(function(e,n){function i(o,r){try{if(r&&("object"==typeof r||"function"==typeof r)){var s=r.then;if("function"==typeof s)return void s.call(r,function(t){i(o,t)},n)}t[o]=r,0===--a&&e(t)}catch(c){n(c)}}if(0===t.length)return e([]);for(var a=t.length,o=0;o<t.length;o++)i(o,t[o])})},Datamatic.Promise.resolve=function(t){return t&&"object"==typeof t&&t.constructor===Datamatic.Promise?t:new Datamatic.Promise(function(e){e(t)})},Datamatic.Promise.reject=function(t){return new Datamatic.Promise(function(e,n){n(t)})},Datamatic.Promise.race=function(t){return new Datamatic.Promise(function(e,n){for(var i=0,a=t.length;a>i;i++)t[i].then(e,n)})},Datamatic.Promise._setImmediateFn=function(t){c=t},"undefined"!=typeof module&&module.exports?module.exports=Datamatic.Promise:t.Datamatic.Promise||(t.Datamatic.Promise=Datamatic.Promise)}(this),Datamatic.Chart=function(t,e){this._id=t,this._options=e};var isIE=function(){var t=navigator.userAgent.toLowerCase();return-1!=t.indexOf("msie")?parseInt(t.split("msie")[1]):!1};Datamatic.Chart.prototype={_postSendboxMessage:function(t){isIE()&&isIE()<10&&(t=JSON.stringify(t)),this._iframe.contentWindow.postMessage(t,"*")},render:function(t){this._iframe=document.createElement("IFRAME"),this._iframe.src="http://sandbox.datamatic.io/echarts/2",this._iframe.setAttribute("frameborder","0"),t.appendChild(this._iframe);var e=new Datamatic.Promise(function(t,e){this._iframe.onload=function(){this._id?Datamatic.ajax.get("http://public.datamatic.io/echarts/2/"+this._id+".json",{},function(e){var n=JSON.parse(e);this._renderSandbox(n.template,JSON.parse(decodeURIComponent(escape(window.atob(n.settings)))),JSON.parse(decodeURIComponent(escape(window.atob(n.data)))),decodeURIComponent(escape(window.atob(n.code)))),t()}.bind(this)):e("Chart ID has to be provided.")}.bind(this)}.bind(this));return e},_renderSandbox:function(t,e,n,i){"undefined"!=typeof this._options.width&&(e.width=this._options.width),"undefined"!=typeof this._options.height&&(e.height=this._options.height),this._iframe.setAttribute("width",e.width),this._iframe.setAttribute("height",e.height),this._iframe.setAttribute("scrolling","no"),e.top=0,e.left=0,this._settings=e,this._data=n,this._postSendboxMessage({action:"render",template:t,settings:e}),i&&this._postSendboxMessage({action:"setCode",code:i}),this._postSendboxMessage({action:"update",template:t,settings:e,data:n})},setData:function(t){t=t||[];var e=function(t){var n=t.children?t.children.map(e):[];return{size:t.value,name:t.name,children:n}},n={children:[{name:"start",size:10,children:t.map(e)}]};this._postSendboxMessage({action:"update",data:n}),this._data=n},setProperties:function(t){this._settings=t,this._postSendboxMessage({action:"update",settings:t})}};