var menubox_loader = new MenuBox(el_menu_actions)

const BackupModal = {

	show () {
		El.show(el_mask_mdl)
		El.show(el_backup_mdl)
	},

	hide () {
		El.hide(el_mask_mdl)
		El.hide(el_backup_mdl)
	},

	layout () {
		El.empty(el_backup_mdl)
		El.append(el_backup_mdl, `
			<div class='mdl-title'>
				<div class='label'>Create backup</div>
				<div class='fas fa-times' onclick='BackupModal.hide()'></div>
			</div>

			<div class='body'>
				<div class='legend'>Store</div>
				<select id='backup-store'>
					<option value='local'>Local</option>
					<option value='dbp-cloud'>DBack Pro Cloud</option>
				</select>

				<div class='legend'>
					Path
					<div class='fas fa-folder-open' onclick='BackupModalProperties.choose_folder()'></div>
				</div>

				<input class='bdr-bot' type='text' id='backup-path' placeholder='Path of dump file' value='${
					Find.replace_all(
						Core.get_path('app/dumps'), "\\", '/'
					)
				}'>

				<div class='dump-settings-toggle' onclick='BackupModalProperties.toggle_dump_settings()'>
					Advanced setting's
					<div class='fas fa-wrench'></div>
				</div>

				<div class='dump-settings'>
					<div class='tabs'>
						<div class='tab ${ act_class }' id='tab-group-data' onclick='BackupModalProperties.tab_group_data()'>Data</div>
						<div class='tab' id='tab-group-schema' onclick='BackupModalProperties.tab_group_schema()'>Schema</div>
						<div class='tab' id='tab-group-view' onclick='BackupModalProperties.tab_group_view()'>View</div>
						<div class='tab' id='tab-group-table' onclick='BackupModalProperties.tab_group_table()'>Table</div>
						<div class='tab' id='tab-group-trigger' onclick='BackupModalProperties.tab_group_trigger()'>Trigger</div>
					</div>

					<div class='tab-content' id='backup-group-data'>
						<div class='checkbox'>
							<input type='checkbox' id='backup-verbose' checked>
							<label for='backup-verbose'>Verbose</label>
						</div>

						<div class='checkbox'>
							<input type='checkbox' id='backup-lockTables' checked>
							<label for='backup-lockTables'>Lock Tables</label>
						</div>

						<div class='checkbox'>
							<input type='checkbox' id='backup-formatData'>
							<label for='backup-formatData'>Format data</label>
						</div>

						<div class='checkbox'>
							<input type='checkbox' id='backup-viewData'>
							<label for='backup-viewData'>Include view data</label>
						</div>

						<div class='checkbox'>
							<input type='checkbox' id='backup-returnFromFunction'>
							<label for='backup-returnFromFunction'>Return from Function</label>
						</div>

						<div class='legend'>Max rows per insert</div>
						<input type='number' id='backup-maxRowsPerInsert' min='1' max='999999' value='1'>
					</div>

					<div class='tab-content' id='backup-group-schema'>
						<div class='checkbox'>
							<input type='checkbox' id='backup-schemaEngine' checked>
							<label for='backup-schemaEngine'>Engine</label>
						</div>

						<div class='checkbox'>
							<input type='checkbox' id='backup-schemaFormat' checked>
							<label for='backup-schemaFormat'>Format</label>
						</div>

						<div class='checkbox'>
							<input type='checkbox' id='backup-schemaAutoIncrement' checked>
							<label for='backup-schemaAutoIncrement'>Auto Increment</label>
						</div>
					</div>

					<div class='tab-content' id='backup-group-view'>
						<div class='checkbox'>
							<input type='checkbox' id='backup-viewDefiner'>
							<label for='backup-viewDefiner'>Definer</label>
						</div>

						<div class='checkbox'>
							<input type='checkbox' id='backup-viewAlgorithm'>
							<label for='backup-viewAlgorithm'>Algorithm</label>
						</div>

						<div class='checkbox'>
							<input type='checkbox' id='backup-viewSqlSecurity'>
							<label for='backup-viewSqlSecurity'>Sql Security</label>
						</div>

						<div class='checkbox'>
							<input type='checkbox' id='backup-viewCreateOrReplace' checked>
							<label for='backup-viewCreateOrReplace'>Create Or Replace</label>
						</div>
					</div>

					<div class='tab-content' id='backup-group-table'>
						<div class='checkbox'>
							<input type='checkbox' id='backup-charset' checked>
							<label for='backup-charset'>Include charset</label>
						</div>

						<div class='checkbox'>
							<input type='checkbox' id='backup-ifNotExist' checked>
							<label for='backup-ifNotExist'>Include If Not Exist</label>
						</div>

						<div class='checkbox'>
							<input type='checkbox' id='backup-dropIfExist' checked>
							<label for='backup-dropIfExist'>Include Drop if Exist</label>
						</div>
					</div>

					<div class='tab-content' id='backup-group-trigger'>
						<div class='checkbox'>
							<input type='checkbox' id='backup-triggerDefiner'>
							<label for='backup-triggerDefiner'>Definer</label>
						</div>

						<div class='checkbox'>
							<input type='checkbox' id='backup-triggerDropIfExist' checked>
							<label for='backup-triggerDropIfExist'>Drop If Exist</label>
						</div>

						<div class='legend'>Delimiter</div>
						<input type='text' id='backup-triggerDelimiter' value=';;'>
					</div>
				</div>
			</div>

			<button class='bblr' onclick='BackupModal.hide()'>Cancel</button>
			<button class='bbrr' onclick='CreateBackup.create()'>Confirm</button>
		`)
	},

}