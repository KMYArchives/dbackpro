window.onload = e => {

	Classes.add([
		el_menu_app,
		el_menu_actions,
	], 'animate__animated animate__zoomIn animate__faster')

	Profile.menu()

	Events.click( el_menu_app_btn, e => {
		UserDB.get()
		Profile.set_name_avatar()

		Classes.toggle(el_menu_app_btn, act_class)
		El.toggle(el_menu_app)
	})

	Events.click( close_btn, e => { Windows.main_window_close() })

	Events.click( minimize_btn, e => { Windows.main_window_minimize() })

}