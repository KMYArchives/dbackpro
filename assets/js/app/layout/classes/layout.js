const Layout = class {

	side
	topbar

	sidebar () {
		this.side.clean()
		
		this.side.set([
			{
				actived: true,
				id: 'list-conns',
				icon: 'fas fa-plug',
				title: 'Connections',
				click: 'ListConnections.page_load()'
			},
			{
				id: 'list-databases',
				icon: 'fas fa-database',
				title: 'Databases',
				click: 'Hello.world()'
			},
			{
				id: 'list-users',
				icon: 'fas fa-users',
				title: 'List users',
				click: 'Hello.world()'
			},
			{
				id: 'list-backups',
				icon: 'fas fa-sync',
				title: 'Backups',
				click: 'Hello.world()'
			},
			{
				id: 'list-code',
				icon: 'fas fa-code',
				title: 'Code models',
				click: 'Hello.world()'
			},
			{
				id: 'list-diagrams',
				icon: 'fas fa-project-diagram',
				title: 'Table diagrams',
				click: 'Hello.world()'
			},
			{
				id: 'list-tasks',
				icon: 'fas fa-tasks',
				title: 'Tasks',
				click: 'Hello.world()'
			},
			{
				id: 'list-history',
				icon: 'fas fa-history',
				title: 'History',
				click: 'Hello.world()'
			},
			{
				id: 'list-trash',
				icon: 'fas fa-trash-alt',
				title: 'Recicle bin',
				click: 'Hello.world()'
			},
		])
	}

	constructor () {
		this.side = new SideBar(el_sidebar)
		this.topbar = new TopBar(el_topbar)
	}

	render () { this.sidebar() }

}