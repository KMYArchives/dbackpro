const Layout = class {

	side
	topbar

	render () {
		this.sidebar()
		this.topbar.render()
	}

	sidebar () {
		this.side.clean_menu_items()
		
		this.side.set_menu_item([
			{
				id: 'menu-app',
				icon: 'fas fa-bars',
				title: 'Menu',
				click: 'Hello world()'
			},
			{
				id: 'list-conns',
				icon: 'fas fa-plug',
				title: 'Connections',
				click: 'Hello.world()'
			},
			{
				id: 'list-databases',
				icon: 'fas fa-database',
				title: 'Databases',
				actived: true,
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
				id: 'list-scans',
				icon: 'fas fa-shield-alt',
				title: 'Scans history',
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
		this.side = new Sidebar(el_sidebar)
		this.topbar = new Topbar(el_topbar)

		this.render()
	}

}