const ManagerConnections = {

	open () {
		Windows.load_custom({
			width: 360,
			height: 420,
			parent: 'main',
			url: 'pages/new-conn.html',
		})
	},

	create () {
		DBX.insert({
			slug: Slug.custom({
				length: [ 36, 48 ],
				charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
			}),

			name: El.value('#conn-name'),
			host: El.value('#conn-host'),
			port: El.value('#conn-port'),
			user: El.value('#conn-user'),
			driver: El.value('#conn-driver'),
			password: El.value('#conn-pass'),
			timeout: El.value('#conn-timeout'),
			added_in: datetime.create().format('Y-m-d H:m:S'),
		}).into(
			'conns'
		).then( callback => {
			Storage.set(store_force_update, 'list-conns')
			Windows.custom_close()
		})
	},

	update () {
		DBX.update({
			name: El.value('#conn-name'),
			host: El.value('#conn-host'),
			port: El.value('#conn-port'),
			user: El.value('#conn-user'),
			driver: El.value('#conn-driver'),
			password: El.value('#conn-pass'),
			timeout: El.value('#conn-timeout'),
		}).table(
			'conns'
		).where({
			slug: Storage.get('editConnID')
		}).then( callback => {
			Storage.delete('editConnID')
			Storage.set(store_force_update, 'list-conns')
			Windows.custom_close()
		})
	},

	toggle () {
		if (El.value('#conn-name') && El.value('#conn-host') && El.value('#conn-user')) {
			if (Storage.has('editConnID')) {
				this.update()
			} else {
				this.create()
			}
		}
	},

	get (slug) {
		Storage.set('editConnID', slug)
		ManagerConnections.open()
	},

}