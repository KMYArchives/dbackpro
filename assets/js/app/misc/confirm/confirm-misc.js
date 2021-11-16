const ConfirmMisc = {

	text (section) {
		switch (section) {
			case 'drop_table':
				return 'This action cannot be undone. Confirm drop table ?'

			case 'delete_task':
			case 'delete_backup':
			case 'delete_snippet':
			case 'delete_diagram':
				return 'This action cannot be undone. Confirm deletion ?'

			case 'rename_table':
				return 'Rename table'

			case 'show_conns':
				return 'Back to homepage ?'
	
			case 'logoff':
				return 'Are you sure you want to sign out of your account ?'
	
			case 'delete_conn':
				return 'Are you sure you want to delete this connection and everything that is linked to it ?'
	
			case 'truncate_table':
				return 'This action cannot be undone. Confirm truncate table ?'
	
			case 'delete_collection':
				return 'This action cannot be undone. Confirm delete collection ?'

			case 'move_trash_diagram':
			case 'move_trash_snippet':
				return 'Are you sure you want to move that for trash ?'
		}
	},

	placeholder (text) {
		switch (text) {
			case 'drop_table':
			case 'truncate_table':
				return 'Type the table name for execute the action'

			case 'rename_table':
				return 'Type the new name of table'
		}
	},
	
}