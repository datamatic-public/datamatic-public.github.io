Datamatic=function(t){this._userID=t},Datamatic.prototype={chart:function(t,e){return t&&-1==t.indexOf("/")?new Datamatic.Chart(this._userID+"/"+t,e):new Datamatic.Chart(t,e)}},Datamatic.Ajax={},Datamatic.Ajax.x=function(){if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;for(var t,e=["MSXML2.XmlHttp.5.0","MSXML2.XmlHttp.4.0","MSXML2.XmlHttp.3.0","MSXML2.XmlHttp.2.0","Microsoft.XmlHttp"],i=0;i<e.length;i++)try{t=new ActiveXObject(e[i]);break}catch(n){}return t},Datamatic.Ajax.send=function(t,e,i,n,a){var o=Datamatic.Ajax.x();o.open(i,t,a),o.onreadystatechange=function(){4==o.readyState&&e(o.responseText)},"POST"==i&&o.setRequestHeader("Content-type","application/x-www-form-urlencoded"),o.send(n)},Datamatic.Ajax.get=function(t,e,i,n){var a=[],o=new Datamatic.Promise;for(var s in e)a.push(encodeURIComponent(s)+"="+encodeURIComponent(e[s]));Datamatic.Ajax.send(t+"?"+a.join("&"),function(t){"function"==typeof i&&i.apply(this,arguments),o.resolve(t)},"GET",null,n)},Datamatic.Ajax.post=function(t,e,i,n){var a=[];for(var o in e)a.push(encodeURIComponent(o)+"="+encodeURIComponent(e[o]));Datamatic.Ajax.send(t,function(t){"function"==typeof i&&i.apply(this,arguments),promise.resolve(t)},"POST",a.join("&"),n)},Datamatic.Promise=function(){this._thens=[]},Datamatic.Promise.prototype={then:function(t,e){this._thens.push({resolve:t,reject:e})},resolve:function(t){this._complete("resolve",t)},reject:function(t){this._complete("reject",t)},_complete:function(t,e){this.then="resolve"===t?function(t){t&&t(e)}:function(t,i){i&&i(e)},this.resolve=this.reject=function(){throw new Error("Promise already completed.")};for(var i,n=0;i=this._thens[n++];)i[t]&&i[t](e);delete this._thens}},Datamatic.Chart=function(t,e){this._id=t,this._options=e};var isIE=function(){var t=navigator.userAgent.toLowerCase();return-1!=t.indexOf("msie")?parseInt(t.split("msie")[1]):!1};Datamatic.Chart.prototype={_postSendboxMessage:function(t){isIE()&&isIE()<10&&(t=JSON.stringify(t)),this._iframe.contentWindow.postMessage(t,"*")},render:function(t){var e=new Datamatic.Promise;return this._iframe=document.createElement("IFRAME"),this._iframe.src="http://sandbox.datamatic.io/echarts/2",this._iframe.setAttribute("frameborder","0"),this._iframe.onload=function(){if(!this._id)throw new Error("Chart ID has to be provided.");Datamatic.Ajax.get("http://public.datamatic.io/echarts/2/"+this._id+".json",{},function(t){var i=JSON.parse(t);this._renderSandbox(i.template,JSON.parse(decodeURIComponent(escape(window.atob(i.settings)))),JSON.parse(decodeURIComponent(escape(window.atob(i.data)))),decodeURIComponent(escape(window.atob(i.code)))),e.resolve()}.bind(this))}.bind(this),t.appendChild(this._iframe),e},_renderSandbox:function(t,e,i,n){"undefined"!=typeof this._options.width&&(e.width=this._options.width),"undefined"!=typeof this._options.height&&(e.height=this._options.height),this._iframe.setAttribute("width",e.width),this._iframe.setAttribute("height",e.height),this._iframe.setAttribute("scrolling","no"),e.top=0,e.left=0,this._settings=e,this._data=i,this._postSendboxMessage({action:"render",template:t,settings:e}),n&&this._postSendboxMessage({action:"setCode",code:n}),this._postSendboxMessage({action:"update",template:t,settings:e,data:i})},setData:function(t){t=t||[];var e=function(t){var i=t.children?t.children.map(e):[];return{size:t.value,name:t.name,children:i}},i={children:[{name:"start",size:10,children:t.map(e)}]};this._postSendboxMessage({action:"update",data:i}),this._data=i},setProperties:function(t){this._settings=t,this._postSendboxMessage({action:"update",settings:t})}};