const CloneTable = {

	clone () {
		switch (El.value('#clone-options')) {
			case 'data':
				this.clone_data()
				break

			case 'structure':
				this.clone_structure()
				break

			case 'data-structure':
				this.clone_data_structure()
				break
		}
	},

	databases () {
		El.empty('#clone-db-name')
		var conn = GetConnection.create_conn()

		conn.raw(`SHOW DATABASES`).then( callback => {
			_.forEach( callback[0], element => {
				if (element.Database != Storage.get('dbSelected')) {
					El.append('#clone-db-name', `
						<option value='${ element.Database }'>${ element.Database }</option>
					`)
				}
			})
		})
	},

	clone_data () {
		var conn = GetConnection.create_conn(),
			new_db = El.value('#clone-db-name'),
			new_tbl = El.value('#clone-tbl-name'),
			sql_query = `INSERT INTO ${ new_db }.${ new_tbl } SELECT * FROM ${ Storage.get('dbSelected') }.${ Storage.get('tblSelected') }`

		conn.raw().then( callback => {
			CloneModal.hide()

			CreateBackupLogs.insert({
				table: new_tbl,
				show_msg: true,
				type: 'success',
				database: new_db,
				query: 'clone_data',
				sql_query: sql_query,
				message: `Table data copied to ${ new_db }`,
				conn_id: JSON.parse(Storage.get('connData'))['slug'],
			})
		}).catch( error => {
			ServerErrors.connection()
		})
	},

	clone_structure () {
		var conn = GetConnection.create_conn(),
			new_db = El.value('#clone-db-name'),
			new_tbl = El.value('#clone-tbl-name'),
			sql_query = `CREATE TABLE ${ new_db }.${ new_tbl } LIKE ${ Storage.get('dbSelected') }.${ Storage.get('tblSelected') }`

		conn.raw(sql_query).then( callback => {
			CloneModal.hide()

			CreateBackupLogs.insert({
				table: new_tbl,
				show_msg: true,
				type: 'success',
				database: new_db,
				sql_query: sql_query,
				query: 'clone_structure',
				message: `Table structure copied to ${ new_db }`,
				conn_id: JSON.parse(Storage.get('connData'))['slug'],
			})
		}).catch( error => {
			ServerErrors.connection()
		})
	},

	clone_data_structure () {
		var conn = GetConnection.create_conn(),
			new_db = El.value('#clone-db-name'),
			new_tbl = El.value('#clone-tbl-name'),

			sql_query1 = `CREATE TABLE ${ new_db }.${ new_tbl } LIKE ${ Storage.get('dbSelected') }.${ Storage.get('tblSelected') }`,
			sql_query2 = `INSERT INTO ${ new_db }.${ new_tbl } SELECT * FROM ${ Storage.get('dbSelected') }.${ Storage.get('tblSelected') }`

		conn.raw(sql_query1).then( callback => {
			conn.raw(sql_query2).then( callback => {
				CloneModal.hide()

				CreateBackupLogs.insert({
					table: new_tbl,
					show_msg: true,
					type: 'success',
					database: new_db,
					query: 'clone_data_structure',
					sql_query: sql_query1 + '; ' + sql_query2,
					conn_id: JSON.parse(Storage.get('connData'))['slug'],
					message: `Table data and structure copied to ${ new_db }`,
				})
			}).catch( error => {
				ServerErrors.connection()
			})
		}).catch( error => {
			ServerErrors.connection()
		})
	},
	
}