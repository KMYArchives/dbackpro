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
			case 'app/cache': return Find.replace_all(tmp_dir, '\\Local\\Temp', '\\Roaming\\dbackpro\\cache')
			case 'app/tasks': return Find.replace_all(tmp_dir, '\\Local\\Temp', '\\Roaming\\dbackpro\\tasks')
			case 'app/models': return Find.replace_all(tmp_dir, '\\Local\\Temp', '\\Roaming\\dbackpro\\models')
			case 'app/clients': return Find.replace_all(tmp_dir, '\\Local\\Temp', '\\Roaming\\dbackpro\\clients')
			case 'app/plugins': return Find.replace_all(tmp_dir, '\\Local\\Temp', '\\Roaming\\dbackpro\\plugins')
			case 'app/diagrams': return Find.replace_all(tmp_dir, '\\Local\\Temp', '\\Roaming\\dbackpro\\diagrams')
			case 'app/functions': return Find.replace_all(tmp_dir, '\\Local\\Temp', '\\Roaming\\dbackpro\\functions')
		}
	},

	get_file (path, file, uri = true) {
		var path = this.get_path(path) + '\\' + file

		if (uri) { 
			path = Find.replace_all(
				path, '\\', '/'
			) 
		}

		return path
	},

	get_os_username () { return os.userInfo().username },

}