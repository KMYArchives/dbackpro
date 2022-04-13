const ConfirmTask = {

	close_modal () {
		El.hide([
			mask,
			confirm_modal
		])
	},

	close (item = null) {
		this.close_modal()
		
		switch (item) {
			case 'move_trash_diagram':
				GetDiagram.get_local()
				break

			case 'move_trash_snippet':
				GetSnippet.get_local()
				break
		}
	},

	action (task = null) {
		if (El.value('#confirm-input') != '') {
			if (El.value('#confirm-input') == Storage.get('table')) {
				switch (task) {
					case 'drop_table':
						MySqlTableQueries.drop()
						break

					case 'truncate_table':
						MySqlTableQueries.truncate()
						break
				}
			} else {
				GUI.message('error-confirm', 'Error: the table name is incorrect', 2500)
			}
		} else {
			GUI.message('error-confirm', 'Error: type the table name for execute the action', 2500)
		}
	},

	run (run, slug = null) {
		switch (run) {
			case 'drop_table':
			case 'truncate_table':
				this.action(run)
				break

			case 'show_conns':
				StartPage.back()
				break
	
			case 'logoff':
				Login.logoff()
				break
	
			case 'delete_conn':
				GetConn.delete(slug)
				break
	
			case 'delete_snippet':
				SnippetIO.delete(slug)
				break
	
			case 'delete_diagram':
				DiagramIO.delete(slug)
				break
	
			case 'delete_collection':
				CollectionManager.delete(slug)
				break
	
			case 'move_trash_diagram':
				TrashActions.move('diagrams', slug)
				break
	
			case 'move_trash_snippet':
				TrashActions.move('snippets', slug)
				break
		}

		if (!Find.in_array(run, [ 
            'drop_table', 'truncate_table' 
        ])) { this.close() }
	},

}