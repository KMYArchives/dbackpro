const DeleteBackup = {

	_delete_file () {
		DBX.select(
			'path', 'name'
		).from(
			'backups'
		).where({
			slug: Storage.get('backupID')
		}).then( callback => {
			File.unlink(
				callback[0].path + callback[0].name
			)
		})
	},

	delete () {
		this._delete_file()
		
		DBX.delete().from(
			'backups'
		).where({
			slug: Storage.get('backupID')
		}).then( callback => {
			ListBackups.list()
			ListBackups.total()

			ConfirmModal.hide()
			Storage.delete('backupID')
		})	
	},

	confirm (slug) {
		Storage.set(
			'backupID', slug
		)

		ConfirmModalBackup.delete()
	},

}