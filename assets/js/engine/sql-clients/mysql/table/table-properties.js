var menubox_loader = new MenuBox(el_menu_actions)

const MySQL_TableProperties = {

	drop () {
		var conn = GetConnection.create_conn()

		conn.raw(`DROP TABLE ${ Storage.get('dbSelected') }.${ Storage.get('tblSelected') }`).then( callback => {
			ConfirmModal.hide()
			MySQL_ListTables.page_load()
		})
	},

	check () {
		menubox_loader.toggle()
		var conn = GetConnection.create_conn()

		conn.raw(`CHECK TABLE ${ Storage.get('dbSelected') }.${ Storage.get('tblSelected') }`).then( callback => {
			El.text(el_msg_return, `Check: ${ callback[0][0].Msg_text }`)

			El.show(el_msg_return)
			setTimeout( e => El.hide(el_msg_return), 2500)
		})
	},

	repair () {
		menubox_loader.toggle()
		var conn = GetConnection.create_conn()

		conn.raw(`REPAIR TABLE ${ Storage.get('dbSelected') }.${ Storage.get('tblSelected') }`).then( callback => {
			El.text(el_msg_return, `Repair: ${ callback[0][0].Msg_text }`)

			El.show(el_msg_return)
			setTimeout( e => El.hide(el_msg_return), 2500)
		})
	},

	rename () {
		var new_name = El.value('#rename-input-modal')
		if (new_name != "") {
			var conn = GetConnection.create_conn()

			conn.raw(`RENAME TABLE ${
				Storage.get('dbSelected')
			}.${
				Storage.get('tblSelected')
			} TO ${
				Storage.get('dbSelected')
			}.${
				new_name
			}`).then( callback => {
				Storage.set('tblSelected', new_name)
				MySQL_ListCols.page_load()

				ConfirmModal.hide()
			})
		}
	},

	analyze () {
		menubox_loader.toggle()
		var conn = GetConnection.create_conn()

		conn.raw(`ANALYZE TABLE ${ Storage.get('dbSelected') }.${ Storage.get('tblSelected') }`).then( callback => {
			El.text(el_msg_return, `Analyze: ${ callback[0][0].Msg_text }`)

			El.show(el_msg_return)
			setTimeout( e => El.hide(el_msg_return), 2500)
		})
	},

	optimize () {
		menubox_loader.toggle()
		var conn = GetConnection.create_conn()

		conn.raw(`OPTIMIZE TABLE ${ Storage.get('dbSelected') }.${ Storage.get('tblSelected') }`).then( callback => {
			El.text(el_msg_return, `Optimize: ${ callback[0][0].Msg_text }`)

			El.show(el_msg_return)
			setTimeout( e => El.hide(el_msg_return), 2500)
		})
	},

	truncate () {
		var conn = GetConnection.create_conn()

		conn.raw(`TRUNCATE TABLE ${ Storage.get('dbSelected') }.${ Storage.get('tblSelected') }`).then( callback => {
			ConfirmModal.hide()

			El.text(el_msg_return, `Truncate: The table was truncated`)
			El.show(el_msg_return)
			setTimeout( e => El.hide(el_msg_return), 2500)

			Storage.set('tblSelectedRows', '0')
			topbar_loader.total(`${ Storage.get('tblSelectedRows') } Row's`)
		})
	},

	show_create () {
		var conn = GetConnection.create_conn()

		conn.raw(`SHOW CREATE TABLE ${ Storage.get('dbSelected') }.${ Storage.get('tblSelected') }`).then( callback => {
			El.text('#code-tbl-name', callback[0][0]['Table'])
			editor.getDoc().setValue(callback[0][0]['Create Table'])

			CodeModal.show()
		})
	},

}