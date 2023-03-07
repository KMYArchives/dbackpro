const CreateDiagram = {

	save () {},

	create (table = null) {
		El.empty('.diagram')
		El.append('.diagram', `<div class='tbl-item'></div>`)

		var tbl = Storage.get('tblSelected') ? Storage.get('tblSelected') : table

		El.empty('.tbl-item')
		El.append('.tbl-item', `
			<div class='tbl-name'>
				${ tbl }
			</div>
		`)

		var conn = GetConnection.create_conn()
		conn.raw(`SHOW FULL COLUMNS FROM ${ Storage.get('dbSelected') }.${ tbl }`).then( callback => {
			_.forEach( callback, element => {
				_.forEach( element, column => {
					if (column.Field != undefined) {
						var field_key = ''

						if (column.Key == 'PRI' || column.Key == 'UNI') {
							field_key = `<div class='fas fa-key ${ column.Key }'></div>`
						}

						El.append('.tbl-item', `
							<li>
								${ field_key }
								${ column.Field }: ${ column.Type }
							</li>
						`)
					}
				})
			})
		})
	},

}