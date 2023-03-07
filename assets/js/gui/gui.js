window.onload = e => {

	Classes.add([
		el_menu_app,
		el_menu_actions,
		
		el_code_mdl,
		el_diagram_mdl,
		el_confirm_modal,
	], 'animate__animated animate__zoomIn animate__faster')

	Profile.menu()

	Events.click( 'body', e => {
		if (e.target.tagName.toLowerCase() == 'a' && e.target.protocol != 'file:') {
			e.preventDefault()
			open(e.target.href)
		}
	})

	Events.click( el_mask_mdl, e => {
		El.hide([
			el_mask_mdl,

			el_code_mdl,
			el_clone_mdl,
			el_backup_mdl,
			el_diagram_mdl,
			el_confirm_modal,
		])
	})

	Events.click( el_menu_app_btn, e => {
		UserDB.get()
		Profile.set_name_avatar()

		Classes.toggle(el_menu_app_btn, act_class)
		El.toggle(el_menu_app)
	})

	Events.click( close_btn, e => { Windows.main_window_close() })

	Events.click( minimize_btn, e => { Windows.main_window_minimize() })

}