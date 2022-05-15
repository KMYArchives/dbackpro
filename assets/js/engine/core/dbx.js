var DBX = knex({
	client: 'sqlite3',
	
	connection: {
		filename: Core.get_file(
			'app', 'dbackpro.db'
		)
	},
})