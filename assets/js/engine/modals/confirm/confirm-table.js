var menubox_loader = new MenuBox(el_menu_actions)

const ConfirmModalTable = {

	drop_table () {
		menubox_loader.hide()

		El.empty(el_confirm_modal)
		El.append(el_confirm_modal, `
			<div class="label">Confirm drop table ?</div>
			
			<button class="bblr" onclick="ConfirmModal.hide()">Cancel</button>
			<button class="bbrr" onclick="MySQL_TableConfirm.drop()">Confirm</button>
		`)

		ConfirmModal.show()
	},

	rename_table () {
		menubox_loader.hide()
		
		El.empty(el_confirm_modal)
		El.append(el_confirm_modal, `
			<div class="label">Rename table</div>
			<input type="text" id="rename-input-modal" placeholder="Type the new table name">

			<button class="bblr" onclick="ConfirmModal.hide()">Cancel</button>
			<button class="bbrr" onclick="MySQL_TableConfirm.rename()">Confirm</button>
		`)

		ConfirmModal.show()
		El.focus('#rename-input-modal')
		El.value('#rename-input-modal', Storage.get('tblSelected'))
	},

	truncate_table () {
		menubox_loader.hide()
		
		El.empty(el_confirm_modal)
		El.append(el_confirm_modal, `
			<div class="label">Confirm truncate the table ?</div>

			<button class="bblr" onclick="ConfirmModal.hide()">Cancel</button>
			<button class="bbrr" onclick="MySQL_TableConfirm.truncate()">Confirm</button>
		`)

		ConfirmModal.show()
	},

}