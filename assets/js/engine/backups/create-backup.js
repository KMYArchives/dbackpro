const CreateBackup = {

	_verbose () {
		if (El.value('#backup-verbose') == 'true') {
			return true
		} else {
			return false
		}
	},

	_charset () {
		if (El.value('#backup-charset') == 'true') {
			return true
		} else {
			return false
		}
	},

	_ifNotExist () {
		if (El.value('#backup-ifNotExist') == 'true') {
			return true
		} else {
			return false
		}
	},

	_formatData () {
		if (El.value('#backup-format-data') == 'true') {
			return true
		} else {
			return false
		}
	},

	_dropIfExist () {
		if (El.value('#backup-dropIfExist') == 'true') {
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
			
			if (show_msg) {
				El.text(el_msg_return, `Backup generated with successfully...`)

				El.show(el_msg_return)
				setTimeout( e => El.hide(el_msg_return), 2500)
			}
		})
	},
	
	create (show_msg = true) {
		var pathFile = El.value('#backup-path') + '/',
			
			newName = Slug.custom({
				length: [ 36, 48 ],
				charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
			}),

			outputFile = pathFile + newName + '.sql',
			outputZipFile = Find.replace(outputFile, '.sql', '.zip')

		mysqldump({
			connection: {
				database: Storage.get('dbSelected'),
				host: JSON.parse(Storage.get('connData'))['host'], 
				user: JSON.parse(Storage.get('connData'))['user'],
				password: JSON.parse(Storage.get('connData'))['password'],
			},
			
			dump: {
				data: {
					where: {},
					lockTables: true,
					includeViewData: false,
					verbose: this._verbose(),
					returnFromFunction: false,
					format: this._formatData(),
					maxRowsPerInsertStatement: 0,
				},
	
				schema: {
					engine: true,
					format: true,
					autoIncrement: true,
	
					view: {
						definer: false,
						algorithm: false,
						sqlSecurity: false,
						createOrReplace: true,
					},
	
					table: {
						charset: this._charset(),
						ifNotExist: this._ifNotExist(),
						dropIfExist: this._dropIfExist(),
					},
				},
	
				trigger: {
					definer: false,
					delimiter: ';;',
					dropIfExist: true,
				},
			},

			dumpToFile: outputFile,
		}).then( callback => {
			var _outputFile = outputFile

			this._insertDB({
				path: pathFile,
				slug: Slug.range(36, 48),
				db: Storage.get('dbSelected'),
				dropIfExists: this._dropIfExist(),
				size: fs.statSync(_outputFile).size,
				name: Find.replace(_outputFile, pathFile, ''),
				added_in: datetime.create().format('Y-m-d H:m:S'),
				conn_id: JSON.parse(Storage.get('connData'))['slug'],
				driver: JSON.parse(Storage.get('connData'))['driver'],
			}, show_msg)
		})
	},

}