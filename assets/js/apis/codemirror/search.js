!function(e){"object"==typeof exports&&"object"==typeof module?e(require("codemirror")):"function"==typeof define&&define.amd?define(["codemirror"],e):e(CodeMirror)}(function(f){function h(e,n,t){var o=e.getWrapperElement(),r=o.appendChild(document.createElement("div"));return r.className=t?"CodeMirror-dialog CodeMirror-dialog-bottom":"CodeMirror-dialog CodeMirror-dialog-top","string"==typeof n?r.innerHTML=n:r.appendChild(n),f.addClass(o,"dialog-opened"),r}function p(e,n){e.state.currentNotificationClose&&e.state.currentNotificationClose(),e.state.currentNotificationClose=n}f.defineExtension("openDialog",function(e,n,t){t=t||{},p(this,null);var o=h(this,e,t.bottom),r=!1,i=this;function s(e){if("string"==typeof e)a.value=e;else{if(r)return;r=!0,f.rmClass(o.parentNode,"dialog-opened"),o.parentNode.removeChild(o),i.focus(),t.onClose&&t.onClose(o)}}var l,a=o.getElementsByTagName("input")[0];return a?(a.focus(),t.value&&(a.value=t.value,!1!==t.selectValueOnOpen&&a.select()),t.onInput&&f.on(a,"input",function(e){t.onInput(e,a.value,s)}),t.onKeyUp&&f.on(a,"keyup",function(e){t.onKeyUp(e,a.value,s)}),f.on(a,"keydown",function(e){t&&t.onKeyDown&&t.onKeyDown(e,a.value,s)||((27==e.keyCode||!1!==t.closeOnEnter&&13==e.keyCode)&&(a.blur(),f.e_stop(e),s()),13==e.keyCode&&n(a.value,e))}),!1!==t.closeOnBlur&&f.on(o,"focusout",function(e){null!==e.relatedTarget&&s()})):(l=o.getElementsByTagName("button")[0])&&(f.on(l,"click",function(){s(),i.focus()}),!1!==t.closeOnBlur&&f.on(l,"blur",s),l.focus()),s}),f.defineExtension("openConfirm",function(e,n,t){p(this,null);var o=h(this,e,t&&t.bottom),r=o.getElementsByTagName("button"),i=!1,s=this,l=1;function a(){i||(i=!0,f.rmClass(o.parentNode,"dialog-opened"),o.parentNode.removeChild(o),s.focus())}r[0].focus();for(var c=0;c<r.length;++c){var u=r[c];!function(n){f.on(u,"click",function(e){f.e_preventDefault(e),a(),n&&n(s)})}(n[c]),f.on(u,"blur",function(){--l,setTimeout(function(){l<=0&&a()},200)}),f.on(u,"focus",function(){++l})}}),f.defineExtension("openNotification",function(e,n){p(this,s);var t,o=h(this,e,n&&n.bottom),r=!1,i=n&&void 0!==n.duration?n.duration:5e3;function s(){r||(r=!0,clearTimeout(t),f.rmClass(o.parentNode,"dialog-opened"),o.parentNode.removeChild(o))}return f.on(o,"click",function(e){f.e_preventDefault(e),s()}),i&&(t=setTimeout(s,i)),s})}),function(e){"object"==typeof exports&&"object"==typeof module?e(require("codemirror"),require("dialog")):"function"==typeof define&&define.amd?define(["codemirror","dialog"],e):e(CodeMirror)}(function(e){"use strict";function a(e,n){var t=Number(n);return/^[-+]/.test(n)?e.getCursor().line+t:t-1}e.commands.jumpToLine=function(o){var e,n,r=o.getCursor(),t=(n=e=o).phrase("Jump to line:")+' <input type="text" style="width: 10em" class="CodeMirror-search-field"/> <span style="color: #888" class="CodeMirror-search-hint">'+n.phrase("(Use line:column or scroll% syntax)")+"</span>",i=o.phrase("Jump to line:"),s=r.line+1+":"+r.ch,l=function(e){var n,t;e&&((n=/^\s*([\+\-]?\d+)\s*\:\s*(\d+)\s*$/.exec(e))?o.setCursor(a(o,n[1]),Number(n[2])):(n=/^\s*([\+\-]?\d+(\.\d+)?)\%\s*/.exec(e))?(t=Math.round(o.lineCount()*Number(n[1])/100),/^[-+]/.test(n[1])&&(t=r.line+t+1),o.setCursor(t-1,r.ch)):(n=/^\s*\:?\s*([\+\-]?\d+)\s*/.exec(e))&&o.setCursor(a(o,n[1]),r.ch))};e.openDialog?e.openDialog(t,l,{value:s,selectValueOnOpen:!0}):l(prompt(i,s))},e.keyMap.default["Alt-G"]="jumpToLine"}),function(e){"object"==typeof exports&&"object"==typeof module?e(require("codemirror"),require("searchcursor"),require("dialog")):"function"==typeof define&&define.amd?define(["codemirror","searchcursor","dialog"],e):e(CodeMirror)}(function(f){"use strict";function n(){this.posFrom=this.posTo=this.lastQuery=this.query=null,this.overlay=null}function p(e){return e.state.search||(e.state.search=new n)}function i(e){return"string"==typeof e&&e==e.toLowerCase()}function d(e,n,t){return e.getSearchCursor(n,t,{caseFold:i(n),multiline:!0})}function g(e,n,t,o,r){e.openDialog?e.openDialog(n,r,{value:o,selectValueOnOpen:!0}):r(prompt(t,o))}function o(e){return e.replace(/\\([nrt\\])/g,function(e,n){return"n"==n?"\n":"r"==n?"\r":"t"==n?"\t":"\\"==n?"\\":e})}function s(e){var n=e.match(/^\/(.*)\/([a-z]*)$/);if(n)try{e=new RegExp(n[1],-1==n[2].indexOf("i")?"":"i")}catch(e){}else e=o(e);return("string"==typeof e?""==e:e.test(""))&&(e=/x^/),e}function h(e,n,t){var o,r;n.queryText=t,n.query=s(t),e.removeOverlay(n.overlay,i(n.query)),n.overlay=(o=n.query,r=i(n.query),"string"==typeof o?o=new RegExp(o.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),r?"gi":"g"):o.global||(o=new RegExp(o.source,o.ignoreCase?"gi":"g")),{token:function(e){o.lastIndex=e.pos;var n=o.exec(e.string);if(n&&n.index==e.pos)return e.pos+=n[0].length||1,"searching";n?e.pos=n.index:e.skipToEnd()}}),e.addOverlay(n.overlay),e.showMatchesOnScrollbar&&(n.annotate&&(n.annotate.clear(),n.annotate=null),n.annotate=e.showMatchesOnScrollbar(n.query,i(n.query)))}function t(i,n,e,t){var o=p(i);if(o.query)return m(i,n);var r,s,l,a,c,u=i.getSelection()||o.lastQuery;u instanceof RegExp&&"x^"==u.source&&(u=null),e&&i.openDialog?(r=null,s=function(e,n){f.e_stop(n),e&&(e!=o.queryText&&(h(i,o,e),o.posFrom=o.posTo=i.getCursor()),r&&(r.style.opacity=1),m(i,n.shiftKey,function(e,n){var t;n.line<3&&document.querySelector&&(t=i.display.wrapper.querySelector(".CodeMirror-dialog"))&&t.getBoundingClientRect().bottom-4>i.cursorCoords(n,"window").top&&((r=t).style.opacity=.4)}))},a=y(l=i),c=function(e,n){var t=f.keyName(e),o=i.getOption("extraKeys"),r=o&&o[t]||f.keyMap[i.getOption("keyMap")][t];"findNext"==r||"findPrev"==r||"findPersistentNext"==r||"findPersistentPrev"==r?(f.e_stop(e),h(i,p(i),n),i.execCommand(r)):"find"!=r&&"findPersistent"!=r||(f.e_stop(e),s(n,e))},l.openDialog(a,s,{value:u,selectValueOnOpen:!0,closeOnEnter:!1,onClose:function(){v(l)},onKeyDown:c}),t&&u&&(h(i,o,u),m(i,n))):g(i,y(i),"Search for:",u,function(e){e&&!o.query&&i.operation(function(){h(i,o,e),o.posFrom=o.posTo=i.getCursor(),m(i,n)})})}function m(t,o,r){t.operation(function(){var e=p(t),n=d(t,e.query,o?e.posFrom:e.posTo);(n.find(o)||(n=d(t,e.query,o?f.Pos(t.lastLine()):f.Pos(t.firstLine(),0))).find(o))&&(t.setSelection(n.from(),n.to()),t.scrollIntoView({from:n.from(),to:n.to()},20),e.posFrom=n.from(),e.posTo=n.to(),r&&r(n.from(),n.to()))})}function v(n){n.operation(function(){var e=p(n);e.lastQuery=e.query,e.query&&(e.query=e.queryText=null,n.removeOverlay(e.overlay),e.annotate&&(e.annotate.clear(),e.annotate=null))})}function y(e){return'<span class="CodeMirror-search-label">'+e.phrase("Search:")+'</span> <input type="text" style="width: 10em" class="CodeMirror-search-field"/> <span style="color: #888" class="CodeMirror-search-hint">'+e.phrase("(Use /re/ syntax for regexp search)")+"</span>"}function x(n,o,r){n.operation(function(){for(var t,e=d(n,o);e.findNext();)"string"!=typeof o?(t=n.getRange(e.from(),e.to()).match(o),e.replace(r.replace(/\$(\d)/g,function(e,n){return t[n]}))):e.replace(r)})}function r(h,e){var n,t;h.getOption("readOnly")||(n=h.getSelection()||p(h).lastQuery,t='<span class="CodeMirror-search-label">'+(e?h.phrase("Replace all:"):h.phrase("Replace:"))+"</span>",g(h,t+' <input type="text" style="width: 10em" class="CodeMirror-search-field"/> <span style="color: #888" class="CodeMirror-search-hint">'+h.phrase("(Use /re/ syntax for regexp search)")+"</span>",t,n,function(f){f&&(f=s(f),g(h,'<span class="CodeMirror-search-label">'+h.phrase("With:")+'</span> <input type="text" style="width: 10em" class="CodeMirror-search-field"/>',h.phrase("Replace with:"),"",function(l){var a,c,u;l=o(l),e?x(h,f,l):(v(h),a=d(h,f,h.getCursor("from")),c=function(){var e,n,t,o,r,i,s=a.from();!(e=a.findNext())&&(a=d(h,f),!(e=a.findNext())||s&&a.from().line==s.line&&a.from().ch==s.ch)||(h.setSelection(a.from(),a.to()),h.scrollIntoView({from:a.from(),to:a.to()}),t='<span class="CodeMirror-search-label">'+(i=n=h).phrase("Replace?")+"</span> <button>"+i.phrase("Yes")+"</button> <button>"+i.phrase("No")+"</button> <button>"+i.phrase("All")+"</button> <button>"+i.phrase("Stop")+"</button> ",o=h.phrase("Replace?"),r=[function(){u(e)},c,function(){x(h,f,l)}],n.openConfirm?n.openConfirm(t,r):confirm(o)&&r[0]())},u=function(t){a.replace("string"==typeof f?l:l.replace(/\$(\d)/g,function(e,n){return t[n]})),c()},c())}))}))}f.commands.find=function(e){v(e),t(e)},f.commands.findPersistent=function(e){v(e),t(e,!1,!0)},f.commands.findPersistentNext=function(e){t(e,!1,!0,!0)},f.commands.findPersistentPrev=function(e){t(e,!0,!0,!0)},f.commands.findNext=t,f.commands.findPrev=function(e){t(e,!0)},f.commands.clearSearch=v,f.commands.replace=r,f.commands.replaceAll=function(e){r(e,!0)}}),function(e){"object"==typeof exports&&"object"==typeof module?e(require("codemirror")):"function"==typeof define&&define.amd?define(["codemirror"],e):e(CodeMirror)}(function(r){"use strict";var v,y,x=r.Pos;function g(e,n){for(var t,o=null!=(t=e.flags)?t:(e.ignoreCase?"i":"")+(e.global?"g":"")+(e.multiline?"m":""),r=o,i=0;i<n.length;i++)-1==r.indexOf(n.charAt(i))&&(r+=n.charAt(i));return o==r?e:new RegExp(e.source,r)}function m(e){return/\\s|\\n|\n|\\W|\\D|\[\^/.test(e.source)}function d(e,n,t){n=g(n,"g");for(var o=t.line,r=t.ch,i=e.lastLine();o<=i;o++,r=0){n.lastIndex=r;var s=e.getLine(o),l=n.exec(s);if(l)return{from:x(o,l.index),to:x(o,l.index+l[0].length),match:l}}}function C(e,n,t){for(var o,r=0;r<=e.length;){n.lastIndex=r;var i=n.exec(e);if(!i)break;var s=i.index+i[0].length;if(s>e.length-t)break;(!o||s>o.index+o[0].length)&&(o=i),r=i.index+1}return o}function b(e,n,t){n=g(n,"g");for(var o=t.line,r=t.ch,i=e.firstLine();i<=o;o--,r=-1){var s=e.getLine(o),l=C(s,n,r<0?0:s.length-r);if(l)return{from:x(o,l.index),to:x(o,l.index+l[0].length),match:l}}}function L(e,n,t,o){if(e.length==n.length)return t;for(var r=0,i=t+Math.max(0,e.length-n.length);;){if(r==i)return r;var s=r+i>>1,l=o(e.slice(0,s)).length;if(l==t)return s;t<l?i=s:r=1+s}}function o(t,o,e,n){var r;this.atOccurrence=!1,this.doc=t,e=e?t.clipPos(e):x(0,0),this.pos={from:e,to:e},"object"==typeof n?r=n.caseFold:(r=n,n=null),"string"==typeof o?(null==r&&(r=!1),this.matches=function(e,n){return(e?function(e,n,t,o){if(!n.length)return null;var r=o?v:y,i=r(n).split(/\r|\n\r?/);e:for(var s=t.line,l=t.ch,a=e.firstLine()-1+i.length;a<=s;s--,l=-1){var c=e.getLine(s);-1<l&&(c=c.slice(0,l));var u=r(c);if(1==i.length){var f=u.lastIndexOf(i[0]);if(-1==f)continue e;return{from:x(s,L(c,u,f,r)),to:x(s,L(c,u,f+i[0].length,r))}}var h=i[i.length-1];if(u.slice(0,h.length)==h){for(var p=1,t=s-i.length+1;p<i.length-1;p++)if(r(e.getLine(t+p))!=i[p])continue e;var d=e.getLine(s+1-i.length),g=r(d);if(g.slice(g.length-i[0].length)==i[0])return{from:x(s+1-i.length,L(d,g,d.length-i[0].length,r)),to:x(s,L(c,u,h.length,r))}}}}:function(e,n,t,o){if(!n.length)return null;var r=o?v:y,i=r(n).split(/\r|\n\r?/);e:for(var s=t.line,l=t.ch,a=e.lastLine()+1-i.length;s<=a;s++,l=0){var c=e.getLine(s).slice(l),u=r(c);if(1==i.length){var f=u.indexOf(i[0]);if(-1==f)continue e;return t=L(c,u,f,r)+l,{from:x(s,L(c,u,f,r)+l),to:x(s,L(c,u,f+i[0].length,r)+l)}}var h=u.length-i[0].length;if(u.slice(h)==i[0]){for(var p=1;p<i.length-1;p++)if(r(e.getLine(s+p))!=i[p])continue e;var d=e.getLine(s+i.length-1),g=r(d),m=i[i.length-1];if(g.slice(0,m.length)==m)return{from:x(s,L(c,u,h,r)+l),to:x(s+i.length-1,L(d,g,m.length,r))}}}})(t,o,n,r)}):(o=g(o,"gm"),n&&!1===n.multiline?this.matches=function(e,n){return(e?b:d)(t,o,n)}:this.matches=function(e,n){return(e?function(e,n,t){if(!m(n))return b(e,n,t);n=g(n,"gm");for(var o=1,r=e.getLine(t.line).length-t.ch,i=t.line,s=e.firstLine();s<=i;){for(var l=0;l<o&&s<=i;l++)var a=e.getLine(i--),c=null==c?a:a+"\n"+c;o*=2;var u=C(c,n,r);if(u){var f=c.slice(0,u.index).split("\n"),h=u[0].split("\n"),p=i+f.length,d=f[f.length-1].length;return{from:x(p,d),to:x(p+h.length-1,1==h.length?d+h[0].length:h[h.length-1].length),match:u}}}}:function(e,n,t){if(!m(n))return d(e,n,t);n=g(n,"gm");for(var o=1,r=t.line,i=e.lastLine();r<=i;){for(var s=0;s<o&&!(i<r);s++)var l=e.getLine(r++),a=null==a?l:a+"\n"+l;o*=2,n.lastIndex=t.ch;var c=n.exec(a);if(c){var u=a.slice(0,c.index).split("\n"),f=c[0].split("\n"),h=t.line+u.length-1,p=u[u.length-1].length;return{from:x(h,p),to:x(h+f.length-1,1==f.length?p+f[0].length:f[f.length-1].length),match:c}}}})(t,o,n)})}y=String.prototype.normalize?(v=function(e){return e.normalize("NFD").toLowerCase()},function(e){return e.normalize("NFD")}):(v=function(e){return e.toLowerCase()},function(e){return e}),o.prototype={findNext:function(){return this.find(!1)},findPrevious:function(){return this.find(!0)},find:function(e){for(var n=this.matches(e,this.doc.clipPos(e?this.pos.from:this.pos.to));n&&0==r.cmpPos(n.from,n.to);)e?n.from.ch?n.from=x(n.from.line,n.from.ch-1):n=n.from.line==this.doc.firstLine()?null:this.matches(e,this.doc.clipPos(x(n.from.line-1))):n.to.ch<this.doc.getLine(n.to.line).length?n.to=x(n.to.line,n.to.ch+1):n=n.to.line==this.doc.lastLine()?null:this.matches(e,x(n.to.line+1,0));if(n)return this.pos=n,this.atOccurrence=!0,this.pos.match||!0;var t=x(e?this.doc.firstLine():this.doc.lastLine()+1,0);return this.pos={from:t,to:t},this.atOccurrence=!1},from:function(){if(this.atOccurrence)return this.pos.from},to:function(){if(this.atOccurrence)return this.pos.to},replace:function(e,n){var t;this.atOccurrence&&(t=r.splitLines(e),this.doc.replaceRange(t,this.pos.from,this.pos.to,n),this.pos.to=x(this.pos.from.line+t.length-1,t[t.length-1].length+(1==t.length?this.pos.from.ch:0)))}},r.defineExtension("getSearchCursor",function(e,n,t){return new o(this.doc,e,n,t)}),r.defineDocExtension("getSearchCursor",function(e,n,t){return new o(this,e,n,t)}),r.defineExtension("selectMatches",function(e,n){for(var t=[],o=this.getSearchCursor(e,this.getCursor("from"),n);o.findNext()&&!(0<r.cmpPos(o.to(),this.getCursor("to")));)t.push({anchor:o.from(),head:o.to()});t.length&&this.setSelections(t,0)})});