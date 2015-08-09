define("echarts/chart/radar",["require","./base","zrender/shape/Polygon","../component/polar","../config","../util/ecData","zrender/tool/util","zrender/tool/color","../util/accMath","../chart"],function(t){function e(t,e,o,r,s){i.call(this,t,e,o,r,s),this.refresh(r)}var i=t("./base"),o=t("zrender/shape/Polygon");t("../component/polar");var r=t("../config");r.radar={zlevel:0,z:2,clickable:!0,legendHoverLink:!0,polarIndex:0,itemStyle:{normal:{label:{show:!1},lineStyle:{width:2,type:"solid"}},emphasis:{label:{show:!1}}},symbolSize:2};var s=t("../util/ecData"),n=t("zrender/tool/util"),a=t("zrender/tool/color");return e.prototype={type:r.CHART_TYPE_RADAR,_buildShape:function(){this.selectedMap={},this._symbol=this.option.symbolList,this._queryTarget,this._dropBoxList=[],this._radarDataCounter=0;for(var t,e=this.series,i=this.component.legend,o=0,s=e.length;s>o;o++)e[o].type===r.CHART_TYPE_RADAR&&(this.serie=this.reformOption(e[o]),this.legendHoverLink=e[o].legendHoverLink||this.legendHoverLink,t=this.serie.name||"",this.selectedMap[t]=i?i.isSelected(t):!0,this.selectedMap[t]&&(this._queryTarget=[this.serie,this.option],this.deepQuery(this._queryTarget,"calculable")&&this._addDropBox(o),this._buildSingleRadar(o),this.buildMark(o)));this.addShapeList()},_buildSingleRadar:function(t){for(var e,i,o,r,s=this.component.legend,n=this.serie.data,a=this.deepQuery(this._queryTarget,"calculable"),h=0;h<n.length;h++)o=n[h].name||"",this.selectedMap[o]=s?s.isSelected(o):!0,this.selectedMap[o]&&(s?(i=s.getColor(o),e=s.getItemShape(o),e&&(e.style.brushType=this.deepQuery([n[h],this.serie],"itemStyle.normal.areaStyle")?"both":"stroke",s.setItemShape(o,e))):i=this.zr.getColor(h),r=this._getPointList(this.serie.polarIndex,n[h]),this._addSymbol(r,i,h,t,this.serie.polarIndex),this._addDataShape(r,i,n[h],t,h,a),this._radarDataCounter++)},_getPointList:function(t,e){for(var i,o,r=[],s=this.component.polar,n=0,a=e.value.length;a>n;n++)o=this.getDataFromOption(e.value[n]),i="-"!=o?s.getVector(t,n,o):!1,i&&r.push(i);return r},_addSymbol:function(t,e,i,o,r){for(var n,a=this.series,h=this.component.polar,l=0,d=t.length;d>l;l++)n=this.getSymbolShape(this.deepMerge([a[o].data[i],a[o]]),o,a[o].data[i].value[l],l,h.getIndicatorText(r,l),t[l][0],t[l][1],this._symbol[this._radarDataCounter%this._symbol.length],e,"#fff","vertical"),n.zlevel=this.getZlevelBase(),n.z=this.getZBase()+1,s.set(n,"data",a[o].data[i]),s.set(n,"value",a[o].data[i].value),s.set(n,"dataIndex",i),s.set(n,"special",l),this.shapeList.push(n)},_addDataShape:function(t,e,i,r,n,h){var l=this.series,d=[i,this.serie],c=this.getItemStyleColor(this.deepQuery(d,"itemStyle.normal.color"),r,n,i),p=this.deepQuery(d,"itemStyle.normal.lineStyle.width"),u=this.deepQuery(d,"itemStyle.normal.lineStyle.type"),g=this.deepQuery(d,"itemStyle.normal.areaStyle.color"),f=this.deepQuery(d,"itemStyle.normal.areaStyle"),m={zlevel:this.getZlevelBase(),z:this.getZBase(),style:{pointList:t,brushType:f?"both":"stroke",color:g||c||("string"==typeof e?a.alpha(e,.5):e),strokeColor:c||e,lineWidth:p,lineType:u},highlightStyle:{brushType:this.deepQuery(d,"itemStyle.emphasis.areaStyle")||f?"both":"stroke",color:this.deepQuery(d,"itemStyle.emphasis.areaStyle.color")||g||c||("string"==typeof e?a.alpha(e,.5):e),strokeColor:this.getItemStyleColor(this.deepQuery(d,"itemStyle.emphasis.color"),r,n,i)||c||e,lineWidth:this.deepQuery(d,"itemStyle.emphasis.lineStyle.width")||p,lineType:this.deepQuery(d,"itemStyle.emphasis.lineStyle.type")||u}};s.pack(m,l[r],r,i,n,i.name,this.component.polar.getIndicator(l[r].polarIndex)),h&&(m.draggable=!0,this.setCalculable(m)),m=new o(m),this.shapeList.push(m)},_addDropBox:function(t){var e=this.series,i=this.deepQuery(this._queryTarget,"polarIndex");if(!this._dropBoxList[i]){var o=this.component.polar.getDropBox(i);o.zlevel=this.getZlevelBase(),o.z=this.getZBase(),this.setCalculable(o),s.pack(o,e,t,void 0,-1),this.shapeList.push(o),this._dropBoxList[i]=!0}},ondragend:function(t,e){var i=this.series;if(this.isDragend&&t.target){var o=t.target,r=s.get(o,"seriesIndex"),n=s.get(o,"dataIndex");this.component.legend&&this.component.legend.del(i[r].data[n].name),i[r].data.splice(n,1),e.dragOut=!0,e.needRefresh=!0,this.isDragend=!1}},ondrop:function(e,i){var o=this.series;if(this.isDrop&&e.target){var r,n,a=e.target,h=e.dragged,l=s.get(a,"seriesIndex"),d=s.get(a,"dataIndex"),c=this.component.legend;if(-1===d)r={value:s.get(h,"value"),name:s.get(h,"name")},o[l].data.push(r),c&&c.add(r.name,h.style.color||h.style.strokeColor);else{var p=t("../util/accMath");r=o[l].data[d],c&&c.del(r.name),r.name+=this.option.nameConnector+s.get(h,"name"),n=s.get(h,"value");for(var u=0;u<n.length;u++)r.value[u]=p.accAdd(r.value[u],n[u]);c&&c.add(r.name,h.style.color||h.style.strokeColor)}i.dragIn=i.dragIn||!0,this.isDrop=!1}},refresh:function(t){t&&(this.option=t,this.series=t.series),this.backupShapeList(),this._buildShape()}},n.inherits(e,i),t("../chart").define("radar",e),e}),define("echarts/component/polar",["require","./base","zrender/shape/Text","zrender/shape/Line","zrender/shape/Polygon","zrender/shape/Circle","zrender/shape/Ring","../config","zrender/tool/util","../util/coordinates","../util/accMath","../util/smartSteps","../component"],function(t){function e(t,e,o,r,s){i.call(this,t,e,o,r,s),this.refresh(r)}var i=t("./base"),o=t("zrender/shape/Text"),r=t("zrender/shape/Line"),s=t("zrender/shape/Polygon"),n=t("zrender/shape/Circle"),a=t("zrender/shape/Ring"),h=t("../config");h.polar={zlevel:0,z:0,center:["50%","50%"],radius:"75%",startAngle:90,boundaryGap:[0,0],splitNumber:5,name:{show:!0,textStyle:{color:"#333"}},axisLine:{show:!0,lineStyle:{color:"#ccc",width:1,type:"solid"}},axisLabel:{show:!1,textStyle:{color:"#333"}},splitArea:{show:!0,areaStyle:{color:["rgba(250,250,250,0.3)","rgba(200,200,200,0.3)"]}},splitLine:{show:!0,lineStyle:{width:1,color:"#ccc"}},type:"polygon"};var l=t("zrender/tool/util"),d=t("../util/coordinates");return e.prototype={type:h.COMPONENT_TYPE_POLAR,_buildShape:function(){for(var t=0;t<this.polar.length;t++)this._index=t,this.reformOption(this.polar[t]),this._queryTarget=[this.polar[t],this.option],this._createVector(t),this._buildSpiderWeb(t),this._buildText(t),this._adjustIndicatorValue(t),this._addAxisLabel(t);for(var t=0;t<this.shapeList.length;t++)this.zr.addShape(this.shapeList[t])},_createVector:function(t){for(var e,i=this.polar[t],o=this.deepQuery(this._queryTarget,"indicator"),r=o.length,s=i.startAngle,n=2*Math.PI/r,a=this._getRadius(),h=i.__ecIndicator=[],l=0;r>l;l++)e=d.polar2cartesian(a,s*Math.PI/180+n*l),h.push({vector:[e[1],-e[0]]})},_getRadius:function(){var t=this.polar[this._index];return this.parsePercent(t.radius,Math.min(this.zr.getWidth(),this.zr.getHeight())/2)},_buildSpiderWeb:function(t){var e=this.polar[t],i=e.__ecIndicator,o=e.splitArea,r=e.splitLine,s=this.getCenter(t),n=e.splitNumber,a=r.lineStyle.color,h=r.lineStyle.width,l=r.show,d=this.deepQuery(this._queryTarget,"axisLine");this._addArea(i,n,s,o,a,h,l),d.show&&this._addLine(i,s,d)},_addAxisLabel:function(e){for(var i,r,s,n,r,a,h,d,c,p,u=t("../util/accMath"),g=this.polar[e],f=this.deepQuery(this._queryTarget,"indicator"),m=g.__ecIndicator,y=this.deepQuery(this._queryTarget,"splitNumber"),_=this.getCenter(e),v=0;v<f.length;v++)if(i=this.deepQuery([f[v],g,this.option],"axisLabel"),i.show){var x=this.deepQuery([i,g,this.option],"textStyle"),b=this.deepQuery([i,g],"formatter");if(s={},s.textFont=this.getFont(x),s.color=x.color,s=l.merge(s,i),s.lineWidth=s.width,r=m[v].vector,a=m[v].value,d=v/f.length*2*Math.PI,c=i.offset||10,p=i.interval||0,!a)return;for(var S=1;y>=S;S+=p+1)n=l.merge({},s),h=u.accAdd(a.min,u.accMul(a.step,S)),h="function"==typeof b?b(h):"string"==typeof b?b.replace("{a}","{a0}").replace("{a0}",h):this.numAddCommas(h),n.text=h,n.x=S*r[0]/y+Math.cos(d)*c+_[0],n.y=S*r[1]/y+Math.sin(d)*c+_[1],this.shapeList.push(new o({zlevel:this.getZlevelBase(),z:this.getZBase(),style:n,draggable:!1,hoverable:!1}))}},_buildText:function(t){for(var e,i,r,s,n,a,h,l=this.polar[t],d=l.__ecIndicator,c=this.deepQuery(this._queryTarget,"indicator"),p=this.getCenter(t),u=0,g=0,f=0;f<c.length;f++)s=this.deepQuery([c[f],l,this.option],"name"),s.show&&(h=this.deepQuery([s,l,this.option],"textStyle"),i={},i.textFont=this.getFont(h),i.color=h.color,i.text="function"==typeof s.formatter?s.formatter.call(this.myChart,c[f].text,f):"string"==typeof s.formatter?s.formatter.replace("{value}",c[f].text):c[f].text,d[f].text=i.text,e=d[f].vector,r=Math.round(e[0])>0?"left":Math.round(e[0])<0?"right":"center",null==s.margin?e=this._mapVector(e,p,1.1):(a=s.margin,u=e[0]>0?a:-a,g=e[1]>0?a:-a,u=0===e[0]?0:u,g=0===e[1]?0:g,e=this._mapVector(e,p,1)),i.textAlign=r,i.x=e[0]+u,i.y=e[1]+g,n=s.rotate?[s.rotate/180*Math.PI,e[0],e[1]]:[0,0,0],this.shapeList.push(new o({zlevel:this.getZlevelBase(),z:this.getZBase(),style:i,draggable:!1,hoverable:!1,rotation:n})))},getIndicatorText:function(t,e){return this.polar[t]&&this.polar[t].__ecIndicator[e]&&this.polar[t].__ecIndicator[e].text},getDropBox:function(t){var e,i,t=t||0,o=this.polar[t],r=this.getCenter(t),s=o.__ecIndicator,n=s.length,a=[],h=o.type;if("polygon"==h){for(var l=0;n>l;l++)e=s[l].vector,a.push(this._mapVector(e,r,1.2));i=this._getShape(a,"fill","rgba(0,0,0,0)","",1)}else"circle"==h&&(i=this._getCircle("",1,1.2,r,"fill","rgba(0,0,0,0)"));return i},_addArea:function(t,e,i,o,r,s,n){for(var a,h,l,d,c=this.deepQuery(this._queryTarget,"type"),p=0;e>p;p++)h=(e-p)/e,n&&("polygon"==c?(d=this._getPointList(t,h,i),a=this._getShape(d,"stroke","",r,s)):"circle"==c&&(a=this._getCircle(r,s,h,i,"stroke")),this.shapeList.push(a)),o.show&&(l=(e-p-1)/e,this._addSplitArea(t,o,h,l,i,p))},_getCircle:function(t,e,i,o,r,s){var a=this._getRadius();return new n({zlevel:this.getZlevelBase(),z:this.getZBase(),style:{x:o[0],y:o[1],r:a*i,brushType:r,strokeColor:t,lineWidth:e,color:s},hoverable:!1,draggable:!1})},_getRing:function(t,e,i,o){var r=this._getRadius();return new a({zlevel:this.getZlevelBase(),z:this.getZBase(),style:{x:o[0],y:o[1],r:e*r,r0:i*r,color:t,brushType:"fill"},hoverable:!1,draggable:!1})},_getPointList:function(t,e,i){for(var o,r=[],s=t.length,n=0;s>n;n++)o=t[n].vector,r.push(this._mapVector(o,i,e));return r},_getShape:function(t,e,i,o,r){return new s({zlevel:this.getZlevelBase(),z:this.getZBase(),style:{pointList:t,brushType:e,color:i,strokeColor:o,lineWidth:r},hoverable:!1,draggable:!1})},_addSplitArea:function(t,e,i,o,r,s){var n,a,h,l,d,c=t.length,p=e.areaStyle.color,u=[],c=t.length,g=this.deepQuery(this._queryTarget,"type");if("string"==typeof p&&(p=[p]),a=p.length,n=p[s%a],"polygon"==g)for(var f=0;c>f;f++)u=[],h=t[f].vector,l=t[(f+1)%c].vector,u.push(this._mapVector(h,r,i)),u.push(this._mapVector(h,r,o)),u.push(this._mapVector(l,r,o)),u.push(this._mapVector(l,r,i)),d=this._getShape(u,"fill",n,"",1),this.shapeList.push(d);else"circle"==g&&(d=this._getRing(n,i,o,r),this.shapeList.push(d))},_mapVector:function(t,e,i){return[t[0]*i+e[0],t[1]*i+e[1]]},getCenter:function(t){var t=t||0;return this.parseCenter(this.zr,this.polar[t].center)},_addLine:function(t,e,i){for(var o,r,s=t.length,n=i.lineStyle,a=n.color,h=n.width,l=n.type,d=0;s>d;d++)r=t[d].vector,o=this._getLine(e[0],e[1],r[0]+e[0],r[1]+e[1],a,h,l),this.shapeList.push(o)},_getLine:function(t,e,i,o,s,n,a){return new r({zlevel:this.getZlevelBase(),z:this.getZBase(),style:{xStart:t,yStart:e,xEnd:i,yEnd:o,strokeColor:s,lineWidth:n,lineType:a},hoverable:!1})},_adjustIndicatorValue:function(e){for(var i,o,r,s=this.polar[e],n=this.deepQuery(this._queryTarget,"indicator"),a=n.length,h=s.__ecIndicator,l=this._getSeriesData(e),d=s.boundaryGap,c=s.splitNumber,p=s.scale,u=t("../util/smartSteps"),g=0;a>g;g++){if("number"==typeof n[g].max)i=n[g].max,o=n[g].min||0,r={max:i,min:o};else{var f=this._findValue(l,g,c,d);o=f.min,i=f.max}!p&&o>=0&&i>=0&&(o=0),!p&&0>=o&&0>=i&&(i=0);var m=u(o,i,c,r);h[g].value={min:m.min,max:m.max,step:m.step}}},_getSeriesData:function(t){for(var e,i,o,r=[],s=this.component.legend,n=0;n<this.series.length;n++)if(e=this.series[n],e.type==h.CHART_TYPE_RADAR){i=e.data||[];for(var a=0;a<i.length;a++)o=this.deepQuery([i[a],e,this.option],"polarIndex")||0,o!=t||s&&!s.isSelected(i[a].name)||r.push(i[a])}return r},_findValue:function(t,e,i,o){function r(t){(t>s||void 0===s)&&(s=t),(n>t||void 0===n)&&(n=t)}var s,n,a;if(t&&0!==t.length){if(1==t.length&&(n=0),1!=t.length)for(var h=0;h<t.length;h++)r(this.getDataFromOption(t[h].value[e]));else{a=t[0];for(var h=0;h<a.value.length;h++)r(this.getDataFromOption(a.value[h]))}var l=Math.abs(s-n);return n-=Math.abs(l*o[0]),s+=Math.abs(l*o[1]),n===s&&(0===s?s=1:s>0?n=s/i:s/=i),{max:s,min:n}}},getVector:function(t,e,i){t=t||0,e=e||0;var o=this.polar[t].__ecIndicator;if(!(e>=o.length)){var r,s=this.polar[t].__ecIndicator[e],n=this.getCenter(t),a=s.vector,h=s.value.max,l=s.value.min;if("undefined"==typeof i)return n;switch(i){case"min":i=l;break;case"max":i=h;break;case"center":i=(h+l)/2}return r=h!=l?(i-l)/(h-l):.5,this._mapVector(a,n,r)}},isInside:function(t){var e=this.getNearestIndex(t);return e?e.polarIndex:-1},getNearestIndex:function(t){for(var e,i,o,r,s,n,a,h,l,c=0;c<this.polar.length;c++){if(e=this.polar[c],i=this.getCenter(c),t[0]==i[0]&&t[1]==i[1])return{polarIndex:c,valueIndex:0};if(o=this._getRadius(),s=e.startAngle,n=e.indicator,a=n.length,h=2*Math.PI/a,r=d.cartesian2polar(t[0]-i[0],i[1]-t[1]),t[0]-i[0]<0&&(r[1]+=Math.PI),r[1]<0&&(r[1]+=2*Math.PI),l=r[1]-s/180*Math.PI+2*Math.PI,Math.abs(Math.cos(l%(h/2)))*o>r[0])return{polarIndex:c,valueIndex:Math.floor((l+h/2)/h)%a}}},getIndicator:function(t){var t=t||0;return this.polar[t].indicator},refresh:function(t){t&&(this.option=t,this.polar=this.option.polar,this.series=this.option.series),this.clear(),this._buildShape()}},l.inherits(e,i),t("../component").define("polar",e),e}),define("echarts/util/coordinates",["require","zrender/tool/math"],function(t){function e(t,e){return[t*o.sin(e),t*o.cos(e)]}function i(t,e){return[Math.sqrt(t*t+e*e),Math.atan(e/t)]}var o=t("zrender/tool/math");return{polar2cartesian:e,cartesian2polar:i}});