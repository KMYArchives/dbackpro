"use strict";var CreateBackup={_verbose:function(){return"true"==El.value("#backup-verbose")},_charset:function(){return"true"==El.value("#backup-charset")},_ifNotExist:function(){return"true"==El.value("#backup-ifNotExist")},_formatData:function(){return"true"==El.value("#backup-format-data")},_dropIfExist:function(){return"true"==El.value("#backup-dropIfExist")},_insertDB:function(t){var e=!(1<arguments.length&&void 0!==arguments[1])||arguments[1];DBX.insert(t).into("backups").then(function(t){BackupModal.hide(),ListBackups.page_load(),e&&(El.text(el_msg_return,"Backup generated with successfully..."),El.show(el_msg_return),setTimeout(function(t){return El.hide(el_msg_return)},2500))})},create:function(){var n=this,a=!(0<arguments.length&&void 0!==arguments[0])||arguments[0],o=El.value("#backup-path")+"/",t=Slug.custom({length:[36,48],charset:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"}),l=o+t+".sql";Find.replace(l,".sql",".zip"),mysqldump({connection:{database:Storage.get("dbSelected"),host:JSON.parse(Storage.get("connData")).host,user:JSON.parse(Storage.get("connData")).user,password:JSON.parse(Storage.get("connData")).password},dump:{data:{where:{},lockTables:!0,includeViewData:!1,verbose:this._verbose(),returnFromFunction:!1,format:this._formatData(),maxRowsPerInsertStatement:0},schema:{engine:!0,format:!0,autoIncrement:!0,view:{definer:!1,algorithm:!1,sqlSecurity:!1,createOrReplace:!0},table:{charset:this._charset(),ifNotExist:this._ifNotExist(),dropIfExist:this._dropIfExist()}},trigger:{definer:!1,delimiter:";;",dropIfExist:!0}},dumpToFile:l}).then(function(t){var e=l;n._insertDB({path:o,slug:Slug.range(36,48),db:Storage.get("dbSelected"),dropIfExists:n._dropIfExist(),size:fs.statSync(e).size,name:Find.replace(e,o,""),added_in:datetime.create().format("Y-m-d H:m:S"),conn_id:JSON.parse(Storage.get("connData")).slug,driver:JSON.parse(Storage.get("connData")).driver},a)})}},DeleteBackup={_delete_file:function(){DBX.select("path","name").from("backups").where({slug:Storage.get("backupID")}).then(function(t){File.unlink(t[0].path+t[0].name)})},delete:function(){this._delete_file(),DBX.delete().from("backups").where({slug:Storage.get("backupID")}).then(function(t){ListBackups.list(),ListBackups.total(),ConfirmModal.hide(),Storage.delete("backupID")})},confirm:function(t){Storage.set("backupID",t),ConfirmModalBackup.delete()}},ListBackups={list:function(){var e=this;El.empty(el_list_content),DBX.select(["slug","name","path","driver","size","added_in"]).where({db:Storage.get("dbSelected"),conn_id:JSON.parse(Storage.get("connData")).slug}).from("backups").then(function(t){0<t.length?t.forEach(function(t){e.item_layout(t)}):El.append(el_list_content,'\n\t\t\t\t\t<div class="zero">No backup\'s</div>\n\t\t\t\t')})},total:function(){DBX.count("*").where({db:Storage.get("dbSelected"),conn_id:JSON.parse(Storage.get("connData")).slug}).from("backups").then(function(t){topbar_loader.total("".concat(t[0]["count(*)"]," item's"))})},sidebar:function(){sidebar_loader.clean(),sidebar_loader.set([{id:"list-tables",title:"Back to tables",icon:"fas fa-arrow-left",click:"MySQL_ListTables.page_load()"},{actived:!0,id:"list-local",icon:"fas fa-desktop",title:"List local backup's",click:"ListBackups.page_load()"},{id:"list-cloud",icon:"fas fa-cloud",title:"List cloud backups",click:"Hello.world()"}])},page_load:function(){this.list(),this.total(),this.sidebar(),Storage.delete("backupID")},item_layout:function(t){El.append(el_list_content,'\n\t\t\t<div class="item">\n\t\t\t\t<div class="icon">\n\t\t\t\t\t<div class="fas fa-file"></div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="field1">'.concat(t.added_in,'</div>\n\t\t\t\t<div class="field2">').concat(Str.cut(t.path,30),'</div>\n\t\t\t\t<div class="field3">').concat(t.driver,'</div>\n\t\t\t\t<div class="field4">').concat(Format.bytes(t.size),'</div>\n\n\t\t\t\t<div class="menu">\n\t\t\t\t\t<div class="fas fa-arrow-rotate-right" onclick="RestoreBackup.confirm(\'').concat(t.slug,'\')"></div>\n\t\t\t\t\t<div class="fas fa-trash-alt" onclick="DeleteBackup.confirm(\'').concat(t.slug,"')\"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t"))}},RestoreBackup={_restore:function(t){"mysql2"===t.driver&&this._mysql_restore(t.file)},_mysql_restore:function(t){mysql.createConnection({multipleStatements:!0,database:Storage.get("dbSelected"),host:JSON.parse(Storage.get("connData")).host,port:JSON.parse(Storage.get("connData")).port,user:JSON.parse(Storage.get("connData")).user,password:JSON.parse(Storage.get("connData")).password}).query(fs.readFileSync(t,"utf8"),function(t){ConfirmModal.hide(),MySQL_ListTables.page_load(),El.text(el_msg_return,"Backup retrieved successfully..."),El.show(el_msg_return),setTimeout(function(t){return El.hide(el_msg_return)},2500)})},restore:function(){var n=this;DBX.select("driver","path","name").from("backups").where({slug:Storage.get("backupID")}).then(function(t){var e=t[0].path+t[0].name;n._restore({file:e,driver:t[0].driver})})},confirm:function(t){Storage.set("backupID",t),ConfirmModalBackup.restore()}},DBX=knex({client:"sqlite",connection:{filename:Core.get_file("app","dbackpro.db")}}),Queries={download:function(){fetch("\n\t\t\thttps://pastebin.com/raw/QPRFtH49\n\t\t").then(function(t){return t.json()}).then(function(t){_.forEach(t,function(t){File.download({dest:"app/clients",url:t.download,file_name:t.file_name})})})},get_file:function(t){switch(t){case"pgsql":return Core.get_file("app/clients","pgsql-queries.json");case"mysql":return Core.get_file("app/clients","mysql-queries.json");case"sql-server":return Core.get_file("app/clients","sql-server-queries.json")}},load:function(t,e){return readjson.sync(this.get_file(t))[Find.replace_all(e.type,"_queries","")+"_queries"][e.query]},code_base:function(t,e){return this.load(t,{type:Str.slice(e,".",0),query:Str.slice(e,".",1)})},get:function(t,e){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null,a=0,o=this.code_base(t,e);return null!=n&&_.forEach(n.fields,function(t){o=Find.replace_all(o,"__param_".concat(t,"__"),n.values[a]),a++}),o}},RealTime={tasks:function(){setInterval(function(t){Gravatar.auto_download(),ListConnections.auto_refresh_list()},1e3)}},CreateDiagram={save:function(){},create:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null,t=(El.empty(".diagram"),El.append(".diagram","<div class='tbl-item'></div>"),Storage.get("tblSelected")?Storage.get("tblSelected"):t);El.empty(".tbl-item"),El.append(".tbl-item","\n\t\t\t<div class='tbl-name'>\n\t\t\t\t".concat(t,"\n\t\t\t</div>\n\t\t")),GetConnection.create_conn().raw("SHOW FULL COLUMNS FROM ".concat(Storage.get("dbSelected"),".").concat(t)).then(function(t){_.forEach(t,function(t){_.forEach(t,function(t){var e;null!=t.Field&&(e="","PRI"!=t.Key&&"UNI"!=t.Key||(e="<div class='fas fa-key ".concat(t.Key,"'></div>")),El.append(".tbl-item","\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t".concat(e,"\n\t\t\t\t\t\t\t\t").concat(t.Field,": ").concat(t.Type,"\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t")))})})})}},DeleteDiagram={},GetDiagram={},ListDiagrams={},UploadDiagram={},menubox_loader=new MenuBox(el_menu_actions),BackupModal={show:function(){El.show(el_mask_mdl),El.show(el_backup_mdl)},hide:function(){El.hide(el_mask_mdl),El.hide(el_backup_mdl)},layout:function(){El.empty(el_backup_mdl),El.append(el_backup_mdl,"\n\t\t\t<div class='mdl-title'>\n\t\t\t\t<div class='label'>Create backup</div>\n\t\t\t\t<div class='fas fa-times' onclick='BackupModal.hide()'></div>\n\t\t\t</div>\n\n\t\t\t<div class='body'>\n\t\t\t\t<div class='legend'>Store</div>\n\t\t\t\t<select id='backup-store'>\n\t\t\t\t\t<option value='local'>Local</option>\n\t\t\t\t\t<option value='dbp-cloud'>DBack Pro Cloud</option>\n\t\t\t\t</select>\n\n\t\t\t\t<div class='legend'>Path</div>\n\t\t\t\t<input type='text' id='backup-path' placeholder='Path of dump file' value='".concat(Find.replace_all(Core.get_path("app/dumps"),"\\","/"),"'>\n\n\t\t\t\t<div class='legend'>Verbose</div>\n\t\t\t\t<select id='backup-verbose'>\n\t\t\t\t\t<option value='true'>Enabled</option>\n\t\t\t\t\t<option value='false'>Disabled</option>\n\t\t\t\t</select>\n\n\t\t\t\t<div class='legend'>Format data</div>\n\t\t\t\t<select id='backup-format-data'>\n\t\t\t\t\t<option value='true'>Enabled</option>\n\t\t\t\t\t<option value='false' selected>Disabled</option>\n\t\t\t\t</select>\n\n\t\t\t\t<div class='legend'>Charset</div>\n\t\t\t\t<select id='backup-charset'>\n\t\t\t\t\t<option value='true'>Enabled</option>\n\t\t\t\t\t<option value='false'>Disabled</option>\n\t\t\t\t</select>\n\n\t\t\t\t<div class='legend'>If Not Exist</div>\n\t\t\t\t<select id='backup-ifNotExist'>\n\t\t\t\t\t<option value='true'>Enabled</option>\n\t\t\t\t\t<option value='false'>Disabled</option>\n\t\t\t\t</select>\n\n\t\t\t\t<div class='legend'>Drop If Exist</div>\n\t\t\t\t<select id='backup-dropIfExist'>\n\t\t\t\t\t<option value='true'>Enabled</option>\n\t\t\t\t\t<option value='false'>Disabled</option>\n\t\t\t\t</select>\n\n\t\t\t\t\x3c!--<div class='legend warning'>This method uses the mysqldump application on the backend, make sure the MySQL bin folder is in the Windows environment variables.</div>--\x3e\n\t\t\t</div>\n\n\t\t\t<button class='bblr' onclick='BackupModal.hide()'>Cancel</button>\n\t\t\t<button class='bbrr' onclick='CreateBackup.create()'>Confirm</button>\n\t\t"))}},menubox_loader=new MenuBox(el_menu_actions),CloneModal={show:function(){menubox_loader.hide(),El.value("#clone-tbl-name",Storage.get("tblSelected")),El.show(el_mask_mdl),El.show(el_clone_mdl)},hide:function(){El.hide(el_mask_mdl),El.hide(el_clone_mdl)},layout:function(){El.empty(el_clone_mdl),El.append(el_clone_mdl,'\n\t\t\t<div class=\'mdl-title\'>\n\t\t\t\t<div class=\'label\'>Clone table</div>\n\t\t\t\t<div class=\'fas fa-times\' onclick=\'CloneModal.hide()\'></div>\n\t\t\t</div>\n\n\t\t\t<div class="legend">Table name</div>\n\t\t\t<input type="text" id="clone-tbl-name" placeholder="Table name">\n\n\t\t\t<div class="legend">Select a database</div>\n\t\t\t<select id="clone-db-name"></select>\n\n\t\t\t<div class="legend">Type</div>\n\t\t\t<select id="clone-options">\n\t\t\t\t<option value="data">Data only</option>\n\t\t\t\t<option value="structure">Structure only</option>\n\t\t\t\t<option value="data-structure" selected>Data and structure</option>\n\t\t\t</select>\n\n\t\t\t<button class="bblr" onclick="CloneModal.hide()">Cancel</button>\n\t\t\t<button class="bbrr" onclick="CloneTable.clone()">Confirm</button>\n\t\t')}},CodeModal={show:function(){El.show(el_mask_mdl),El.show(el_code_mdl)},hide:function(){El.hide(el_mask_mdl),El.hide(el_code_mdl)},layout:function(){""==El.html(el_code_mdl)&&(El.append(el_code_mdl,"\n\t\t\t\t<div class='mdl-title'>\n\t\t\t\t\t<div class='label' id='code-tbl-name'></div>\n\n\t\t\t\t\t<div class='fas fa-times' onclick='CodeModal.hide()'></div>\n\t\t\t\t\t<div class='fas fa-cog' onclick='Hello.world()'></div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class='mdl-bar' id='code-tbl-bar'>\n\t\t\t\t\t<div class='item' id='code-tbl-share' onclick='Hello.world()'>Share</div>\n\t\t\t\t\t<div class='item' id='code-tbl-send' onclick='Hello.world()'>Send to</div>\n\n\t\t\t\t\t<div class='right'>\n\t\t\t\t\t\t<div class='message' id='code-tbl-msg'></div>\n\n\t\t\t\t\t\t<div class='icon' id='smd-list' onclick='SMDList.toggle()'>\n\t\t\t\t\t\t\t<div class='fas fa-book'></div>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class='icon' id='code-tbl-save' onclick='Hello.world()'>\n\t\t\t\t\t\t\t<div class='fas fa-floppy-disk'></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class='shot-link' id='".concat(Find.replace(ShotLink.el_main,"#",""),"'>\n\t\t\t\t\t<img id='").concat(Find.replace(ShotLink.el_main_img,"#",""),"'>\n\n\t\t\t\t\t<div class='bottom' id='").concat(Find.replace(ShotLink.el_main_bottom,"#",""),"'>\n\t\t\t\t\t\t<a class='hostname'></a>\n\t\t\t\t\t\t<div class='fas fa-info-circle'></div>\n\t\t\t\t\t\t<div class='fas fa-shield'></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class='smd-list' id='").concat(Find.replace(SMD.el_list_main,"#",""),"'></div>\n\t\t\t\t<div class='smd-get' id='").concat(Find.replace(SMD.el_main,"#",""),"'></div>\n\t\t\t\t<div class='smd-get' id='").concat(Find.replace(SMD.el_main_dataset,"#",""),"'></div>\n\n\t\t\t\t<textarea id='").concat(Find.replace(el_editor,"#",""),"'></textarea>\n\t\t\t")),SMD.load_get(),SMD.load_list(),SMD.load_get_dataset(),EditorAutoload.loader())}},DiagramModel={show:function(){El.text("#diagram-tbl-name",Storage.get("tblSelected")),El.show(el_mask_mdl),El.show(el_diagram_mdl)},hide:function(){El.hide(el_mask_mdl),El.hide(el_diagram_mdl)},layout:function(){El.empty(el_diagram_mdl),El.append(el_diagram_mdl,"\n\t\t\t<div class='mdl-title'>\n\t\t\t\t<div class='label' id='diagram-tbl-name'></div>\n\t\t\t\t<div class='fas fa-times' onclick='DiagramModel.hide()'></div>\n\t\t\t</div>\n\n\t\t\t<div class='mdl-bar' id='diagram-tbl-bar'>\n\t\t\t\t<div class='item' id='diagram-tbl-share' onclick='Hello.world()'>Share</div>\n\t\t\t\t<div class='item' id='diagram-tbl-send' onclick='Hello.world()'>Send to</div>\n\n\t\t\t\t<div class='right'>\n\t\t\t\t\t<div class='message' id='diagram-tbl-msg'>Saved with successfully.</div>\n\n\t\t\t\t\t<div class='icon' id='diagram-tbl-save' onclick='Hello.world()'>\n\t\t\t\t\t\t<div class='fas fa-floppy-disk'></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class='diagram'></div>\n\t\t")}},NotifyBox={},Profile={_toggle_exit_icon:function(){Storage.has("userData")?El.show("#exit-icon"):El.hide("#exit-icon")},menu:function(){El.append(el_menu_app,"\n\t\t\t<div class='header'>\n\t\t\t\t<img alt=''>\n\t\t\t\t<div class='name' onclick='Login.open()'></div>\n\n\t\t\t\t<div class='right'>\n\t\t\t\t\t<div class='fas fa-arrow-right-from-bracket' id='exit-icon' title='Logoff' onclick='Login.logoff()'></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class='list'>\n\t\t\t\t<div class='item'>Setting's</div>\n\t\t\t\t<div class='item'>My cloud</div>\n\t\t\t\t<div class='item'>My account</div>\n\t\t\t\t<div class='item'>Help & Support</div>\n\t\t\t</div>\n\t\t")},set_name_avatar:function(){var t;Storage.has("userData")?(t=JSON.parse(Storage.get("userData")),El.text(el_menu_app+" > .header > .name",t.name)):El.text(el_menu_app+" > .header > .name","Connect your account"),Attr.set(el_menu_app+" > .header > img","src",Gravatar.get()),this._toggle_exit_icon()}},ConfirmModalBackup={delete:function(){El.empty(el_confirm_modal),El.append(el_confirm_modal,'\n\t\t\t<div class="label">Confirm delete backup ?</div>\n\t\t\t\n\t\t\t<button class="bblr" onclick="ConfirmModal.hide()">Cancel</button>\n\t\t\t<button class="bbrr" onclick="DeleteBackup.delete()">Confirm</button>\n\t\t'),ConfirmModal.show()},restore:function(){El.empty(el_confirm_modal),El.append(el_confirm_modal,'\n\t\t\t<div class="label">Confirm restore backup ?</div>\n\t\t\t\n\t\t\t<button class="bblr" onclick="ConfirmModal.hide()">Cancel</button>\n\t\t\t<button class="bbrr" onclick="RestoreBackup.restore()">Confirm</button>\n\t\t'),ConfirmModal.show()}},ConfirmModalConns={clear:function(){El.empty(el_confirm_modal),El.append(el_confirm_modal,'\n\t\t\t<div class="label">Confirm delete all connection\'s ?</div>\n\n\t\t\t<button class="bblr" onclick="ConfirmModal.hide()">Cancel</button>\n\t\t\t<button class="bbrr" onclick="DeleteConnections.clear()">Confirm</button>\n\t\t'),ConfirmModal.show()},delete:function(t){El.empty(el_confirm_modal),El.append(el_confirm_modal,'\n\t\t\t<div class="label">Confirm delete connection ?</div>\n\n\t\t\t<button class="bblr" onclick="ConfirmModal.hide()">Cancel</button>\n\t\t\t<button class="bbrr" onclick="DeleteConnections.delete(\''.concat(t,"')\">Confirm</button>\n\t\t")),ConfirmModal.show()}},menubox_loader=new MenuBox(el_menu_actions),ConfirmModalTable={drop_table:function(){menubox_loader.hide(),El.empty(el_confirm_modal),El.append(el_confirm_modal,'\n\t\t\t<div class="label">Confirm drop table ?</div>\n\t\t\t\n\t\t\t<button class="bblr" onclick="ConfirmModal.hide()">Cancel</button>\n\t\t\t<button class="bbrr" onclick="MySQL_TableProperties.drop()">Confirm</button>\n\t\t'),ConfirmModal.show()},rename_table:function(){menubox_loader.hide(),El.empty(el_confirm_modal),El.append(el_confirm_modal,'\n\t\t\t<div class="label">Rename table</div>\n\t\t\t<input type="text" id="rename-input-modal" placeholder="Type the new table name">\n\n\t\t\t<button class="bblr" onclick="ConfirmModal.hide()">Cancel</button>\n\t\t\t<button class="bbrr" onclick="MySQL_TableProperties.rename()">Confirm</button>\n\t\t'),ConfirmModal.show(),El.focus("#rename-input-modal"),El.value("#rename-input-modal",Storage.get("tblSelected"))},truncate_table:function(){menubox_loader.hide(),El.empty(el_confirm_modal),El.append(el_confirm_modal,'\n\t\t\t<div class="label">Confirm truncate the table ?</div>\n\n\t\t\t<button class="bblr" onclick="ConfirmModal.hide()">Cancel</button>\n\t\t\t<button class="bbrr" onclick="MySQL_TableProperties.truncate()">Confirm</button>\n\t\t'),ConfirmModal.show()}},ConfirmModal={show:function(){El.show(el_mask_mdl),El.show(el_confirm_modal)},hide:function(){El.hide(el_mask_mdl),El.hide(el_confirm_modal)}},DeleteConnections={clear:function(){DBX.truncate().from("conns").then(function(t){Storage.set(store_force_update,"list-conns")})},delete:function(t){DBX.delete().from("conns").where({slug:t}).then(function(t){Storage.set(store_force_update,"list-conns")})}},GetConnection={get:function(){Storage.has("editConnID")&&DBX.select("*").from("conns").where({slug:Storage.get("editConnID")}).then(function(t){El.value("#conn-name",t[0].name),El.value("#conn-host",t[0].host),El.value("#conn-port",t[0].port),El.value("#conn-user",t[0].user),El.value("#conn-driver",t[0].driver),El.value("#conn-pass",t[0].password),El.value("#conn-timeout",t[0].timeout)})},connect:function(t){DBX.select("*").from("conns").where({slug:t}).then(function(t){Storage.set("connData",JSON.stringify({slug:t[0].slug,name:t[0].name,host:t[0].host,user:t[0].user,port:t[0].port,driver:t[0].driver,password:t[0].password})),MySQL_ListDatabases.page_load()})},create_conn:function(){return knex({client:JSON.parse(Storage.get("connData")).driver,connection:{multipleStatements:!0,host:JSON.parse(Storage.get("connData")).host,port:JSON.parse(Storage.get("connData")).port,user:JSON.parse(Storage.get("connData")).user,password:JSON.parse(Storage.get("connData")).password}})},test_connect:function(t){(mysql_test_conn=knex({client:t.client,connection:{port:t.port,user:t.user,host:t.host,password:t.password}})).raw("SELECT count(*) FROM information_schema.tables GROUP BY table_schema ORDER BY table_schema ASC").then(function(t){0<t.length?console.log("connected"):console.log("error")})}},topbar_loader=new TopBar(el_topbar),sidebar_loader=new SideBar(el_sidebar),ListConnections={list:function(){var e=this;topbar_loader.clean(),El.empty(el_list_content),top_bar.title("Connection's"),DBX.select(["slug","name","host","user","port"]).from("conns").then(function(t){0<t.length?t.forEach(function(t){e.item_layout(t)}):El.append(el_list_content,'\n\t\t\t\t\t<div class="zero">No connection\'s</div>\n\t\t\t\t')})},total:function(){DBX.count("*").from("conns").then(function(t){topbar_loader.total("".concat(t[0]["count(*)"]," item's"))})},sidebar:function(){sidebar_loader.clean(),sidebar_loader.set([{id:"create-conn",icon:"fas fa-plus",title:"Create connection",click:"ManagerConnections.open()"},{id:"delete-conn",icon:"fas fa-trash-alt",title:"Delete all connections",click:"ConfirmModalConns.clear()"}])},top_bar:function(){this.total(),topbar_loader.clean(),topbar_loader.title("Connections")},page_load:function(){this.list(),this.top_bar(),this.sidebar(),Storage.delete("connData")},item_layout:function(t){El.append(el_list_content,'\n\t\t\t<div class="item">\n\t\t\t\t<div onclick="GetConnection.connect(\''.concat(t.slug,'\')">\n\t\t\t\t\t<div class="icon">\n\t\t\t\t\t\t<div class="fas fa-server"></div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class="field1">').concat(Str.cut(t.name,40),'</div>\n\t\t\t\t\t<div class="field2">').concat(Str.cut(t.host,24),'</div>\n\t\t\t\t\t<div class="field3">').concat(Str.cut(t.user,24),'</div>\n\t\t\t\t\t<div class="field4">').concat(t.port,'</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="menu">\n\t\t\t\t\t<div class="fas fa-pen" onclick="ManagerConnections.get(\'').concat(t.slug,'\')"></div>\n\t\t\t\t\t<div class="fas fa-trash-alt" onclick="ConfirmModalConns.delete(\'').concat(t.slug,"')\"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t"))},auto_refresh_list:function(){Storage.has(store_force_update)&&"list-conns"==Storage.get(store_force_update)&&(this.list(),this.total(),Storage.delete(store_force_update))}},ManagerConnections={open:function(){Windows.load_custom({width:360,height:420,parent:"main",url:"pages/new-conn.html"})},create:function(){DBX.insert({slug:Slug.custom({length:[36,48],charset:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"}),name:El.value("#conn-name"),host:El.value("#conn-host"),port:El.value("#conn-port"),user:El.value("#conn-user"),driver:El.value("#conn-driver"),password:El.value("#conn-pass"),timeout:El.value("#conn-timeout"),added_in:datetime.create().format("Y-m-d H:m:S")}).into("conns").then(function(t){Storage.set(store_force_update,"list-conns"),Windows.custom_close()})},update:function(){DBX.update({name:El.value("#conn-name"),host:El.value("#conn-host"),port:El.value("#conn-port"),user:El.value("#conn-user"),driver:El.value("#conn-driver"),password:El.value("#conn-pass"),timeout:El.value("#conn-timeout")}).table("conns").where({slug:Storage.get("editConnID")}).then(function(t){Storage.delete("editConnID"),Storage.set(store_force_update,"list-conns"),Windows.custom_close()})},toggle:function(){El.value("#conn-name")&&El.value("#conn-host")&&El.value("#conn-user")&&(Storage.has("editConnID")?this.update():this.create())},get:function(t){Storage.set("editConnID",t),ManagerConnections.open()}},TestConnection={test:function(){},message:function(t){}},topbar_loader=new TopBar(el_topbar),sidebar_loader=new SideBar(el_sidebar),menubox_loader=new MenuBox(el_menu_actions),MySQL_ListDatabases={sidebar:function(){sidebar_loader.clean(),sidebar_loader.set([{id:"list-conns",icon:"fas fa-arrow-left",title:"Back to connections",click:"ListConnections.page_load()"},{actived:!0,id:"list-databases",icon:"fas fa-database",title:"List databases's",click:"MySQL_ListDatabases.page_load()"},{id:"list-code",icon:"fas fa-code",title:"List models",click:"Hello.world()"},{id:"list-diagrams",title:"List diagrams",icon:"fas fa-diagram-project",click:"Hello.world()"},{id:"list-tasks",title:"List tasks",icon:"fas fa-list-check",click:"Hello.world()"}])},databases:function(){var n=this;El.empty(el_list_content),GetConnection.create_conn().raw("SELECT * FROM information_schema.schemata ORDER BY SCHEMA_NAME ASC").then(function(e){_.forEach(e[0],function(t){n.item_layout(t),topbar_loader.total("".concat(e[0].length," databases's"))})})},page_load:function(){this.sidebar(),this.databases(),CodeModal.layout(),topbar_loader.title(JSON.parse(Storage.get("connData")).name),menubox_loader.clean(),El.hide(el_menu_actions),topbar_loader.clean(),Storage.delete("dbSelected")},item_layout:function(t){El.append(el_list_content,'\n\t\t\t<div class="item">\n\t\t\t\t<div onclick="MySQL_ListTables.go_list_tables(\''.concat(t.SCHEMA_NAME,'\')">\n\t\t\t\t\t<div class="icon">\n\t\t\t\t\t\t<div class="fas fa-database"></div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class="mid-field">').concat(t.SCHEMA_NAME,'</div>\n\t\t\t\t\t<div class="mid-field">').concat(t.DEFAULT_COLLATION_NAME,"</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t"))}},Login={_error:function(t){El.show(el_error_login),El.text(el_error_login,t),Classes.add(el_error_login,"error"),Classes.remove(el_error_login,"info"),setTimeout(function(t){El.hide(el_error_login)},3e3)},_input:function(t){return"email"==t?xss(El.value("#login-email")):"password"==t?xss(El.value("#login-password")):void 0},_return:function(t){switch(t){case"email-invalid":return this._error("Email is not valid.");case"error-login-auth-email":return this._error("The email is wrong.");case"error-login-auth-pass":return this._error("The password is wrong.");case"email-pass-required":return this._error("Email and password are required.")}},open:function(){Storage.has("userData")||(Classes.remove(el_menu_app_btn,act_class),El.hide(el_menu_app),Windows.load_custom({width:540,height:380,parent:"main",url:"pages/login.html"}))},logoff:function(){Storage.has("userData")&&(UserDB.delete(),El.hide(el_menu_app),Classes.remove(el_menu_app_btn,act_class))},connect:function(){var t,e=this;""==this._input("email")||""==this._input("password")?this._return("email-pass-required"):Validation.email(this._input("email"))?((t=new FormData).append("origin","app"),t.append("email",this._input("email")),t.append("pass",this._input("password")),fetch("".concat(Apis.core(),"login/login"),{method:"POST",body:t}).then(function(t){return t.json()}).then(function(t){"success"!=t.return||Storage.has("userData")?e._return(t.return):UserDB.insert({id:t.id,name:t.details.name,email:t.details.email,username:t.details.username,gravatar:t.details.gravatar,avatar:Core.get_file("app/cache","avatar.png")})})):this._return("email-invalid")},toggle_password:function(t){"password"==Attr.get(t,"type")?(Attr.set(t,"type","text"),Classes.change("#toggle-password","fa-eye","fa-eye-slash")):(Attr.set(t,"type","password"),Classes.change("#toggle-password","fa-eye-slash","fa-eye"))}},UserDB={get:function(){DBX.select(DBX.raw("COUNT(*) AS total")).where({name:"account"}).from("configs").then(function(t){0<t[0].total?DBX.select("value").where({name:"account"}).from("configs").then(function(t){Storage.set("userData",t[0].value),Gravatar.download()}):Storage.delete("userData")})},delete:function(){DBX.delete().from("configs").where({name:"account"}).then(function(t){Gravatar.delete(),Storage.delete("userData"),Profile.set_name_avatar()})},insert:function(e){var n=this;DBX.select(DBX.raw("COUNT(*) AS total")).where({name:"account"}).from("configs").then(function(t){0==t[0].total&&DBX.insert({name:"account",slug:Slug.range(36,48),value:JSON.stringify(e),added_in:datetime.create().format("Y-m-d H:m:S")}).into("configs").then(function(t){n.get(),Storage.set(store_force_update,"download-avatar"),Windows.custom_close()})})}},CloneTable={clone:function(){switch(El.value("#clone-options")){case"data":this.clone_data();break;case"structure":this.clone_structure();break;case"data-structure":this.clone_data_structure()}},databases:function(){El.empty("#clone-db-name"),GetConnection.create_conn().raw("SHOW DATABASES").then(function(t){_.forEach(t[0],function(t){t.Database!=Storage.get("dbSelected")&&El.append("#clone-db-name","\n\t\t\t\t\t\t<option value='".concat(t.Database,"'>").concat(t.Database,"</option>\n\t\t\t\t\t"))})})},clone_data:function(){GetConnection.create_conn().raw("INSERT INTO ".concat(El.value("#clone-db-name"),".").concat(El.value("#clone-tbl-name")," SELECT * FROM ").concat(Storage.get("dbSelected"),".").concat(Storage.get("tblSelected"))).then(function(t){CloneModal.hide(),El.text(el_msg_return,"Table data copied to: ".concat(El.value("#clone-db-name"))),El.show(el_msg_return),setTimeout(function(t){return El.hide(el_msg_return)},2500)})},clone_structure:function(){GetConnection.create_conn().raw("CREATE TABLE ".concat(El.value("#clone-db-name"),".").concat(El.value("#clone-tbl-name")," LIKE ").concat(Storage.get("dbSelected"),".").concat(Storage.get("tblSelected"))).then(function(t){CloneModal.hide(),El.text(el_msg_return,"Table structure copied to: ".concat(El.value("#clone-db-name"))),El.show(el_msg_return),setTimeout(function(t){return El.hide(el_msg_return)},2500)})},clone_data_structure:function(){var e=GetConnection.create_conn();e.raw("CREATE TABLE ".concat(El.value("#clone-db-name"),".").concat(El.value("#clone-tbl-name")," LIKE ").concat(Storage.get("dbSelected"),".").concat(Storage.get("tblSelected"))).then(function(t){e.raw("INSERT INTO ".concat(El.value("#clone-db-name"),".").concat(El.value("#clone-tbl-name")," SELECT * FROM ").concat(Storage.get("dbSelected"),".").concat(Storage.get("tblSelected"))).then(function(t){CloneModal.hide(),El.text(el_msg_return,"Table data and structure copied to: ".concat(El.value("#clone-db-name"))),El.show(el_msg_return),setTimeout(function(t){return El.hide(el_msg_return)},2500)})})}},topbar_loader=new TopBar(el_topbar),sidebar_loader=new SideBar(el_sidebar),menubox_loader=new MenuBox(el_menu_actions),MySQL_ListCols={sidebar:function(){sidebar_loader.clean(),sidebar_loader.set([{id:"list-databases",title:"Back to tables",icon:"fas fa-arrow-left",click:"MySQL_ListTables.page_load()"},{actived:!0,id:"list-columns",title:"List columns",icon:"fas fa-table-columns",click:"MySQL_ListCols.page_load()"},{id:"view-diagram",title:"View diagram",click:"DiagramModel.show()",icon:"fas fa-project-diagram"},{id:"view-code",icon:"fas fa-code",title:"Show CREATE",click:"MySQL_TableProperties.show_create()"}])},columns:function(){El.empty(el_list_content);var t=GetConnection.create_conn();Table.clean_tbody(),Table.header(["Field","Type","Collation","Key","NULL","Default","Extra"]),t.raw("SHOW FULL COLUMNS FROM ".concat(Storage.get("dbSelected"),".").concat(Storage.get("tblSelected"))).then(function(t){_.forEach(t,function(t){_.forEach(t,function(t){var e,n,a,o;null!=t.Field&&(e=""==t.Collation||null==t.Collation?"<div class='italic'>None</div>":t.Collation,n=""==t.Key||null==t.Key?"<div class='italic'>None</div>":Str.cut(t.Key,36),a=""==t.Default||null==t.Default?"<div class='italic'>None</div>":Str.cut(t.Default,36),o=""==t.Extra||null==t.Extra?"<div class='italic no-hover'>None</div>":Str.cut(t.Extra.toUpperCase(),36),Table.add_rows([{rows:[Str.cut(t.Field,36),Str.cut(t.Type,36),e,n,t.Null,a,o]}],!0))})})}),Table.show(),topbar_loader.total("".concat(Storage.get("tblSelectedRows")," Row's"))},page_load:function(){this.sidebar(),this.columns(),this.menu_actions(),CloneModal.layout(),DiagramModel.layout(),CreateDiagram.create(),CloneTable.databases(),topbar_loader.title(Storage.get("tblSelected")),topbar_loader.clean(),topbar_loader.append("\n\t\t\t<div class='fa-solid fa-bars' id='menu-manager' title='Manager' onclick='menubox_loader.toggle()'></div>\n\t\t"),menubox_loader.hide()},menu_actions:function(){menubox_loader.clean(),menubox_loader.set([{text:"Rename",id:"rename-tbl",click:"ConfirmModalTable.rename_table()"},{text:"Check",id:"check-tbl",click:"MySQL_TableProperties.check()"},{text:"Analyze",id:"analyze-tbl",click:"MySQL_TableProperties.analyze()"},{text:"Repair",id:"repair-tbl",click:"MySQL_TableProperties.repair()"},{text:"Optimize",id:"optimize-tbl",click:"MySQL_TableProperties.optimize()"},{text:"Clone",id:"clone-tbl",click:"CloneModal.show()"},{text:"Truncate",id:"truncate-tbl",click:"ConfirmModalTable.truncate_table()"},{text:"Drop",id:"drop-tbl",click:"ConfirmModalTable.drop_table()"}])},go_list_cols:function(t,e){Storage.set("tblSelected",t),Storage.set("tblSelectedRows",Format.number(e)),this.page_load()}},topbar_loader=new TopBar(el_topbar),sidebar_loader=new SideBar(el_sidebar),menubox_loader=new MenuBox(el_menu_actions),MySQL_ListTables={tables:function(){var n=this,a=(El.empty(el_list_content),GetConnection.create_conn());a.raw("SELECT table_name, table_collation, engine, ROUND((data_length + index_length)) AS 'size', create_time FROM information_schema.tables WHERE table_schema = '".concat(Storage.get("dbSelected"),"' ORDER BY table_name ASC")).then(function(t){0<t[0].length?_.forEach(t[0],function(e){a.raw("SELECT COUNT(*) AS 'rows' FROM "+Storage.get("dbSelected")+"."+e.table_name).then(function(t){t[0].forEach(function(t){n.item_layout(e,t.rows)})})}):(topbar_loader.clean(),El.append(el_list_content,'\n\t\t\t\t\t<div class="zero">Database is empty</div>\n\t\t\t\t')),topbar_loader.total("".concat(t[0].length," table's"))})},sidebar:function(){sidebar_loader.clean(),sidebar_loader.set([{id:"list-databases",icon:"fas fa-arrow-left",title:"Back to databases",click:"MySQL_ListDatabases.page_load()"},{actived:!0,id:"list-tables",icon:"fas fa-table",title:"List tables's",click:"MySQL_ListTables.page_load()"},{id:"list-backups",icon:"fas fa-file",title:"List backup's",click:"ListBackups.page_load()"}])},page_load:function(){topbar_loader.clean(),topbar_loader.append("\n\t\t\t<div class='fa-solid fa-file-export' onclick='BackupModal.show()' title='Create backup'></div>\n\t\t"),Table.hide(),Table.clean_table(),El.hide(el_menu_actions),this.tables(),this.sidebar(),BackupModal.layout(),topbar_loader.title(Storage.get("dbSelected")),Storage.delete("tblSelected")},go_list_tables:function(t){Storage.set("dbSelected",t),this.page_load()},item_layout:function(t,e){El.append(el_list_content,'\n\t\t\t<div class="item">\n\t\t\t\t<div onclick="MySQL_ListCols.go_list_cols(\''.concat(t.table_name,"', '").concat(e,'\')">\n\t\t\t\t\t<div class="icon">\n\t\t\t\t\t\t<div class="fas fa-table"></div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class="field1">').concat(Str.cut(t.table_name,40),'</div>\n\t\t\t\t\t<div class="field2">').concat(Str.cut(t.table_collation,24),'</div>\n\t\t\t\t\t<div class="field3">').concat(Str.cut(t.engine,24),'</div>\n\t\t\t\t\t<div class="field4">').concat(Format.bytes(t.size),'</div>\n\t\t\t\t\t<div class="field5">').concat(Format.number(e)," Row's</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t"))}},menubox_loader=new MenuBox(el_menu_actions),MySQL_TableProperties={drop:function(){GetConnection.create_conn().raw("DROP TABLE ".concat(Storage.get("dbSelected"),".").concat(Storage.get("tblSelected"))).then(function(t){ConfirmModal.hide(),MySQL_ListTables.page_load()})},check:function(){menubox_loader.toggle(),GetConnection.create_conn().raw("CHECK TABLE ".concat(Storage.get("dbSelected"),".").concat(Storage.get("tblSelected"))).then(function(t){El.text(el_msg_return,"Check: ".concat(t[0][0].Msg_text)),El.show(el_msg_return),setTimeout(function(t){return El.hide(el_msg_return)},2500)})},repair:function(){menubox_loader.toggle(),GetConnection.create_conn().raw("REPAIR TABLE ".concat(Storage.get("dbSelected"),".").concat(Storage.get("tblSelected"))).then(function(t){El.text(el_msg_return,"Repair: ".concat(t[0][0].Msg_text)),El.show(el_msg_return),setTimeout(function(t){return El.hide(el_msg_return)},2500)})},rename:function(){var e=El.value("#rename-input-modal");""!=e&&GetConnection.create_conn().raw("RENAME TABLE ".concat(Storage.get("dbSelected"),".").concat(Storage.get("tblSelected")," TO ").concat(Storage.get("dbSelected"),".").concat(e)).then(function(t){Storage.set("tblSelected",e),MySQL_ListCols.page_load(),ConfirmModal.hide()})},analyze:function(){menubox_loader.toggle(),GetConnection.create_conn().raw("ANALYZE TABLE ".concat(Storage.get("dbSelected"),".").concat(Storage.get("tblSelected"))).then(function(t){El.text(el_msg_return,"Analyze: ".concat(t[0][0].Msg_text)),El.show(el_msg_return),setTimeout(function(t){return El.hide(el_msg_return)},2500)})},optimize:function(){menubox_loader.toggle(),GetConnection.create_conn().raw("OPTIMIZE TABLE ".concat(Storage.get("dbSelected"),".").concat(Storage.get("tblSelected"))).then(function(t){El.text(el_msg_return,"Optimize: ".concat(t[0][0].Msg_text)),El.show(el_msg_return),setTimeout(function(t){return El.hide(el_msg_return)},2500)})},truncate:function(){GetConnection.create_conn().raw("TRUNCATE TABLE ".concat(Storage.get("dbSelected"),".").concat(Storage.get("tblSelected"))).then(function(t){ConfirmModal.hide(),El.text(el_msg_return,"Truncate: The table was truncated"),El.show(el_msg_return),setTimeout(function(t){return El.hide(el_msg_return)},2500),Storage.set("tblSelectedRows","0"),topbar_loader.total("".concat(Storage.get("tblSelectedRows")," Row's"))})},show_create:function(){GetConnection.create_conn().raw("SHOW CREATE TABLE ".concat(Storage.get("dbSelected"),".").concat(Storage.get("tblSelected"))).then(function(t){El.text("#code-tbl-name",t[0][0].Table),editor.getDoc().setValue(t[0][0]["Create Table"]),CodeModal.show()})}};