var menubox_loader = new MenuBox(el_menu_actions)

const MySQL_TableProperties = {

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

	check () {
		menubox_loader.toggle()
		var conn = GetConnection.create_conn(),
			sql_query = `CHECK TABLE ${ Storage.get('dbSelected') }.${ Storage.get('tblSelected') }`

		conn.raw(sql_query).then( callback => {
			this._insert({
				show_msg: true,
				sql_query: sql_query,
				query: 'check_table',
				message: `Check: ${ callback[0][0].Msg_text }`,
			})
		}).catch( error => {
			ServerErrors.connection()
		})
	},

	repair () {
		menubox_loader.toggle()
		var conn = GetConnection.create_conn(),
			sql_query = `REPAIR TABLE ${ Storage.get('dbSelected') }.${ Storage.get('tblSelected') }`

		conn.raw(sql_query).then( callback => {
			this._insert({
				show_msg: true,
				sql_query: sql_query,
				query: 'repair_table',
				message: `Repair: ${ callback[0][0].Msg_text }`,
			})
		}).catch( error => {
			ServerErrors.connection()
		})
	},

	analyze () {
		menubox_loader.toggle()
		var conn = GetConnection.create_conn(),
			sql_query = `ANALYZE TABLE ${ Storage.get('dbSelected') }.${ Storage.get('tblSelected') }`

		conn.raw(sql_query).then( callback => {
			this._insert({
				show_msg: true,
				sql_query: sql_query,
				query: 'analyze_table',
				message: `Analyze: ${ callback[0][0].Msg_text }`,
			})
		}).catch( error => {
			ServerErrors.connection()
		})
	},

	optimize () {
		menubox_loader.toggle()
		var conn = GetConnection.create_conn(),
			sql_query = `OPTIMIZE TABLE ${ Storage.get('dbSelected') }.${ Storage.get('tblSelected') }`

		conn.raw(sql_query).then( callback => {
			this._insert({
				show_msg: true,
				sql_query: sql_query,
				query: 'optimize_table',
				message: `Optimize: ${ callback[0][0].Msg_text }`,
			})
		}).catch( error => {
			ServerErrors.connection()
		})
	},

	show_create () {
		var conn = GetConnection.create_conn(),
			sql_query = `SHOW CREATE TABLE ${ Storage.get('dbSelected') }.${ Storage.get('tblSelected') }`

		conn.raw(sql_query).then( callback => {
			this._insert({
				show_msg: false,
				sql_query: sql_query,
				query: 'show_create',
			})

			CodeModal.title(callback[0][0]['Table'])
			EditorAutoload.setValue(callback[0][0]['Create Table'])

			CodeModal.show()
			CodeModal.show_save()
		}).catch( error => {
			ServerErrors.connection()
		})
	},

}