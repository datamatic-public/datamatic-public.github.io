define("echarts/chart/funnel",["require","./base","zrender/shape/Text","zrender/shape/Line","zrender/shape/Polygon","../config","../util/ecData","../util/number","zrender/tool/util","zrender/tool/color","zrender/tool/area","../chart"],function(t){function e(t,e,o,s,a){i.call(this,t,e,o,s,a),this.refresh(s)}var i=t("./base"),o=t("zrender/shape/Text"),s=t("zrender/shape/Line"),a=t("zrender/shape/Polygon"),n=t("../config");n.funnel={zlevel:0,z:2,clickable:!0,legendHoverLink:!0,x:80,y:60,x2:80,y2:60,min:0,max:100,minSize:"0%",maxSize:"100%",sort:"descending",gap:0,funnelAlign:"center",itemStyle:{normal:{borderColor:"#fff",borderWidth:1,label:{show:!0,position:"outer"},labelLine:{show:!0,length:10,lineStyle:{width:1,type:"solid"}}},emphasis:{borderColor:"rgba(0,0,0,0)",borderWidth:1,label:{show:!0},labelLine:{show:!0}}}};var r=t("../util/ecData"),h=t("../util/number"),l=t("zrender/tool/util"),d=t("zrender/tool/color"),c=t("zrender/tool/area");return e.prototype={type:n.CHART_TYPE_FUNNEL,_buildShape:function(){var t=this.series,e=this.component.legend;this._paramsMap={},this._selected={},this.selectedMap={};for(var i,o=0,s=t.length;s>o;o++)if(t[o].type===n.CHART_TYPE_FUNNEL){if(t[o]=this.reformOption(t[o]),this.legendHoverLink=t[o].legendHoverLink||this.legendHoverLink,i=t[o].name||"",this.selectedMap[i]=e?e.isSelected(i):!0,!this.selectedMap[i])continue;this._buildSingleFunnel(o),this.buildMark(o)}this.addShapeList()},_buildSingleFunnel:function(t){var e=this.component.legend,i=this.series[t],o=this._mapData(t),s=this._getLocation(t);this._paramsMap[t]={location:s,data:o};for(var a,n=0,r=[],l=0,d=o.length;d>l;l++)a=o[l].name,this.selectedMap[a]=e?e.isSelected(a):!0,this.selectedMap[a]&&!isNaN(o[l].value)&&(r.push(o[l]),n++);if(0!==n){for(var c,p,u,g,f=this._buildFunnelCase(t),m=i.funnelAlign,y=i.gap,_=n>1?(s.height-(n-1)*y)/n:s.height,v=s.y,x="descending"===i.sort?this._getItemWidth(t,r[0].value):h.parsePercent(i.minSize,s.width),b="descending"===i.sort?1:0,S=s.centerX,T=[],l=0,d=r.length;d>l;l++)if(a=r[l].name,this.selectedMap[a]&&!isNaN(r[l].value)){switch(c=d-2>=l?this._getItemWidth(t,r[l+b].value):"descending"===i.sort?h.parsePercent(i.minSize,s.width):h.parsePercent(i.maxSize,s.width),m){case"left":p=s.x;break;case"right":p=s.x+s.width-x;break;default:p=S-x/2}u=this._buildItem(t,r[l]._index,e?e.getColor(a):this.zr.getColor(r[l]._index),p,v,x,c,_,m),v+=_+y,g=u.style.pointList,T.unshift([g[0][0]-10,g[0][1]]),T.push([g[1][0]+10,g[1][1]]),0===l&&(0===x?(g=T.pop(),"center"==m&&(T[0][0]+=10),"right"==m&&(T[0][0]=g[0]),T[0][1]-="center"==m?10:15,1==d&&(g=u.style.pointList)):(T[T.length-1][1]-=5,T[0][1]-=5)),x=c}f&&(T.unshift([g[3][0]-10,g[3][1]]),T.push([g[2][0]+10,g[2][1]]),0===x?(g=T.pop(),"center"==m&&(T[0][0]+=10),"right"==m&&(T[0][0]=g[0]),T[0][1]+="center"==m?10:15):(T[T.length-1][1]+=5,T[0][1]+=5),f.style.pointList=T)}},_buildFunnelCase:function(t){var e=this.series[t];if(this.deepQuery([e,this.option],"calculable")){var i=this._paramsMap[t].location,o=10,s={hoverable:!1,style:{pointListd:[[i.x-o,i.y-o],[i.x+i.width+o,i.y-o],[i.x+i.width+o,i.y+i.height+o],[i.x-o,i.y+i.height+o]],brushType:"stroke",lineWidth:1,strokeColor:e.calculableHolderColor||this.ecTheme.calculableHolderColor||n.calculableHolderColor}};return r.pack(s,e,t,void 0,-1),this.setCalculable(s),s=new a(s),this.shapeList.push(s),s}},_getLocation:function(t){var e=this.series[t],i=this.zr.getWidth(),o=this.zr.getHeight(),s=this.parsePercent(e.x,i),a=this.parsePercent(e.y,o),n=null==e.width?i-s-this.parsePercent(e.x2,i):this.parsePercent(e.width,i);return{x:s,y:a,width:n,height:null==e.height?o-a-this.parsePercent(e.y2,o):this.parsePercent(e.height,o),centerX:s+n/2}},_mapData:function(t){function e(t,e){return"-"===t.value?1:"-"===e.value?-1:e.value-t.value}function i(t,i){return-e(t,i)}for(var o=this.series[t],s=l.clone(o.data),a=0,n=s.length;n>a;a++)s[a]._index=a;return"none"!=o.sort&&s.sort("descending"===o.sort?e:i),s},_buildItem:function(t,e,i,o,s,a,n,h,l){var d=this.series,c=d[t],p=c.data[e],u=this.getPolygon(t,e,i,o,s,a,n,h,l);r.pack(u,d[t],t,d[t].data[e],e,d[t].data[e].name),this.shapeList.push(u);var g=this.getLabel(t,e,i,o,s,a,n,h,l);r.pack(g,d[t],t,d[t].data[e],e,d[t].data[e].name),this.shapeList.push(g),this._needLabel(c,p,!1)||(g.invisible=!0);var f=this.getLabelLine(t,e,i,o,s,a,n,h,l);this.shapeList.push(f),this._needLabelLine(c,p,!1)||(f.invisible=!0);var m=[],y=[];return this._needLabelLine(c,p,!0)&&(m.push(f.id),y.push(f.id)),this._needLabel(c,p,!0)&&(m.push(g.id),y.push(u.id)),u.hoverConnect=m,g.hoverConnect=y,u},_getItemWidth:function(t,e){var i=this.series[t],o=this._paramsMap[t].location,s=i.min,a=i.max,n=h.parsePercent(i.minSize,o.width),r=h.parsePercent(i.maxSize,o.width);return e*(r-n)/(a-s)},getPolygon:function(t,e,i,o,s,n,r,h,l){var c,p=this.series[t],u=p.data[e],g=[u,p],f=this.deepMerge(g,"itemStyle.normal")||{},m=this.deepMerge(g,"itemStyle.emphasis")||{},y=this.getItemStyleColor(f.color,t,e,u)||i,_=this.getItemStyleColor(m.color,t,e,u)||("string"==typeof y?d.lift(y,-.2):y);switch(l){case"left":c=o;break;case"right":c=o+(n-r);break;default:c=o+(n-r)/2}var v={zlevel:this.getZlevelBase(),z:this.getZBase(),clickable:this.deepQuery(g,"clickable"),style:{pointList:[[o,s],[o+n,s],[c+r,s+h],[c,s+h]],brushType:"both",color:y,lineWidth:f.borderWidth,strokeColor:f.borderColor},highlightStyle:{color:_,lineWidth:m.borderWidth,strokeColor:m.borderColor}};return this.deepQuery([u,p,this.option],"calculable")&&(this.setCalculable(v),v.draggable=!0),new a(v)},getLabel:function(t,e,i,s,a,n,r,h,p){var u,g=this.series[t],f=g.data[e],m=this._paramsMap[t].location,y=l.merge(l.clone(f.itemStyle)||{},g.itemStyle),_="normal",v=y[_].label,x=v.textStyle||{},b=y[_].labelLine.length,S=this.getLabelText(t,e,_),T=this.getFont(x),z=i;v.position=v.position||y.normal.label.position,"inner"===v.position||"inside"===v.position||"center"===v.position?(u=p,z=Math.max(n,r)/2>c.getTextWidth(S,T)?"#fff":d.reverse(i)):u="left"===v.position?"right":"left";var C={zlevel:this.getZlevelBase(),z:this.getZBase()+1,style:{x:this._getLabelPoint(v.position,s,m,n,r,b,p),y:a+h/2,color:x.color||z,text:S,textAlign:x.align||u,textBaseline:x.baseline||"middle",textFont:T}};return _="emphasis",v=y[_].label||v,x=v.textStyle||x,b=y[_].labelLine.length||b,v.position=v.position||y.normal.label.position,S=this.getLabelText(t,e,_),T=this.getFont(x),z=i,"inner"===v.position||"inside"===v.position||"center"===v.position?(u=p,z=Math.max(n,r)/2>c.getTextWidth(S,T)?"#fff":d.reverse(i)):u="left"===v.position?"right":"left",C.highlightStyle={x:this._getLabelPoint(v.position,s,m,n,r,b,p),color:x.color||z,text:S,textAlign:x.align||u,textFont:T,brushType:"fill"},new o(C)},getLabelText:function(t,e,i){var o=this.series,s=o[t],a=s.data[e],n=this.deepQuery([a,s],"itemStyle."+i+".label.formatter");return n?"function"==typeof n?n.call(this.myChart,{seriesIndex:t,seriesName:s.name||"",series:s,dataIndex:e,data:a,name:a.name,value:a.value}):"string"==typeof n?n=n.replace("{a}","{a0}").replace("{b}","{b0}").replace("{c}","{c0}").replace("{a0}",s.name).replace("{b0}",a.name).replace("{c0}",a.value):void 0:a.name},getLabelLine:function(t,e,i,o,a,n,r,h,d){var c=this.series[t],p=c.data[e],u=this._paramsMap[t].location,g=l.merge(l.clone(p.itemStyle)||{},c.itemStyle),f="normal",m=g[f].labelLine,y=g[f].labelLine.length,_=m.lineStyle||{},v=g[f].label;v.position=v.position||g.normal.label.position;var x={zlevel:this.getZlevelBase(),z:this.getZBase()+1,hoverable:!1,style:{xStart:this._getLabelLineStartPoint(o,u,n,r,d),yStart:a+h/2,xEnd:this._getLabelPoint(v.position,o,u,n,r,y,d),yEnd:a+h/2,strokeColor:_.color||i,lineType:_.type,lineWidth:_.width}};return f="emphasis",m=g[f].labelLine||m,y=g[f].labelLine.length||y,_=m.lineStyle||_,v=g[f].label||v,v.position=v.position,x.highlightStyle={xEnd:this._getLabelPoint(v.position,o,u,n,r,y,d),strokeColor:_.color||i,lineType:_.type,lineWidth:_.width},new s(x)},_getLabelPoint:function(t,e,i,o,s,a,n){switch(t="inner"===t||"inside"===t?"center":t){case"center":return"center"==n?e+o/2:"left"==n?e+10:e+o-10;case"left":return"auto"===a?i.x-10:"center"==n?i.centerX-Math.max(o,s)/2-a:"right"==n?e-(s>o?s-o:0)-a:i.x-a;default:return"auto"===a?i.x+i.width+10:"center"==n?i.centerX+Math.max(o,s)/2+a:"right"==n?i.x+i.width+a:e+Math.max(o,s)+a}},_getLabelLineStartPoint:function(t,e,i,o,s){return"center"==s?e.centerX:o>i?t+Math.min(i,o)/2:t+Math.max(i,o)/2},_needLabel:function(t,e,i){return this.deepQuery([e,t],"itemStyle."+(i?"emphasis":"normal")+".label.show")},_needLabelLine:function(t,e,i){return this.deepQuery([e,t],"itemStyle."+(i?"emphasis":"normal")+".labelLine.show")},refresh:function(t){t&&(this.option=t,this.series=t.series),this.backupShapeList(),this._buildShape()}},l.inherits(e,i),t("../chart").define("funnel",e),e});