var topbar_loader = new TopBar(el_topbar),
	sidebar_loader = new SideBar(el_sidebar),
	menubox_loader = new MenuBox(el_menu_actions)

const MySQL_ListTables = {

	tables () {
		El.empty(el_list_content)
		var conn = GetConnection.create_conn()

		conn.raw(`SELECT table_name, table_collation, engine, ROUND((data_length + index_length)) AS 'size', create_time FROM information_schema.tables WHERE table_schema = '${ Storage.get('dbSelected') }' ORDER BY table_name ASC`).then( callback => {
			_.forEach( callback[0], element => {
				conn.raw("SELECT COUNT(*) AS 'rows' FROM " + Storage.get('dbSelected') + "." + element.table_name).then( callback => {
					callback[0].forEach( total => {
						this.item_layout(
							element, total.rows
						)
					})
				})

				topbar_loader.total(`${ callback[0].length } table's`)
			})
		})
	},

	sidebar () {
		sidebar_loader.clean()
		sidebar_loader.set([
			{
				id: 'list-databases',
				icon: 'fas fa-arrow-left',
				title: "Back to databases",
				click: 'MySQL_ListDatabases.page_load()',
			},
			{
				actived: true,
				id: 'list-tables',
				icon: 'fas fa-table',
				title: "List tables's",
				click: 'MySQL_ListTables.page_load()',
			},
			{
				id: 'list-backups',
				title: "List backups",
				icon: 'fas fa-arrows-rotate',
				click: 'Hello.world()',
			},
		])
	},

	page_load () {
		Table.hide()
		Table.clean_table()

		this.tables()
		this.sidebar()
		this.menu_actions()

		topbar_loader.title(
			Storage.get('dbSelected')
		)

		topbar_loader.clean()
		topbar_loader.append(`
			<div class='fa-solid fa-file-export' title='Create backup'></div>
			<div class='fa-solid fa-bars' id='menu-manager' title='Manager' onclick='menubox_loader.toggle()'></div>
		`)

		menubox_loader.hide()
		Storage.delete('tblSelected')
	},

	menu_actions () {
		menubox_loader.clean()
		menubox_loader.set([
			{
				id: 'rename-db',
				text: "Rename database",
				click: 'Hello.world()',
			},
			{
				id: 'drop-db',
				text: "Drop database",
				click: 'Hello.world()',
			},
		])
	},

	go_list_tables (db) {
		Storage.set('dbSelected', db)
		this.page_load()
	},

	item_layout (tbl, rows) {
		El.append(el_list_content, `
			<div class="item">
				<div onclick="MySQL_ListCols.go_list_cols('${ tbl.table_name }', '${ rows }')">
					<div class="icon">
						<div class="fas fa-table"></div>
					</div>

					<div class="field1">${ Str.cut(tbl.table_name, 40) }</div>
					<div class="field2">${ Str.cut(tbl.table_collation, 24) }</div>
					<div class="field3">${ Str.cut(tbl.engine, 24) }</div>
					<div class="field4">${ Format.bytes(tbl.size) }</div>
					<div class="field5">${ Format.number(rows) } Row's</div>
				</div>
			</div>
		`)
	},

}