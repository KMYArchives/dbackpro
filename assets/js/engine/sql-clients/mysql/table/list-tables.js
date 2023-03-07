var topbar_loader = new TopBar(el_topbar),
	sidebar_loader = new SideBar(el_sidebar),
	menubox_loader = new MenuBox(el_menu_actions)

const MySQL_ListTables = {

	tables () {
		El.empty(el_list_content)
		var conn = GetConnection.create_conn()

		conn.raw(`SELECT table_name, table_collation, engine, ROUND((data_length + index_length)) AS 'size', create_time FROM information_schema.tables WHERE table_schema = '${ Storage.get('dbSelected') }' ORDER BY table_name ASC`).then( callback => {
			if (callback[0].length > 0) {
				_.forEach( callback[0], element => {
					conn.raw("SELECT COUNT(*) AS 'rows' FROM " + Storage.get('dbSelected') + "." + element.table_name).then( callback => {
						callback[0].forEach( total => {
							this.item_layout(
								element, total.rows
							)
						})
					})
				})
			} else {
				topbar_loader.clean()
				El.append(el_list_content, `
					<div class="zero">Database is empty</div>
				`)
			}

			topbar_loader.total(`${ callback[0].length } table's`)
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
				icon: 'fas fa-file',
				title: "List backup's",
				click: 'ListBackups.page_load()',
			},
		])
	},

	page_load () {
		topbar_loader.clean()
		topbar_loader.append(`
			<div class='fa-solid fa-file-export' onclick='BackupModal.show()' title='Create backup'></div>
		`)

		Table.hide()
		Table.clean_table()
		El.hide(el_menu_actions)

		this.tables()
		this.sidebar()

		BackupModal.layout()

		topbar_loader.title(
			Storage.get('dbSelected')
		)

		Storage.delete('tblSelected')
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