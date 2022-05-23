const DeleteConnections = {

	clear () {
		DBX.truncate().from(
			'conns'
		).then( callback => {
			Storage.set(store_force_update, 'list-conns')
		})
	},

	delete (slug) {
		DBX.delete().from(
			'conns'
		).where({
			slug: slug
		}).then( callback => {
			Storage.set(store_force_update, 'list-conns')
		})
	},

}