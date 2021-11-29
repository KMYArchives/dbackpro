const GetConnection = {

	get (slug) {},

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