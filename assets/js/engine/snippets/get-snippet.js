const GetSnippet = {

	get (slug) {
		DBX.select([
			'slug', 'name', 'database', 'sql_code', 'added_in'
		]).where({
			slug: slug
		}).from(
			'snippets'
		).then( callback => {
			CreateBackupLogs.insert({
				show_msg: false,
				type: 'success',
				query: 'get_snippet',
				conn_id: JSON.parse(Storage.get('connData'))['slug'],
				message: `Get snippet ${ callback[0].database }.${ callback[0].name }`,
			})

			CodeModal.title(callback[0].name)
			EditorAutoload.setValue(callback[0].sql_code)

			CodeModal.show()
			CodeModal.hide_save()
		})
	}

}