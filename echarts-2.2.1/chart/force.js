define("echarts/chart/force",["require","./base","../data/Graph","../layout/Force","zrender/shape/Line","zrender/shape/BezierCurve","zrender/shape/Image","../util/shape/Icon","../config","../util/ecData","zrender/tool/util","zrender/config","zrender/tool/vector","../chart"],function(t){"use strict";function e(t,e,r,l,d){var c=this;n.call(this,t,e,r,l,d),this.__nodePositionMap={},this._graph=new a(!0),this._layout=new h,this._layout.onupdate=function(){c._step()},this._steps=1,this.ondragstart=function(){i.apply(c,arguments)},this.ondragend=function(){s.apply(c,arguments)},this.ondrop=function(){},this.shapeHandler.ondragstart=function(){c.isDragstart=!0},this.onmousemove=function(){o.apply(c,arguments)},this.refresh(l)}function i(t){if(this.isDragstart&&t.target){var e=t.target;e.fixed=!0,this.isDragstart=!1,this.zr.on(m.EVENT.MOUSEMOVE,this.onmousemove)}}function o(){this._layout.temperature=.8,this._step()}function s(t,e){if(this.isDragend&&t.target){var i=t.target;i.fixed=!1,e.dragIn=!0,e.needRefresh=!1,this.isDragend=!1,this.zr.un(m.EVENT.MOUSEMOVE,this.onmousemove)}}function r(t,e,i){var o=y.create();return o[0]=(Math.random()-.5)*i+t,o[1]=(Math.random()-.5)*i+e,o}var n=t("./base"),a=t("../data/Graph"),h=t("../layout/Force"),l=t("zrender/shape/Line"),d=t("zrender/shape/BezierCurve"),c=t("zrender/shape/Image"),p=t("../util/shape/Icon"),u=t("../config");u.force={zlevel:1,z:2,center:["50%","50%"],size:"100%",preventOverlap:!1,coolDown:.99,minRadius:10,maxRadius:20,ratioScaling:!1,large:!1,useWorker:!1,steps:1,scaling:1,gravity:1,symbol:"circle",symbolSize:0,linkSymbol:null,linkSymbolSize:[10,15],draggable:!0,clickable:!0,roam:!1,itemStyle:{normal:{label:{show:!1,position:"inside"},nodeStyle:{brushType:"both",borderColor:"#5182ab",borderWidth:1},linkStyle:{color:"#5182ab",width:1,type:"line"}},emphasis:{label:{show:!1},nodeStyle:{},linkStyle:{opacity:0}}}};var g=t("../util/ecData"),f=t("zrender/tool/util"),m=t("zrender/config"),y=t("zrender/tool/vector");return e.prototype={constructor:e,type:u.CHART_TYPE_FORCE,_init:function(){var t,e=this.component.legend,i=this.series;this.clear();for(var o=0,s=i.length;s>o;o++){var r=i[o];if(r.type===u.CHART_TYPE_FORCE){if(i[o]=this.reformOption(i[o]),t=i[o].name||"",this.selectedMap[t]=e?e.isSelected(t):!0,!this.selectedMap[t])continue;this.buildMark(o),this._initSerie(r,o);break}}this.animationEffect()},_getNodeCategory:function(t,e){return t.categories&&t.categories[e.category||0]},_getNodeQueryTarget:function(t,e,i){i=i||"normal";var o=this._getNodeCategory(t,e)||{};return[e.itemStyle&&e.itemStyle[i],o&&o.itemStyle&&o.itemStyle[i],t.itemStyle[i].nodeStyle]},_getEdgeQueryTarget:function(t,e,i){return i=i||"normal",[e.itemStyle&&e.itemStyle[i],t.itemStyle[i].linkStyle]},_initSerie:function(t,e){this._temperature=1,this._graph=t.data?this._getSerieGraphFromDataMatrix(t):this._getSerieGraphFromNodeLinks(t),this._buildLinkShapes(t,e),this._buildNodeShapes(t,e);var i=t.roam===!0||"move"===t.roam,o=t.roam===!0||"scale"===t.roam;this.zr.modLayer(this.getZlevelBase(),{panable:i,zoomable:o}),(this.query("markPoint.effect.show")||this.query("markLine.effect.show"))&&this.zr.modLayer(u.EFFECT_ZLEVEL,{panable:i,zoomable:o}),this._initLayout(t),this._step()},_getSerieGraphFromDataMatrix:function(t){for(var e=[],i=0,o=[],s=0;s<t.matrix.length;s++)o[s]=t.matrix[s].slice();for(var r=t.data||t.nodes,s=0;s<r.length;s++){var n={},h=r[s];for(var l in h)"name"===l?n.id=h.name:n[l]=h[l];var d=this._getNodeCategory(t,h),c=d?d.name:h.name;if(this.selectedMap[c]=this.isSelected(c),this.selectedMap[c])e.push(n),i++;else{o.splice(i,1);for(var p=0;p<o.length;p++)o[p].splice(i,1)}}var u=a.fromMatrix(e,o,!0);return u.eachNode(function(t,e){t.layout={size:t.data.value,mass:0},t.rawIndex=e}),u.eachEdge(function(t){t.layout={weight:t.data.weight}}),u},_getSerieGraphFromNodeLinks:function(t){for(var e=new a(!0),i=t.data||t.nodes,o=0,s=i.length;s>o;o++){var r=i[o];if(r&&!r.ignore){var n=this._getNodeCategory(t,r),h=n?n.name:r.name;if(this.selectedMap[h]=this.isSelected(h),this.selectedMap[h]){var l=e.addNode(r.name,r);l.rawIndex=o}}}for(var o=0,s=t.links.length;s>o;o++){var d=t.links[o],c=d.source,p=d.target;"number"==typeof c&&(c=i[c],c&&(c=c.name)),"number"==typeof p&&(p=i[p],p&&(p=p.name));var u=e.addEdge(c,p,d);u&&(u.rawIndex=o)}return e.eachNode(function(t){var e=t.data.value;if(null==e){e=0;for(var i=0;i<t.edges.length;i++)e+=t.edges[i].data.weight||0}t.layout={size:e,mass:0}}),e.eachEdge(function(t){t.layout={weight:null==t.data.weight?1:t.data.weight}}),e},_initLayout:function(t){var e=this._graph,i=e.nodes.length,o=this.query(t,"minRadius"),s=this.query(t,"maxRadius");this._steps=t.steps||1,this._layout.center=this.parseCenter(this.zr,t.center),this._layout.width=this.parsePercent(t.size,this.zr.getWidth()),this._layout.height=this.parsePercent(t.size,this.zr.getHeight()),this._layout.large=t.large,this._layout.scaling=t.scaling,this._layout.ratioScaling=t.ratioScaling,this._layout.gravity=t.gravity,this._layout.temperature=1,this._layout.coolDown=t.coolDown,this._layout.preventNodeEdgeOverlap=t.preventOverlap,this._layout.preventNodeOverlap=t.preventOverlap;for(var n=1/0,a=-1/0,h=0;i>h;h++){var l=e.nodes[h];a=Math.max(l.layout.size,a),n=Math.min(l.layout.size,n)}for(var d=a-n,h=0;i>h;h++){var l=e.nodes[h];d>0?(l.layout.size=(l.layout.size-n)*(s-o)/d+o,l.layout.mass=l.layout.size/s):(l.layout.size=(s-o)/2,l.layout.mass=.5)}for(var h=0;i>h;h++){var l=e.nodes[h];if("undefined"!=typeof this.__nodePositionMap[l.id])l.layout.position=y.create(),y.copy(l.layout.position,this.__nodePositionMap[l.id]);else if("undefined"!=typeof l.data.initial)l.layout.position=y.create(),y.copy(l.layout.position,l.data.initial);else{var c=this._layout.center,p=Math.min(this._layout.width,this._layout.height);l.layout.position=r(c[0],c[1],.8*p)}var u=l.shape.style,g=l.layout.size;u.width=u.width||2*g,u.height=u.height||2*g,u.x=-u.width/2,u.y=-u.height/2,y.copy(l.shape.position,l.layout.position)}i=e.edges.length,a=-1/0;for(var h=0;i>h;h++){var f=e.edges[h];f.layout.weight>a&&(a=f.layout.weight)}for(var h=0;i>h;h++){var f=e.edges[h];f.layout.weight/=a}this._layout.init(e,t.useWorker)},_buildNodeShapes:function(t,e){var i=this._graph,o=this.query(t,"categories");i.eachNode(function(i){var s=this._getNodeCategory(t,i.data),r=[i.data,s,t],n=this._getNodeQueryTarget(t,i.data),a=this._getNodeQueryTarget(t,i.data,"emphasis"),h=new p({style:{x:0,y:0,color:this.deepQuery(n,"color"),brushType:"both",strokeColor:this.deepQuery(n,"strokeColor")||this.deepQuery(n,"borderColor"),lineWidth:this.deepQuery(n,"lineWidth")||this.deepQuery(n,"borderWidth")},highlightStyle:{color:this.deepQuery(a,"color"),strokeColor:this.deepQuery(a,"strokeColor")||this.deepQuery(a,"borderColor"),lineWidth:this.deepQuery(a,"lineWidth")||this.deepQuery(a,"borderWidth")},clickable:t.clickable,zlevel:this.getZlevelBase(),z:this.getZBase()});h.style.color||(h.style.color=this.getColor(s?s.name:i.id)),h.style.iconType=this.deepQuery(r,"symbol"),h.style.width=h.style.height=2*(this.deepQuery(r,"symbolSize")||0),h.style.iconType.match("image")&&(h.style.image=h.style.iconType.replace(new RegExp("^image:\\/\\/"),""),h=new c({style:h.style,highlightStyle:h.highlightStyle,clickable:h.clickable,zlevel:this.getZlevelBase(),z:this.getZBase()})),this.deepQuery(r,"itemStyle.normal.label.show")&&(h.style.text=null==i.data.label?i.id:i.data.label,h.style.textPosition=this.deepQuery(r,"itemStyle.normal.label.position"),h.style.textColor=this.deepQuery(r,"itemStyle.normal.label.textStyle.color"),h.style.textFont=this.getFont(this.deepQuery(r,"itemStyle.normal.label.textStyle")||{})),this.deepQuery(r,"itemStyle.emphasis.label.show")&&(h.highlightStyle.textPosition=this.deepQuery(r,"itemStyle.emphasis.label.position"),h.highlightStyle.textColor=this.deepQuery(r,"itemStyle.emphasis.label.textStyle.color"),h.highlightStyle.textFont=this.getFont(this.deepQuery(r,"itemStyle.emphasis.label.textStyle")||{})),this.deepQuery(r,"draggable")&&(this.setCalculable(h),h.dragEnableTime=0,h.draggable=!0,h.ondragstart=this.shapeHandler.ondragstart,h.ondragover=null);var l="";if("undefined"!=typeof i.category){var s=o[i.category];l=s&&s.name||""}g.pack(h,t,e,i.data,i.rawIndex,i.data.name||"",i.category),this.shapeList.push(h),this.zr.addShape(h),i.shape=h},this)},_buildLinkShapes:function(t,e){for(var i=this._graph,o=i.edges.length,s=0;o>s;s++){var r=i.edges[s],n=r.data,a=r.node1,h=r.node2,c=i.getEdge(h,a),u=this._getEdgeQueryTarget(t,n),m=this.deepQuery(u,"type");t.linkSymbol&&"none"!==t.linkSymbol&&(m="line");var y="line"===m?l:d,_=new y({style:{xStart:0,yStart:0,xEnd:0,yEnd:0},clickable:this.query(t,"clickable"),highlightStyle:{},zlevel:this.getZlevelBase(),z:this.getZBase()});if(c&&c.shape&&(_.style.offset=4,c.shape.style.offset=4),f.merge(_.style,this.query(t,"itemStyle.normal.linkStyle"),!0),f.merge(_.highlightStyle,this.query(t,"itemStyle.emphasis.linkStyle"),!0),"undefined"!=typeof n.itemStyle&&(n.itemStyle.normal&&f.merge(_.style,n.itemStyle.normal,!0),n.itemStyle.emphasis&&f.merge(_.highlightStyle,n.itemStyle.emphasis,!0)),_.style.lineWidth=_.style.lineWidth||_.style.width,_.style.strokeColor=_.style.strokeColor||_.style.color,_.highlightStyle.lineWidth=_.highlightStyle.lineWidth||_.highlightStyle.width,_.highlightStyle.strokeColor=_.highlightStyle.strokeColor||_.highlightStyle.color,g.pack(_,t,e,r.data,null==r.rawIndex?s:r.rawIndex,r.data.name||a.id+" - "+h.id,a.id,h.id),this.shapeList.push(_),this.zr.addShape(_),r.shape=_,t.linkSymbol&&"none"!==t.linkSymbol){var v=new p({style:{x:-5,y:0,width:t.linkSymbolSize[0],height:t.linkSymbolSize[1],iconType:t.linkSymbol,brushType:"fill",color:_.style.strokeColor},highlightStyle:{brushType:"fill"},position:[0,0],rotation:0});_._symbolShape=v,this.shapeList.push(v),this.zr.addShape(v)}}},_updateLinkShapes:function(){for(var t=y.create(),e=y.create(),i=y.create(),o=y.create(),s=this._graph.edges,r=0,n=s.length;n>r;r++){var a=s[r],h=a.node1.shape,l=a.node2.shape;y.copy(i,h.position),y.copy(o,l.position);var d=a.shape.style;if(y.sub(t,i,o),y.normalize(t,t),d.offset?(e[0]=t[1],e[1]=-t[0],y.scaleAndAdd(i,i,e,d.offset),y.scaleAndAdd(o,o,e,d.offset)):"bezier-curve"===a.shape.type&&(d.cpX1=(i[0]+o[0])/2-(o[1]-i[1])/4,d.cpY1=(i[1]+o[1])/2-(i[0]-o[0])/4),d.xStart=i[0],d.yStart=i[1],d.xEnd=o[0],d.yEnd=o[1],a.shape.modSelf(),a.shape._symbolShape){var c=a.shape._symbolShape;y.copy(c.position,o),y.scaleAndAdd(c.position,c.position,t,l.style.width/2+2);var p=Math.atan2(t[1],t[0]);c.rotation=Math.PI/2-p,c.modSelf()}}},_syncNodePositions:function(){for(var t=this._graph,e=0;e<t.nodes.length;e++){var i=t.nodes[e],o=i.layout.position,s=i.data,r=i.shape,n=r.fixed||s.fixX,a=r.fixed||s.fixY;n===!0?n=1:isNaN(n)&&(n=0),a===!0?a=1:isNaN(a)&&(a=0),r.position[0]+=(o[0]-r.position[0])*(1-n),r.position[1]+=(o[1]-r.position[1])*(1-a),y.copy(o,r.position);var h=s.name;if(h){var l=this.__nodePositionMap[h];l||(l=this.__nodePositionMap[h]=y.create()),y.copy(l,o)}r.modSelf()}},_step:function(){this._syncNodePositions(),this._updateLinkShapes(),this.zr.refreshNextFrame(),this._layout.temperature>.01?this._layout.step(this._steps):this.messageCenter.dispatch(u.EVENT.FORCE_LAYOUT_END,{},{},this.myChart)},refresh:function(t){if(t&&(this.option=t,this.series=this.option.series),this.legend=this.component.legend,this.legend)this.getColor=function(t){return this.legend.getColor(t)},this.isSelected=function(t){return this.legend.isSelected(t)};else{var e={},i=0;this.getColor=function(t){return e[t]?e[t]:(e[t]||(e[t]=this.zr.getColor(i++)),e[t])},this.isSelected=function(){return!0}}this._init()},dispose:function(){this.clear(),this.shapeList=null,this.effectList=null,this._layout.dispose(),this._layout=null,this.__nodePositionMap={}},getPosition:function(){var t=[];return this._graph.eachNode(function(e){e.layout&&t.push({name:e.data.name,position:Array.prototype.slice.call(e.layout.position)})}),t}},f.inherits(e,n),t("../chart").define("force",e),e}),define("echarts/data/Graph",["require","zrender/tool/util"],function(t){var e=t("zrender/tool/util"),i=function(t){this._directed=t||!1,this.nodes=[],this.edges=[],this._nodesMap={},this._edgesMap={}};i.prototype.isDirected=function(){return this._directed},i.prototype.addNode=function(t,e){if(this._nodesMap[t])return this._nodesMap[t];var o=new i.Node(t,e);return this.nodes.push(o),this._nodesMap[t]=o,o},i.prototype.getNodeById=function(t){return this._nodesMap[t]},i.prototype.addEdge=function(t,e,o){if("string"==typeof t&&(t=this._nodesMap[t]),"string"==typeof e&&(e=this._nodesMap[e]),t&&e){var s=t.id+"-"+e.id;if(this._edgesMap[s])return this._edgesMap[s];var r=new i.Edge(t,e,o);return this._directed&&(t.outEdges.push(r),e.inEdges.push(r)),t.edges.push(r),t!==e&&e.edges.push(r),this.edges.push(r),this._edgesMap[s]=r,r}},i.prototype.removeEdge=function(t){var i=t.node1,o=t.node2,s=i.id+"-"+o.id;this._directed&&(i.outEdges.splice(e.indexOf(i.outEdges,t),1),o.inEdges.splice(e.indexOf(o.inEdges,t),1)),i.edges.splice(e.indexOf(i.edges,t),1),i!==o&&o.edges.splice(e.indexOf(o.edges,t),1),delete this._edgesMap[s],this.edges.splice(e.indexOf(this.edges,t),1)},i.prototype.getEdge=function(t,e){return"string"!=typeof t&&(t=t.id),"string"!=typeof e&&(e=e.id),this._directed?this._edgesMap[t+"-"+e]:this._edgesMap[t+"-"+e]||this._edgesMap[e+"-"+t]},i.prototype.removeNode=function(t){if("string"!=typeof t||(t=this._nodesMap[t])){delete this._nodesMap[t.id],this.nodes.splice(e.indexOf(this.nodes,t),1);for(var i=0;i<this.edges.length;){var o=this.edges[i];o.node1===t||o.node2===t?this.removeEdge(o):i++}}},i.prototype.filterNode=function(t,e){for(var i=this.nodes.length,o=0;i>o;)t.call(e,this.nodes[o],o)?o++:(this.removeNode(this.nodes[o]),i--)},i.prototype.filterEdge=function(t,e){for(var i=this.edges.length,o=0;i>o;)t.call(e,this.edges[o],o)?o++:(this.removeEdge(this.edges[o]),i--)},i.prototype.eachNode=function(t,e){for(var i=this.nodes.length,o=0;i>o;o++)this.nodes[o]&&t.call(e,this.nodes[o],o)},i.prototype.eachEdge=function(t,e){for(var i=this.edges.length,o=0;i>o;o++)this.edges[o]&&t.call(e,this.edges[o],o)},i.prototype.clear=function(){this.nodes.length=0,this.edges.length=0,this._nodesMap={},this._edgesMap={}},i.prototype.breadthFirstTraverse=function(t,e,i,o){if("string"==typeof e&&(e=this._nodesMap[e]),e){var s="edges";"out"===i?s="outEdges":"in"===i&&(s="inEdges");for(var r=0;r<this.nodes.length;r++)this.nodes[r].__visited=!1;if(!t.call(o,e,null))for(var n=[e];n.length;)for(var a=n.shift(),h=a[s],r=0;r<h.length;r++){var l=h[r],d=l.node1===a?l.node2:l.node1;if(!d.__visited){if(t.call(d,d,a))return;n.push(d),d.__visited=!0}}}},i.prototype.clone=function(){for(var t=new i(this._directed),e=0;e<this.nodes.length;e++)t.addNode(this.nodes[e].id,this.nodes[e].data);for(var e=0;e<this.edges.length;e++){var o=this.edges[e];t.addEdge(o.node1.id,o.node2.id,o.data)}return t};var o=function(t,e){this.id=t,this.data=e||null,this.inEdges=[],this.outEdges=[],this.edges=[]};o.prototype.degree=function(){return this.edges.length},o.prototype.inDegree=function(){return this.inEdges.length},o.prototype.outDegree=function(){return this.outEdges.length};var s=function(t,e,i){this.node1=t,this.node2=e,this.data=i||null};return i.Node=o,i.Edge=s,i.fromMatrix=function(t,e,o){if(e&&e.length&&e[0].length===e.length&&t.length===e.length){for(var s=e.length,r=new i(o),n=0;s>n;n++){var a=r.addNode(t[n].id,t[n]);a.data.value=0,o&&(a.data.outValue=a.data.inValue=0)}for(var n=0;s>n;n++)for(var h=0;s>h;h++){var l=e[n][h];o&&(r.nodes[n].data.outValue+=l,r.nodes[h].data.inValue+=l),r.nodes[n].data.value+=l,r.nodes[h].data.value+=l}for(var n=0;s>n;n++)for(var h=n;s>h;h++){var l=e[n][h];if(0!==l){var d=r.nodes[n],c=r.nodes[h],p=r.addEdge(d,c,{});if(p.data.weight=l,n!==h&&o&&e[h][n]){var u=r.addEdge(c,d,{});u.data.weight=e[h][n]}}}return r}},i}),define("echarts/layout/Force",["require","./forceLayoutWorker","zrender/tool/vector"],function(t){function e(){if("undefined"!=typeof Worker&&"undefined"!=typeof Blob)try{var t=new Blob([o.getWorkerCode()]);i=window.URL.createObjectURL(t)}catch(e){i=""}return i}var i,o=t("./forceLayoutWorker"),s=t("zrender/tool/vector"),r=window.requestAnimationFrame||window.msRequestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(t){setTimeout(t,16)},n="undefined"==typeof Float32Array?Array:Float32Array,a=function(t){"undefined"==typeof i&&e(),t=t||{},this.width=t.width||500,this.height=t.height||500,this.center=t.center||[this.width/2,this.height/2],this.ratioScaling=t.ratioScaling||!1,this.scaling=t.scaling||1,this.gravity="undefined"!=typeof t.gravity?t.gravity:1,this.large=t.large||!1,this.preventNodeOverlap=t.preventNodeOverlap||!1,this.preventNodeEdgeOverlap=t.preventNodeEdgeOverlap||!1,this.maxSpeedIncrease=t.maxSpeedIncrease||1,this.onupdate=t.onupdate||function(){},this.temperature=t.temperature||1,this.coolDown=t.coolDown||.99,this._layout=null,this._layoutWorker=null;var o=this,s=this._$onupdate;this._$onupdate=function(t){s.call(o,t)}};return a.prototype.updateConfig=function(){var t=this.width,e=this.height,i=Math.min(t,e),o={center:this.center,width:this.ratioScaling?t:i,height:this.ratioScaling?e:i,scaling:this.scaling||1,gravity:this.gravity||1,barnesHutOptimize:this.large,preventNodeOverlap:this.preventNodeOverlap,preventNodeEdgeOverlap:this.preventNodeEdgeOverlap,maxSpeedIncrease:this.maxSpeedIncrease};if(this._layoutWorker)this._layoutWorker.postMessage({cmd:"updateConfig",config:o});else for(var s in o)this._layout[s]=o[s]},a.prototype.init=function(t,e){if(this._layoutWorker&&(this._layoutWorker.terminate(),this._layoutWorker=null),i&&e)try{this._layoutWorker||(this._layoutWorker=new Worker(i),this._layoutWorker.onmessage=this._$onupdate),this._layout=null}catch(s){this._layoutWorker=null,this._layout||(this._layout=new o)}else this._layout||(this._layout=new o);this.temperature=1,this.graph=t;for(var r=t.nodes.length,a=new n(2*r),h=new n(r),l=new n(r),d=0;r>d;d++){var c=t.nodes[d];a[2*d]=c.layout.position[0],a[2*d+1]=c.layout.position[1],h[d]="undefined"==typeof c.layout.mass?1:c.layout.mass,l[d]="undefined"==typeof c.layout.size?1:c.layout.size,c.layout.__index=d}r=t.edges.length;for(var p=new n(2*r),u=new n(r),d=0;r>d;d++){var g=t.edges[d];p[2*d]=g.node1.layout.__index,p[2*d+1]=g.node2.layout.__index,u[d]=g.layout.weight||1}this._layoutWorker?this._layoutWorker.postMessage({cmd:"init",nodesPosition:a,nodesMass:h,nodesSize:l,edges:p,edgesWeight:u}):(this._layout.initNodes(a,h,l),this._layout.initEdges(p,u)),this.updateConfig()},a.prototype.step=function(t){var e=this.graph.nodes;if(this._layoutWorker){for(var i=new n(2*e.length),o=0;o<e.length;o++){var a=e[o];i[2*o]=a.layout.position[0],i[2*o+1]=a.layout.position[1]}this._layoutWorker.postMessage(i.buffer,[i.buffer]),this._layoutWorker.postMessage({cmd:"update",steps:t,temperature:this.temperature,coolDown:this.coolDown});for(var o=0;t>o;o++)this.temperature*=this.coolDown}else{r(this._$onupdate);for(var o=0;o<e.length;o++){var a=e[o];s.copy(this._layout.nodes[o].position,a.layout.position)}for(var o=0;t>o;o++)this._layout.temperature=this.temperature,this._layout.update(),this.temperature*=this.coolDown}},a.prototype._$onupdate=function(t){if(this._layoutWorker){for(var e=new Float32Array(t.data),i=0;i<this.graph.nodes.length;i++){var o=this.graph.nodes[i];o.layout.position[0]=e[2*i],o.layout.position[1]=e[2*i+1]}this.onupdate&&this.onupdate()}else if(this._layout){for(var i=0;i<this.graph.nodes.length;i++){var o=this.graph.nodes[i];s.copy(o.layout.position,this._layout.nodes[i].position)}this.onupdate&&this.onupdate()}},a.prototype.dispose=function(){this._layoutWorker&&this._layoutWorker.terminate(),this._layoutWorker=null,this._layout=null},a}),define("echarts/layout/forceLayoutWorker",["require","zrender/tool/vector"],function t(e){"use strict";function i(){this.subRegions=[],this.nSubRegions=0,this.node=null,this.mass=0,this.centerOfMass=null,this.bbox=new h(4),this.size=0}function o(){this.position=n.create(),this.force=n.create(),this.forcePrev=n.create(),this.speed=n.create(),this.speedPrev=n.create(),this.mass=1,this.inDegree=0,this.outDegree=0}function s(t,e){this.node1=t,this.node2=e,this.weight=1}function r(){this.barnesHutOptimize=!1,this.barnesHutTheta=1.5,this.repulsionByDegree=!1,this.preventNodeOverlap=!1,this.preventNodeEdgeOverlap=!1,this.strongGravity=!0,this.gravity=1,this.scaling=1,this.edgeWeightInfluence=1,this.center=[0,0],this.width=500,this.height=500,this.maxSpeedIncrease=1,this.nodes=[],this.edges=[],this.bbox=new h(4),this._rootRegion=new i,this._rootRegion.centerOfMass=n.create(),this._massArr=null,this._k=0}var n,a="undefined"==typeof window&&"undefined"==typeof e;n=a?{create:function(t,e){var i=new Float32Array(2);return i[0]=t||0,i[1]=e||0,i},dist:function(t,e){var i=e[0]-t[0],o=e[1]-t[1];return Math.sqrt(i*i+o*o)},len:function(t){var e=t[0],i=t[1];return Math.sqrt(e*e+i*i)},scaleAndAdd:function(t,e,i,o){return t[0]=e[0]+i[0]*o,t[1]=e[1]+i[1]*o,t},scale:function(t,e,i){return t[0]=e[0]*i,t[1]=e[1]*i,t},add:function(t,e,i){return t[0]=e[0]+i[0],t[1]=e[1]+i[1],t},sub:function(t,e,i){return t[0]=e[0]-i[0],t[1]=e[1]-i[1],t},dot:function(t,e){return t[0]*e[0]+t[1]*e[1]},normalize:function(t,e){var i=e[0],o=e[1],s=i*i+o*o;return s>0&&(s=1/Math.sqrt(s),t[0]=e[0]*s,t[1]=e[1]*s),t},negate:function(t,e){return t[0]=-e[0],t[1]=-e[1],t},copy:function(t,e){return t[0]=e[0],t[1]=e[1],t},set:function(t,e,i){return t[0]=e,t[1]=i,t}}:e("zrender/tool/vector");var h="undefined"==typeof Float32Array?Array:Float32Array;if(i.prototype.beforeUpdate=function(){for(var t=0;t<this.nSubRegions;t++)this.subRegions[t].beforeUpdate();this.mass=0,this.centerOfMass&&(this.centerOfMass[0]=0,this.centerOfMass[1]=0),this.nSubRegions=0,this.node=null},i.prototype.afterUpdate=function(){this.subRegions.length=this.nSubRegions;for(var t=0;t<this.nSubRegions;t++)this.subRegions[t].afterUpdate()},i.prototype.addNode=function(t){if(0===this.nSubRegions){if(null==this.node)return void(this.node=t);this._addNodeToSubRegion(this.node),this.node=null}this._addNodeToSubRegion(t),this._updateCenterOfMass(t)},i.prototype.findSubRegion=function(t,e){for(var i=0;i<this.nSubRegions;i++){var o=this.subRegions[i];if(o.contain(t,e))return o}},i.prototype.contain=function(t,e){return this.bbox[0]<=t&&this.bbox[2]>=t&&this.bbox[1]<=e&&this.bbox[3]>=e},i.prototype.setBBox=function(t,e,i,o){this.bbox[0]=t,this.bbox[1]=e,this.bbox[2]=i,this.bbox[3]=o,this.size=(i-t+o-e)/2},i.prototype._newSubRegion=function(){var t=this.subRegions[this.nSubRegions];return t||(t=new i,this.subRegions[this.nSubRegions]=t),this.nSubRegions++,t},i.prototype._addNodeToSubRegion=function(t){var e=this.findSubRegion(t.position[0],t.position[1]),i=this.bbox;if(!e){var o=(i[0]+i[2])/2,s=(i[1]+i[3])/2,r=(i[2]-i[0])/2,n=(i[3]-i[1])/2,a=t.position[0]>=o?1:0,h=t.position[1]>=s?1:0,e=this._newSubRegion();e.setBBox(a*r+i[0],h*n+i[1],(a+1)*r+i[0],(h+1)*n+i[1])}e.addNode(t)},i.prototype._updateCenterOfMass=function(t){null==this.centerOfMass&&(this.centerOfMass=n.create());var e=this.centerOfMass[0]*this.mass,i=this.centerOfMass[1]*this.mass;e+=t.position[0]*t.mass,i+=t.position[1]*t.mass,this.mass+=t.mass,this.centerOfMass[0]=e/this.mass,this.centerOfMass[1]=i/this.mass},r.prototype.nodeToNodeRepulsionFactor=function(t,e,i){return i*i*t/e},r.prototype.edgeToNodeRepulsionFactor=function(t,e,i){return i*t/e},r.prototype.attractionFactor=function(t,e,i){return t*e/i},r.prototype.initNodes=function(t,e,i){this.temperature=1;var s=t.length/2;this.nodes.length=0;for(var r="undefined"!=typeof i,n=0;s>n;n++){var a=new o;a.position[0]=t[2*n],a.position[1]=t[2*n+1],a.mass=e[n],r&&(a.size=i[n]),this.nodes.push(a)}this._massArr=e,r&&(this._sizeArr=i)},r.prototype.initEdges=function(t,e){var i=t.length/2;this.edges.length=0;for(var o="undefined"!=typeof e,r=0;i>r;r++){var n=t[2*r],a=t[2*r+1],h=this.nodes[n],l=this.nodes[a];if(h&&l){h.outDegree++,l.inDegree++;var d=new s(h,l);o&&(d.weight=e[r]),this.edges.push(d)}}},r.prototype.update=function(){var t=this.nodes.length;if(this.updateBBox(),this._k=.4*this.scaling*Math.sqrt(this.width*this.height/t),this.barnesHutOptimize){this._rootRegion.setBBox(this.bbox[0],this.bbox[1],this.bbox[2],this.bbox[3]),this._rootRegion.beforeUpdate();for(var e=0;t>e;e++)this._rootRegion.addNode(this.nodes[e]);this._rootRegion.afterUpdate()}else{var i=0,o=this._rootRegion.centerOfMass;n.set(o,0,0);for(var e=0;t>e;e++){var s=this.nodes[e];i+=s.mass,n.scaleAndAdd(o,o,s.position,s.mass)}i>0&&n.scale(o,o,1/i)}this.updateForce(),this.updatePosition()},r.prototype.updateForce=function(){for(var t=this.nodes.length,e=0;t>e;e++){var i=this.nodes[e];n.copy(i.forcePrev,i.force),n.copy(i.speedPrev,i.speed),n.set(i.force,0,0)}this.updateNodeNodeForce(),this.gravity>0&&this.updateGravityForce(),this.updateEdgeForce(),this.preventNodeEdgeOverlap&&this.updateNodeEdgeForce()},r.prototype.updatePosition=function(){for(var t=this.nodes.length,e=n.create(),i=0;t>i;i++){var o=this.nodes[i],s=o.speed;n.scale(o.force,o.force,1/30);var r=n.len(o.force)+.1,a=Math.min(r,500)/r;n.scale(o.force,o.force,a),n.add(s,s,o.force),n.scale(s,s,this.temperature),n.sub(e,s,o.speedPrev);var h=n.len(e);if(h>0){n.scale(e,e,1/h);var l=n.len(o.speedPrev);l>0&&(h=Math.min(h/l,this.maxSpeedIncrease)*l,n.scaleAndAdd(s,o.speedPrev,e,h))}var d=n.len(s),a=Math.min(d,100)/(d+.1);n.scale(s,s,a),n.add(o.position,o.position,s)}},r.prototype.updateNodeNodeForce=function(){for(var t=this.nodes.length,e=0;t>e;e++){var i=this.nodes[e];if(this.barnesHutOptimize)this.applyRegionToNodeRepulsion(this._rootRegion,i);else for(var o=e+1;t>o;o++){var s=this.nodes[o];this.applyNodeToNodeRepulsion(i,s,!1)}}},r.prototype.updateGravityForce=function(){for(var t=0;t<this.nodes.length;t++)this.applyNodeGravity(this.nodes[t])},r.prototype.updateEdgeForce=function(){for(var t=0;t<this.edges.length;t++)this.applyEdgeAttraction(this.edges[t])},r.prototype.updateNodeEdgeForce=function(){for(var t=0;t<this.nodes.length;t++)for(var e=0;e<this.edges.length;e++)this.applyEdgeToNodeRepulsion(this.edges[e],this.nodes[t])},r.prototype.applyRegionToNodeRepulsion=function(){var t=n.create();return function(e,i){if(e.node)this.applyNodeToNodeRepulsion(e.node,i,!0);else{if(0===e.mass&&0===i.mass)return;n.sub(t,i.position,e.centerOfMass);var o=t[0]*t[0]+t[1]*t[1];if(o>this.barnesHutTheta*e.size*e.size){var s=this._k*this._k*(i.mass+e.mass)/(o+1);n.scaleAndAdd(i.force,i.force,t,2*s)}else for(var r=0;r<e.nSubRegions;r++)this.applyRegionToNodeRepulsion(e.subRegions[r],i)}}}(),r.prototype.applyNodeToNodeRepulsion=function(){var t=n.create();return function(e,i,o){if(e!==i&&(0!==e.mass||0!==i.mass)){n.sub(t,e.position,i.position);var s=t[0]*t[0]+t[1]*t[1];if(0!==s){var r,a=e.mass+i.mass,h=Math.sqrt(s);n.scale(t,t,1/h),this.preventNodeOverlap?(h=h-e.size-i.size,h>0?r=this.nodeToNodeRepulsionFactor(a,h,this._k):0>=h&&(r=this._k*this._k*10*a)):r=this.nodeToNodeRepulsionFactor(a,h,this._k),o||n.scaleAndAdd(e.force,e.force,t,2*r),n.scaleAndAdd(i.force,i.force,t,2*-r)}}}}(),r.prototype.applyEdgeAttraction=function(){var t=n.create();return function(e){var i=e.node1,o=e.node2;n.sub(t,i.position,o.position);var s,r=n.len(t);s=0===this.edgeWeightInfluence?1:1==this.edgeWeightInfluence?e.weight:Math.pow(e.weight,this.edgeWeightInfluence);var a;if(!(this.preventOverlap&&(r=r-i.size-o.size,0>=r))){var a=this.attractionFactor(s,r,this._k);n.scaleAndAdd(i.force,i.force,t,-a),n.scaleAndAdd(o.force,o.force,t,a)}}}(),r.prototype.applyNodeGravity=function(){var t=n.create();return function(e){n.sub(t,this.center,e.position),this.width>this.height?t[1]*=this.width/this.height:t[0]*=this.height/this.width;var i=n.len(t)/100;this.strongGravity?n.scaleAndAdd(e.force,e.force,t,i*this.gravity*e.mass):n.scaleAndAdd(e.force,e.force,t,this.gravity*e.mass/(i+1))}}(),r.prototype.applyEdgeToNodeRepulsion=function(){var t=n.create(),e=n.create(),i=n.create();return function(o,s){var r=o.node1,a=o.node2;if(r!==s&&a!==s){n.sub(t,a.position,r.position),n.sub(e,s.position,r.position);var h=n.len(t);n.scale(t,t,1/h);var l=n.dot(t,e);if(!(0>l||l>h)){n.scaleAndAdd(i,r.position,t,l);var d=n.dist(i,s.position)-s.size,c=this.edgeToNodeRepulsionFactor(s.mass,Math.max(d,.1),100);n.sub(t,s.position,i),n.normalize(t,t),n.scaleAndAdd(s.force,s.force,t,c),n.scaleAndAdd(r.force,r.force,t,-c),n.scaleAndAdd(a.force,a.force,t,-c)}}}}(),r.prototype.updateBBox=function(){for(var t=1/0,e=1/0,i=-1/0,o=-1/0,s=0;s<this.nodes.length;s++){var r=this.nodes[s].position;t=Math.min(t,r[0]),e=Math.min(e,r[1]),i=Math.max(i,r[0]),o=Math.max(o,r[1])}this.bbox[0]=t,this.bbox[1]=e,this.bbox[2]=i,this.bbox[3]=o},r.getWorkerCode=function(){var e=t.toString();return e.slice(e.indexOf("{")+1,e.lastIndexOf("return"))},a){var l=null;self.onmessage=function(t){if(t.data instanceof ArrayBuffer){if(!l)return;for(var e=new Float32Array(t.data),i=e.length/2,o=0;i>o;o++){var s=l.nodes[o];s.position[0]=e[2*o],s.position[1]=e[2*o+1]}}else switch(t.data.cmd){case"init":l||(l=new r),l.initNodes(t.data.nodesPosition,t.data.nodesMass,t.data.nodesSize),l.initEdges(t.data.edges,t.data.edgesWeight);break;case"updateConfig":if(l)for(var n in t.data.config)l[n]=t.data.config[n];break;case"update":var a=t.data.steps;if(l){var i=l.nodes.length,e=new Float32Array(2*i);l.temperature=t.data.temperature;for(var o=0;a>o;o++)l.update(),l.temperature*=t.data.coolDown;for(var o=0;i>o;o++){var s=l.nodes[o];e[2*o]=s.position[0],e[2*o+1]=s.position[1]}self.postMessage(e.buffer,[e.buffer])}else{var h=new Float32Array;self.postMessage(h.buffer,[h.buffer])}}}}return r});