!function(t){"object"==typeof exports&&"object"==typeof module?t(require("codemirror")):"function"==typeof define&&define.amd?define(["codemirror"],t):t(CodeMirror)}(function(t){"use strict";function e(t,e){function i(t){clearTimeout(n.doRedraw),n.doRedraw=setTimeout(function(){n.redraw()},t)}this.cm=t,this.options=e,this.buttonHeight=e.scrollButtonHeight||t.getOption("scrollButtonHeight"),this.annotations=[],this.doRedraw=this.doUpdate=null,this.div=t.getWrapperElement().appendChild(document.createElement("div")),this.div.style.cssText="position: absolute; right: 0; top: 0; z-index: 7; pointer-events: none",this.computeScale();var n=this;t.on("refresh",this.resizeHandler=function(){clearTimeout(n.doUpdate),n.doUpdate=setTimeout(function(){n.computeScale()&&i(20)},100)}),t.on("markerAdded",this.resizeHandler),t.on("markerCleared",this.resizeHandler),!1!==e.listenForChanges&&t.on("changes",this.changeHandler=function(){i(250)})}t.defineExtension("annotateScrollbar",function(t){return"string"==typeof t&&(t={className:t}),new e(this,t)}),t.defineOption("scrollButtonHeight",0),e.prototype.computeScale=function(){var t=this.cm,e=(t.getWrapperElement().clientHeight-t.display.barHeight-2*this.buttonHeight)/t.getScrollerElement().scrollHeight;if(e!=this.hScale)return this.hScale=e,!0},e.prototype.update=function(t){this.annotations=t,this.redraw()},e.prototype.redraw=function(t){!1!==t&&this.computeScale();var i=this.cm,e=this.hScale,n=document.createDocumentFragment(),o=this.annotations,r=i.getOption("lineWrapping"),a=r&&1.5*i.defaultTextHeight(),s=null,h=null;function l(t,e){return s!=t.line&&(s=t.line,h=i.getLineHandle(s)),h.widgets&&h.widgets.length||r&&h.height>a?i.charCoords(t,"local")[e?"top":"bottom"]:i.heightAtLine(h,"local")+(e?0:h.height)}var d=i.lastLine();if(i.display.barWidth)for(var c,p=0;p<o.length;p++){var u=o[p];if(!(u.to.line>d)){for(var f,m,g=c||l(u.from,!0)*e,H=l(u.to,!1)*e;p<o.length-1&&!(o[p+1].to.line>d)&&!(H+.9<(c=l(o[p+1].from,!0)*e));)H=l((u=o[++p]).to,!1)*e;H!=g&&(f=Math.max(H-g,3),(m=n.appendChild(document.createElement("div"))).style.cssText="position: absolute; right: 0px; width: "+Math.max(i.display.barWidth-1,2)+"px; top: "+(g+this.buttonHeight)+"px; height: "+f+"px",m.className=this.options.className,u.id&&m.setAttribute("annotation-id",u.id))}}this.div.textContent="",this.div.appendChild(n)},e.prototype.clear=function(){this.cm.off("refresh",this.resizeHandler),this.cm.off("markerAdded",this.resizeHandler),this.cm.off("markerCleared",this.resizeHandler),this.changeHandler&&this.cm.off("changes",this.changeHandler),this.div.parentNode.removeChild(this.div)}});!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../codemirror")):"function"==typeof define&&define.amd?define(["../codemirror"],t):t(CodeMirror)}(function(h){"use strict";function i(t,e,o){this.orientation=e,this.scroll=o,this.screen=this.total=this.size=1,this.pos=0,this.node=document.createElement("div"),this.node.className=t+"-"+e,this.inner=this.node.appendChild(document.createElement("div"));var r=this;function i(t){var e=h.wheelEventPixels(t)["horizontal"==r.orientation?"x":"y"],o=r.pos;r.moveTo(r.pos+e),r.pos!=o&&h.e_preventDefault(t)}h.on(this.inner,"mousedown",function(t){var e,o,i;function n(){h.off(document,"mousemove",s),h.off(document,"mouseup",n)}function s(t){if(1!=t.which)return n();r.moveTo(i+(t[e]-o)*(r.total/r.size))}1==t.which&&(h.e_preventDefault(t),e="horizontal"==r.orientation?"pageX":"pageY",o=t[e],i=r.pos,h.on(document,"mousemove",s),h.on(document,"mouseup",n))}),h.on(this.node,"click",function(t){h.e_preventDefault(t);var e=r.inner.getBoundingClientRect(),o="horizontal"==r.orientation?t.clientX<e.left?-1:t.clientX>e.right?1:0:t.clientY<e.top?-1:t.clientY>e.bottom?1:0;r.moveTo(r.pos+o*r.screen)}),h.on(this.node,"mousewheel",i),h.on(this.node,"DOMMouseScroll",i)}i.prototype.setPos=function(t,e){return t<0&&(t=0),t>this.total-this.screen&&(t=this.total-this.screen),!(!e&&t==this.pos)&&(this.pos=t,this.inner.style["horizontal"==this.orientation?"left":"top"]=t*(this.size/this.total)+"px",!0)},i.prototype.moveTo=function(t){this.setPos(t)&&this.scroll(t,this.orientation)};function o(t,e,o){this.addClass=t,this.horiz=new i(t,"horizontal",o),e(this.horiz.node),this.vert=new i(t,"vertical",o),e(this.vert.node),this.width=null}i.prototype.update=function(t,e,o){var i=this.screen!=e||this.total!=t||this.size!=o;i&&(this.screen=e,this.total=t,this.size=o);var n=this.screen*(this.size/this.total);n<10&&(this.size-=10-n,n=10),this.inner.style["horizontal"==this.orientation?"width":"height"]=n+"px",this.setPos(this.pos,i)},o.prototype.update=function(t){var e;null!=this.width||(e=window.getComputedStyle?window.getComputedStyle(this.horiz.node):this.horiz.node.currentStyle)&&(this.width=parseInt(e.height));var o=this.width||0,i=t.scrollWidth>t.clientWidth+1,n=t.scrollHeight>t.clientHeight+1;return this.vert.node.style.display=n?"block":"none",this.horiz.node.style.display=i?"block":"none",n&&(this.vert.update(t.scrollHeight,t.clientHeight,t.viewHeight-(i?o:0)),this.vert.node.style.bottom=i?o+"px":"0"),i&&(this.horiz.update(t.scrollWidth,t.clientWidth,t.viewWidth-(n?o:0)-t.barLeft),this.horiz.node.style.right=n?o+"px":"0",this.horiz.node.style.left=t.barLeft+"px"),{right:n?o:0,bottom:i?o:0}},o.prototype.setScrollTop=function(t){this.vert.setPos(t)},o.prototype.setScrollLeft=function(t){this.horiz.setPos(t)},o.prototype.clear=function(){var t=this.horiz.node.parentNode;t.removeChild(this.horiz.node),t.removeChild(this.vert.node)},h.scrollbarModel.simple=function(t,e){return new o("CodeMirror-simplescroll",t,e)},h.scrollbarModel.overlay=function(t,e){return new o("CodeMirror-overlayscroll",t,e)}});!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../codemirror")):"function"==typeof define&&define.amd?define(["../codemirror"],e):e(CodeMirror)}(function(o){"use strict";function i(e,n){o.changeEnd(n).line==e.lastLine()&&d(e)}function d(e){var n="";1<e.lineCount()&&(n=e.display.scroller.clientHeight-30-e.getLineHandle(e.lastLine()).height+"px"),e.state.scrollPastEndPadding!=n&&(e.state.scrollPastEndPadding=n,e.display.lineSpace.parentNode.style.paddingBottom=n,e.off("refresh",d),e.setSize(),e.on("refresh",d))}o.defineOption("scrollPastEnd",!1,function(e,n,t){t&&t!=o.Init&&(e.off("change",i),e.off("refresh",d),e.display.lineSpace.parentNode.style.paddingBottom="",e.state.scrollPastEndPadding=null),n&&(e.on("change",i),e.on("refresh",d),d(e))})});