const SplashScreen = {

	folders () {
		if (File.new_folder([
			Core.get_path('app'),

			Core.get_path('app/cache'),
			Core.get_path('app/tasks'),
			Core.get_path('app/dumps'),
			Core.get_path('app/models'),
			Core.get_path('app/clients'),
			Core.get_path('app/plugins'),
			Core.get_path('app/diagrams'),
			Core.get_path('app/functions'),
		])) {
			El.text(el_splash_text, 'Creating folders...')
		}
	},

	download_db () {
		fetch(`${ Apis.core() }private/app-files/database?product=dbackpro`).then(
			json => json.json()
		).then( callback => {
			if (!File.has(
				Core.get_file('app', callback.original_name)
			)) {
				if (download(
					Find.replace(
						callback.download, 'https', 'http'
					)
				).pipe(
					fs.createWriteStream(
						Core.get_file('app', callback.original_name)
					)
				)) {
					El.text(el_splash_text, 'Database was downloaded with successfully...')
				}
			}
		})
	},

	close_splash () {
		setTimeout( e => {
			Windows.load_main()
		}, 4000)
	},

}