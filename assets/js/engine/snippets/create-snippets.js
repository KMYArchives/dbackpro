const CreateSnippets = {

	_insert () {
		DBX.insert({
			slug: this._slug([ 36, 48 ]),
			name: Storage.get('tblSelected'),
			database: Storage.get('dbSelected'),
			sql_code: EditorAutoload.getValue(),
			added_in: datetime.create().format('Y-m-d H:m:S'),
			conn_id: JSON.parse(Storage.get('connData'))['slug'],
		}).into(
			'snippets'
		).then( callback => {
			CreateBackupLogs.insert({
				show_msg: true,
				type: 'success',
				query: 'create_snippet',
				show_msg_el: '#code-tbl-msg',
				table: Storage.get('tblSelected'),
				database: Storage.get('dbSelected'),
				message: `Snippet saved with success`,
				conn_id: JSON.parse(Storage.get('connData'))['slug'],
			})
		})
	},

	_update () {
		DBX.update({
			sql_code: EditorAutoload.getValue(),
			updated_in: datetime.create().format('Y-m-d H:m:S'),
		}).table(
			'snippets'
		).where({
			name: Storage.get('tblSelected'),
			database: Storage.get('dbSelected'),
			conn_id: JSON.parse(Storage.get('connData'))['slug']
		}).then( callback => {
			CreateBackupLogs.insert({
				show_msg: true,
				type: 'success',
				query: 'edited_snippet',
				show_msg_el: '#code-tbl-msg',
				table: Storage.get('tblSelected'),
				database: Storage.get('dbSelected'),
				message: `Snippet updated with success`,
				conn_id: JSON.parse(Storage.get('connData'))['slug'],
			})
		})
	},

	_slug (size) {
		return Slug.custom({
			length: size,
			charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
		})
	},

	create () {
		DBX.select(
			'*'
		).from(
			'snippets'
		).where({
			name: Storage.get('tblSelected'),
			database: Storage.get('dbSelected'),
			conn_id: JSON.parse(Storage.get('connData'))['slug']
		}).then( callback => {
			if (callback.length == 0) {
				this._insert()
			} else {
				this._update()
			}
		})
	}

}