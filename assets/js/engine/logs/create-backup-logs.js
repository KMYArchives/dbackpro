const CreateBackupLogs = {

	_slug (size) {
		return Slug.custom({
			length: size,
			charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
		})
	},

	insert (data) {
		DBX.select(
			'*'
		).where({
			name: 'system.backupLogs'
		}).from(
			'configs'
		).then(callback => {
			if (callback[0].value == '1') {
				DBX.insert({
					type: data.type,
					query: data.query,
					conn_id: data.conn_id,
					table: data.table ? data.table : null,
					message: data.message ? data.message : null,
					user_id: data.user_id ? data.user_id : null,
					database: data.database ? data.database : null,
					sql_query: data.sql_query ? data.sql_query : null,
					added_in: datetime.create().format('Y-m-d H:m:S'),
					slug: data.slug ? data.slug : this._slug([ 36, 48 ]),
				}).into(
					'logs'
				).then( callback => {
					var show_msg_el = el_msg_return
					if (data.show_msg_el != undefined) { show_msg_el = data.show_msg_el }

					if (data.show_msg == true) {
						GUI.message(
							show_msg_el, data.message
						)
					}
				})
			}
		})
	},

}