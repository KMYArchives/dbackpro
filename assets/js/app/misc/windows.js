const Windows = {

	open (window) { ipcRenderer.send('open-' + window) },

	main_window_close () { ipcRenderer.send('close-main') },

	main_window_minimize () { ipcRenderer.send('min-main') },

	window_minimize () { ipcRenderer.send('min-' + window) },

	window_close (window) { ipcRenderer.send('close-' + window) },

}