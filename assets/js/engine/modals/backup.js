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

				<div class='legend'>Path</div>
				<input type='text' id='backup-path' placeholder='Path of dump file' value='${
					Find.replace_all(
						Core.get_path('app/dumps'), "\\", '/'
					)
				}'>

				<div class='legend'>Verbose</div>
				<select id='backup-verbose'>
					<option value='true'>Enabled</option>
					<option value='false'>Disabled</option>
				</select>

				<div class='legend'>Format data</div>
				<select id='backup-format-data'>
					<option value='true'>Enabled</option>
					<option value='false' selected>Disabled</option>
				</select>

				<div class='legend'>Charset</div>
				<select id='backup-charset'>
					<option value='true'>Enabled</option>
					<option value='false'>Disabled</option>
				</select>

				<div class='legend'>If Not Exist</div>
				<select id='backup-ifNotExist'>
					<option value='true'>Enabled</option>
					<option value='false'>Disabled</option>
				</select>

				<div class='legend'>Drop If Exist</div>
				<select id='backup-dropIfExist'>
					<option value='true'>Enabled</option>
					<option value='false'>Disabled</option>
				</select>

				<!--<div class='legend warning'>This method uses the mysqldump application on the backend, make sure the MySQL bin folder is in the Windows environment variables.</div>-->
			</div>

			<button class='bblr' onclick='BackupModal.hide()'>Cancel</button>
			<button class='bbrr' onclick='CreateBackup.create()'>Confirm</button>
		`)
	}

}