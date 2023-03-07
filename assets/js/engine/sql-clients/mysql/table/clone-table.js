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
						<option value='${
							element.Database
						}'>${
							element.Database
						}</option>
					`)
				}
			})
		})
	},

	clone_data () {
		var conn = GetConnection.create_conn()

		conn.raw(`INSERT INTO ${
			El.value('#clone-db-name')
		}.${
			El.value('#clone-tbl-name')
		} SELECT * FROM ${
			Storage.get('dbSelected')
		}.${
			Storage.get('tblSelected')
		}`).then( callback => {
			CloneModal.hide()
			El.text(el_msg_return, `Table data copied to: ${ El.value('#clone-db-name') }`)

			El.show(el_msg_return)
			setTimeout( e => El.hide(el_msg_return), 2500)
		})
	},

	clone_structure () {
		var conn = GetConnection.create_conn()

		conn.raw(`CREATE TABLE ${
			El.value('#clone-db-name')
		}.${
			El.value('#clone-tbl-name')
		} LIKE ${
			Storage.get('dbSelected')
		}.${
			Storage.get('tblSelected')
		}`).then( callback => {
			CloneModal.hide()
			El.text(el_msg_return, `Table structure copied to: ${ El.value('#clone-db-name') }`)

			El.show(el_msg_return)
			setTimeout( e => El.hide(el_msg_return), 2500)
		})
	},

	clone_data_structure () {
		var conn = GetConnection.create_conn()

		conn.raw(`CREATE TABLE ${
			El.value('#clone-db-name')
		}.${
			El.value('#clone-tbl-name')
		} LIKE ${
			Storage.get('dbSelected')
		}.${
			Storage.get('tblSelected')
		}`).then( callback => {
			conn.raw(`INSERT INTO ${
				El.value('#clone-db-name')
			}.${
				El.value('#clone-tbl-name')
			} SELECT * FROM ${
				Storage.get('dbSelected')
			}.${
				Storage.get('tblSelected')
			}`).then( callback => {
				CloneModal.hide()
				El.text(el_msg_return, `Table data and structure copied to: ${ El.value('#clone-db-name') }`)
	
				El.show(el_msg_return)
				setTimeout( e => El.hide(el_msg_return), 2500)
			})
		})
	},
	
}