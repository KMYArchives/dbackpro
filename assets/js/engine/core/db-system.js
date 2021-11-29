var db_system = knex({
	client: 'sqlite3',
	connection: {
		filename: Core.get_file('app', 'dbackpro.db')
	},
})

const DB = {

	// code...

}