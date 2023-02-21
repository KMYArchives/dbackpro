var menubox_loader = new MenuBox(el_menu_actions)

const CloneModal = {

	show () {
		menubox_loader.hide()
		El.value('#clone-tbl-name', Storage.get('tblSelected'))

		El.show(el_mask_mdl)
		El.show(el_clone_mdl)
	},

	hide () {
		El.hide(el_mask_mdl)
		El.hide(el_clone_mdl)
	},

	layout () {
		El.empty(el_clone_mdl)
		El.append(el_clone_mdl, `
			<div class='mdl-title'>
				<div class='label'>Clone table</div>
				<div class='fas fa-times' onclick='CloneModal.hide()'></div>
			</div>

			<div class="legend">Table name</div>
			<input type="text" id="clone-tbl-name" placeholder="Table name">

			<div class="legend">Select a database</div>
			<select id="clone-db-name"></select>

			<div class="legend">Type</div>
			<select id="clone-options">
				<option value="data">Data only</option>
				<option value="structure">Structure only</option>
				<option value="data-structure" selected>Data and structure</option>
			</select>

			<button class="bblr" onclick="CloneModal.hide()">Cancel</button>
			<button class="bbrr" onclick="CloneTable.clone()">Confirm</button>
		`)
	},

}