const ConfirmModalConns = {

	clear () {
		El.empty(el_confirm_modal)
		El.append(el_confirm_modal, `
			<div class="label">Confirm delete all connection's ?</div>

			<button class="bblr" onclick="ConfirmModal.hide()">Cancel</button>
			<button class="bbrr" onclick="DeleteConnections.clear()">Confirm</button>
		`)

		ConfirmModal.show()
	},

	delete (slug) {
		El.empty(el_confirm_modal)
		El.append(el_confirm_modal, `
			<div class="label">Confirm delete connection ?</div>

			<button class="bblr" onclick="ConfirmModal.hide()">Cancel</button>
			<button class="bbrr" onclick="DeleteConnections.delete('${ slug }')">Confirm</button>
		`)

		ConfirmModal.show()
	},

}