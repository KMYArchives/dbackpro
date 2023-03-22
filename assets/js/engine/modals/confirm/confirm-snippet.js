const ConfirmModalSnippet = {

	delete () {
		El.empty(el_confirm_modal)
		El.append(el_confirm_modal, `
			<div class="label">Confirm delete snippet ?</div>
			
			<button class="bblr" onclick="ConfirmModal.hide()">Cancel</button>
			<button class="bbrr" onclick="DeleteSnippet.delete()">Confirm</button>
		`)

		ConfirmModal.show()
	},

}