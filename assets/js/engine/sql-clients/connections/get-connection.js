const GetConnection = {

	get () {
		if (Storage.has('editConnID')) {
			DBX.select(
				'*'
			).from(
				'conns'
			).where({
				slug: Storage.get('editConnID')
			}).then( callback => {
				El.value('#conn-name', callback[0].name)
				El.value('#conn-host', callback[0].host)
				El.value('#conn-port', callback[0].port)
				El.value('#conn-user', callback[0].user)
				El.value('#conn-driver', callback[0].driver)
				El.value('#conn-pass', callback[0].password)
				El.value('#conn-timeout', callback[0].timeout)
			})
		}
	},

	connect (slug) {
		DBX.select(
			'*'
		).from(
			'conns'
		).where({
			slug: slug
		}).then( callback => {
			Storage.set(
				'connData', JSON.stringify({
					slug: callback[0].slug,
					name: callback[0].name,
					host: callback[0].host,
					user: callback[0].user,
					port: callback[0].port,
					driver: callback[0].driver,
					password: callback[0].password,
				})
			)
			
			MySQL_ListDatabases.page_load()
		})
	},

	create_conn () {
		return knex({
			client: JSON.parse(Storage.get('connData'))['driver'],

			connection: {
				multipleStatements: true,
				host: JSON.parse(Storage.get('connData'))['host'],
				port: JSON.parse(Storage.get('connData'))['port'],
				user: JSON.parse(Storage.get('connData'))['user'],
				password: JSON.parse(Storage.get('connData'))['password'],
			},
		})
	},

    test_connect (data) {
		mysql_test_conn = knex({
			client: data.client,

			connection: {
				port: data.port,
				user: data.user,
				host: data.host,
				password: data.password,
			}
		})

		mysql_test_conn.raw(`SELECT count(*) FROM information_schema.tables GROUP BY table_schema ORDER BY table_schema ASC`).then(callback => {
			if (callback.length > 0) {
				console.log('connected')
			} else {
				console.log('error')
			}
		})
	},

}