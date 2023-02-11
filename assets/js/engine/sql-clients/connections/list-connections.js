var topbar_loader = new TopBar(el_topbar),
	sidebar_loader = new SideBar(el_sidebar)

const ListConnections = {

	list () {
		topbar_loader.clean()
		El.empty(el_list_content)
		top_bar.title("Connection's")

		DBX.select([
			'slug', 'name', 'host', 'user', 'port'
		]).from(
			'conns'
		).then( callback => {
			if (callback.length > 0) { 
				callback.forEach( conn => {
					this.item_layout(conn)
				})
			} else {
				El.append(el_list_content, `
					<div class="zero">No connection's</div>
				`)
			}
		})
	},

	total () {
		DBX.count(
			'*'
		).from(
			'conns'
		).then( callback => {
			topbar_loader.total(`${ callback[0]['count(*)'] } item's`)
		})
	},

	sidebar () {
		sidebar_loader.clean()
		sidebar_loader.set([
			{
				id: 'create-conn',
				icon: 'fas fa-plus',
				title: 'Create connection',
				click: 'ManagerConnections.open()'
			},
			{
				id: 'delete-conn',
				icon: 'fas fa-trash-alt',
				title: 'Delete all connections',
				click: 'DeleteConnections.clear()'
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

		Storage.delete('connData')
	},

	item_layout (conn) {
		El.append(el_list_content, `
			<div class="item">
				<div onclick="GetConnection.connect('${ conn.slug }')">
					<div class="icon">
						<div class="fas fa-server"></div>
					</div>

					<div class="field1">${ Str.cut(conn.name, 40) }</div>
					<div class="field2">${ Str.cut(conn.host, 24) }</div>
					<div class="field3">${ Str.cut(conn.user, 24) }</div>
					<div class="field4">${ conn.port }</div>
				</div>

				<div class="menu">
					<div class="fas fa-pen" onclick="ManagerConnections.get('${ conn.slug }')"></div>
					<div class="fas fa-trash-alt" onclick="DeleteConnections.delete('${ conn.slug }')"></div>
				</div>
			</div>
		`)
	},

	auto_refresh_list () {
		if (Storage.has(store_force_update) && Storage.get(store_force_update) == 'list-conns') {
			this.list()
			this.total()
			Storage.delete(store_force_update)
		}
	},

}