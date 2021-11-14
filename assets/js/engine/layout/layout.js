const Layout = {

	sidebar () {
		Sidebar.clean_menu_items()
		
		Sidebar.set_menu_item([
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
				id: 'list-trash',
				icon: 'fas fa-trash-alt',
				title: 'Recicle bin',
				click: 'Hello.world()'
			},
		])
	},

}