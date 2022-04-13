const Modals = {
	
	show (modal) {
		if (Attr.has(modal, 'modal')) {
			modal = Attr.get(
				modal, 'modal'
			)
		}
	
		El.show([
			mask, modal
		])
	},
	
	close (window) {
		El.hide([
			mask, window
		])
	},

	all_modals () {
		return [
			modal,
			confirm_modal,
		]
	},
	
	close_all (hide_mask = true) {
		if (hide_mask == true) { El.hide(mask) }

		El.hide(
			this.all_modals()
		)
		
		if (clean_params == true) {
			if (Find.in_array(slice_url, [ 
				'login', 'signup', 'forget', 'telemetry' 
			])) {
				Home.go_page()
			}
		}
	},

}