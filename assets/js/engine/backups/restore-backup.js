const RestoreBackup = {

	_restore (data) {
		switch (data.driver) {
			case 'mysql2':
				this._mysql_restore(data.file)
				break
		}
	},

	_mysql_restore (file) {
		const connection = mysql.createConnection({
			multipleStatements: true,
			database : Storage.get('dbSelected'),
			host: JSON.parse(Storage.get('connData'))['host'],
			port: JSON.parse(Storage.get('connData'))['port'],
			user: JSON.parse(Storage.get('connData'))['user'],
			password: JSON.parse(Storage.get('connData'))['password'],
		})
		
		connection.query(fs.readFileSync(
			file, 'utf8'
		), (err) => {
			ConfirmModal.hide()
			MySQL_ListTables.page_load()
			El.text(el_msg_return, `Backup retrieved successfully...`)

			El.show(el_msg_return)
			setTimeout( e => El.hide(el_msg_return), 2500)
		})
	},

	restore () {
		DBX.select(
			'driver', 'path', 'name'
		).from(
			'backups'
		).where({
			slug: Storage.get('backupID')
		}).then( callback => {
			var outputFile = callback[0].path + callback[0].name

			this._restore({
				file: outputFile,
				driver: callback[0].driver,
			})
		})
	},

	confirm (slug) {
		Storage.set(
			'backupID', slug
		)

		ConfirmModalBackup.restore()
	},

}