const ServerErrors = {

	play_error_sound () {
		File.play('error.wav')
	},

	connection () {
		this.play_error_sound()

		var message = `Error: connect ECONNREFUSED ${
			JSON.parse(Storage.get('connData'))['host']
		}:${
			JSON.parse(Storage.get('connData'))['port']
		}`

		CreateBackupLogs.insert({
			type: 'error',
			show_msg: true,
			message: message,
			query: 'error_connection',
			conn_id: JSON.parse(Storage.get('connData'))['slug'],
		})

		ListConnections.page_load()
	},

}