const Queries = {

	download () {
		fetch(`
			https://pastebin.com/raw/QPRFtH49
		`).then(
			json => json.json()
		).then( callback => {
			_.forEach( callback, (indexes) => {
				File.download({
					dest: 'app/clients',
					url: indexes.download,
					file_name: indexes.file_name,
				})
			})
		})
	},

	get_file (file) {
		switch (file) {
			case 'pgsql': return Core.get_file('app/clients', 'pgsql-queries.json')
			case 'mysql': return Core.get_file('app/clients', 'mysql-queries.json')
			case 'sql-server': return Core.get_file('app/clients', 'sql-server-queries.json')
		}
	},

	load (file, data) {
		return readjson.sync(
			this.get_file(file)
		)[
			Find.replace_all(
				data.type, '_queries', ''
			) + '_queries'
		][
			data.query
		]
	},

	code_base (client, query) {
		return this.load(
			client, {
				type: Str.slice(query, '.', 0),
				query: Str.slice(query, '.', 1),
			}
		)
	},

	get (client, query, fields = null) {
		var id_array = 0,
			query_build = this.code_base(client, query)

		if (fields != null) {
			_.forEach(fields.fields, (field) => {
				query_build = Find.replace_all(
					query_build, `__param_${ field }__`, fields.values[id_array]
				)
				
				id_array++
			})
		}

		return query_build
	},

}