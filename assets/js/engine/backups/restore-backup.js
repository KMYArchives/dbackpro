const RestoreBackup = {

	_restore (data) {
		switch (data.driver) {
			case 'mysql2':
				this._mysql_restore(data.file)
				break
		}
	},

	_mysql_restore (file) {
		var tool = new MysqlTools()
		tool.restoreDatabase({
			sqlFilePath: file,
			database : Storage.get('dbSelected'),
			host: JSON.parse(Storage.get('connData'))['host'],
			port: JSON.parse(Storage.get('connData'))['port'],
			user: JSON.parse(Storage.get('connData'))['user'],
			password: JSON.parse(Storage.get('connData'))['password'],
		}, function (error, output, message) {
			ConfirmModal.hide()
			
			if (error instanceof Error) {
				CreateBackupLogs.insert({
					type: 'error',
					show_msg: true,
					message: error,
					query: 'restore_backup',
					database: Storage.get('dbSelected'),
					conn_id: JSON.parse(Storage.get('connData'))['slug'],
				})
			} else {
				MySQL_ListTables.page_load()

				CreateBackupLogs.insert({
					show_msg: true,
					type: 'success',
					message: message,
					query: 'restore_backup',
					database: Storage.get('dbSelected'),
					conn_id: JSON.parse(Storage.get('connData'))['slug'],
				})
			}
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