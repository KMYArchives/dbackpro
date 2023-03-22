const ListBackups = {

	list () {
		El.empty(el_list_content)

		DBX.select([
			'slug', 'name', 'path', 'driver', 'size', 'added_in'
		]).where({
			db: Storage.get('dbSelected'),
			conn_id: JSON.parse(Storage.get('connData'))['slug'],
		}).from(
			'backups'
		).then( callback => {
			if (callback.length > 0) { 
				_.forEach( _.orderBy(
					callback, 'added_in', 'asc'
				), backup => {
					this.item_layout(backup)
				})
			} else {
				El.append(el_list_content, `
					<div class="zero">No backup's</div>
				`)
			}
		})
	},

	total () {
		DBX.count(
			'*'
		).where({
			db: Storage.get('dbSelected'),
			conn_id: JSON.parse(Storage.get('connData'))['slug'],
		}).from(
			'backups'
		).then( callback => {
			topbar_loader.total(`${ callback[0]['count(*)'] } item's`)
		})
	},

	sidebar () {
		sidebar_loader.clean()
		sidebar_loader.set([
			{
				id: 'list-tables',
				title: "Back to tables",
				icon: 'fas fa-arrow-left',
				click: 'MySQL_ListTables.page_load()',
			},
			{
				actived: true,
				id: 'list-local',
				icon: 'fas fa-desktop',
				title: "List local backup's",
				click: 'ListBackups.page_load()',
			},
			{
				id: 'list-cloud',
				icon: 'fas fa-cloud',
				title: "List cloud backups",
				click: 'Hello.world()',
			},
		])
	},

	page_load () {
		this.list()
		this.total()
		this.sidebar()

		Storage.delete('backupID')
	},

	item_layout (backup) {
		El.append(el_list_content, `
			<div class="item">
				<div class="icon">
					<div class="fas fa-file"></div>
				</div>

				<div class="field1">${ backup.added_in }</div>
				<div class="field2">${ Str.cut(backup.path, 30) }</div>
				<div class="field3">${ backup.driver }</div>
				<div class="field4">${ Format.bytes(backup.size) }</div>

				<div class="menu">
					<div class="fas fa-arrow-rotate-right" onclick="RestoreBackup.confirm('${ backup.slug }')"></div>
					<div class="fas fa-trash-alt" onclick="DeleteBackup.confirm('${ backup.slug }')"></div>
				</div>
			</div>
		`)
	},

}