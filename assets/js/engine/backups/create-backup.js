const CreateBackup = {

	_checked_option (option) {
		if (El.checked('#backup-' + option)) {
			return true
		} else {
			return false
		}
	},

	_insertDB (data, show_msg = true) {
		DBX.insert(data).into(
			'backups'
		).then( callback => {
			BackupModal.hide()
			ListBackups.page_load()

			CreateBackupLogs.insert({
				type: 'success',
				show_msg: show_msg,
				query: 'create_backup',
				database: Storage.get('dbSelected'),
				message: `Backup generated with successfully`,
				conn_id: JSON.parse(Storage.get('connData'))['slug'],
			})
		})
	},
	
	create (show_msg = true) {
		var pathFile = El.value('#backup-path') + '/',
			outputFile = pathFile + datetime.create().format('YmdHmS') + '.sql'

		mysqldump({
			dump: {
				data: {
					verbose: this._checked_option('verbose'),
					format: this._checked_option('formatData'),
					lockTables: this._checked_option('lockTables'),
					includeViewData: this._checked_option('viewData'),
					returnFromFunction: this._checked_option('returnFromFunction'),
					maxRowsPerInsertStatement: El.value('#backup-maxRowsPerInsert'),
				},
	
				schema: {
					engine: this._checked_option('schemaEngine'),
					format: this._checked_option('schemaFormat'),
					autoIncrement: this._checked_option('schemaAutoIncrement'),
	
					view: {
						definer: this._checked_option('viewDefiner'),
						algorithm: this._checked_option('viewAlgorithm'),
						sqlSecurity: this._checked_option('viewSqlSecurity'),
						createOrReplace: this._checked_option('viewCreateOrReplace'),
					},
	
					table: {
						charset: this._checked_option('charset'),
						ifNotExist: this._checked_option('ifNotExist'),
						dropIfExist: this._checked_option('dropIfExist'),
					},
				},
	
				trigger: {
					delimiter: El.value('#backup-triggerDelimiter'),
					definer: this._checked_option('triggerDefiner'),
					dropIfExist: this._checked_option('triggerDropIfExist'),
				},
			},

			connection: {
				database: Storage.get('dbSelected'),
				host: JSON.parse(Storage.get('connData'))['host'], 
				user: JSON.parse(Storage.get('connData'))['user'],
				password: JSON.parse(Storage.get('connData'))['password'],
			},

			dumpToFile: outputFile,
		}).then( callback => {
			this._insertDB({
				path: pathFile,
				slug: Slug.range(36, 48),
				db: Storage.get('dbSelected'),
				size: fs.statSync(outputFile).size,
				name: Find.replace(outputFile, pathFile, ''),
				dropIfExists: this._checked_option('dropIfExist'),
				added_in: datetime.create().format('Y-m-d H:m:S'),
				conn_id: JSON.parse(Storage.get('connData'))['slug'],
				driver: JSON.parse(Storage.get('connData'))['driver'],
			}, show_msg)
		})
	},

}