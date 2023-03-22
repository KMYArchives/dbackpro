const FiltersBackupLogs = {

	_logs_queries () {
		return {
			error_connection: "Connection Error",
			optimize_table: "Optimize Table",
			check_table: "Check Table",
			rename_table: "Rename Table",
			analyze_table: "Analyze Table",
			drop_table: "Drop Table",
			truncate_table: "Truncate Table",
			show_create: "Table Code",
			create_backup: "Create Backup",
			restore_backup: "Restore Backup",
			delete_backup: "Delete Backup",
			create_snippet: "Create Snippet",
			get_snippet: "Get Snippet",
			edited_snippet: "Update Snippet",
			delete_snippet: "Delete Snippet",
			create_diagram: "Create Diagram",
			delete_diagram: "Delete Diagram",
		}
	},

	types () {
		DBX.select([
			'type'
		]).from(
			'logs'
		).groupBy(
			'type'
		).then( callback => {
			_.forEach(callback, type => {
				if (type.type != null) {
					console.log(
						Str.capitalize(type.type)
					)
				}
			})
		})
	},

	tables () {
		DBX.select([
			'table'
		]).from(
			'logs'
		).groupBy(
			'table'
		).then( callback => {
			_.forEach(callback, table => {
				if (table.table != null) {
					console.log(table.table)
				}
			})
		})
	},

	queries () {
		DBX.select([
			'query'
		]).from(
			'logs'
		).groupBy(
			'query'
		).then( callback => {
			_.forEach(callback, query => {
				console.log(query.query, this._logs_queries()[query.query])
			})
		})
	},

	databases () {
		DBX.select([
			'database'
		]).from(
			'logs'
		).groupBy(
			'database'
		).then( callback => {
			_.forEach(callback, db => {
				if (db.database != null) {
					console.log(db.database)
				}
			})
		})
	},

}