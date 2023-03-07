var topbar_loader = new TopBar(el_topbar),
	sidebar_loader = new SideBar(el_sidebar),
	menubox_loader = new MenuBox(el_menu_actions)

const MySQL_ListDatabases = {

	sidebar () {
		sidebar_loader.clean()
		sidebar_loader.set([
			{
				id: 'list-conns',
				icon: 'fas fa-arrow-left',
				title: "Back to connections",
				click: 'ListConnections.page_load()'
			},
			{
				actived: true,
				id: 'list-databases',
				icon: 'fas fa-database',
				title: "List databases's",
				click: 'MySQL_ListDatabases.page_load()'
			},
			{
				id: 'list-code',
				icon: 'fas fa-code',
				title: "List models",
				click: 'Hello.world()'
			},
			{
				id: 'list-diagrams',
				title: "List diagrams",
				icon: 'fas fa-diagram-project',
				click: 'Hello.world()'
			},
			{
				id: 'list-tasks',
				title: "List tasks",
				icon: 'fas fa-list-check',
				click: 'Hello.world()'
			},
		])
	},

	databases () {
		El.empty(el_list_content)
		var conn = GetConnection.create_conn()

		conn.raw(`SELECT * FROM information_schema.schemata ORDER BY SCHEMA_NAME ASC`).then( callback => {
			_.forEach( callback[0], element => {
				this.item_layout(element)
				topbar_loader.total(`${ callback[0].length } databases's`)
			})
		})
	},

	page_load () {
		this.sidebar()
		this.databases()

		CodeModal.layout()

		topbar_loader.title(
			JSON.parse(
				Storage.get('connData')
			)['name']
		)

		menubox_loader.clean()
		El.hide(el_menu_actions)
		
		topbar_loader.clean()
		Storage.delete('dbSelected')
	},

	item_layout (db) {
		El.append(el_list_content, `
			<div class="item">
				<div onclick="MySQL_ListTables.go_list_tables('${ db.SCHEMA_NAME }')">
					<div class="icon">
						<div class="fas fa-database"></div>
					</div>

					<div class="mid-field">${ db.SCHEMA_NAME }</div>
					<div class="mid-field">${ db.DEFAULT_COLLATION_NAME }</div>
				</div>
			</div>
		`)
	},

}