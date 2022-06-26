const SplashScreen = {

	folders () {
		setTimeout( e=> {
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
		}, 1000)
	},

	download_db () {
		setTimeout( e => {
			fetch(`${ Apis.core() }private/app-files/list-all?product=dbackpro`).then(
				json => json.json()
			).then( callback => {
				_.forEach(callback.list, item => {
					if (!File.has(
						Core.get_file('app', item.original_name)
					)) {
						if (download(
							Find.replace(
								item.download, 'https', 'http'
							)
						).pipe(
							fs.createWriteStream(
								Core.get_file('app', item.original_name)
							)
						)) {
							El.text(el_splash_text, 'File was downloaded with successfully...')
						}
					}
				})
			})
		}, 1000)
	},

	close_splash () {
		setTimeout( e => {
			Windows.load_main()
		}, 4000)
	},

	download_sync () {
		if (Storage.has('userData')) {
			setTimeout( e => {
				var data = JSON.parse(Storage.get('userData'))

				fetch(`${ Apis.core() }private/backups/get?product=dbackpro&username=${ data.id }`).then(
					json => json.json()
				).then( callback => {
					_.forEach(callback.list, item => {
						if (!File.has(
							Core.get_file('app', item.original_name)
						)) {
							if (download(
								Find.replace(
									item.download, 'https', 'http'
								)
							).pipe(
								fs.createWriteStream(
									Core.get_file('app', item.original_name)
								)
							)) {
								El.text(el_splash_text, 'File was downloaded with successfully...')
							}
						}
					})
				})
			}, 1000)
		}
	},

	download_gravatar () {
		if (Storage.has('userData') && !File.has(
			Core.get_file('app/cache', 'avatar.png')
		)) {
			var data = JSON.parse(
				Storage.get('userData')
			)

			download(
				data.gravatar	
			).pipe(
				fs.createWriteStream(
					Core.get_file('app/cache', 'avatar.png')
				)
			)

			setTimeout( e => {
				El.text(el_splash_text, 'Download user avatar...')
			}, 1000)
		}
	},

}