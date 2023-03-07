const ConfirmModalBackup = {

	delete () {
		El.empty(el_confirm_modal)
		El.append(el_confirm_modal, `
			<div class="label">Confirm delete backup ?</div>
			
			<button class="bblr" onclick="ConfirmModal.hide()">Cancel</button>
			<button class="bbrr" onclick="DeleteBackup.delete()">Confirm</button>
		`)

		ConfirmModal.show()
	},

	restore () {
		El.empty(el_confirm_modal)
		El.append(el_confirm_modal, `
			<div class="label">Confirm restore backup ?</div>
			
			<button class="bblr" onclick="ConfirmModal.hide()">Cancel</button>
			<button class="bbrr" onclick="RestoreBackup.restore()">Confirm</button>
		`)

		ConfirmModal.show()
	},

}