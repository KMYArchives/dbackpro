const Gravatar = {

	_default () {
		var image = Core.get_file('app/cache', 'default-avatar.png')

		if (!File.has(
			image
		)) {
			download(
				'https://i.imgur.com/D6RwpEG.png'	
			).pipe(
				fs.createWriteStream(image)
			)
		}
	},

	_get_uri (email) {
		email = md5(
			email.toLowerCase()
		)

		return Apis.gravatar(email)
	},

	get () {
		this._default()

		if (Storage.has('userData')) {
			return JSON.parse(
				Storage.get('userData')
			).avatar
		} else {
			return Core.get_file('app/cache', 'default-avatar.png')
		}
	},

	delete () {
		File.unlink(
			Core.get_file('app/cache', 'avatar.png')
		)
	},

	download () {
		if (Storage.has('userData')) {
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
		}
	},

	auto_download () {
		if (Storage.has(store_force_update) && Storage.get(store_force_update) == 'download-avatar') {
			this.download()
			Storage.delete(store_force_update)
		}
	}

}