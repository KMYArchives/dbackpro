var menubox_loader = new MenuBox(el_menu_actions)

const MySQL_TableProperties = {

	drop () {
		var conn = GetConnection.create_conn(),
			sql_query = `DROP TABLE ${ Storage.get('dbSelected') }.${ Storage.get('tblSelected') }`

		conn.raw(sql_query).then( callback => {
			CreateBackupLogs.insert({
				show_msg: false,
				type: 'success',
				query: 'drop_table',
				sql_query: sql_query,
				table: Storage.get('tblSelected'),
				database: Storage.get('dbSelected'),
				conn_id: JSON.parse(Storage.get('connData'))['slug'],
			})

			ConfirmModal.hide()
			MySQL_ListTables.page_load()
		})
	},

	check () {
		menubox_loader.toggle()
		var conn = GetConnection.create_conn(),
			sql_query = `CHECK TABLE ${ Storage.get('dbSelected') }.${ Storage.get('tblSelected') }`

		conn.raw(sql_query).then( callback => {
			CreateBackupLogs.insert({
				show_msg: true,
				type: 'success',
				sql_query: sql_query,
				query: 'check_table',
				table: Storage.get('tblSelected'),
				database: Storage.get('dbSelected'),
				message: `Check: ${ callback[0][0].Msg_text }`,
				conn_id: JSON.parse(Storage.get('connData'))['slug'],
			})
		})
	},

	repair () {
		menubox_loader.toggle()
		var conn = GetConnection.create_conn(),
			sql_query = `REPAIR TABLE ${ Storage.get('dbSelected') }.${ Storage.get('tblSelected') }`

		conn.raw(sql_query).then( callback => {
			CreateBackupLogs.insert({
				show_msg: true,
				type: 'success',
				sql_query: sql_query,
				query: 'repair_table',
				table: Storage.get('tblSelected'),
				database: Storage.get('dbSelected'),
				message: `Repair: ${ callback[0][0].Msg_text }`,
				conn_id: JSON.parse(Storage.get('connData'))['slug'],
			})
		})
	},

	rename () {
		var new_name = El.value('#rename-input-modal')

		if (new_name != "") {
			var conn = GetConnection.create_conn(),
				sql_query = `RENAME TABLE ${
					Storage.get('dbSelected')
				}.${
					Storage.get('tblSelected')
				} TO ${
					Storage.get('dbSelected')
				}.${
					new_name
				}`

			conn.raw(sql_query).then( callback => {
				CreateBackupLogs.insert({
					show_msg: false,
					type: 'success',
					sql_query: sql_query,
					query: 'rename_table',
					table: Storage.get('tblSelected'),
					database: Storage.get('dbSelected'),
					conn_id: JSON.parse(Storage.get('connData'))['slug'],
					message: `Rename table from ${ Storage.get('tblSelected') } to ${ new_name }`,
				})

				Storage.set('tblSelected', new_name)
				MySQL_ListCols.page_load()

				ConfirmModal.hide()
			})
		}
	},

	analyze () {
		menubox_loader.toggle()
		var conn = GetConnection.create_conn(),
			sql_query = `ANALYZE TABLE ${ Storage.get('dbSelected') }.${ Storage.get('tblSelected') }`

		conn.raw(sql_query).then( callback => {
			CreateBackupLogs.insert({
				show_msg: true,
				type: 'success',
				sql_query: sql_query,
				query: 'analyze_table',
				table: Storage.get('tblSelected'),
				database: Storage.get('dbSelected'),
				message: `Analyze: ${ callback[0][0].Msg_text }`,
				conn_id: JSON.parse(Storage.get('connData'))['slug'],
			})
		})
	},

	optimize () {
		menubox_loader.toggle()
		var conn = GetConnection.create_conn(),
			sql_query = `OPTIMIZE TABLE ${ Storage.get('dbSelected') }.${ Storage.get('tblSelected') }`

		conn.raw(sql_query).then( callback => {
			CreateBackupLogs.insert({
				show_msg: true,
				type: 'success',
				sql_query: sql_query,
				query: 'optmize_table',
				table: Storage.get('tblSelected'),
				database: Storage.get('dbSelected'),
				message: `Optimize: ${ callback[0][0].Msg_text }`,
				conn_id: JSON.parse(Storage.get('connData'))['slug'],
			})
		})
	},

	truncate () {
		var conn = GetConnection.create_conn(),
			sql_query = `TRUNCATE TABLE ${ Storage.get('dbSelected') }.${ Storage.get('tblSelected') }`

		conn.raw(sql_query).then( callback => {
			CreateBackupLogs.insert({
				show_msg: true,
				type: 'success',
				sql_query: sql_query,
				query: 'truncate_table',
				table: Storage.get('tblSelected'),
				database: Storage.get('dbSelected'),
				conn_id: JSON.parse(Storage.get('connData'))['slug'],
				message: `Truncate: The table ${ Storage.get('tblSelected') } was truncated`,
			})

			ConfirmModal.hide()
			Storage.set('tblSelectedRows', '0')
			topbar_loader.total(`${ Storage.get('tblSelectedRows') } Row's`)
		})
	},

	show_create () {
		var conn = GetConnection.create_conn(),
			sql_query = `SHOW CREATE TABLE ${ Storage.get('dbSelected') }.${ Storage.get('tblSelected') }`

		conn.raw(sql_query).then( callback => {
			CreateBackupLogs.insert({
				show_msg: false,
				type: 'success',
				sql_query: sql_query,
				query: 'show_create',
				table: Storage.get('tblSelected'),
				database: Storage.get('dbSelected'),
				conn_id: JSON.parse(Storage.get('connData'))['slug'],
			})

			CodeModal.title(callback[0][0]['Table'])
			EditorAutoload.setValue(callback[0][0]['Create Table'])

			CodeModal.show()
			CodeModal.show_save()
		})
	},

}