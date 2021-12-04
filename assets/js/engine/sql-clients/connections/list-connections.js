var topbar_loader = new TopBar(el_topbar),
	sidebar_loader = new SideBar(el_sidebar)

const ListConnections = {

	list () {
		Table.clean_table()
		Table.header([ 'Name', 'Host', 'User', 'Added in' ])

		DBX.select([
			'slug', 'name', 'host', 'user', 'added_in'
		]).from(
			'conns'
		).then( callback => {
			callback.forEach( conn => {
				Table.add_rows([
					{
						slug: conn.slug,
						click: "Hello.world()",
						rows: [ conn.name, conn.host, conn.user, conn.added_in ]
					}
				], true)
			})
		})
	},

	total () {
		DBX.count(
			'*'
		).from(
			'conns'
		).then( callback => {
			topbar_loader.total(`
				${ 
					callback[0]['count(*)'] 
				} item's
			`)
		})
	},

	sidebar () {
		sidebar_loader.clean()
		sidebar_loader.set([
			{
				id: 'create-conn',
				icon: 'fas fa-plus',
				title: 'Create connection',
				click: 'Hello.world()'
			},
			{
				id: 'delete-conn',
				icon: 'fas fa-trash-alt',
				title: 'Delete all connections',
				click: 'Hello.world()'
			},
		])
	},

	top_bar () {
		this.total()
		topbar_loader.clean()
		topbar_loader.title('Connections')
	},

	page_load () {
		this.list()
		this.top_bar()
		this.sidebar()
	},

}