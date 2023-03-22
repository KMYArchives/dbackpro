const BackupModalProperties = {

	choose_folder () {
		dialog({
			type: 'directory'
		}).then( dir => {
			El.value('#backup-path', dir[0])
		})
	},

	tab_group_data () {
		El.show('#backup-group-data')
		Classes.add('#tab-group-data', act_class)

		El.hide([ '#backup-group-schema', '#backup-group-view', '#backup-group-table', '#backup-group-trigger' ])
		Classes.remove([ '#tab-group-schema', '#tab-group-view', '#tab-group-table', '#tab-group-trigger' ], act_class)
	},

	tab_group_view () {
		El.show('#backup-group-view')
		Classes.add('#tab-group-view', act_class)

		El.hide([ '#backup-group-schema', '#backup-group-data', '#backup-group-table', '#backup-group-trigger' ])
		Classes.remove([ '#tab-group-schema', '#tab-group-data', '#tab-group-table', '#tab-group-trigger' ], act_class)
	},

	tab_group_table () {
		El.show('#backup-group-table')
		Classes.add('#tab-group-table', act_class)

		El.hide([ '#backup-group-schema', '#backup-group-view', '#backup-group-data', '#backup-group-trigger' ])
		Classes.remove([ '#tab-group-schema', '#tab-group-view', '#tab-group-data', '#tab-group-trigger' ], act_class)
	},

	tab_group_schema () {
		El.show('#backup-group-schema')
		Classes.add('#tab-group-schema', act_class)

		El.hide([ '#backup-group-data', '#backup-group-view', '#backup-group-table', '#backup-group-trigger' ])
		Classes.remove([ '#tab-group-data', '#tab-group-view', '#tab-group-table', '#tab-group-trigger' ], act_class)
	},

	tab_group_trigger () {
		El.show('#backup-group-trigger')
		Classes.add('#tab-group-trigger', act_class)

		El.hide([ '#backup-group-schema', '#backup-group-view', '#backup-group-table', '#backup-group-data' ])
		Classes.remove([ '#tab-group-schema', '#tab-group-view', '#tab-group-table', '#tab-group-data' ], act_class)
	},

	toggle_dump_settings () {
		El.toggle('.dump-settings')
		Classes.toggle('.dump-settings-toggle', act_class)

		this.tab_group_data()
	},

}