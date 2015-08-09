define("echarts/chart/line",["require","./base","zrender/shape/Polyline","../util/shape/Icon","../util/shape/HalfSmoothPolygon","../component/axis","../component/grid","../component/dataZoom","../config","../util/ecData","zrender/tool/util","zrender/tool/color","../chart"],function(t){function e(t,e,i,r,n){o.call(this,t,e,i,r,n),this.refresh(r)}function i(t,e,i){var o=e.x,r=e.y,s=e.width,a=e.height,h=a/2;e.symbol.match("empty")&&(t.fillStyle="#fff"),e.brushType="both";var l=e.symbol.replace("empty","").toLowerCase();l.match("star")?(h=l.replace("star","")-0||5,r-=1,l="star"):("rectangle"===l||"arrow"===l)&&(o+=(s-a)/2,s=a);var d="";if(l.match("image")&&(d=l.replace(new RegExp("^image:\\/\\/"),""),l="image",o+=Math.round((s-a)/2)-1,s=a+=2),l=n.prototype.iconLibrary[l]){var c=e.x,p=e.y;t.moveTo(c,p+h),t.lineTo(c+5,p+h),t.moveTo(c+e.width-5,p+h),t.lineTo(c+e.width,p+h);var u=this;l(t,{x:o+4,y:r+4,width:s-8,height:a-8,n:h,image:d},function(){u.modSelf(),i()})}else t.moveTo(o,r+h),t.lineTo(o+s,r+h)}var o=t("./base"),r=t("zrender/shape/Polyline"),n=t("../util/shape/Icon"),s=t("../util/shape/HalfSmoothPolygon");t("../component/axis"),t("../component/grid"),t("../component/dataZoom");var a=t("../config");a.line={zlevel:0,z:2,clickable:!0,legendHoverLink:!0,xAxisIndex:0,yAxisIndex:0,dataFilter:"nearest",itemStyle:{normal:{label:{show:!1},lineStyle:{width:2,type:"solid",shadowColor:"rgba(0,0,0,0)",shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0}},emphasis:{label:{show:!1}}},symbolSize:2,showAllSymbol:!1};var h=t("../util/ecData"),l=t("zrender/tool/util"),d=t("zrender/tool/color");return e.prototype={type:a.CHART_TYPE_LINE,_buildShape:function(){this.finalPLMap={},this._buildPosition()},_buildHorizontal:function(t,e,i,o){for(var r,n,s,a,h,l,d,c,p,u=this.series,g=i[0][0],f=u[g],m=this.component.xAxis.getAxis(f.xAxisIndex||0),y={},_=0,v=e;v>_&&null!=m.getNameByIndex(_);_++){n=m.getCoordByIndex(_);for(var x=0,b=i.length;b>x;x++){r=this.component.yAxis.getAxis(u[i[x][0]].yAxisIndex||0),h=a=d=l=r.getCoord(0);for(var S=0,T=i[x].length;T>S;S++)g=i[x][S],f=u[g],c=f.data[_],p=this.getDataFromOption(c,"-"),y[g]=y[g]||[],o[g]=o[g]||{min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY,sum:0,counter:0,average:0},"-"!==p?(p>=0?(a-=S>0?r.getCoordSize(p):h-r.getCoord(p),s=a):0>p&&(l+=S>0?r.getCoordSize(p):r.getCoord(p)-d,s=l),y[g].push([n,s,_,m.getNameByIndex(_),n,h]),o[g].min>p&&(o[g].min=p,o[g].minY=s,o[g].minX=n),o[g].max<p&&(o[g].max=p,o[g].maxY=s,o[g].maxX=n),o[g].sum+=p,o[g].counter++):y[g].length>0&&(this.finalPLMap[g]=this.finalPLMap[g]||[],this.finalPLMap[g].push(y[g]),y[g]=[])}a=this.component.grid.getY();for(var z,x=0,b=i.length;b>x;x++)for(var S=0,T=i[x].length;T>S;S++)g=i[x][S],f=u[g],c=f.data[_],p=this.getDataFromOption(c,"-"),"-"==p&&this.deepQuery([c,f,this.option],"calculable")&&(z=this.deepQuery([c,f],"symbolSize"),a+=2*z+5,s=a,this.shapeList.push(this._getCalculableItem(g,_,m.getNameByIndex(_),n,s,"horizontal")))}for(var C in y)y[C].length>0&&(this.finalPLMap[C]=this.finalPLMap[C]||[],this.finalPLMap[C].push(y[C]),y[C]=[]);this._calculMarkMapXY(o,i,"y"),this._buildBorkenLine(t,this.finalPLMap,m,"horizontal")},_buildVertical:function(t,e,i,o){for(var r,n,s,a,h,l,d,c,p,u=this.series,g=i[0][0],f=u[g],m=this.component.yAxis.getAxis(f.yAxisIndex||0),y={},_=0,v=e;v>_&&null!=m.getNameByIndex(_);_++){s=m.getCoordByIndex(_);for(var x=0,b=i.length;b>x;x++){r=this.component.xAxis.getAxis(u[i[x][0]].xAxisIndex||0),h=a=d=l=r.getCoord(0);for(var S=0,T=i[x].length;T>S;S++)g=i[x][S],f=u[g],c=f.data[_],p=this.getDataFromOption(c,"-"),y[g]=y[g]||[],o[g]=o[g]||{min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY,sum:0,counter:0,average:0},"-"!==p?(p>=0?(a+=S>0?r.getCoordSize(p):r.getCoord(p)-h,n=a):0>p&&(l-=S>0?r.getCoordSize(p):d-r.getCoord(p),n=l),y[g].push([n,s,_,m.getNameByIndex(_),h,s]),o[g].min>p&&(o[g].min=p,o[g].minX=n,o[g].minY=s),o[g].max<p&&(o[g].max=p,o[g].maxX=n,o[g].maxY=s),o[g].sum+=p,o[g].counter++):y[g].length>0&&(this.finalPLMap[g]=this.finalPLMap[g]||[],this.finalPLMap[g].push(y[g]),y[g]=[])}a=this.component.grid.getXend();for(var z,x=0,b=i.length;b>x;x++)for(var S=0,T=i[x].length;T>S;S++)g=i[x][S],f=u[g],c=f.data[_],p=this.getDataFromOption(c,"-"),"-"==p&&this.deepQuery([c,f,this.option],"calculable")&&(z=this.deepQuery([c,f],"symbolSize"),a-=2*z+5,n=a,this.shapeList.push(this._getCalculableItem(g,_,m.getNameByIndex(_),n,s,"vertical")))}for(var C in y)y[C].length>0&&(this.finalPLMap[C]=this.finalPLMap[C]||[],this.finalPLMap[C].push(y[C]),y[C]=[]);this._calculMarkMapXY(o,i,"x"),this._buildBorkenLine(t,this.finalPLMap,m,"vertical")},_buildOther:function(t,e,i,o){for(var r,n=this.series,s={},a=0,h=i.length;h>a;a++)for(var l=0,d=i[a].length;d>l;l++){var c=i[a][l],p=n[c];r=this.component.xAxis.getAxis(p.xAxisIndex||0);var u=this.component.yAxis.getAxis(p.yAxisIndex||0),g=u.getCoord(0);s[c]=s[c]||[],o[c]=o[c]||{min0:Number.POSITIVE_INFINITY,min1:Number.POSITIVE_INFINITY,max0:Number.NEGATIVE_INFINITY,max1:Number.NEGATIVE_INFINITY,sum0:0,sum1:0,counter0:0,counter1:0,average0:0,average1:0};for(var f=0,m=p.data.length;m>f;f++){var y=p.data[f],_=this.getDataFromOption(y,"-");if(_ instanceof Array){var v=r.getCoord(_[0]),x=u.getCoord(_[1]);s[c].push([v,x,f,_[0],v,g]),o[c].min0>_[0]&&(o[c].min0=_[0],o[c].minY0=x,o[c].minX0=v),o[c].max0<_[0]&&(o[c].max0=_[0],o[c].maxY0=x,o[c].maxX0=v),o[c].sum0+=_[0],o[c].counter0++,o[c].min1>_[1]&&(o[c].min1=_[1],o[c].minY1=x,o[c].minX1=v),o[c].max1<_[1]&&(o[c].max1=_[1],o[c].maxY1=x,o[c].maxX1=v),o[c].sum1+=_[1],o[c].counter1++}}}for(var b in s)s[b].length>0&&(this.finalPLMap[b]=this.finalPLMap[b]||[],this.finalPLMap[b].push(s[b]),s[b]=[]);this._calculMarkMapXY(o,i,"xy"),this._buildBorkenLine(t,this.finalPLMap,r,"other")},_buildBorkenLine:function(t,e,i,o){for(var n,a="other"==o?"horizontal":o,c=this.series,p=t.length-1;p>=0;p--){var u=t[p],g=c[u],f=e[u];if(g.type===this.type&&null!=f)for(var m=this._getBbox(u,a),y=this._sIndex2ColorMap[u],_=this.query(g,"itemStyle.normal.lineStyle.width"),v=this.query(g,"itemStyle.normal.lineStyle.type"),x=this.query(g,"itemStyle.normal.lineStyle.color"),b=this.getItemStyleColor(this.query(g,"itemStyle.normal.color"),u,-1),S=null!=this.query(g,"itemStyle.normal.areaStyle"),T=this.query(g,"itemStyle.normal.areaStyle.color"),z=0,C=f.length;C>z;z++){var w=f[z],L="other"!=o&&this._isLarge(a,w);if(L)w=this._getLargePointList(a,w,g.dataFilter);else for(var M=0,E=w.length;E>M;M++)n=g.data[w[M][2]],(this.deepQuery([n,g,this.option],"calculable")||this.deepQuery([n,g],"showAllSymbol")||"categoryAxis"===i.type&&i.isMainAxis(w[M][2])&&"none"!=this.deepQuery([n,g],"symbol"))&&this.shapeList.push(this._getSymbol(u,w[M][2],w[M][3],w[M][0],w[M][1],a));var A=new r({zlevel:g.zlevel,z:g.z,style:{miterLimit:_,pointList:w,strokeColor:x||b||y,lineWidth:_,lineType:v,smooth:this._getSmooth(g.smooth),smoothConstraint:m,shadowColor:this.query(g,"itemStyle.normal.lineStyle.shadowColor"),shadowBlur:this.query(g,"itemStyle.normal.lineStyle.shadowBlur"),shadowOffsetX:this.query(g,"itemStyle.normal.lineStyle.shadowOffsetX"),shadowOffsetY:this.query(g,"itemStyle.normal.lineStyle.shadowOffsetY")},hoverable:!1,_main:!0,_seriesIndex:u,_orient:a});if(h.pack(A,c[u],u,0,z,c[u].name),this.shapeList.push(A),S){var k=new s({zlevel:g.zlevel,z:g.z,style:{miterLimit:_,pointList:l.clone(w).concat([[w[w.length-1][4],w[w.length-1][5]],[w[0][4],w[0][5]]]),brushType:"fill",smooth:this._getSmooth(g.smooth),smoothConstraint:m,color:T?T:d.alpha(y,.5)},highlightStyle:{brushType:"fill"},hoverable:!1,_main:!0,_seriesIndex:u,_orient:a});h.pack(k,c[u],u,0,z,c[u].name),this.shapeList.push(k)}}}},_getBbox:function(t,e){var i=this.component.grid.getBbox(),o=this.xMarkMap[t];return null!=o.minX0?[[Math.min(o.minX0,o.maxX0,o.minX1,o.maxX1),Math.min(o.minY0,o.maxY0,o.minY1,o.maxY1)],[Math.max(o.minX0,o.maxX0,o.minX1,o.maxX1),Math.max(o.minY0,o.maxY0,o.minY1,o.maxY1)]]:("horizontal"===e?(i[0][1]=Math.min(o.minY,o.maxY),i[1][1]=Math.max(o.minY,o.maxY)):(i[0][0]=Math.min(o.minX,o.maxX),i[1][0]=Math.max(o.minX,o.maxX)),i)},_isLarge:function(t,e){return e.length<2?!1:"horizontal"===t?Math.abs(e[0][0]-e[1][0])<.5:Math.abs(e[0][1]-e[1][1])<.5},_getLargePointList:function(t,e,i){var o;o="horizontal"===t?this.component.grid.getWidth():this.component.grid.getHeight();var r=e.length,n=[];if("function"!=typeof i)switch(i){case"min":i=function(t){return Math.max.apply(null,t)};break;case"max":i=function(t){return Math.min.apply(null,t)};break;case"average":i=function(t){for(var e=0,i=0;i<t.length;i++)e+=t[i];return e/t.length};break;default:i=function(t){return t[0]}}for(var s=[],a=0;o>a;a++){var h=Math.floor(r/o*a),l=Math.min(Math.floor(r/o*(a+1)),r);if(!(h>=l)){for(var d=h;l>d;d++)s[d-h]="horizontal"===t?e[d][1]:e[d][0];s.length=l-h;for(var c=i(s),p=-1,u=1/0,d=h;l>d;d++){var g="horizontal"===t?e[d][1]:e[d][0],f=Math.abs(g-c);u>f&&(p=d,u=f)}var m=e[p].slice();"horizontal"===t?m[1]=c:m[0]=c,n.push(m)}}return n},_getSmooth:function(t){return t?.3:0},_getCalculableItem:function(t,e,i,o,r,n){var s=this.series,h=s[t].calculableHolderColor||this.ecTheme.calculableHolderColor||a.calculableHolderColor,l=this._getSymbol(t,e,i,o,r,n);return l.style.color=h,l.style.strokeColor=h,l.rotation=[0,0],l.hoverable=!1,l.draggable=!1,l.style.text=void 0,l},_getSymbol:function(t,e,i,o,r,n){var s=this.series,a=s[t],h=a.data[e],l=this.getSymbolShape(a,t,h,e,i,o,r,this._sIndex2ShapeMap[t],this._sIndex2ColorMap[t],"#fff","vertical"===n?"horizontal":"vertical");return l.zlevel=a.zlevel,l.z=a.z+1,this.deepQuery([h,a,this.option],"calculable")&&(this.setCalculable(l),l.draggable=!0),l},getMarkCoord:function(t,e){var i=this.series[t],o=this.xMarkMap[t],r=this.component.xAxis.getAxis(i.xAxisIndex),n=this.component.yAxis.getAxis(i.yAxisIndex);if(e.type&&("max"===e.type||"min"===e.type||"average"===e.type)){var s=null!=e.valueIndex?e.valueIndex:null!=o.maxX0?"1":"";return[o[e.type+"X"+s],o[e.type+"Y"+s],o[e.type+"Line"+s],o[e.type+s]]}return["string"!=typeof e.xAxis&&r.getCoordByIndex?r.getCoordByIndex(e.xAxis||0):r.getCoord(e.xAxis||0),"string"!=typeof e.yAxis&&n.getCoordByIndex?n.getCoordByIndex(e.yAxis||0):n.getCoord(e.yAxis||0)]},refresh:function(t){t&&(this.option=t,this.series=t.series),this.backupShapeList(),this._buildShape()},ontooltipHover:function(t,e){for(var i,o,r=t.seriesIndex,n=t.dataIndex,s=r.length;s--;)if(i=this.finalPLMap[r[s]])for(var a=0,h=i.length;h>a;a++){o=i[a];for(var l=0,d=o.length;d>l;l++)n===o[l][2]&&e.push(this._getSymbol(r[s],o[l][2],o[l][3],o[l][0],o[l][1],"horizontal"))}},addDataAnimation:function(t,e){function i(){f--,0===f&&e&&e()}function o(t){t.style.controlPointList=null}for(var r=this.series,n={},s=0,a=t.length;a>s;s++)n[t[s][0]]=t[s];for(var h,l,d,c,p,u,g,f=0,s=this.shapeList.length-1;s>=0;s--)if(p=this.shapeList[s]._seriesIndex,n[p]&&!n[p][3]){if(this.shapeList[s]._main&&this.shapeList[s].style.pointList.length>1){if(u=this.shapeList[s].style.pointList,l=Math.abs(u[0][0]-u[1][0]),c=Math.abs(u[0][1]-u[1][1]),g="horizontal"===this.shapeList[s]._orient,n[p][2]){if("half-smooth-polygon"===this.shapeList[s].type){var m=u.length;this.shapeList[s].style.pointList[m-3]=u[m-2],this.shapeList[s].style.pointList[m-3][g?0:1]=u[m-4][g?0:1],this.shapeList[s].style.pointList[m-2]=u[m-1]}this.shapeList[s].style.pointList.pop(),g?(h=l,d=0):(h=0,d=-c)}else{if(this.shapeList[s].style.pointList.shift(),"half-smooth-polygon"===this.shapeList[s].type){var y=this.shapeList[s].style.pointList.pop();g?y[0]=u[0][0]:y[1]=u[0][1],this.shapeList[s].style.pointList.push(y)}g?(h=-l,d=0):(h=0,d=c)}this.shapeList[s].style.controlPointList=null,this.zr.modShape(this.shapeList[s])}else{if(n[p][2]&&this.shapeList[s]._dataIndex===r[p].data.length-1){this.zr.delShape(this.shapeList[s].id);continue}if(!n[p][2]&&0===this.shapeList[s]._dataIndex){this.zr.delShape(this.shapeList[s].id);continue}}this.shapeList[s].position=[0,0],f++,this.zr.animate(this.shapeList[s].id,"").when(this.query(this.option,"animationDurationUpdate"),{position:[h,d]}).during(o).done(i).start()}f||e&&e()}},n.prototype.iconLibrary.legendLineIcon=i,l.inherits(e,o),t("../chart").define("line",e),e}),define("echarts/util/shape/HalfSmoothPolygon",["require","zrender/shape/Base","zrender/shape/util/smoothBezier","zrender/tool/util","zrender/shape/Polygon"],function(t){function e(t){i.call(this,t)}var i=t("zrender/shape/Base"),o=t("zrender/shape/util/smoothBezier"),r=t("zrender/tool/util");return e.prototype={type:"half-smooth-polygon",buildPath:function(e,i){var r=i.pointList;if(!(r.length<2))if(i.smooth){var n=o(r.slice(0,-2),i.smooth,!1,i.smoothConstraint);e.moveTo(r[0][0],r[0][1]);for(var s,a,h,l=r.length,d=0;l-3>d;d++)s=n[2*d],a=n[2*d+1],h=r[d+1],e.bezierCurveTo(s[0],s[1],a[0],a[1],h[0],h[1]);e.lineTo(r[l-2][0],r[l-2][1]),e.lineTo(r[l-1][0],r[l-1][1]),e.lineTo(r[0][0],r[0][1])}else t("zrender/shape/Polygon").prototype.buildPath(e,i)}},r.inherits(e,i),e});