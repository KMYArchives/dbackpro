"use strict";window.$=window.jQuery=require("jquery");var editor,mysql_conn,mysql_test_conn,mysql_conn_status,psql_conn,psql_test_conn,psql_conn_status,os=require("os"),_=require("lodash"),open=require("open"),knex=require("knex"),path=require("path"),hasha=require("hasha"),fs=require("fs-extra"),mysql=require("mysql"),imgur=require("imgur"),crypt=require("crypto"),sqlite3=require("sqlite3"),download=require("download"),readjson=require("readjson"),microdiff=require("microdiff"),node_cron=require("node-cron"),Store=require("electron-store"),si=require("systeminformation"),datetime=require("node-datetime"),html2canvas=require("html2canvas"),_require=require("electron"),electron=_require.electron,ipcMain=_require.ipcMain,ipcRenderer=_require.ipcRenderer,remote=_require.remote,close_btn="#close",act_class="actived",minimize_btn="#minimize",toggle_toolbox="#toggle-toolbox",el_topbar="#top-bar",el_framebar="#frame-bar",el_statusbar="#status-bar",el_sidebar="#left-sidebar",el_content_app="#content-app",el_menu_actions="#menu-actions",el_toolbox="#toolbox",Classes={has:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:act_class;return!$(e).parent().find(e).hasClass(t)},replace:function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:act_class;$(t).addClass(n),e.forEach(function(e){$(e).removeClass(n)})},toggle:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:act_class,n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:e;(n=$(e).parent().find(n)).hasClass(t)?n.removeClass(t):n.addClass(t)},is_visible:function(e){return $(e).is(":visible")}},GUI={toggle_boxes:function(e){Classes.toggle(e,act_class),$("#"+$(e).attr("toggle")).fadeToggle(anim_time),null!=$(e).attr("hide")&&$(e).attr("hide").split(",").forEach(function(e){$("#"+e.replace(/\s/g,"")).hide()}),null!=$(e).attr("rem-act")&&$(e).attr("rem-act").split(",").forEach(function(e){$("."+e.replace(/\s/g,"")).removeClass(act_class)})},empty_multiple:function(e){e.forEach(function(e){$(e).empty()})},message:function(t,e){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:2500,a=3<arguments.length&&void 0!==arguments[3]?arguments[3]:anim_time;t=Find.replace_all(t,"#",""),$("#"+t).empty(),$("#"+t).text(e),$("#"+t).fadeIn(a),setTimeout(function(e){$("#"+t).fadeOut(a)},n)}},Modals={show:function(e){$(mask).fadeIn(),$(e).fadeIn(),$(menu_user).fadeOut(),$("header > nav > .fa-bars").removeClass(act_class)},close_all:function(){Classes.is_visible(modal)&&($(mask).fadeOut(),$(modal).fadeOut())},close_all_esc:function(){var t=this;document.addEventListener("keydown",function(e){"Escape"===e.key&&t.close_all()})}},Table={header:function(e){var t=this;this.clean_thead(),$(this.thead()).append("<tr></tr>"),_.forEach(e,function(e){$("".concat(t.thead()," > tr")).append("\n\t\t\t\t<th>".concat(e,"</th>\n\t\t\t"))})},clean_table:function(){this.clean_tbody(),this.clean_thead()},clean_thead:function(){$(this.thead()).empty()},clean_tbody:function(){$(this.tbody()).empty()},del_rows:function(e){var t=this;"*"!=e||"*"!=e[0]?_.forEach(e,function(e){$("\n\t\t\t\t\t".concat(t.tbody()," > .").concat(e,"\n\t\t\t\t")).remove()}):this.clean_tbody()},add_rows_data:function(e,t){},add_rows:function(e){var t,n,a=this;1!=(1<arguments.length&&void 0!==arguments[1]&&arguments[1])&&this.clean_tbody(),_.forEach(e,function(e){t=Random.slug(24),null!=e.slug&&(t=e.slug),n="".concat(a.tbody()," > .").concat(t),$(a.tbody()).append("\n\t\t\t\t<tr class='".concat(t,"' onclick=\"").concat(e.click,'"></tr>\n\t\t\t')),null!=e.data&&_.forEach(e.data,function(e){console.log(e)}),_.forEach(e.rows,function(e){$(n).append("\n\t\t\t\t\t<td>".concat(e,"</td>\n\t\t\t\t"))})})},thead:function(){return"".concat(el_content_app," > table > thead")},tbody:function(){return"".concat(el_content_app," > table > tbody")}},Copy={input:function(e){$(e).select(),document.execCommand("copy")},content:function(e){var t=document.createElement("input");return document.body.appendChild(t),t.setAttribute("value",e),t.select(),1==document.execCommand("copy")?(document.body.removeChild(t),!0):(document.body.removeChild(t),!1)}},Core={get_path:function(e){var t=os.tmpdir();switch(e){case"tmp":return t;case"dirname":return __dirname;case"home":return os.homedir();case"downloads":return os.homedir()+"\\Downloads";case"documents":return os.homedir()+"\\Documents";case"local":return Find.replace_all(t,"\\Temp","");case"roaming":return Find.replace_all(t,"\\Local\\Temp","\\Roaming");case"app":return Find.replace_all(t,"\\Local\\Temp","\\Roaming\\dbackpro");case"app/cache":return Find.replace_all(t,"\\Local\\Temp","\\Roaming\\dbackpro\\cache");case"app/tasks":return Find.replace_all(t,"\\Local\\Temp","\\Roaming\\dbackpro\\tasks");case"app/models":return Find.replace_all(t,"\\Local\\Temp","\\Roaming\\dbackpro\\models");case"app/clients":return Find.replace_all(t,"\\Local\\Temp","\\Roaming\\dbackpro\\clients");case"app/plugins":return Find.replace_all(t,"\\Local\\Temp","\\Roaming\\dbackpro\\plugins");case"app/diagrams":return Find.replace_all(t,"\\Local\\Temp","\\Roaming\\dbackpro\\diagrams");case"app/functions":return Find.replace_all(t,"\\Local\\Temp","\\Roaming\\dbackpro\\functions")}},get_file:function(e,t){var n=this,a=!(2<arguments.length&&void 0!==arguments[2])||arguments[2];return e=e,e=n.get_path(e)+"\\"+t,a?Find.replace_all(e,"\\","/"):e},get_os_username:function(){return os.userInfo().username}},Random={slug:function(e){for(var t="",n="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",a=0,r=n.length;a<e;++a)t+=n.charAt(Math.floor(Math.random()*r));return t},password:function(e){for(var t="",n="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@?!#$%&*^~<>(){}[]-_+=",a=0,r=n.length;a<e;++a)t+=n.charAt(Math.floor(Math.random()*r));return t},password_b64:function(e){return Base64.bota(this.password(e))}},Windows={open:function(e){ipcRenderer.send("open-"+e)},main_window_close:function(){ipcRenderer.send("close-main")},main_window_minimize:function(){ipcRenderer.send("min-main")},window_minimize:function(){ipcRenderer.send("min-"+window)},window_close:function(e){ipcRenderer.send("close-"+e)}};function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var FrameBar=function(){function t(e){_classCallCheck(this,t),_defineProperty(this,"element",void 0),this.element=e}return _createClass(t,[{key:"render",value:function(){$(this.element).append("\n\t\t\t<div class='label'>".concat(document.title,"</div>\n\n\t\t\t<div class='options'>\n\t\t\t\t<div class='fas fa-toolbox' id='toggle-toolbox'></div>\n\t\t\t\t<div class='far fa-bell' id='toggle-notify'></div>\n\t\t\t\t<div class='fas fa-window-minimize' id='minimize'></div>\n\t\t\t\t<div class='fas fa-times' id='close'></div>\n\t\t\t</div>\n\t\t"))}},{key:"title",value:function(e){$("".concat(this.element+" > .label")).text("".concat(document.title+": "+e))}}]),t}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var Layout=function(){function e(){_classCallCheck(this,e),_defineProperty(this,"side",void 0),_defineProperty(this,"topbar",void 0),this.side=new SideBar(el_sidebar),this.topbar=new TopBar(el_topbar)}return _createClass(e,[{key:"sidebar",value:function(){this.side.clean(),this.side.set([{id:"menu-app",icon:"fas fa-bars",title:"Menu",click:"Hello world()"},{id:"list-conns",icon:"fas fa-plug",title:"Connections",click:"Hello.world()"},{id:"list-databases",icon:"fas fa-database",title:"Databases",actived:!0,click:"Hello.world()"},{id:"list-users",icon:"fas fa-users",title:"List users",click:"Hello.world()"},{id:"list-backups",icon:"fas fa-sync",title:"Backups",click:"Hello.world()"},{id:"list-code",icon:"fas fa-code",title:"Code models",click:"Hello.world()"},{id:"list-diagrams",icon:"fas fa-project-diagram",title:"Table diagrams",click:"Hello.world()"},{id:"list-tasks",icon:"fas fa-tasks",title:"Tasks",click:"Hello.world()"},{id:"list-history",icon:"fas fa-history",title:"History",click:"Hello.world()"},{id:"list-trash",icon:"fas fa-trash-alt",title:"Recicle bin",click:"Hello.world()"}])}},{key:"render",value:function(){this.sidebar()}}]),e}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var SideBar=function(){function t(e){_classCallCheck(this,t),_defineProperty(this,"element",void 0),this.element=e}return _createClass(t,[{key:"set",value:function(e){var t,n=this;_.forEach(e,function(e){t=null!=e.actived&&1==e.actived?"actived":"",$(n.element).append("\n\t\t\t\t<div id='".concat(e.id,"' class='").concat(e.icon+" "+t,"' title='").concat(e.title,"' onclick='").concat(e.click,"'></div>\n\t\t\t"))})}},{key:"del",value:function(e){var t=this;_.forEach(e,function(e){null!=e.id?$("".concat(t.element+" > #"+e.id)).remove():null!=e.icon&&$("".concat(t.element+" > ."+e.icon)).remove()})}},{key:"show",value:function(e){var t=this;_.forEach(e,function(e){null!=e.id?$("".concat(t.element+" > #"+e.id)).show():null!=e.icon&&$("".concat(t.element+" > ."+e.icon)).show()})}},{key:"hide",value:function(e){var t=this;_.forEach(e,function(e){null!=e.id?$("".concat(t.element+" > #"+e.id)).hide():null!=e.icon&&$("".concat(t.element+" > ."+e.icon)).hide()})}},{key:"clean",value:function(){$(this.element).empty()}}]),t}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var Toolbox=function(){function t(e){_classCallCheck(this,t),_defineProperty(this,"element",void 0),this.element=e}return _createClass(t,[{key:"render",value:function(){$("".concat(this.element)).append("\n\t\t\t<div class='header'>Tools</div>\n\n\t\t\t<div class='tab-tools actived' id='official' onclick='ToolboxTabs.official()'>Official</div>\n\t\t\t<div class='tab-tools' id='third-party' onclick='ToolboxTabs.third_party()'>Third Party</div>\n\n\t\t\t<div class='list'></div>\n\t\t")}},{key:"set",value:function(e){var t=this;_.forEach(e,function(e){$("".concat(t.element," > .list")).append("<div id='".concat(e.id,"' class='item' onclick=\"").concat(e.click,'">').concat(e.text,"</div>"))})}},{key:"del",value:function(e){var t=this;_.forEach(e,function(e){$("".concat(t.element+" > .list > #"+e.id)).remove()})}},{key:"toggle",value:function(e){$(this.element).slideToggle(250),Classes.toggle(e)}},{key:"change_tab",value:function(e){$("".concat(this.element," > .tab-tools")).removeClass("actived"),$("".concat(this.element," > .tab-tools#").concat(e)).addClass("actived")}},{key:"clean",value:function(){$("".concat(this.element," > .list")).empty()}}]),t}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var TopBar=function(){function t(e){_classCallCheck(this,t),_defineProperty(this,"element",void 0),this.element=e}return _createClass(t,[{key:"render",value:function(){$(this.element).append("\n\t\t\t<div id='back-page'></div>\n\t\t\t<div class='label'>New connection</div>\n\t\t\t\n\t\t\t<nav>\n\t\t\t\t<div class='label' id='total'></div>\n\t\t\t\t<div class='custom'></div>\n\t\t\t</nav>\n\t\t")}},{key:"del",value:function(e){var t=this;_.forEach(e,function(e){null!=e.id?$("".concat(t.element+" > nav > .custom > #"+e.id)).remove():null!=e.icon&&$("".concat(t.element+" > nav > .custom > ."+e.icon)).remove()})}},{key:"set",value:function(e){var t,n,a=this;_.forEach(e,function(e){t=null!=e.text?e.text:"",n=null!=e.actived&&1==e.actived?"actived":"",$("".concat(a.element," > nav > .custom")).append("<div class='".concat(e.class+" "+n,"' title='").concat(e.title,"' onclick='").concat(e.click,"'>").concat(t,"</div>"))})}},{key:"iconBack",value:function(e){$("".concat(this.element+" > #back-page")).attr("onclick",e.click),$("".concat(this.element+" > #back-page")).attr("title",e.title||"Back page"),$("".concat(this.element+" > #back-page")).attr("class",e.icon||"fas fa-arrow-left")}},{key:"clean",value:function(){$("".concat(this.element," > nav > .custom")).empty()}},{key:"title",value:function(e){$("".concat(this.element+" > .label")).text(e)}},{key:"total",value:function(e){$("".concat(this.element+" > nav > #total")).text(e)}}]),t}(),ConfirmMisc={text:function(e){switch(e){case"drop_table":return"This action cannot be undone. Confirm drop table ?";case"delete_task":case"delete_backup":case"delete_snippet":case"delete_diagram":return"This action cannot be undone. Confirm deletion ?";case"rename_table":return"Rename table";case"show_conns":return"Back to homepage ?";case"logoff":return"Are you sure you want to sign out of your account ?";case"delete_conn":return"Are you sure you want to delete this connection and everything that is linked to it ?";case"truncate_table":return"This action cannot be undone. Confirm truncate table ?";case"delete_collection":return"This action cannot be undone. Confirm delete collection ?";case"move_trash_diagram":case"move_trash_snippet":return"Are you sure you want to move that for trash ?"}},placeholder:function(e){switch(e){case"drop_table":case"truncate_table":return"Type the table name for execute the action";case"rename_table":return"Type the new name of table"}}},ConfirmTask={close_modal:function(){$(mask).fadeOut(),$(confirm_mdl).fadeOut()},close:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null;switch(this.close_modal(),e){case"move_trash_diagram":GetDiagram.get_local();break;case"move_trash_snippet":GetSnippet.get_local()}},action:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null;if(""!=$("#confirm-input").val())if($("#confirm-input").val()==Storage.get("table"))switch(e){case"drop_table":MySqlTableQueries.drop();break;case"truncate_table":MySqlTableQueries.truncate()}else GUI.message("error-confirm","Error: the table name is incorrect",2500);else GUI.message("error-confirm","Error: type the table name for execute the action",2500)},run:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null;switch(e){case"drop_table":case"truncate_table":this.action(e);break;case"show_conns":StartPage.back();break;case"logoff":Login.logoff();break;case"delete_conn":GetConn.delete(t);break;case"delete_snippet":SnippetIO.delete(t);break;case"delete_diagram":DiagramIO.delete(t);break;case"delete_collection":CollectionManager.delete(t);break;case"move_trash_diagram":TrashActions.move("diagrams",t);break;case"move_trash_snippet":TrashActions.move("snippets",t)}Find.in_array(e,["drop_table","truncate_table"])||this.close()}},Confirm={hide_all_box:function(){$(menu_user).hide(),$(trash_box).hide(),$(share_box).hide(),$(conns_list).hide(),$(menu_action).hide(),$(history_box).hide(),$(contacts_box).hide(),$(collections_box).hide()},run:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null;Modals.close_all(),this.hide_all_box(),$(menu_btn).removeClass(act_class),$(show_conns).removeClass(act_class),$(menu_sidebar+" > div").removeClass(act_class),$(menu_manager+" > .icon").removeClass(act_class),$(confirm_mdl).empty(),$(confirm_mdl).append("\n\t\t\t<div class='conf-content'>\n\t\t\t\t<div class='label'>".concat(ConfirmMisc.text(e),"</div>\n\t\t\t\t<input type='text' id='confirm-input' placeholder='").concat(ConfirmMisc.placeholder(e),"'>\n\t\t\t\t<div class='error' id='error-confirm'></div>\n\t\t\t</div>\n\n\t\t\t<div class='conf-footer'>\n\t\t\t\t<div class='btn' onclick=\"ConfirmTask.run('").concat(e,"', '").concat(t,"')\">Confirm</div>\n\t\t\t\t<div class='btn' onclick=\"ConfirmTask.close('").concat(e,"')\">Cancel</div>\n\t\t\t</div>\n\t\t")),$(mask).fadeIn(),$(confirm_mdl).fadeIn(),Find.in_array(e,["drop_table","rename_table","truncate_table"])&&$("#confirm-input").show()}},Find={search:function(e,t){return-1!=e.search(t)},in_array:function(e,t){for(var n=0;n<t.length;n++)if(t[n]==e)return!0;return!1},array_remove_item:function(e,t){return-1<(t=e.indexOf(t))&&e.splice(t,1),e},replace_all:function(e,t,n){return e.replace(new RegExp(t.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1"),"g"),n)},replace_multiple:function(e,t,n){for(var a=0;a<t.length;a++)e=e.replace(new RegExp(t[a],"g"),n[a]);return e},replace:function(e,t,n){return e.replace(t,n)}},Format={base64:function(e){return e.replace("data:","").replace("image/png","").replace("image/jpeg","").replace("image/gif","").replace("image/webp","").replace("base64,","")},int_float:function(e){for(var t=0,n="",a=e.toString(),r=a.length;0<r;r--)n+=a.substr(r-1,1)+(2==t&&1!=r?".":""),t=2==t?0:t+1;return n.split("").reverse().join("")},bytes:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:2;if(0===(e=parseInt(e)))return"0 Bytes";var n=t<0?0:t,t=Math.floor(Math.log(e)/Math.log(1024));return parseFloat((e/Math.pow(1024,t)).toFixed(n))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][t]},date_time:function(e,t){var n=null==(n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null)?{day:"2-digit",year:"numeric",hour:"2-digit",month:"numeric",minute:"2-digit",second:"2-digit"}:{day:n.day,year:n.year,hour:n.hour,month:n.month,minute:n.minute,second:n.second};return new Date(e).toLocaleDateString(t,n)},percent:function(e,t){var n,a=2<arguments.length&&void 0!==arguments[2]?arguments[2]:2;return 0<(n=3<arguments.length&&void 0!==arguments[3]?arguments[3]:100)*e/t?(n*e/t).toFixed(a):0},float:function(e,t){return parseFloat(e).toPrecision(t)}},Str={capitalize:function(e){return"string"!=typeof e?"":e.charAt(0).toUpperCase()+e.slice(1)},cut:function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"...";return e.length>t?e.slice(0,t-n.length)+n:e},parse:function(e){return JSON.parse(e)},slice:function(e,t,n){return e.split(t)[n]},percent:function(e,t){return(e*(2<arguments.length&&void 0!==arguments[2]?arguments[2]:100)/t).toFixed(3<arguments.length&&void 0!==arguments[3]?arguments[3]:1)},get_last_param:function(e){return e.split("/").slice(-1)[0]},remove_protocols:function(e){return Find.replace(e,/(^\w+:|^)\/\//,"")},stringify:function(e){return JSON.stringify(e,null,1<arguments.length&&void 0!==arguments[1]?arguments[1]:4)}},Validation={ip:function(e){return/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(e)},ip_v6:function(e){return/(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/.test(e)},email:function(e){return/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(e)},int:function(e){return/^\d+$/.test(e)},bool:function(e){return/^\w+$/.test(e)},not_empty:function(e){return/\S+/.test(e)},float:function(e){return/\-?\d+\.\d+/g.test(e)},hash:function(e){return/^[a-f0-9]{128}/gm.test(e)},url:function(e){return/^(http|https):\/\/[^ "]+$/.test(e)},base64:function(e){return/^[-A-Za-z0-9+=]{1,50}|=[^=]|={3,}$/.test(e)},phone:function(e){return/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(e)},date:function(e){return/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(e)}},Base64={encode:function(e){return new Buffer(fs.readFileSync(e)).toString("base64")},decode:function(e,t){fs.writeFileSync(t,new Buffer(e,"base64"))},bota:function(e){return btoa(e)},atoa:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(e){return atoa(e)})},Encoder={hex2bin:function(e){for(var t="",n=0;n<e.length;n+=2){var a=parseInt(e.substr(n,2),16);a&&(t+=String.fromCharCode(a))}return t},bin2hex:function(e){for(var t="",n=0;n<e.length;n++)t+=e[n].charCodeAt(0).toString(16);return t},toDataURL:function(e,n){var a=new XMLHttpRequest;a.onload=function(e){var t=new FileReader;t.onloadend=function(e){n(t.result)},t.readAsDataURL(a.response)},a.open("GET",e),a.responseType="blob",a.send()},hash:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"md5",n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"hex";return crypt.createHash(t).update(e,"utf8").digest(n)}},File={has:function(e){return 1==fs.existsSync(e)},read:function(e){return 1==this.has(e)&&fs.readFileSync(e,"utf8")},unlink:function(e){1==this.has(e)&&fs.unlinkSync(e)},download:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(e){download(e.url).pipe(fs.createWriteStream(Core.get_file(e.dest,e.file_name)))}),new:function(e,t){fs.writeFileSync(e,t,function(e,t){return!t})},size:function(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1],e=fs.statSync(e).size;return t?Format.bytes(e):e},name:function(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1],e=path.basename(e);return t?Str.slice(e,".",0):e},date_time:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"ctime",t=new Date(fs.statSync(e)[t]).toLocaleDateString("en-US",{month:"numeric",day:"numeric",year:"numeric",hour:"numeric",minute:"numeric",seconds:"numeric"});return datetime.create(t).format("m-d-Y H:M:S")},new_folder:function(e){var t=this;1==(1<arguments.length&&void 0!==arguments[1]&&arguments[1])?e.forEach(function(e){0==t.has(e)&&fs.mkdirSync(e)}):0==this.has(path)&&fs.mkdirSync(path)}},Session={get:function(e){return e=sessionStorage.getItem(e),1==Array.isArray(e)?Str.parse(e):e},has:function(e){return!Find.in_array(this.get(e),[null,void 0])},delete:function(e){return 1!=Array.isArray(e)?!!sessionStorage.removeItem(e):(e.forEach(function(e){sessionStorage.removeItem(e)}),!0)},set:function(e,t){return t=1==Array.isArray(t)?Str.parse(t):t,!!sessionStorage.setItem(e,t)}},Storage={get:function(e){return e=localStorage.getItem(e),1==Array.isArray(e)?Str.parse(e):e},has:function(e){return!Find.in_array(this.get(e),[null,void 0])},delete:function(e){return 1!=Array.isArray(e)?!!localStorage.removeItem(e):(e.forEach(function(e){localStorage.removeItem(e)}),!0)},set:function(e,t){return t=1==Array.isArray(t)?Str.parse(t):t,!!localStorage.setItem(e,t)}};function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var StatusBarLabels=function(){function t(e){_classCallCheck(this,t),_defineProperty(this,"element",void 0),this.element=e}return _createClass(t,[{key:"get",value:function(e){var t=this,n=[],a=0;return _.forEach(e,function(e){n.push($("".concat(t.element+" > ."+e)).text()),a++}),1==a?n[0]:n}},{key:"set",value:function(e){var t,n=this;_.forEach(e,function(e){t=null!=e.text?e.text:"",$("".concat(n.element)).append("<div class='label ".concat(e.id,"'>").concat(t,"</div>"))})}},{key:"del",value:function(e){var t=this;"*"==e[0]?this.clean():_.forEach(e,function(e){$("".concat(t.element+" > ."+e)).remove()})}},{key:"edit",value:function(e,t){$("".concat(this.element+" > ."+e)).text(t)}},{key:"clean",value:function(){$("".concat(this.element," > .label")).empty()}}]),t}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var StatusBar=function(){function t(e){_classCallCheck(this,t),_defineProperty(this,"element",void 0),this.element=e}return _createClass(t,[{key:"del",value:function(e){var t=this;_.forEach(e,function(e){null!=e.id?$("".concat(t.element+" > nav > #"+e.id)).remove():null!=e.icon&&$("".concat(t.element+" > nav > ."+e.icon)).remove()})}},{key:"set",value:function(e){var t,n,a=this;_.forEach(e,function(e){t=null!=e.text?e.text:"",n=null!=e.actived&&1==e.actived?"actived":"",$("".concat(a.element," > nav")).append("<div class='".concat(e.class+" "+n,"' title='").concat(e.title,"' onclick='").concat(e.click,"'>").concat(t,"</div>"))})}},{key:"clean",value:function(){$("".concat(this.element," > nav")).empty()}},{key:"render",value:function(){$(this.element).append("<nav></nav>")}}]),t}();