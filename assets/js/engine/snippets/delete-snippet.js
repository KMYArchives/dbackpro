const DeleteSnippet = {

	delete () {
		DBX.delete().from(
			'snippets'
		).where({
			slug: Storage.get('snippetID')
		}).then( callback => {
			ListSnippets.list()
			ListSnippets.total()

			CreateBackupLogs.insert({
				type: 'success',
				show_msg: false,
				query: 'delete_snippet',
				message: `Snippet deleted with successfully`,
				conn_id: JSON.parse(Storage.get('connData'))['slug'],
			})

			ConfirmModal.hide()
			Storage.delete('snippetID')
		})	
	},

	confirm (slug) {
		Storage.set(
			'snippetID', slug
		)

		ConfirmModalSnippet.delete()
	},

}