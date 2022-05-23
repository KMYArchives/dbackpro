const Windows = {

	load_main () {
		this.open('main')
		this.window_close('splash')
	},

	custom_close () {
		Storage.delete('editConnID')
		this.window_close('custom')
	},

	load_custom (params) {
		ipcRenderer.send(
			'open-screen', params
		)
	},

	main_window_close () { this.window_close('main') },

	open (window) { ipcRenderer.send('open-' + window) },

	main_window_minimize () { this.window_minimize('main') },

	window_close (window) { ipcRenderer.send('close-' + window) },

	window_minimize (window) { ipcRenderer.send('min-' + window) },

}