define("echarts/chart/eventRiver",["require","./base","../layout/eventRiver","zrender/shape/Polygon","../component/axis","../component/grid","../component/dataZoom","../config","../util/ecData","../util/date","zrender/tool/util","zrender/tool/color","../chart"],function(t){function e(t,e,o,s,a){i.call(this,t,e,o,s,a);var n=this;n._ondragend=function(){n.isDragend=!0},this.refresh(s)}var i=t("./base"),o=t("../layout/eventRiver"),s=t("zrender/shape/Polygon");t("../component/axis"),t("../component/grid"),t("../component/dataZoom");var a=t("../config");a.eventRiver={zlevel:0,z:2,clickable:!0,legendHoverLink:!0,itemStyle:{normal:{borderColor:"rgba(0,0,0,0)",borderWidth:1,label:{show:!0,position:"inside",formatter:"{b}"}},emphasis:{borderColor:"rgba(0,0,0,0)",borderWidth:1,label:{show:!0}}}};var n=t("../util/ecData"),r=t("../util/date"),h=t("zrender/tool/util"),l=t("zrender/tool/color");return e.prototype={type:a.CHART_TYPE_EVENTRIVER,_buildShape:function(){var t=this.series;this.selectedMap={},this._dataPreprocessing();for(var e=this.component.legend,i=[],s=0;s<t.length;s++)if(t[s].type===this.type){t[s]=this.reformOption(t[s]),this.legendHoverLink=t[s].legendHoverLink||this.legendHoverLink;var a=t[s].name||"";if(this.selectedMap[a]=e?e.isSelected(a):!0,!this.selectedMap[a])continue;this.buildMark(s),i.push(this.series[s])}o(i,this._intervalX,this.component.grid.getArea()),this._drawEventRiver(),this.addShapeList()},_dataPreprocessing:function(){for(var t,e,i=this.series,o=0,s=i.length;s>o;o++)if(i[o].type===this.type){t=this.component.xAxis.getAxis(i[o].xAxisIndex||0);for(var a=0,n=i[o].eventList.length;n>a;a++){e=i[o].eventList[a].evolution;for(var h=0,l=e.length;l>h;h++)e[h].timeScale=t.getCoord(r.getNewDate(e[h].time)-0),e[h].valueScale=Math.pow(e[h].value,.8)}}this._intervalX=Math.round(this.component.grid.getWidth()/40)},_drawEventRiver:function(){for(var t=this.series,e=0;e<t.length;e++){var i=t[e].name||"";if(t[e].type===this.type&&this.selectedMap[i])for(var o=0;o<t[e].eventList.length;o++)this._drawEventBubble(t[e].eventList[o],e,o)}},_drawEventBubble:function(t,e,i){var o=this.series,a=o[e],r=a.name||"",h=a.eventList[i],d=[h,a],c=this.component.legend,p=c?c.getColor(r):this.zr.getColor(e),u=this.deepMerge(d,"itemStyle.normal")||{},g=this.deepMerge(d,"itemStyle.emphasis")||{},f=this.getItemStyleColor(u.color,e,i,h)||p,m=this.getItemStyleColor(g.color,e,i,h)||("string"==typeof f?l.lift(f,-.2):f),y=this._calculateControlPoints(t),_={zlevel:this.getZlevelBase(),z:this.getZBase(),clickable:this.deepQuery(d,"clickable"),style:{pointList:y,smooth:"spline",brushType:"both",lineJoin:"round",color:f,lineWidth:u.borderWidth,strokeColor:u.borderColor},highlightStyle:{color:m,lineWidth:g.borderWidth,strokeColor:g.borderColor},draggable:"vertical",ondragend:this._ondragend};_=new s(_),this.addLabel(_,a,h,t.name),n.pack(_,o[e],e,o[e].eventList[i],i,o[e].eventList[i].name),this.shapeList.push(_)},_calculateControlPoints:function(t){var e=this._intervalX,i=t.y,o=t.evolution,s=o.length;if(!(1>s)){for(var a=[],n=[],r=0;s>r;r++)a.push(o[r].timeScale),n.push(o[r].valueScale);var h=[];h.push([a[0],i]);var r=0;for(r=0;s-1>r;r++)h.push([(a[r]+a[r+1])/2,n[r]/-2+i]);for(h.push([(a[r]+(a[r]+e))/2,n[r]/-2+i]),h.push([a[r]+e,i]),h.push([(a[r]+(a[r]+e))/2,n[r]/2+i]),r=s-1;r>0;r--)h.push([(a[r]+a[r-1])/2,n[r-1]/2+i]);return h}},ondragend:function(t,e){this.isDragend&&t.target&&(e.dragOut=!0,e.dragIn=!0,e.needRefresh=!1,this.isDragend=!1)},refresh:function(t){t&&(this.option=t,this.series=t.series),this.backupShapeList(),this._buildShape()}},h.inherits(e,i),t("../chart").define("eventRiver",e),e}),define("echarts/layout/eventRiver",["require"],function(){function t(t,a,n){function r(t,e){var i=t.importance,o=e.importance;return i>o?-1:o>i?1:0}function h(t,e){if(t.indexOf)return t.indexOf(e);for(var i=0,o=t.length;o>i;i++)if(t[i]===e)return i;return-1}for(var l=5,d=a,c=0;c<t.length;c++){for(var p=0;p<t[c].eventList.length;p++){null==t[c].eventList[p].weight&&(t[c].eventList[p].weight=1);for(var u=0,g=0;g<t[c].eventList[p].evolution.length;g++)u+=t[c].eventList[p].evolution[g].valueScale;t[c].eventList[p].importance=u*t[c].eventList[p].weight}t[c].eventList.sort(r)}for(var c=0;c<t.length;c++){null==t[c].weight&&(t[c].weight=1);for(var u=0,p=0;p<t[c].eventList.length;p++)u+=t[c].eventList[p].weight;t[c].importance=u*t[c].weight}t.sort(r);for(var f=Number.MAX_VALUE,m=0,c=0;c<t.length;c++)for(var p=0;p<t[c].eventList.length;p++)for(var g=0;g<t[c].eventList[p].evolution.length;g++){var y=t[c].eventList[p].evolution[g].timeScale;f=Math.min(f,y),m=Math.max(m,y)}for(var _=i(Math.floor(f),Math.ceil(m)),v=0,c=0;c<t.length;c++)for(var p=0;p<t[c].eventList.length;p++){var x=t[c].eventList[p];x.time=[],x.value=[];for(var g=0;g<t[c].eventList[p].evolution.length;g++)x.time.push(t[c].eventList[p].evolution[g].timeScale),x.value.push(t[c].eventList[p].evolution[g].valueScale);var b=h(x.value,Math.max.apply(Math,x.value)),S=o(_,x.time[b],x.time[b+1]),g=0;for(x.y=S+x.value[b]/2+l,g=0;g<x.time.length-1;g++){var T=o(_,x.time[g],x.time[g+1]);x.y-x.value[g]/2-l<T&&(x.y=T+x.value[g]/2+l)}var T=o(_,x.time[g],x.time[g]+d);for(x.y-x.value[g]/2-l<T&&(x.y=T+x.value[g]/2+l),t[c].y=x.y,v=Math.max(v,x.y+x.value[b]/2),g=0;g<x.time.length-1;g++)s(_,x.time[g],x.time[g+1],x.y+x.value[g]/2);s(_,x.time[g],x.time[g]+d,x.y+x.value[g]/2)}e(t,n,v,l)}function e(t,e,i,o){for(var s=e.y,a=(e.height-o)/i,n=0;n<t.length;n++){t[n].y=t[n].y*a+s;for(var r=t[n].eventList,h=0;h<r.length;h++){r[h].y=r[h].y*a+s;for(var l=r[h].evolution,d=0;d<l.length;d++)l[d].valueScale*=1*a}}}function i(t,e){var o={left:t,right:e,leftChild:null,rightChild:null,maxValue:0};if(e>t+1){var s=Math.round((t+e)/2);o.leftChild=i(t,s),o.rightChild=i(s,e)}return o}function o(t,e,i){if(1>i-e)return 0;var s=Math.round((t.left+t.right)/2),a=0;if(e==t.left&&i==t.right)a=t.maxValue;else if(s>=i&&null!=t.leftChild)a=o(t.leftChild,e,i);else if(e>=s&&null!=t.rightChild)a=o(t.rightChild,e,i);else{var n=0,r=0;null!=t.leftChild&&(n=o(t.leftChild,e,s)),null!=t.rightChild&&(r=o(t.rightChild,s,i)),a=n>r?n:r}return a}function s(t,e,i,o){if(null!=t){var a=Math.round((t.left+t.right)/2);t.maxValue=t.maxValue>o?t.maxValue:o,(Math.floor(10*e)!=Math.floor(10*t.left)||Math.floor(10*i)!=Math.floor(10*t.right))&&(a>=i?s(t.leftChild,e,i,o):e>=a?s(t.rightChild,e,i,o):(s(t.leftChild,e,a,o),s(t.rightChild,a,i,o)))}}return t});