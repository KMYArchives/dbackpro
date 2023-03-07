var topbar_loader = new TopBar(el_topbar),
	sidebar_loader = new SideBar(el_sidebar),
	menubox_loader = new MenuBox(el_menu_actions)

const MySQL_ListCols = {

	sidebar () {
		sidebar_loader.clean()
		sidebar_loader.set([
			{
				id: 'list-databases',
				title: "Back to tables",
				icon: 'fas fa-arrow-left',
				click: 'MySQL_ListTables.page_load()',
			},
			{
				actived: true,
				id: 'list-columns',
				title: "List columns",
				icon: 'fas fa-table-columns',
				click: 'MySQL_ListCols.page_load()',
			},
			{
				id: 'view-diagram',
				title: "View diagram",
				click: 'DiagramModel.show()',
				icon: 'fas fa-project-diagram',
			},
			{
				id: 'view-code',
				icon: 'fas fa-code',
				title: "Show CREATE",
				click: 'MySQL_TableProperties.show_create()',
			},
		])
	},
	
	columns () {
		El.empty(el_list_content)
		var conn = GetConnection.create_conn()

		Table.clean_tbody()
		Table.header([ "Field", "Type", "Collation", "Key", "NULL", "Default", "Extra" ])

		conn.raw(`SHOW FULL COLUMNS FROM ${ Storage.get('dbSelected') }.${ Storage.get('tblSelected') }`).then( callback => {
			_.forEach( callback, results => {
				_.forEach( results, column => {
					if (column.Field != undefined) {
						var coll_key, key_val, def_val, extra_val
					
						if (column.Collation == '' || column.Collation == null) {
							coll_key = "<div class='italic'>None</div>"
						} else {
							coll_key = column.Collation
						}
						
						if (column.Key == '' || column.Key == null) {
							key_val = "<div class='italic'>None</div>"
						} else {
							key_val = Str.cut(column.Key, 36)
						}
		
						if (column.Default == '' || column.Default == null) {
							def_val = "<div class='italic'>None</div>"
						} else {
							def_val = Str.cut(column.Default, 36)
						}
		
						if (column.Extra == '' || column.Extra == null) {
							extra_val = "<div class='italic no-hover'>None</div>"
						} else {
							extra_val = Str.cut(column.Extra.toUpperCase(), 36)
						}
		
						Table.add_rows([
							{
								rows: [
									Str.cut(column.Field, 36),
									Str.cut(column.Type, 36),
									coll_key,
									key_val,
									column.Null,
									def_val,
									extra_val
								]
							}
						], true)
					}
				})
			})
		})

		Table.show()
		topbar_loader.total(`${ Storage.get('tblSelectedRows') } Row's`)
	},

	page_load () {
		this.sidebar()
		this.columns()
		this.menu_actions()

		CloneModal.layout()
		DiagramModel.layout()

		CreateDiagram.create()

		CloneTable.databases()

		topbar_loader.title(
			Storage.get('tblSelected')
		)

		topbar_loader.clean()
		topbar_loader.append(`
			<div class='fa-solid fa-bars' id='menu-manager' title='Manager' onclick='menubox_loader.toggle()'></div>
		`)

		menubox_loader.hide()
	},

	menu_actions () {
		menubox_loader.clean()
		menubox_loader.set([
			{
				text: "Rename",
				id: 'rename-tbl',
				click: 'ConfirmModalTable.rename_table()',
			},
			{
				text: "Check",
				id: 'check-tbl',
				click: 'MySQL_TableProperties.check()',
			},
			{
				text: "Analyze",
				id: 'analyze-tbl',
				click: 'MySQL_TableProperties.analyze()',
			},
			{
				text: "Repair",
				id: 'repair-tbl',
				click: 'MySQL_TableProperties.repair()',
			},
			{
				text: "Optimize",
				id: 'optimize-tbl',
				click: 'MySQL_TableProperties.optimize()',
			},
			{
				text: "Clone",
				id: 'clone-tbl',
				click: 'CloneModal.show()',
			},
			{
				text: "Truncate",
				id: 'truncate-tbl',
				click: 'ConfirmModalTable.truncate_table()',
			},
			{
				text: "Drop",
				id: 'drop-tbl',
				click: 'ConfirmModalTable.drop_table()',
			},
		])
	},

	go_list_cols (tbl, rows) {
		Storage.set('tblSelected', tbl)

		Storage.set(
			'tblSelectedRows', Format.number(rows)
		)

		this.page_load()
	},

}