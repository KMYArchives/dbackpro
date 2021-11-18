const Core = {

	get_path (path) {
		var tmp_dir = os.tmpdir()

		switch (path) {
			case 'tmp': return tmp_dir
			case 'dirname': return __dirname
			case 'home': return os.homedir()
			case 'downloads': return os.homedir() + '\\Downloads'
			case 'documents': return os.homedir() + '\\Documents'
			case 'local': return Find.replace_all(tmp_dir, '\\Temp', '')
			case 'roaming': return Find.replace_all(tmp_dir, '\\Local\\Temp', '\\Roaming')
			case 'app': return Find.replace_all(tmp_dir, '\\Local\\Temp', '\\Roaming\\dbackpro')
			case 'app/storage': return Find.replace_all(tmp_dir, '\\Local\\Temp', '\\Roaming\\dbackpro\\storage')
		}
	},

	window_close () { ipcRenderer.send('close') },

	window_minimize () { ipcRenderer.send('min') },

	get_username () { return os.userInfo().username },

}