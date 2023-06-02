var menubox_loader = new MenuBox(el_menu_actions)

const MySQL_TableConfirm = {

	_insert (data) {
		CreateBackupLogs.insert({
			type: 'success',
			query: data.query,
			message: data.message | null,
			show_msg: data.show_msg | null,
			sql_query: data.sql_query | null,
			table: Storage.get('tblSelected'),
			database: Storage.get('dbSelected'),
			conn_id: JSON.parse(Storage.get('connData'))['slug'],
		})
	},

	drop () {
		var conn = GetConnection.create_conn(),
			sql_query = `DROP TABLE ${ Storage.get('dbSelected') }.${ Storage.get('tblSelected') }`

		conn.raw(sql_query).then( callback => {
			this._insert({
				show_msg: false,
				query: 'drop_table',
				sql_query: sql_query,
			})

			ConfirmModal.hide()
			MySQL_ListTables.page_load()
		}).catch( error => {
			ServerErrors.connection()
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
				this._insert({
					show_msg: false,
					sql_query: sql_query,
					query: 'rename_table',
					message: `Rename table from ${ Storage.get('tblSelected') } to ${ new_name }`,
				})

				Storage.set('tblSelected', new_name)
				MySQL_ListCols.page_load()

				ConfirmModal.hide()
			}).catch( error => {
				ServerErrors.connection()
			})
		}
	},

	truncate () {
		var conn = GetConnection.create_conn(),
			sql_query = `TRUNCATE TABLE ${ Storage.get('dbSelected') }.${ Storage.get('tblSelected') }`

		conn.raw(sql_query).then( callback => {
			this._insert({
				show_msg: true,
				sql_query: sql_query,
				query: 'truncate_table',
				message: `Truncate: The table ${ Storage.get('tblSelected') } was truncated`,
			})

			ConfirmModal.hide()
			Storage.set('tblSelectedRows', '0')
			topbar_loader.total(`${ Storage.get('tblSelectedRows') } Row's`)
		}).catch( error => {
			ServerErrors.connection()
		})
	},

}