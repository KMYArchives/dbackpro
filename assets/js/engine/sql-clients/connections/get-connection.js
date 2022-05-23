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
		mysql_conn = knex({
			client: 'mysql',

			connection: {
				port: 3306,
				user: 'root',
				password: null,
				host: 'localhost',
			},

			debug: true
		})

		if (mysql_conn) {
			mysql_conn_status = 'connected'
		} else {
			mysql_conn_status = 'error-connected'
		}
	},

    test_connect (data) {
		mysql_test_conn = knex({
			client: data.client,

			connection: {
				port: data.port,
				user: data.user,
				host: data.host,
				timeout: data.timeout,
				password: data.password,
			},

			debug: true
		})

		if (mysql_test_conn) {
			return true
		} else {
			return false
		}

		mysql_test_conn.destroy()
	},

}